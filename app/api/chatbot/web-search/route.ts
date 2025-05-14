import { NextRequest, NextResponse } from "next/server";
import { ChatbotResponse } from "@/lib/chatbot/types";

// Google Custom Search API configuration
// NOTE: In production, these should be stored in environment variables:
// Example: const GOOGLE_API_KEY = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
// Example: const SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY || '';
const SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID || '';
const GOOGLE_SEARCH_API_URL = 'https://www.googleapis.com/customsearch/v1';

// Set a timeout for web search operations
const SEARCH_TIMEOUT = 7000;

// Set API request count limit (Google API provides 100 free searches per day)
const DAILY_REQUEST_LIMIT = 90; // Set slightly under the daily limit to be safe
let apiRequestCount = 0;
let apiRequestCountResetDate = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000; // Next midnight

// Rate limiting - requests per IP address
const MAX_REQUESTS_PER_MINUTE = 10;
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Define a structure for search results
interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source?: string;
  image?: string;
}

// Add interface for Google search item
interface GoogleSearchItem {
  title?: string;
  link?: string;
  snippet?: string;
  displayLink?: string;
  pagemap?: {
    cse_image?: Array<{src?: string}>;
  };
}

// List of keywords related to pricing/subscription to filter out
const PRICING_KEYWORDS = [
  'price', 'pricing', 'subscription', 'cost', 'payment', 'fee', 'purchase',
  'buy', 'subscribe', 'plan', 'package', 'license', 'monthly', 'annually',
  'trial', 'discount', 'offer', 'promotion', 'deal', '$', '€', '£', '¥',
  'dollar', 'euro', 'pound', 'yen', 'rupee', 'currency', 'pay', 'paid',
  'billing', 'invoice', 'checkout', 'installment', 'premium', 'tier',
  'free', 'charge', 'charges', 'charged', 'expense', 'expenses', 'funding'
];

export async function POST(request: NextRequest) {
  try {
    // Reset API request count at midnight
    const now = new Date();
    if (now.getTime() > apiRequestCountResetDate) {
      apiRequestCount = 0;
      apiRequestCountResetDate = now.setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000; // Next midnight
    }
    
    // Check if we've exceeded our daily Google API quota
    if (apiRequestCount >= DAILY_REQUEST_LIMIT) {
      return NextResponse.json(
        { 
          message: "I'm currently unable to search for more information online. Please ask about our services or solutions, or try again later.",
          error: "api_quota_exceeded",
          isWebSearch: true,
          suggestedQuestions: [
            "What services does Atlas Technosoft offer?",
            "Tell me about your implementation approach",
            "How can I contact your team?"
          ]
        },
        { status: 429 }
      );
    }
    
    // Get client IP for rate limiting (in a real implementation, use a more robust method)
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { 
          message: "You've sent too many search requests. Please wait a moment before trying again.",
          error: "rate_limited",
          isWebSearch: true
        },
        { status: 429 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { query, context } = body as { query: string; context?: string[] };
    
    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }
    
    // Sanitize input - limit query length to prevent abuse
    const sanitizedQuery = sanitizeQuery(query);
    if (sanitizedQuery !== query) {
      console.warn("Query was sanitized, original may have contained suspicious patterns");
    }
    
    // Set up a timeout for the web search
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error("Web search timed out"));
      }, SEARCH_TIMEOUT);
    });
    
    // Perform the web search
    const searchPromise = performWebSearch(sanitizedQuery, context);
    
    // Race between the search and the timeout
    const searchResults = await Promise.race([searchPromise, timeoutPromise]);
    
    // Process the search results into a coherent response
    const response = processSearchResults(sanitizedQuery, searchResults, context);
    
    return NextResponse.json({
      ...response,
      isWebSearch: true,
      processedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error processing web search:", error);
    
    // Handle timeout specifically
    if (error instanceof Error && error.message === "Web search timed out") {
      return NextResponse.json(
        { 
          message: "The web search is taking longer than expected. Please try a more specific query or check our documentation for immediate information.",
          error: "timeout",
          isWebSearch: true,
          suggestedQuestions: [
            "Can you tell me about your services instead?",
            "What industries do you specialize in?",
            "How can I contact a specialist?"
          ]
        },
        { status: 408 }
      );
    }
    
    // Handle API quota errors
    if (error instanceof Error && 
       (error.message.includes('quota') || 
        error.message === 'quota_exceeded' || 
        error.message === 'api_quota_exceeded')) {
      return NextResponse.json(
        { 
          message: "I'm currently unable to search for more information online due to search limits. Please ask about our services or solutions, or try again later.",
          error: "api_quota_exceeded",
          isWebSearch: true,
          suggestedQuestions: [
            "What solutions does Atlas Technosoft offer?",
            "Tell me about your implementation approach",
            "How can I contact your team?"
          ]
        },
        { status: 429 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { 
        message: "I couldn't complete the web search at this time. I can still help with information about our services, industries we serve, or connect you with a specialist who can provide detailed answers to your specific questions.",
        error: "internal_error",
        isWebSearch: true,
        suggestedQuestions: [
          "What solutions does Atlas Technosoft offer?",
          "Tell me about your implementation approach",
          "How can I contact your team?"
        ]
      },
      { status: 500 }
    );
  }
}

/**
 * Check if the request exceeds rate limits
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  
  // If no record exists or reset time has passed, create a new record
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, {
      count: 1,
      resetTime: now + 60000 // Reset after 1 minute
    });
    return false;
  }
  
  // If under limit, increment count
  if (record.count < MAX_REQUESTS_PER_MINUTE) {
    record.count++;
    return false;
  }
  
  // Rate limit exceeded
  return true;
}

/**
 * Sanitize and validate the query to prevent injection attacks
 */
function sanitizeQuery(query: string): string {
  // Trim and limit length
  let sanitized = query.trim().substring(0, 100);
  
  // Remove potential script or SQL injection patterns
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/(\b)(on\S+)(\s*)=/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/SELECT|INSERT|UPDATE|DELETE|DROP|;|--/gi, '')
    // Additional sanitization for other potential harmful patterns
    .replace(/<iframe/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/eval\(/gi, '')
    .replace(/onerror/gi, '');
  
  return sanitized;
}

/**
 * Perform a web search using Google's Custom Search JSON API
 */
async function performWebSearch(query: string, context?: string[]): Promise<SearchResult[]> {
  try {
    // Add more context to the search query if available for better results
    // but limit to avoid overcomplicating the query
    let enhancedQuery = query;
    if (context && context.length > 0) {
      // Get the last 1-2 relevant messages for context, avoiding long chains
      const recentContext = context.slice(-2)
        .filter(msg => msg.length < 100) // Only short messages as context
        .join(" ");
      
      if (recentContext) {
        enhancedQuery = `${query} ${recentContext}`;
      }
    }
    
    // Always add some context about what we're looking for
    enhancedQuery = `${enhancedQuery} information guide tutorial`;
    
    // Construct URL with safety filters and without any personalization
    const url = new URL(GOOGLE_SEARCH_API_URL);
    url.searchParams.append('key', GOOGLE_API_KEY);
    url.searchParams.append('cx', SEARCH_ENGINE_ID);
    url.searchParams.append('q', enhancedQuery);
    url.searchParams.append('safe', 'active');  // Safe search
    url.searchParams.append('num', '5');  // Number of results
    url.searchParams.append('rights', 'cc_publicdomain cc_attribute cc_sharealike cc_noncommercial');  // Prefer freely usable content
    
    console.log(`Performing web search for: ${enhancedQuery}`);
    
    // Increment the API request counter
    apiRequestCount++;
    
    // Make the API request with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SEARCH_TIMEOUT - 500);
    
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Referer': 'https://atlastechnosoft.com',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Track API usage and errors
      if (response.status === 429 || response.status === 403) {
        console.error(`Google API rate limit or quota exceeded: ${response.status}`);
        // Set request count to limit to prevent further attempts
        apiRequestCount = DAILY_REQUEST_LIMIT;
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Google Search API error: ${response.status}`, errorText);
        
        // Handle specific Google API errors
        if (response.status === 403) {
          // Check if this is a quota exceeded error
          if (errorText.includes('quotaExceeded') || errorText.includes('quota exceeded')) {
            console.error('Google API quota exceeded');
            throw new Error('quota_exceeded');
          }
          // Check if this is an API key issue
          if (errorText.includes('invalid key') || errorText.includes('API key')) {
            console.error('Invalid API key');
            throw new Error('invalid_api_key');
          }
          throw new Error(`api_forbidden: ${errorText.substring(0, 100)}`);
        }
        
        if (response.status === 429) {
          throw new Error('rate_limited');
        }
        
        throw new Error(`Search API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check if the API response indicates an error
      if (data.error) {
        const errorInfo = data.error;
        console.error('Google API returned an error:', errorInfo.message || 'Unknown error');
        throw new Error(`api_error: ${errorInfo.message || 'Unknown error'}`);
      }
      
      // Process and filter results
      let results: SearchResult[] = [];
      
      if (data.items && Array.isArray(data.items)) {
        results = data.items.map((item: GoogleSearchItem) => ({
          title: item.title || '',
          url: item.link || '',
          snippet: item.snippet || '',
          source: item.displayLink || '',
          image: item.pagemap?.cse_image?.[0]?.src || null
        }));
        
        // Filter out results that might be about pricing or subscriptions
        results = results.filter(result => !containsPricingInfo(result));
        
        // Security: Verify all URLs are valid and HTTPS
        results = results.filter(result => {
          try {
            const url = new URL(result.url);
            return url.protocol === 'https:';
          } catch {
            return false;
          }
        });
      }
      
      return results;
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    // Handle abort errors separately
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error("Search request aborted due to timeout");
      throw new Error("Search request timed out");
    } else if (error instanceof Error) {
      // Handle specific API errors
      if (error.message === 'quota_exceeded') {
        console.error("Google API quota exceeded");
        apiRequestCount = DAILY_REQUEST_LIMIT; // Prevent further attempts
        // Return an empty array, the caller will handle it appropriately
        return [];
      }
      
      if (error.message === 'invalid_api_key') {
        console.error("Invalid Google API key");
        apiRequestCount = DAILY_REQUEST_LIMIT; // Prevent further attempts
        // Return an empty array, let the caller handle the fallback
        return [];
      }
      
      if (error.message === 'rate_limited') {
        console.error("Google API rate limited");
        // Return an empty array, the caller will handle it
        return [];
      }
      
      // Log other errors
      console.error("Error in web search:", error);
    } else {
      console.error("Unknown error in web search");
    }
    
    throw error;
  }
}

/**
 * Check if a search result contains pricing information
 */
function containsPricingInfo(result: SearchResult): boolean {
  const textToCheck = `${result.title} ${result.snippet}`.toLowerCase();
  
  // Check for pricing keywords
  return PRICING_KEYWORDS.some(keyword => 
    textToCheck.includes(keyword.toLowerCase())
  );
}

/**
 * Process search results into a cohesive response
 */
function processSearchResults(query: string, results: SearchResult[], _context?: string[]): ChatbotResponse {
  // Check if we have valid results
    if (!results || results.length === 0) {
      return {
      message: "I couldn't find any relevant information online. Would you like me to answer based on my existing knowledge, or can I help you with something else?",
      error: "no_results",
      isWebSearch: true,
        suggestedQuestions: [
          "What services does Atlas Technosoft offer?",
          "Tell me about SAP Business One",
        "How can I contact your team?"
      ]
    };
  }

  // Filter out pricing or sales-oriented content unless specifically asked about pricing
  const isPricingQuery = query.toLowerCase().includes("price") || 
                        query.toLowerCase().includes("cost") || 
                        query.toLowerCase().includes("pricing") ||
                        query.toLowerCase().includes("subscription");

  let filteredResults = results;
  
  if (!isPricingQuery) {
    filteredResults = results.filter(result => !containsPricingInfo(result));
  }
  
  // Filter out irrelevant or low-quality sources
  filteredResults = filterLowQualitySources(filteredResults);
  
  // Limit to top relevant results to avoid information overload
  filteredResults = filteredResults.slice(0, 5);
  
  // Transform results to a format suitable for fact extraction
  const facts = filteredResults.map((result, index) => ({
    title: result.title,
    snippet: result.snippet,
    source: result.url.replace(/^https?:\/\//, '').split('/')[0],
    relevanceScore: calculateRelevanceScore(result, query, index)
  }));

  // Sort facts by relevance score
  facts.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Construct a coherent response from the facts
  const responseText = constructImprovedResponseFromFacts(query, facts);
  
  // Generate follow-up questions based on search results
  const followUpQuestions = generateFollowUpQuestions(query, facts);

  // Return the final response
      return {
    message: responseText,
    isWebSearch: true,
    webSearchResults: filteredResults,
    factChecked: true,
    confidence: calculateOverallConfidence(facts),
    suggestedQuestions: followUpQuestions,
    timestamp: new Date().toISOString()
  };
}

/**
 * Calculate the relevance score for a search result
 */
function calculateRelevanceScore(result: SearchResult, query: string, position: number): number {
  // Base score starts with position weight (earlier results get higher scores)
  let score = 1 - (position * 0.1);
  if (score < 0.3) score = 0.3; // Minimum position score
  
  // Title match bonus
  const queryTerms = query.toLowerCase().split(/\s+/);
  let titleMatchCount = 0;
  
  queryTerms.forEach(term => {
    if (result.title.toLowerCase().includes(term)) {
      titleMatchCount++;
    }
  });
  
  const titleMatchRatio = titleMatchCount / queryTerms.length;
  score += titleMatchRatio * 0.3;
  
  // Content freshness bonus (if date is in title or snippet)
  const currentYear = new Date().getFullYear();
  const datePattern = new RegExp(`(${currentYear}|${currentYear-1})`, 'i');
  if (datePattern.test(result.title) || datePattern.test(result.snippet)) {
    score += 0.2;
  }
  
  // Domain authority bonus
  const authorityDomains = [
    'sap.com', 'uipath.com', 'gartner.com', 'forrester.com', 
    'microsoft.com', 'oracle.com', 'ibm.com', 'mckinsey.com',
    'accenture.com', 'deloitte.com', 'forbes.com', 'harvard.edu'
  ];
  
  try {
    const domain = new URL(result.url).hostname.toLowerCase();
    
    if (authorityDomains.some(authDomain => domain.includes(authDomain))) {
      score += 0.3;
    }
  } catch {
    // Invalid URL, no bonus
  }
  
  // Cap at 0.95 maximum
  return Math.min(score, 0.95);
}

/**
 * Filter out results from low-quality sources
 */
function filterLowQualitySources(results: SearchResult[]): SearchResult[] {
  const lowQualityPatterns = [
    /pinterest\.com/i,
    /quora\.com/i,
    /facebook\.com/i,
    /instagram\.com/i,
    /tiktok\.com/i,
    /reddit\.com/i,
    /youtube\.com/i,
    /medium\.com/i
  ];
  
  return results.filter(result => {
    return !lowQualityPatterns.some(pattern => pattern.test(result.url));
  });
}

/**
 * Calculate overall confidence in the response based on facts
 */
function calculateOverallConfidence(facts: { title: string; snippet: string; source: string; relevanceScore: number }[]): number {
  // No facts, no confidence
  if (facts.length === 0) return 0.3;
  
  // Calculate weighted average of top 3 facts
  const topFacts = facts.slice(0, Math.min(3, facts.length));
  const weightedSum = topFacts.reduce((sum, fact, index) => {
    // Weighted by position (first fact counts most)
    const weight = 1 / (index + 1);
    return sum + (fact.relevanceScore * weight);
  }, 0);
  
  const totalWeight = topFacts.reduce((sum, _, index) => sum + (1 / (index + 1)), 0);
  
  return weightedSum / totalWeight;
}

/**
 * Construct an improved response from the extracted facts
 */
function constructImprovedResponseFromFacts(query: string, facts: { title: string; snippet: string; source: string; relevanceScore: number }[]): string {
  if (facts.length === 0) {
    return "I couldn't find specific information about that online. Would you like me to help you with something else?";
  }

  // Extract the main topic from the query
  const mainTopic = extractMainTopic(query);
  
  // For simple queries with high confidence results, provide a direct answer
  if (facts[0].relevanceScore > 0.8 && query.length < 60) {
    return `Based on information from ${facts[0].source}, ${facts[0].snippet} ${facts.length > 1 ? `\n\nAdditionally, ${facts[1].source} mentions that ${facts[1].snippet}` : ''}`;
  }

  // For more complex queries, synthesize a comprehensive answer
  let response = `Here's what I found about ${mainTopic}:\n\n`;
  
  // Group facts by subtopic
  const groupedFacts = groupFactsBySubtopic(facts);
  
  // Generate paragraphs for each subtopic
  Object.entries(groupedFacts).forEach(([subtopic, subtopicFacts]) => {
    if (subtopic !== 'general') {
      response += `Regarding ${subtopic}: `;
    }
    
    // Combine facts from the same subtopic into coherent text
    const combinedInfo = subtopicFacts.map(fact => fact.snippet).join(' Furthermore, ');
    response += combinedInfo + '\n\n';
  });
  
  // Add source attribution
  const sources = [...new Set(facts.slice(0, 3).map(fact => fact.source))];
  response += `This information comes from ${sources.join(', ')}.`;
  
  return response;
}

/**
 * Extract the main topic from the query
 */
function extractMainTopic(query: string): string {
  // Simple extraction - get the first few words after removing question words
  const cleaned = query.toLowerCase()
    .replace(/^(what|when|where|who|why|how|tell me about|can you explain|what's|is|are|does|do)/i, '')
    .trim();
  
  if (cleaned.length < 5 || cleaned === query) {
    return 'your query';
  }
  
  return cleaned;
}

/**
 * Group facts by subtopic for better organization
 */
function groupFactsBySubtopic(facts: { title: string; snippet: string; source: string; relevanceScore: number }[]): Record<string, typeof facts> {
  const result: Record<string, typeof facts> = { 'general': [] };
  
  // Simplified subtopic classification - in a real implementation, this would use more sophisticated NLP
  facts.forEach(fact => {
    const snippet = fact.snippet.toLowerCase();
    
    if (snippet.includes('feature') || snippet.includes('capability') || snippet.includes('functionality')) {
      if (!result['features']) result['features'] = [];
      result['features'].push(fact);
    } else if (snippet.includes('version') || snippet.includes('release') || snippet.includes('update')) {
      if (!result['versions']) result['versions'] = [];
      result['versions'].push(fact);
    } else if (snippet.includes('benefit') || snippet.includes('advantage') || snippet.includes('value')) {
      if (!result['benefits']) result['benefits'] = [];
      result['benefits'].push(fact);
    } else if (snippet.includes('integration') || snippet.includes('connect') || snippet.includes('api')) {
      if (!result['integrations']) result['integrations'] = [];
      result['integrations'].push(fact);
    } else {
      result['general'].push(fact);
    }
  });
  
  // Remove empty categories
  Object.keys(result).forEach(key => {
    if (result[key].length === 0) {
      delete result[key];
    }
  });
  
  return result;
}

/**
 * Generate improved follow-up questions based on search results
 */
function generateFollowUpQuestions(query: string, facts: { title: string; snippet: string; source: string }[]): string[] {
  // Base questions that are generally helpful
  const baseQuestions = [
    "How can Atlas Technosoft help implement this solution?",
    "What are the benefits of working with Atlas Technosoft?",
    "Can you tell me about your experience with similar projects?"
  ];
  
  // Extract potential topics from facts
  const potentialTopics = new Set<string>();
  const queryTerms = new Set(query.toLowerCase().split(/\s+/).filter(t => t.length > 3));
  
  facts.forEach(fact => {
    const words = fact.title.split(/\s+/).concat(fact.snippet.split(/\s+/));
    
    words.forEach(word => {
      // Only consider longer words that aren't in the original query
      if (word.length > 5 && !queryTerms.has(word.toLowerCase())) {
        potentialTopics.add(word);
      }
    });
  });
  
  // Convert potential topics into questions
  const topicQuestions: string[] = [];
  
  if (facts.some(f => f.snippet.toLowerCase().includes('business one') || f.snippet.toLowerCase().includes('sap'))) {
    topicQuestions.push("What are the key features of SAP Business One 2025?");
  }
  
  if (facts.some(f => f.snippet.toLowerCase().includes('uipath') || f.snippet.toLowerCase().includes('automation'))) {
    topicQuestions.push("How does UiPath's agentic automation work?");
  }
  
  if (facts.some(f => f.snippet.toLowerCase().includes('cloud') || f.snippet.toLowerCase().includes('saas'))) {
    topicQuestions.push("What are the benefits of cloud deployment?");
  }
  
  if (facts.some(f => f.snippet.toLowerCase().includes('implementation') || f.snippet.toLowerCase().includes('deploy'))) {
    topicQuestions.push("What is your implementation methodology?");
  }
  
  // Combine base questions with topic questions and ensure we have 3-5 questions total
  const allQuestions = [...topicQuestions, ...baseQuestions];
  return allQuestions.slice(0, Math.min(4, allQuestions.length));
} 