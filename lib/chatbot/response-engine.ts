import { ChatbotResponse, ConversationContext, Feedback } from './types';
import { knowledgeBase, KnowledgeBaseEntry } from './knowledge-base';
import { ChatbotConfig } from './config';
import { executeRules } from './rule-engine';

// Cache for previously computed responses to improve performance
const responseCache = new Map<string, ChatbotResponse>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

// Add default values for missing ChatbotConfig properties
const stopWords = ["the", "and", "a", "an", "in", "on", "at", "to", "for", "with", "by", 
                  "is", "are", "was", "were", "be", "been", "being", "have", "has", 
                  "had", "do", "does", "did", "will", "would", "shall", "should", 
                  "may", "might", "must", "can", "could", "of", "from", "about"];

// Fallback responses when no good match is found
const fallbackResponses = [
  "I'm not sure I understand your question. Could you rephrase it or ask about our services?",
  "I don't have enough information to answer that question. Can I help you with something specific about our SAP or automation solutions?",
  "That's a bit outside my area of expertise. I'd be happy to connect you with a specialist who can help.",
  "I'm not familiar with that topic. Would you like to know about our SAP Business One implementations or automation services instead?",
  "I don't have the answer to that question. Would you like me to find someone who can help you?"
];

// Set a default confidence threshold
const confidenceThreshold = 0.65;

// Add these properties to ChatbotConfig for use in the code
if (!ChatbotConfig.stopWords) {
  ChatbotConfig.stopWords = stopWords;
}

if (!ChatbotConfig.fallbackResponses) {
  ChatbotConfig.fallbackResponses = fallbackResponses;
}

if (!ChatbotConfig.confidenceThreshold) {
  ChatbotConfig.confidenceThreshold = confidenceThreshold;
}

// Add this helper function to extract messages from context
function extractMessagesFromContext(context: ConversationContext | string[] | undefined): string[] | undefined {
  if (!context) {
    return undefined;
  }
  
  // If it's already a string array, return it directly
  if (Array.isArray(context)) {
    return context;
  }
  
  // If it has messages property that's an array, use that
  if (context.messages && Array.isArray(context.messages)) {
    return context.messages;
  }
  
  // If it has previousMessages that's an array, extract content from them
  if (context.previousMessages && Array.isArray(context.previousMessages)) {
    return context.previousMessages.map(msg => msg.content);
  }
  
  // Fallback to an empty array if we can't extract messages
  return [];
}

/**
 * Gets a response from the knowledge base based on the user's query
 * @param query The user's query
 * @param conversationContext Previous messages context (optional)
 * @returns A response object with the message and optional source
 */
export async function getResponseFromKnowledgeBase(query: string, conversationContext?: string[]): Promise<ChatbotResponse> {
  try {
    // Normalize and validate inputs
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid query: Query must be a non-empty string');
    }
    
    // Clean up the query
    const normalizedQuery = query.toLowerCase().trim();
    
    if (normalizedQuery.length === 0) {
      throw new Error('Empty query after normalization');
    }
    
    // Validate context properly - ensure it's an array of strings
    let validatedContext: string[] = [];
    if (conversationContext && Array.isArray(conversationContext)) {
      validatedContext = conversationContext
        .filter(item => typeof item === 'string' && item.trim().length > 0)
        .map(item => item.trim())
        .slice(-3); // Only use last 3 messages for context to limit resource usage
    }
    
    // Generate cache key based on query and recent context
    const contextHash = validatedContext.length > 0 
      ? validatedContext.join('|').substring(0, 100) // Limit context length for caching
      : '';
    const cacheKey = `${normalizedQuery}|${contextHash}`;
    
    // Check cache for exact match with proper cache entry validation
    if (responseCache.has(cacheKey)) {
      const cachedResponse = responseCache.get(cacheKey);
      if (cachedResponse && typeof cachedResponse === 'object') {
        return cachedResponse as ChatbotResponse;
      }
    }
  
    // Extract entities from the query for better context understanding
    const entities = extractEntities(normalizedQuery);
  
    // Track if the query is a followup question
    const isFollowup = isFollowUpQuestion(normalizedQuery, validatedContext);
    
    // Check if this is a query that would benefit from web search
    if (shouldUseWebSearch(normalizedQuery, entities, validatedContext)) {
      return {
        message: "I need to search for more up-to-date information about this. Let me do that for you.",
        shouldUseWebSearch: true,
        searchQuery: normalizedQuery,
        confidence: 0.8, // High confidence in decision to use web search
        factChecked: true,
        suggestedQuestions: [
          "Tell me more about your services instead",
          "What makes Atlas Technosoft unique?",
          "How can I contact a specialist?"
        ]
      };
    }
    
    // Limit response cache size to prevent memory leaks
    if (responseCache.size > 1000) {
      // Clear oldest 20% of entries when cache exceeds 1000 entries
      const keysToDelete = Array.from(responseCache.keys()).slice(0, 200);
      keysToDelete.forEach(key => responseCache.delete(key));
    }
  
    // Check for exact matches in the knowledge base first
    for (const entry of knowledgeBase) {
      for (const trigger of entry.triggers) {
        if (normalizedQuery === trigger.toLowerCase()) {
          // Validate the factuality of the response against the query
          const factCheck = validateFactuality(entry.response, normalizedQuery, entities);
          
          const response = {
            message: entry.response,
            source: entry.source,
            confidence: factCheck.confidence > 0.7 ? 0.95 : factCheck.confidence, // High confidence for verified exact matches
            factChecked: true,
            factualityIssues: factCheck.issues,
            suggestedQuestions: generateContextualQuestions(entry, entities),
          };
          
          // Cache the response
          cacheResponse(cacheKey, response);
          return response;
        }
      }
    }
    
    // Check for partial matches with improved fuzzy matching
    const matchedEntries = fuzzyMatchEntries(normalizedQuery, knowledgeBase, entities);
    
    if (matchedEntries.length > 0) {
      // Sort entries by match score
      let bestMatch = matchedEntries[0];
      
      // Validate the factuality of the response
      let factCheck = validateFactuality(bestMatch.response, normalizedQuery, entities);
      
      // Try alternative matches if we have multiple and the first has factuality issues
      if (factCheck.issues && factCheck.issues.length > 0 && matchedEntries.length > 1) {
        // Try second best match
        const secondBestMatch = matchedEntries[1];
        const secondFactCheck = validateFactuality(secondBestMatch.response, normalizedQuery, entities);
        
        // If second match is better in terms of factuality, use it instead
        if ((!secondFactCheck.issues || secondFactCheck.issues.length < factCheck.issues.length) && 
            secondFactCheck.confidence > factCheck.confidence) {
          // Use the better factual match
          bestMatch = secondBestMatch;
          factCheck = secondFactCheck;
        }
      }
      
      // Calculate confidence based on factuality check
      const confidence = factCheck.confidence;
      
      // If it's a follow-up question, add context awareness to the response
      let response = bestMatch.response;
      if (isFollowup && validatedContext && validatedContext.length > 0) {
        response = addContextAwareness(response, normalizedQuery, validatedContext, entities);
      }
      
      // If factuality is questionable, add a disclaimer
      if (factCheck.confidence < 0.6 || (factCheck.issues && factCheck.issues.length > 0)) {
        response += " (Note: For the most accurate information specific to your needs, I recommend speaking with one of our specialists.)";
      }
      
      const result = {
        message: response,
        source: bestMatch.source,
        confidence, // Confidence based on factuality check
        factChecked: true,
        factualityIssues: factCheck.issues,
        suggestedQuestions: generateContextualQuestions(bestMatch, entities),
      };
      
      // Cache the response
      cacheResponse(cacheKey, result);
      return result;
    }
    
    // Check if we should try web search as fallback for no matches
    if (shouldTryWebSearchAsFallback(normalizedQuery, entities)) {
      return {
        message: "I don't have specific information about that in my knowledge base. Let me search for the most up-to-date information online.",
        shouldUseWebSearch: true,
        confidence: 0.7, // Good confidence that web search is appropriate
        factChecked: true,
        searchQuery: normalizedQuery,
        suggestedQuestions: [
          "Tell me about Atlas Technosoft instead",
          "What services do you offer?",
          "Can I speak with a specialist?"
        ]
      };
    }
    
    // Handle specific question categories
    if (isGreeting(normalizedQuery)) {
      const response = {
        message: "Hello! I'm the Atlas Technosoft virtual assistant. How can I help you today with our SAP solutions, automation services, or other business needs?",
        confidence: 0.95, // Very confident this is a greeting
        factChecked: true,
        suggestedQuestions: [
          "What SAP solutions do you offer?",
          "Tell me about your automation services",
          "What industries do you serve?"
        ]
      };
      cacheResponse(cacheKey, response);
      return response;
    }
    
    if (isFarewell(normalizedQuery)) {
      const response = {
        message: "Thank you for chatting with Atlas Technosoft! If you have any more questions later, feel free to reach out. Have a great day!",
        confidence: 0.95, // Very confident this is a farewell
        factChecked: true,
      };
      cacheResponse(cacheKey, response);
      return response;
    }
    
    if (isThankYou(normalizedQuery)) {
      const response = {
        message: "You're welcome! I'm glad I could help. Is there anything else you'd like to know about our services?",
        confidence: 0.9, // Very confident this is a thank you
        factChecked: true,
        suggestedQuestions: ["Tell me about your implementation process", "What support options do you provide?"]
      };
      cacheResponse(cacheKey, response);
      return response;
    }
    
    // Check for specific intents
    if (normalizedQuery.includes("compare") || normalizedQuery.includes("difference") || normalizedQuery.includes("vs") || normalizedQuery.includes("versus")) {
      const response = handleComparisonQuery(normalizedQuery);
      
      // Validate response factuality
      const factCheck = validateFactuality(response.message, normalizedQuery, entities);
      
      const enhancedResponse = {
        ...response,
        confidence: factCheck.confidence > 0.7 ? 0.75 : factCheck.confidence, // Fairly confident this is a comparison query
        factChecked: true,
        factualityIssues: factCheck.issues
      };
      
      cacheResponse(cacheKey, enhancedResponse);
      return enhancedResponse;
    }
    
    // Handle negative sentiment or complaints
    if (containsNegativeWords(normalizedQuery)) {
      const response = {
        message: "I understand your concern. Our support team is ready to help resolve any issues you're experiencing. Would you like me to connect you with a support specialist, or can I help gather some initial information about the specific challenges you're facing?",
        confidence: 0.7, // Moderately confident this is a negative sentiment
        factChecked: true,
        suggestedQuestions: ["Connect with support", "Technical issues with SAP Business One", "Report a problem"]
      };
      cacheResponse(cacheKey, response);
      return response;
    }
    
    // Web search intent (when user is looking for information)
    if (containsSearchIntent(normalizedQuery)) {
      const response = {
        message: "I'd be happy to help you find information about that. To provide you with the most accurate and up-to-date information, I can search our knowledge base or connect you with one of our specialists. Which specific aspect are you most interested in learning about?",
        confidence: 0.65, // Moderate confidence this is a search intent
        factChecked: true,
        suggestedQuestions: ["Search for documentation", "Talk to a specialist", "Get more information"]
      };
      cacheResponse(cacheKey, response);
      return response;
    }
    
    // No match found, return smart fallback response with low confidence and factuality warning
    const fallbackResponse = generateSmartFallbackResponse(normalizedQuery, entities);
    const responseWithConfidence = {
      ...fallbackResponse,
      confidence: 0.3, // Low confidence for fallback responses
      factChecked: true,
      message: fallbackResponse.message + " I don't have enough specific information to give you a complete answer. Would you like to connect with one of our specialists who can provide accurate information?"
    };
    cacheResponse(cacheKey, responseWithConfidence);
    return responseWithConfidence;
  } catch (error) {
    console.error("Error in getResponseFromKnowledgeBase:", error);
    // Provide a graceful fallback in case of error
    return {
      message: "I apologize, but I'm having trouble processing your question right now. Could you try rephrasing it, or ask me something else?",
      confidence: 0.2, // Very low confidence due to error
      factChecked: false,
      suggestedQuestions: [
        "What services does Atlas Technosoft offer?",
        "Tell me about SAP Business One",
        "How can I contact Atlas Technosoft?"
      ]
    };
  }
}

/**
 * Cache a response with TTL
 */
function cacheResponse(key: string, response: ChatbotResponse): void {
  responseCache.set(key, response);
  
  // Set up cache expiration
  setTimeout(() => {
    responseCache.delete(key);
  }, CACHE_TTL);
}

/**
 * Detects search intent in a query
 */
function containsSearchIntent(query: string): boolean {
  const searchTerms = [
    "find", "search", "looking for", "where can i find", "how to find",
    "documentation", "manual", "guide", "tutorial", "help me find",
    "resource", "information about", "detail", "specification"
  ];
  
  return searchTerms.some(term => query.includes(term));
}

/**
 * Extracts entities (important terms) from a query
 */
function extractEntities(query: string): string[] {
  // Common business and technical terms to recognize
  const entityDictionary = [
    // SAP products
    "sap", "business one", "b1", "hana", "erp",
    // Automation terms
    "rpa", "automation", "uipath", "workflow", "bot", "robot",
    // Industries
    "manufacturing", "retail", "healthcare", "finance", "distribution",
    "pharmaceutical", "construction", "shipping", "professional services",
    // Business processes
    "inventory", "accounting", "sales", "crm", "hr", "procurement",
    "production", "planning", "budgeting", "forecasting", "reporting",
    // Technical terms
    "cloud", "on-premise", "migration", "integration", "api", "interface",
    "performance", "security", "database", "mobile", "app", "dashboard",
    // Service-related
    "implementation", "support", "training", "maintenance", "upgrade",
    "consulting", "service", "project", "timeline", "deployment",
    // Company specific entities
    "atlas", "technosoft", "atlas technosoft", "mumbai", "borivali",
    "marine lines", "office", "contact", "address", "phone", "email",
    // Critical business entities
    "price", "cost", "pricing", "quote", "demo", "trial"
  ];
  
  // Use a more sophisticated approach with word stemming and variations
  const queryWords = query.toLowerCase().split(/\s+/);
  const detectedEntities = new Set<string>();
  
  // Check for company name variations first - this is critical for factual responses
  if (query.toLowerCase().includes("atlas") && query.toLowerCase().includes("techno")) {
    detectedEntities.add("atlas technosoft");
  }
  
  // Check for multi-word entities first
  for (const entity of entityDictionary) {
    if (entity.includes(" ")) {
      if (query.toLowerCase().includes(entity) || 
          query.toLowerCase().includes(entity.replace(" ", "")) || 
          query.toLowerCase().includes(entity.replace("-", ""))) {
        detectedEntities.add(entity);
      }
    }
  }
  
  // Then check for single word matches with stemming consideration
  for (const word of queryWords) {
    if (word.length <= 2) continue; // Skip very short words
    
    for (const entity of entityDictionary) {
      if (!entity.includes(" ")) { // Only single word entities
        // Basic stemming check (handles plurals and some verb forms)
        if (entity === word || 
            entity + 's' === word || 
            entity + 'es' === word ||
            entity + 'ing' === word ||
            (entity.endsWith('e') && entity.slice(0, -1) + 'ing' === word) ||
            (word.endsWith('s') && word.slice(0, -1) === entity) ||
            (word.endsWith('es') && word.slice(0, -2) === entity) ||
            (word.endsWith('ing') && word.slice(0, -3) === entity) ||
            (word.endsWith('ing') && word.slice(0, -3) + 'e' === entity)) {
          detectedEntities.add(entity);
        }
      }
    }
  }
  
  // Add specialized entity detection for key company information
  identifySpecializedEntities(query, detectedEntities);
  
  return Array.from(detectedEntities);
}

/**
 * Identifies specialized entity types from the query
 * These help in providing accurate factual responses for critical information
 */
function identifySpecializedEntities(query: string, entities: Set<string>) {
  const queryLower = query.toLowerCase();
  
  // Contact information entities
  if (queryLower.match(/(\bphone\b|\bcall\b|\bdial\b|\bcontact\b|\bwhatsapp\b|\bmobile\b)/)) {
    entities.add("phone_number");
  }
  
  if (queryLower.match(/(\bemail\b|\bmail\b|\bmessage\b|\bwrite\b|\bsend\b)/)) {
    entities.add("email_contact");
  }
  
  // Location entities
  if (queryLower.match(/(\blocation\b|\baddress\b|\boffice\b|\bplace\b|\bsituated\b|\bbased\b|\bheadquarters\b)/)) {
    entities.add("office_location");
    
    // Sub-type for specific office locations
    if (queryLower.match(/(\bhead\b|\bmain\b|\bprimary\b)/)) {
      entities.add("head_office");
    }
    
    if (queryLower.match(/(\bbranch\b|\bother\b|\bsecond\b)/)) {
      entities.add("branch_office");
    }
    
    if (queryLower.match(/(\bborivali\b|\bmarine\b|\bmumbai\b|\bmaharashtra\b|\bindia\b)/)) {
      entities.add("mumbai_location");
    }
  }
  
  // Team information entities
  if (queryLower.match(/(\bteam\b|\bemployees\b|\bstaff\b|\bpeople\b|\bexperts\b|\bconsultants\b|\bhow\s+many\b)/)) {
    entities.add("team_info");
  }
  
  // Company information entities
  if (queryLower.match(/(\babout\b|\bcompany\b|\binfo\b|\bbackground\b|\bhistory\b|\bfounded\b|\bwho\s+is\b|\bwhat\s+is\b)/)) {
    entities.add("company_info");
  }
  
  // Service offerings entities
  if (queryLower.match(/(\bservices\b|\bsolutions\b|\bofferings\b|\bproducts\b|\bprovide\b|\boffer\b)/)) {
    entities.add("service_offerings");
  }
  
  // Pricing and cost entities
  if (queryLower.match(/(\bprice\b|\bcost\b|\bhow\s+much\b|\bexpensive\b|\bafford\b|\bbudget\b|\brate\b|\bpayment\b|\bfee\b)/)) {
    entities.add("pricing_info");
  }
}

/**
 * Generates contextual follow-up questions based on the entry and entities
 */
function generateContextualQuestions(entry: KnowledgeBaseEntry, entities: string[]): string[] {
  const questions: string[] = [];
  const detectedTopics = new Set<string>();
  
  // Add questions based on the entry source
  if (entry.source?.toLowerCase().includes("sap")) {
    questions.push("What are the implementation steps for SAP solutions?");
    questions.push("What industries benefit most from SAP Business One?");
    detectedTopics.add("sap");
  }
  
  if (entry.source?.toLowerCase().includes("automation")) {
    questions.push("What processes are best to automate first?");
    questions.push("How do you measure automation ROI?");
    detectedTopics.add("automation");
  }
  
  if (entry.source?.toLowerCase().includes("cloud")) {
    questions.push("What are the security features of your cloud solutions?");
    detectedTopics.add("cloud");
  }
  
  if (entry.source?.toLowerCase().includes("implementation")) {
    questions.push("What's your typical implementation timeline?");
    detectedTopics.add("implementation");
  }
  
  // Add questions based on entities found in the query
  if (entities.includes("implementation") && !detectedTopics.has("implementation")) {
    questions.push("What's your implementation methodology?");
    questions.push("How long does implementation typically take?");
  }
  
  if ((entities.includes("mobile") || entities.includes("app")) && questions.length < 3) {
    questions.push("What mobile capabilities do your solutions offer?");
  }
  
  if (entities.includes("integration") && questions.length < 3) {
    questions.push("What systems can you integrate with?");
  }
  
  if (entities.some(e => ["security", "compliance", "protection"].includes(e)) && questions.length < 3) {
    questions.push("How do you handle data security and compliance?");
  }
  
  // Add a generic question if we don't have specific ones
  if (questions.length < 2) {
    questions.push("How can I learn more about your services?");
    questions.push("Can you share a customer success story?");
  }
  
  // Limit to 3 questions maximum and remove any duplicates
  const uniqueQuestions = Array.from(new Set(questions));
  return uniqueQuestions.slice(0, 3);
}

/**
 * Performs fuzzy matching on knowledge base entries with improved algorithm
 */
function fuzzyMatchEntries(query: string, entries: KnowledgeBaseEntry[], entities: string[]): KnowledgeBaseEntry[] {
  try {
    // Normalize the query by removing common words that don't add meaning
    const normalizedQuery = query.toLowerCase()
      .replace(/[.,?!;:(){}[\]]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    
    const filteredEntries = entries.map(entry => {
      // Calculate multiple matching signals for better accuracy
      
      // 1. Check for keyword matches (most important signal)
      const keywordMatches = entry.keywords.filter(keyword => 
        normalizedQuery.includes(keyword.toLowerCase())
      ).length;
      
      // Higher weight for keywords found in the query
      const keywordScore = keywordMatches * 10;
      
      // 2. Check for trigger partial matches
      const triggerMatches = entry.triggers.filter(trigger => {
        const normalizedTrigger = trigger.toLowerCase()
          .replace(/[.,?!;:(){}[\]]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
          
        // Check if query contains the trigger or vice versa
        return normalizedQuery.includes(normalizedTrigger) || 
               normalizedTrigger.includes(normalizedQuery);
      }).length;
      
      // Higher weight for trigger matches
      const triggerScore = triggerMatches * 15;
      
      // 3. Use Levenshtein for close matches on small inputs
      let levenshteinScore = 0;
      if (normalizedQuery.length < 20) {
        // Only apply Levenshtein to short queries to avoid false positives
        const distances = entry.triggers.map(trigger => {
          const normalizedTrigger = trigger.toLowerCase()
            .replace(/[.,?!;:(){}[\]]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
            
          return levenshteinDistance(normalizedQuery, normalizedTrigger);
        });
        
        // Get minimum distance (best match)
        const minDistance = Math.min(...distances);
        
        // Convert to score (lower distance = higher score)
        // Only count if distance is reasonable for the query length
        const maxAllowedDistance = Math.ceil(normalizedQuery.length * 0.4);
        if (minDistance <= maxAllowedDistance) {
          levenshteinScore = Math.max(0, 30 - minDistance * 2);
        }
      }
      
      // 4. Entity match score - prioritize responses that match identified entities
      const entityMatches = entities.filter(entity => 
        entry.keywords.includes(entity) || 
        entry.response.toLowerCase().includes(entity)
      ).length;
      
      const entityScore = entityMatches * 8;
      
      // Calculate final score - combination of all signals
      const finalScore = keywordScore + triggerScore + levenshteinScore + entityScore;
      
      return {
        entry,
        score: finalScore
      };
    });
    
    // Sort by score in descending order
    const sortedEntries = filteredEntries
      .filter(item => item.score > 0) // Only consider entries with a positive score
      .sort((a, b) => b.score - a.score)
      .map(item => item.entry);
    
    // Return top 3 matches or fewer if not enough matches
    return sortedEntries.slice(0, 3);
  } catch (error) {
    console.error("Error in fuzzy matching:", error);
    return [];
  }
}

/**
 * Calculate Levenshtein (edit) distance between two strings
 * Helps with fuzzy matching for misspelled words
 */
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // Initialize the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Detects if the query is a follow-up question
 */
function isFollowUpQuestion(query: string, context?: string[]): boolean {
  if (!context || context.length === 0) {
    return false;
  }
  
  const followUpIndicators = [
    // Pronouns that may refer to previous topics
    "it", "this", "that", "they", "them", "these", "those", 
    // Words that indicate continuation
    "also", "too", "additionally", "more", "another", "else",
    // Questions without clear subject
    "how about", "what about", "how does", "how do", "how can", "why is", "when is",
    "can you", "could you", "will it", "does it", "is it", "are they", "do they",
    // Preposition at beginning often indicates follow-up
    "for", "with", "without", "by", "in", "on", "at", "to", "from"
  ];
  
  // Check if query starts with one of the follow-up indicators
  for (const indicator of followUpIndicators) {
    if (query.toLowerCase().startsWith(indicator + " ") || query.toLowerCase() === indicator) {
      return true;
    }
  }
  
  // Check for very short queries which are often follow-ups
  if (query.split(" ").length <= 3 && query.length < 15) {
    return true;
  }
  
  // Advanced: Check if query refers to something mentioned in previous messages
  const previousContent = context.join(" ").toLowerCase();
  const queryWords = query.toLowerCase().split(/\s+/);
  
  // Extract potential subjects from previous content (nouns)
  const previousWords = previousContent.split(/\s+/);
  const potentialSubjects = previousWords.filter(word => 
    word.length > 3 && 
    !word.match(/^(the|and|for|with|that|this|from|have|what|when|why|how|is|are|was|were|will|would|could|can|to)$/i)
  );
  
  // Check if the query seems to lack a subject present in the context
  if (potentialSubjects.some(subject => 
    !queryWords.includes(subject) && 
    previousContent.includes(subject) && 
    (query.includes("it") || query.includes("they") || query.includes("them"))
  )) {
    return true;
  }
  
  return false;
}

/**
 * Add context awareness to a response based on conversation history
 */
function addContextAwareness(response: string, query: string, context: string[], _entities: string[]): string {
  // Check if this is a follow-up question that needs context awareness
  if (!isFollowUpQuestion(query, context)) {
    return response;
  }
  
  // Add context awareness if appropriate
  const contextualResponses = [
    "Based on our conversation, ",
    "Regarding your previous question, ",
    "Following up on that, ",
    "To continue our discussion, "
  ];
  
  // Check for pronouns that might need resolution
  const pronounsNeedingContext = [
    "it", "this", "that", "they", "them", "those", "these"
  ];
  
  // Check if the query contains pronouns needing context
  const hasPronouns = pronounsNeedingContext.some(pronoun => 
    new RegExp(`\\b${pronoun}\\b`, 'i').test(query)
  );
  
  if (hasPronouns) {
    // Simple pronoun resolution - prefix the response with context
    const prefix = contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
    return prefix + response;
  }
  
  return response;
}

/**
 * Handles comparison questions about products or services
 */
function handleComparisonQuery(query: string): ChatbotResponse {
  // Extract what's being compared
  const comparisonTerms = [
    {patterns: ["cloud", "on-premise", "on premise", "onpremise"], subject: "deployment options"},
    {patterns: ["sap", "business one", "b1", "hana"], subject: "SAP solutions"},
    {patterns: ["uipath", "automation", "rpa"], subject: "automation technologies"}
  ];
  
  let comparisonSubject = "solutions";
  
  for (const term of comparisonTerms) {
    if (term.patterns.some(pattern => query.includes(pattern))) {
      comparisonSubject = term.subject;
      break;
    }
  }
  
  // Specific handling for common comparisons
  if (query.includes("cloud") && (query.includes("on-premise") || query.includes("on premise"))) {
    return {
      message: "Cloud deployment offers lower upfront costs, automatic updates, and anytime-anywhere access, while on-premise provides more control over data and customizations. Cloud implementations are typically 30-40% faster with predictable subscription costs, but on-premise can be more cost-effective long-term for certain businesses. Many clients choose our hybrid approach, combining cloud accessibility with on-premise security for sensitive functions. We can provide a detailed comparison tailored to your specific requirements and budget constraints.",
      source: "Deployment Options Comparison",
      suggestedQuestions: [
        "What's the implementation timeline difference?",
        "How does security compare between cloud and on-premise?",
        "Tell me about your hybrid approach"
      ]
    };
  }
  
  if ((query.includes("sap") || query.includes("business one") || query.includes("b1")) && query.includes("hana")) {
    return {
      message: "SAP Business One can run on either the traditional SQL database or the HANA platform. With HANA, you gain significant performance advantages (up to 100x faster reporting), real-time analytics capabilities, advanced search functionality, and predictive features not available in the SQL version. While HANA requires more powerful hardware and has a higher license cost, the performance benefits and advanced capabilities deliver significant ROI for data-intensive businesses. Companies handling large transaction volumes or requiring real-time analytics see the most substantial benefits from HANA.",
      source: "SAP Technology Comparison",
      suggestedQuestions: [
        "What's the cost difference between SQL and HANA?",
        "Can we migrate from SQL to HANA later?",
        "What businesses benefit most from HANA?"
      ]
    };
  }
  
  // Generic comparison response
  return {
    message: `When comparing different ${comparisonSubject}, it's important to consider your specific business requirements, budget constraints, and long-term IT strategy. We offer comprehensive comparison assessments to help you evaluate the pros and cons of each option based on your unique needs. Our consultants can provide detailed feature comparisons, cost analyses, and implementation considerations to guide your decision-making process.`,
    suggestedQuestions: [
      `What are the main differences between ${comparisonSubject}?`,
      `Which ${comparisonSubject} would you recommend for my business?`,
      `Can you share case studies comparing ${comparisonSubject}?`
    ]
  };
}

/**
 * Generates a smart fallback response when no good match is found
 */
function generateSmartFallbackResponse(query: string, entities: string[]): ChatbotResponse {
  // If we detected entities, provide a partial response based on those
  if (entities.length > 0) {
    const relevantEntities = entities.slice(0, 2).join(" and ");
    
    return {
      message: `I notice you're asking about ${relevantEntities}. While I don't have a specific answer to your exact question, I can provide information about these topics. Would you like to know more about any specific aspect of ${relevantEntities}, or would you prefer to speak with one of our specialists for more detailed information?`,
      suggestedQuestions: [
        `Tell me more about ${entities[0]}`,
        entities.length > 1 ? `What about ${entities[1]}?` : "What services do you offer?",
        "I'd like to speak with a specialist"
      ]
    };
  }
  
  // Check for question words to provide better guidance
  if (query.match(/^(what|how|why|when|where|who|can|do|does|is|are|which|will)/i)) {
    return {
      message: "I'm not sure I fully understand your question. To help you better, could you provide more details or rephrase your question? Alternatively, you might find it helpful to explore some of our main service areas below, or we can connect you with a specialist for more personalized assistance.",
      suggestedQuestions: [
        "Tell me about SAP Business One",
        "Explain your automation solutions",
        "How does your implementation process work?"
      ]
    };
  }
  
  // Generic fallback for very short or ambiguous queries
  if (query.split(" ").length < 3) {
    return {
      message: "I'd like to help you with that. Could you provide a bit more detail about what specific information you're looking for? This will help me give you the most relevant answer.",
      suggestedQuestions: [
        "What services does Atlas Technosoft offer?",
        "Tell me about your SAP solutions",
        "How can I contact your team?"
      ]
    };
  }
  
  // Default fallback with general info
  return {
    message: "I don't have a specific answer to that question yet. We're constantly improving our knowledge base to better assist you. In the meantime, would you like to explore our main service offerings, or would you prefer to connect with one of our specialists who can provide more detailed information?",
    suggestedQuestions: [
      "What are your main services?",
      "Connect me with a specialist",
      "Tell me about Atlas Technosoft"
    ]
  };
}

/**
 * Detects negative sentiment or complaint language in queries
 */
function containsNegativeWords(query: string): boolean {
  const negativeTerms = [
    "problem", "issue", "error", "bug", "wrong", "not working",
    "failed", "failure", "broken", "crash", "disappointed", 
    "unhappy", "dissatisfied", "complaint", "frustrat", "terrible",
    "bad", "poor", "awful", "horrible", "doesn't work", "doesnt work",
    "doesn't function", "doesn't run", "not functioning"
  ];
  
  const queryLower = query.toLowerCase();
  return negativeTerms.some(term => queryLower.includes(term));
}

/**
 * Detects greeting patterns in user queries
 */
function isGreeting(query: string): boolean {
  const greetingPatterns = [
    /^(hi|hello|hey|greetings|good (morning|afternoon|evening|day))(\s|$)/i,
    /^(what's up|howdy|hola|namaste|yo)(\s|$)/i,
    /^(nice to meet you|pleasure to meet you)(\s|$)/i,
    /^(good (morning|afternoon|evening|day))(\s|$)/i,
    /^(hi|hello|hey) there(\s|$)/i
  ];
  
  return greetingPatterns.some(pattern => pattern.test(query.trim()));
}

/**
 * Detects farewell patterns in user queries
 */
function isFarewell(query: string): boolean {
  const farewellPatterns = [
    /^(bye|goodbye|farewell|see you|cya|adios|later|take care)(\s|$)/i,
    /^(have a (good|great|nice) (day|evening|night|weekend))(\s|$)/i,
    /^(i('ll| will) be going now)(\s|$)/i,
    /^(end|close|exit|quit|terminate)( the chat| chat| conversation)?(\s|$)/i,
    /^(that('s| is) all( for now)?|nothing else)(\s|$)/i
  ];
  
  return farewellPatterns.some(pattern => pattern.test(query.trim()));
}

/**
 * Detects thank you patterns in user queries
 */
function isThankYou(query: string): boolean {
  const thankYouPatterns = [
    /^(thanks|thank you|thx|ty|thank u|thankyou)(\s|$)/i,
    /^(appreciate (it|that|your help|your assistance))(\s|$)/i,
    /^(that was helpful|you've been helpful|you've been great)(\s|$)/i,
    /^(much appreciated|greatly appreciated)(\s|$)/i,
    /^(thank you for your help)(\s|$)/i
  ];
  
  return thankYouPatterns.some(pattern => pattern.test(query.trim()));
}

/**
 * Determines if a web search would be more appropriate for the query
 */
function shouldUseWebSearch(query: string, entities: string[], _context?: string[]): boolean {
  // Keywords that indicate we should prefer web search
  const webSearchKeywords = [
    'latest', 'newest', 'recent', 'update', 'news', 
    'release', 'version', 'feature', 'comparison', 'versus', 'vs',
    'review', 'opinion', 'rating', 'best practice', 'how to',
    'tutorial', 'guide', 'documentation', 'api', 'spec',
    'technical details', 'integration with', 'alternative to'
  ];
  
  // Product or technical terms we might want fresh information about
  const productTerms = [
    'sap s/4', 's/4hana', 'sap fiori', 'sap ariba', 'sap successfactors',
    'sap concur', 'sap fieldglass', 'sap hybris', 'sap btp', 
    'business technology platform', 'uipath studio', 'uipath orchestrator',
    'uipath ai center', 'uipath apps', 'uipath process mining',
    'rpa trends', 'hyperautomation', 'intelligent document processing',
    'process discovery', 'task mining', 'attended automation',
    'unattended automation', 'citizen development'
  ];
  
  // Check if query contains specific web search indicators
  const hasWebSearchIndicator = webSearchKeywords.some(keyword => 
    query.toLowerCase().includes(keyword.toLowerCase())
  );
  
  // Check if query asks about products we don't cover in knowledge base
  const isAboutExternalProduct = productTerms.some(term => 
    query.toLowerCase().includes(term.toLowerCase())
  );
  
  // Current year mentions often indicate need for fresh information
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const hasYearReference = query.includes(currentYear.toString()) || 
                          query.includes(nextYear.toString());
  
  // If explicitly asking for latest information or about a specific product
  // that's not well covered in our knowledge base
  return (hasWebSearchIndicator && (entities.length > 0 || isAboutExternalProduct)) || 
         (isAboutExternalProduct && hasYearReference);
}

/**
 * Determines if we should try web search as a fallback when no KB match is found
 */
function shouldTryWebSearchAsFallback(query: string, entities: string[]): boolean {
  // Technical or specific product queries that might not be in our KB
  const technicalTerms = [
    'api', 'sdk', 'integration', 'configuration', 'setup',
    'installation', 'deployment', 'architecture', 'requirement',
    'specification', 'version', 'interface', 'compatibility'
  ];
  
  // Is this a specific technical question?
  const isTechnicalQuestion = technicalTerms.some(term => 
    query.toLowerCase().includes(term.toLowerCase())
  );
  
  // Does it sound like a complex or detailed query? (longer, multiple entities)
  const isComplexQuery = query.length > 60 && entities.length >= 2;
  
  // Does it look like a question we wouldn't have in our knowledge base?
  return isTechnicalQuestion || isComplexQuery;
}

/**
 * Validate response factuality against the query
 */
function validateFactuality(response: string, query: string, matchedEntities: string[]): {
  isFactual: boolean,
  confidence: number,
  issues?: string[]
} {
  // Start with assumption that response is factual
  let isFactual = true;
  let confidence = 0.7; // Default medium-high confidence
  const issues: string[] = [];
  
  // Check for contradictions between query and response
  const queryLower = query.toLowerCase();
  const responseLower = response.toLowerCase();
  
  // Check for presence of at least some entities in response if query has entities
  if (matchedEntities.length > 0) {
    const entitiesInResponse = matchedEntities.filter(entity => 
      responseLower.includes(entity.toLowerCase())
    );
    
    if (entitiesInResponse.length === 0) {
      isFactual = false;
      confidence -= 0.3;
      issues.push("Response doesn't address entities mentioned in query");
    } else {
      // Boost confidence for each matched entity in response
      confidence += Math.min(0.2, entitiesInResponse.length * 0.05);
    }
  }
  
  // NEW: Check for topic relevance based on semantic fields
  const topicRelevance = assessTopicRelevance(query, response);
  if (topicRelevance < 0.5) {
    isFactual = false;
    confidence -= 0.25;
    issues.push("Response topic appears unrelated to query");
  } else if (topicRelevance > 0.8) {
    // Boost confidence for highly relevant responses
    confidence += 0.1;
  }

  // Check if response is making claims contrary to the query
  const negationPatterns = [
    { query: "is sap", response: "sap is not", contradicts: true },
    { query: "do you offer", response: "we do not offer", contradicts: true },
    { query: "can you", response: "we cannot", contradicts: true },
    { query: "how much", response: "no cost", contradicts: false }, // Not all patterns are contradictions
    { query: "price", response: "free", contradicts: false },
    { query: "implementation time", response: "immediate", contradicts: true },
    // NEW: Additional contradiction patterns
    { query: "where", response: "not located", contradicts: true },
    { query: "when", response: "no specific time", contradicts: true },
    { query: "contact", response: "cannot contact", contradicts: true },
    { query: "industry", response: "do not serve", contradicts: true },
    { query: "support", response: "no support", contradicts: true }
  ];
  
  for (const pattern of negationPatterns) {
    if (queryLower.includes(pattern.query) && 
        responseLower.includes(pattern.response) && 
        pattern.contradicts) {
      isFactual = false;
      confidence -= 0.2;
      issues.push("Response contradicts query premise");
      break;
    }
  }
  
  // NEW: Check for factual consistency about Atlas Technosoft
  // Critical company facts that should always be stated correctly
  const companyFacts = [
    { pattern: /atlas.+founded in (\d{4})/i, correctValue: null, verifyCb: (year: string) => {
      const yearNum = parseInt(year, 10);
      return !(yearNum < 1990 || yearNum > new Date().getFullYear()); // Reasonable range check
    }},
    { pattern: /head\s*office.+mumbai/i, correctValue: true, verifyCb: null }, // Head office is in Mumbai
    { pattern: /(office|located).+borivali/i, correctValue: true, verifyCb: null }, // Branch in Borivali
    { pattern: /(over|more than) (\d+) employees/i, correctValue: null, verifyCb: (count: string) => {
      const employees = parseInt(count, 10);
      return employees < 1000; // Reasonableness check - avoid exaggeration
    }},
    { pattern: /certified.+SAP.+partner/i, correctValue: true, verifyCb: null }, // SAP partnership is correct
    { pattern: /(global|worldwide|international).+offices/i, correctValue: false, verifyCb: null } // Don't claim global offices
  ];

  for (const fact of companyFacts) {
    const match = responseLower.match(fact.pattern);
    if (match) {
      if (fact.correctValue === false) {
        // This is an incorrect claim
        isFactual = false;
        confidence -= 0.3;
        issues.push("Response contains inaccurate company information");
      } else if (fact.correctValue === true) {
        // This is a correct claim, slightly increase confidence
        confidence += 0.05;
      } else if (fact.verifyCb && match[1]) {
        // Verify through callback
        if (!fact.verifyCb(match[1])) {
          isFactual = false;
          confidence -= 0.25;
          issues.push("Response contains potentially exaggerated or incorrect numeric data");
        }
      }
    }
  }
  
  // Look for hallmarks of fabricated information
  const fabricationSignals = [
    "approximately", "around", "estimated", "roughly", 
    "I believe", "I think", "might be", "could be", "may have", 
    "possibly", "potentially", "likely",
    // NEW: Additional fabrication signals
    "probably", "perhaps", "supposedly", "apparently",
    "as far as I know", "to my knowledge", "if I recall correctly"
  ];
  
  const fabricationCount = fabricationSignals.filter(signal => 
    responseLower.includes(signal)
  ).length;
  
  if (fabricationCount >= 2) {
    confidence -= 0.1 * fabricationCount;
    issues.push("Response contains uncertain language");
  }
  
  // NEW: Detect overly superlative language
  const superlativeSignals = [
    "best", "greatest", "most advanced", "leading", "top",
    "world-class", "unparalleled", "unmatched", "revolutionary",
    "cutting-edge", "state-of-the-art", "groundbreaking",
    "one-of-a-kind", "unrivaled", "superior"
  ];
  
  const superlativeCount = superlativeSignals.filter(signal => 
    responseLower.includes(signal)
  ).length;
  
  if (superlativeCount >= 2) {
    confidence -= 0.05 * superlativeCount;
    issues.push("Response contains potentially exaggerated marketing language");
  }
  
  // Make sure the response isn't completely off-topic
  const queryParts = queryLower
    .replace(/[.,?!;:(){}[\]]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 4);
  
  if (queryParts.length > 0) {
    const topicAlignment = queryParts.filter(part => 
      responseLower.includes(part)
    ).length / queryParts.length;
    
    if (topicAlignment < 0.2 && queryParts.length > 2) {
      isFactual = false;
      confidence -= 0.25;
      issues.push("Response appears unrelated to query");
    }
  }
  
  // NEW: Alert on suspicious exact numbers (often made up)
  const suspiciousNumberPatterns = [
    /increased.+by (\d{2,3})%/i, 
    /(\d{2,3})% improvement/i,
    /(\d{2,3})% more efficient/i,
    /save.+(\d{2,3})%/i,
    /over (\d{4,}) clients/i,
    /more than (\d{3,}) projects/i
  ];
  
  for (const pattern of suspiciousNumberPatterns) {
    if (pattern.test(responseLower)) {
      confidence -= 0.15;
      issues.push("Response contains precise statistics that may need verification");
      break;
    }
  }
  
  // Cap confidence between 0.1 and 1.0
  confidence = Math.max(0.1, Math.min(1.0, confidence));
  
  return {
    isFactual,
    confidence,
    issues: issues.length > 0 ? issues : undefined
  };
}

/**
 * Assesses topic relevance between query and response
 */
function assessTopicRelevance(query: string, response: string): number {
  // Simple implementation based on keyword matching
  // A more sophisticated implementation would use embeddings/semantic similarity
  
  // Extract key terms from query (excluding common words)
  const queryTerms = query.toLowerCase()
    .replace(/[.,?!;:(){}[\]]/g, " ")
    .split(/\s+/)
    .filter(term => term.length > 3 && !["what", "when", "where", "which", "about", "tell", "more", "does", "this", "that", "with", "have", "from"].includes(term));
    
  // Count unique terms that appear in response
  const responseLower = response.toLowerCase();
  let matchCount = 0;
  
  for (const term of queryTerms) {
    if (responseLower.includes(term)) {
      matchCount++;
    }
  }
  
  // Calculate relevance score (0-1)
  let relevanceScore = queryTerms.length > 0 ? 
    matchCount / queryTerms.length : 0.5;
    
  // Map generic topics for business context
  const businessTopics = {
    "sap": ["business one", "b1", "erp", "hana", "implementation", "module"],
    "automation": ["rpa", "robot", "process", "workflow", "efficiency", "uipath"],
    "service": ["support", "help", "assist", "package", "tier", "response time"],
    "contact": ["email", "phone", "call", "reach", "office", "address"],
    "implementation": ["process", "methodology", "approach", "timeline", "deploy", "project"],
    "industry": ["manufacturing", "healthcare", "retail", "finance", "construction", "shipping"]
  };
  
  // Check if we're discussing a specific business topic and boost relevance if response includes related terms
  for (const [topic, relatedTerms] of Object.entries(businessTopics)) {
    if (query.toLowerCase().includes(topic)) {
      // Check how many related terms are in the response
      const topicTermsInResponse = relatedTerms.filter(term => responseLower.includes(term)).length;
      
      // If response has relevant topic terms, boost the relevance score
      if (topicTermsInResponse > 0) {
        const topicRelevanceBoost = Math.min(0.2, topicTermsInResponse * 0.05);
        relevanceScore = Math.min(1.0, relevanceScore + topicRelevanceBoost);
      }
    }
  }
  
  return relevanceScore;
}

/**
 * Calculate string similarity based on levenshtein distance
 */
function calculateStringSimilarity(s1: string, s2: string): number {
  if (!s1 || !s2) return 0;
  
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1.0;
  
  // Calculate distance
  const distance = levenshteinDistance(longer.toLowerCase(), shorter.toLowerCase());
  // Convert distance to similarity (0 = completely different, 1 = identical)
  return (longer.length - distance) / longer.length;
}

// Enhanced tokenization function for better text processing
function tokenize(text: string): string[] {
  if (!text) return [];
  
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ')     // Normalize whitespace
    .trim()
    .split(' ')
    .filter(token => token.length > 1 && !ChatbotConfig.stopWords.includes(token));
}

// Check if two string arrays have common elements
function hasCommonElements(arr1: string[], arr2: string[]): boolean {
  return arr1.some(item => arr2.includes(item));
}

// Enhanced function to find best matching entries in knowledge base
function findBestMatchingEntries(
  query: string, 
  context?: ConversationContext | string[]
): { 
  entries: KnowledgeBaseEntry[], 
  confidenceScores: number[],
  combinedScores: number[],
  contextMultipliers: number[] 
} {
  const queryTokens = tokenize(query);
  
  // Calculate match scores for each knowledge base entry
  const results = knowledgeBase.map((entry) => {
    // Calculate trigger match score
    let bestTriggerSimilarity = 0;
    for (const trigger of entry.triggers) {
      const similarity = calculateStringSimilarity(query, trigger);
      bestTriggerSimilarity = Math.max(bestTriggerSimilarity, similarity);
    }
    
    // Calculate keyword match score
    const entryKeywords = entry.keywords;
    const keywordMatches = queryTokens.filter(token => entryKeywords.includes(token));
    const keywordMatchScore = queryTokens.length > 0 
      ? keywordMatches.length / queryTokens.length 
      : 0;
      
    // Calculate exact phrase match score
    const phraseMatchScore = entry.triggers.some(trigger => 
      query.toLowerCase().includes(trigger.toLowerCase())) ? 0.5 : 0;
      
    // Base confidence score is weighted combination of different matching methods
    const confidenceScore = (
      bestTriggerSimilarity * 0.5 + 
      keywordMatchScore * 0.3 + 
      phraseMatchScore * 0.2
    );
    
    // Context boost calculation
    let contextMultiplier = 1;
    
    // If we have context from previous conversation
    if (context) {
      let previousMessages: {role?: string; content: string}[] = [];
      
      // Handle both string[] and ConversationContext
      if (Array.isArray(context)) {
        previousMessages = context.map(msg => ({ content: msg }));
      } else if (context.previousMessages) {
        previousMessages = context.previousMessages;
      }
      
      // Get the most recent messages (up to 3)
      const recentMessages = previousMessages
        .slice(-3)
        .map(msg => tokenize(msg.content));
      
      // Check if recent messages contain keywords related to this entry
      const hasRelatedKeywords = recentMessages.some(msgTokens => 
        hasCommonElements(msgTokens, entry.keywords));
      
      if (hasRelatedKeywords) {
        contextMultiplier = 1.5;
      }
      
      // Special handling for follow-up questions
      const lastUserMessage = previousMessages
        .filter(msg => msg.role === 'user')
        .pop();
        
      if (lastUserMessage) {
        // Check for follow-up question patterns
        const followUpPatterns = [
          /^(what|how|why|when|where|who|which)/i,
          /^(can|could) you/i,
          /^(tell me|explain)/i,
          /^(and|also|what about)/i
        ];
        
        const isLikelyFollowUp = followUpPatterns.some(pattern => 
          pattern.test(query));
          
        // If it looks like a follow-up question, boost entries related to previous message
        if (isLikelyFollowUp) {
          const lastMessageTokens = tokenize(lastUserMessage.content);
          const keywordOverlap = entry.keywords.filter(k => 
            lastMessageTokens.includes(k)).length;
            
          if (keywordOverlap > 0) {
            contextMultiplier = 1.8;
          }
        }
      }
    }
    
    // Apply context multiplier to get final combined score
    const combinedScore = confidenceScore * contextMultiplier;
    
    return { 
      entry, 
      confidenceScore, 
      contextMultiplier,
      combinedScore 
    };
  });
  
  // Sort by combined score descending
  results.sort((a, b) => b.combinedScore - a.combinedScore);
  
  // Extract sorted entries and scores
  const entries = results.map(r => r.entry);
  const _confidenceScores = results.map(r => r.confidenceScore);
  const contextMultipliers = results.map(r => r.contextMultiplier);
  const combinedScores = results.map(r => r.combinedScore);
  
  return { entries, confidenceScores: _confidenceScores, combinedScores, contextMultipliers };
}

// Analyze feedback to improve responses
export function analyzeFeedback(feedback: Feedback, _response: ChatbotResponse): void {
  // In a production environment, this would log feedback to a database
  // and potentially be used to improve the knowledge base or response engine
  console.log('Feedback received:', feedback);
}

// Main function to generate chatbot responses
export function generateResponse(
  query: string,
  context?: ConversationContext,
  _maxResults: number = 1
): ChatbotResponse {
  // First try rule-based responses
  const contextMessages = extractMessagesFromContext(context);
  const ruleBasedResponse = executeRules(query, contextMessages);
  if (ruleBasedResponse) {
    return ruleBasedResponse;
  }
  
  // Process the query and context to find the best matches
  const { 
    entries, 
    combinedScores 
  } = findBestMatchingEntries(query, context);
  
  // Get the best match
  const bestMatch = entries[0];
  const bestMatchConfidence = combinedScores[0];
  
  // Check if the best match exceeds our confidence threshold
  if (bestMatchConfidence >= ChatbotConfig.confidenceThreshold) {
    // Prepare suggested follow-up questions based on related entries
    const suggestedQuestions = generateSuggestedQuestions(entries.slice(1, 4), query);
    
    return {
      message: bestMatch.response,
      confidence: bestMatchConfidence,
      source: bestMatch.source,
      suggestedQuestions,
    };
  }
  
  // If we're in a conversation and have low confidence, try to be helpful
  if (context?.previousMessages?.length && bestMatchConfidence >= 0.3) {
    return {
      message: bestMatch.response,
      confidence: bestMatchConfidence,
      source: bestMatch.source,
      suggestedQuestions: [
        "Would you like to know more about our services?",
        "Can I help you with something else?",
        "Would you like to speak to a representative?"
      ],
      needsClarification: true
    };
  }
  
  // If we have some reasonable matches but below threshold, offer them as suggestions
  if (entries.length > 0 && combinedScores[0] >= 0.25) {
    const topEntries = entries.slice(0, 3);
    const topics = topEntries.map(entry => {
      // Extract a topic from the entry
      const firstTrigger = entry.triggers[0];
      return firstTrigger.length > 30 
        ? firstTrigger.substring(0, 30) + '...' 
        : firstTrigger;
    });
    
    return {
      message: `I'm not quite sure what you're asking about. Were you interested in any of these topics?`,
      confidence: combinedScores[0],
      needsClarification: true,
      suggestedQuestions: topics.map(topic => `Tell me about ${topic}`),
    };
  }
  
  // Fallback for very low confidence
  return {
    message: ChatbotConfig.fallbackResponses[
      Math.floor(Math.random() * ChatbotConfig.fallbackResponses.length)
    ],
    confidence: combinedScores[0] || 0,
    needsClarification: true,
    suggestedQuestions: [
      "What SAP solutions do you offer?",
      "Tell me about your automation solutions",
      "How can I contact your team?"
    ],
  };
}

// Generate contextually relevant suggested questions
function generateSuggestedQuestions(
  relatedEntries: KnowledgeBaseEntry[], 
  originalQuery: string
): string[] {
  const questions: string[] = [];
  
  // Extract query intent and main subject
  const queryTokens = tokenize(originalQuery);
  
  // Add questions from related entries
  relatedEntries.forEach(entry => {
    // Use the first trigger as a base for suggestion if it's in question form
    const triggers = entry.triggers.filter(t => t.includes('?'));
    
    if (triggers.length > 0) {
      questions.push(triggers[0]);
    } else if (entry.triggers.length > 0) {
      // Convert first trigger to a question if not already
      const trigger = entry.triggers[0];
      questions.push(`Tell me about ${trigger}`);
    }
  });
  
  // Add some general follow-up questions based on the query subject
  const subjectMatches = knowledgeBase.filter(entry => 
    entry.keywords.some(k => queryTokens.includes(k))
  );
  
  if (subjectMatches.length > 0) {
    // Find a common subject
    const commonKeywords = subjectMatches.flatMap(entry => entry.keywords)
      .filter(keyword => queryTokens.includes(keyword))
      .reduce((counts, keyword) => {
        counts[keyword] = (counts[keyword] || 0) + 1;
        return counts;
      }, {} as Record<string, number>);
      
    // Find most common subject keyword
    let mainSubject = '';
    let maxCount = 0;
    
    Object.entries(commonKeywords).forEach(([keyword, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mainSubject = keyword;
      }
    });
    
    if (mainSubject) {
      if (mainSubject === 'sap' || mainSubject === 'business') {
        questions.push("What are the latest features in SAP Business One?");
      } else if (mainSubject === 'automation' || mainSubject === 'rpa') {
        questions.push("How does your RPA solution improve efficiency?");
      } else if (mainSubject === 'implementation' || mainSubject === 'service') {
        questions.push("What's your implementation methodology?");
      }
    }
  }
  
  // Add a contact option if appropriate
  if (originalQuery.toLowerCase().includes('help') || 
      originalQuery.toLowerCase().includes('support') || 
      originalQuery.toLowerCase().includes('contact') ||
      originalQuery.toLowerCase().includes('expert')) {
    questions.push("I'd like to speak with a representative");
  }
  
  // Ensure we have at least some default questions if nothing matched
  if (questions.length === 0) {
    questions.push(
      "What services does Atlas Technosoft offer?",
      "Tell me about your client success stories",
      "How can Atlas Technosoft help my business?"
    );
  }
  
  // Return up to 3 unique questions
  const uniqueQuestions = Array.from(new Set(questions));
  return uniqueQuestions.slice(0, 3);
}