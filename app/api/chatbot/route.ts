import { NextRequest, NextResponse } from "next/server";
import { getResponseFromKnowledgeBase } from "@/lib/chatbot/response-engine";
import { ChatbotQuery, ChatbotResponse } from "@/lib/chatbot/types";
import { validateUserInput, generateRequestId } from "@/lib/utils/validation";

// Process timeout in milliseconds (5 seconds instead of 3 to allow for more processing time)
const PROCESS_TIMEOUT = 5000;

// Define an interface for metadata
interface ChatbotMetadata {
  url?: string;
  userAgent?: string;
  sessionSource?: string;
  pageContext?: string;
  [key: string]: unknown;
}

// Track errors for monitoring
interface ErrorTracking {
  count: number;
  lastError: Date;
  consecutiveTimeouts: number;
  lastReset: Date;
}

// Error tracking to prevent cascading failures
const errorTracking: ErrorTracking = {
  count: 0,
  lastError: new Date(),
  consecutiveTimeouts: 0,
  lastReset: new Date()
};

// Reset error counts hourly
setInterval(() => {
  errorTracking.count = 0;
  errorTracking.consecutiveTimeouts = 0;
  errorTracking.lastReset = new Date();
  console.log("Chatbot error tracking reset");
}, 3600000); // Reset every hour

export async function POST(request: NextRequest) {
  // Circuit breaker pattern - prevent cascading failures
  if (errorTracking.count > 50 || errorTracking.consecutiveTimeouts > 5) {
    const minutesSinceLastError = (new Date().getTime() - errorTracking.lastError.getTime()) / 60000;
    
    // If errors are still happening frequently, trigger circuit breaker
    if (minutesSinceLastError < 5) {
      console.error("Chatbot circuit breaker triggered - too many errors");
      return NextResponse.json(
        {
          message: "Our chatbot service is currently experiencing high demand. Please try again in a few minutes or contact us directly.",
          error: "service_overloaded",
          suggestedQuestions: [
            "Email the support team",
            "Visit our contact page",
            "Call our support line"
          ]
        },
        { status: 503 }
      );
    } else {
      // Reset if it's been a while since the last error
      errorTracking.count = 0;
      errorTracking.consecutiveTimeouts = 0;
    }
  }

  try {
    // Parse the request body
    const body = await request.json().catch(error => {
      console.error("Error parsing request body:", error);
      throw new Error("Invalid request format");
    });
    
    const { message, context, sessionId, metadata } = body as ChatbotQuery;
    
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }
    
    // Input validation - ensure message isn't just whitespace
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }
    
    // Validate message length to prevent abuse
    if (trimmedMessage.length > 500) {
      return NextResponse.json(
        { error: "Message exceeds maximum length of 500 characters" },
        { status: 400 }
      );
    }
    
    // Set up a timeout for the response
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        errorTracking.consecutiveTimeouts++;
        errorTracking.lastError = new Date();
        reject(new Error("Request timed out"));
      }, PROCESS_TIMEOUT);
    });
    
    // Process the request with a timeout
    const responsePromise = processRequest(trimmedMessage, context, sessionId, metadata);
    
    // Race between the processing and the timeout
    const response = await Promise.race([responsePromise, timeoutPromise]) as ChatbotResponse;
    
    // Reset consecutive timeout counter on success
    errorTracking.consecutiveTimeouts = 0;
    
    // Add response timestamp and request ID for tracking
    const enhancedResponse = {
      ...response,
      timestamp: new Date().toISOString(),
      requestId: generateRequestId()
    };
    
    return NextResponse.json(enhancedResponse);
  } catch (error) {
    // Track the error
    errorTracking.count++;
    errorTracking.lastError = new Date();
    
    console.error("Error processing chatbot request:", error instanceof Error ? error.message : "Unknown error");
    
    // Include error stack in development only
    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      console.error(error.stack);
    }
    
    // Handle timeout specifically
    if (error instanceof Error && error.message === "Request timed out") {
      return NextResponse.json(
        { 
          message: "I'm taking a bit longer than usual to process your request. Please try again in a moment.",
          error: "timeout",
          suggestedQuestions: [
            "What services do you offer?",
            "Contact support team",
            "Learn about SAP Business One"
          ]
        },
        { status: 408 }
      );
    }
    
    // Handle other types of errors
    let errorMessage = "Sorry, I encountered an error processing your request. Please try again.";
    let errorType = "internal_error";
    
    if (error instanceof Error) {
      if (error.message.includes("knowledge base") || error.message.includes("match")) {
        errorMessage = "I couldn't find a good match for your question. Could you try rephrasing it?";
        errorType = "no_match";
      } else if (error.message.includes("format") || error.message.includes("invalid")) {
        errorMessage = "I couldn't understand the format of your request. Could you try again?";
        errorType = "format_error";
      } else if (error.message.includes("Invalid request format")) {
        errorMessage = "There was a problem with your request format. Please try again with a simpler question.";
        errorType = "invalid_request";
      }
    }
    
    return NextResponse.json(
      { 
        message: errorMessage,
        error: errorType,
        suggestedQuestions: [
          "What services do you offer?",
          "Tell me about Atlas Technosoft",
          "What industries do you serve?"
        ],
        timestamp: new Date().toISOString()
      },
      { status: errorType === "invalid_request" ? 400 : 500 }
    );
  }
}

async function processRequest(
  message: string, 
  context?: string[], 
  sessionId?: string,
  metadata?: ChatbotMetadata
) {
  try {
    // Start request processing timing for performance monitoring
    const startTime = Date.now();
    
    // Validate and normalize context
    let processedContext = context;
    if (context && Array.isArray(context)) {
      // Filter out empty strings and limit context length
      processedContext = context
        .filter(item => typeof item === 'string' && item.trim().length > 0)
        .slice(-5); // Only keep the 5 most recent messages for context
    }
    
    // Enrich metadata with additional information for better tracking
    const enrichedMetadata = {
      ...metadata,
      timestamp: new Date().toISOString(),
      processId: generateRequestId(),
    };
    
    // Log request for analytics (optional)
    if (sessionId) {
      try {
        await logRequest(message, sessionId, enrichedMetadata);
      } catch (logError) {
        // Non-critical error, just log and continue
        console.error("Error logging request:", logError instanceof Error ? logError.message : "Unknown error");
      }
    }
    
    // Clean up the message - remove excessive whitespace, normalize characters
    const cleanedMessage = message.trim()
      .replace(/\s+/g, ' ')               // normalize whitespace
      .replace(/[\u2018\u2019]/g, "'")    // smart quotes to regular quote
      .replace(/[\u201C\u201D]/g, '"');   // smart double quotes to regular double quotes
    
    // Validate message - reject potentially harmful inputs
    validateUserInput(cleanedMessage);
    
    // Get response from knowledge base with better error handling
    const kbResponse = await getResponseFromKnowledgeBase(cleanedMessage, processedContext)
      .catch(error => {
        console.error("Error getting response from knowledge base:", error instanceof Error ? error.message : "Unknown error");
        throw new Error("Failed to process query with knowledge base");
      });
    
    // Check response confidence - if below certain threshold, retry with more context
    if (kbResponse.confidence !== undefined && kbResponse.confidence < 0.4) {
      console.log("Low confidence response detected - trying with additional processing");
      
      // Try to rephrase query to get better matching
      const enhancedQuery = enhanceUserQuery(cleanedMessage);
      
      if (enhancedQuery !== cleanedMessage) {
        console.log("Enhanced query:", enhancedQuery);
        
        // Try knowledge base again with enhanced query
        const enhancedKbResponse = await getResponseFromKnowledgeBase(enhancedQuery, processedContext)
          .catch(error => {
            console.error("Error with enhanced query:", error instanceof Error ? error.message : "Unknown error");
            return kbResponse; // Fall back to original response
          });
        
        // Use enhanced response if confidence is higher
        if (enhancedKbResponse.confidence !== undefined && 
            enhancedKbResponse.confidence > (kbResponse.confidence || 0)) {
          
          // Log timing information
          logPerformanceTiming("chatbot_enhanced_response", startTime);
          
          return verifyResponseAccuracy(enhancedKbResponse, cleanedMessage);
        }
      }
    }
    
    // Check if we should use web search instead of KB response
    if (kbResponse.shouldUseWebSearch) {
      try {
        console.log("Using web search for query:", kbResponse.searchQuery || cleanedMessage);
        
        // Determine search query - use the optimized search query if available, otherwise original message
        const searchQuery = kbResponse.searchQuery || cleanedMessage;
        
        // Add domain context to ensure results are more relevant
        const enhancedSearchQuery = `Atlas Technosoft ${searchQuery}`;
        
        // Call web search API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);
        
        try {
          const webSearchResponse = await fetch("/api/chatbot/web-search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              query: enhancedSearchQuery,
              context: processedContext 
            }),
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!webSearchResponse.ok) {
            console.error("Web search failed:", webSearchResponse.status);
            // Fall back to the KB response if web search fails
            return verifyResponseAccuracy({
              ...kbResponse,
              message: `I tried to search for more information, but couldn't access external data sources. Based on what I know: ${kbResponse.message}`
            }, cleanedMessage);
          }
          
          // Process web search results
          const webResults = await webSearchResponse.json();
          if (webResults && webResults.message) {
            // Log timing information
            logPerformanceTiming("chatbot_web_search_response", startTime);
            
            return verifyResponseAccuracy({
              ...webResults,
              // Add confidence for tracking
              confidence: webResults.confidence || 0.6
            }, cleanedMessage);
          } else {
            // Fall back if web results are empty or invalid
            return verifyResponseAccuracy(kbResponse, cleanedMessage);
          }
        } catch (error) {
          clearTimeout(timeoutId);
          throw error;
        }
      } catch (error) {
        console.error("Error in web search:", error instanceof Error ? error.message : "Unknown error");
        // Fall back to KB response with an explanation
        return verifyResponseAccuracy({
          ...kbResponse,
          message: `I tried to search for the latest information, but encountered an issue. Based on what I know: ${kbResponse.message}`,
          error: "web_search_failed"
        }, cleanedMessage);
      }
    }
    
    // Validate the response to ensure it's accurate and complete
    const validatedResponse = validateResponse(kbResponse, message);
    
    // If there are no suggested questions in the response, generate them
    if (!validatedResponse.suggestedQuestions || validatedResponse.suggestedQuestions.length === 0) {
      try {
        const suggestedQuestions = generateSuggestedQuestions(validatedResponse.message, message);
        
        // Log timing information
        logPerformanceTiming("chatbot_standard_response", startTime);
        
        return verifyResponseAccuracy({
          ...validatedResponse,
          suggestedQuestions,
        }, cleanedMessage);
      } catch (error) {
        console.error("Error generating suggested questions:", error instanceof Error ? error.message : "Unknown error");
        // Continue without suggested questions if there's an error
        return verifyResponseAccuracy(validatedResponse, cleanedMessage);
      }
    }
    
    // Log timing information
    logPerformanceTiming("chatbot_standard_response", startTime);
    
    return verifyResponseAccuracy(validatedResponse, cleanedMessage);
  } catch (error) {
    console.error("Error in chatbot processing:", error instanceof Error ? error.message : "Unknown error");
    throw error;
  }
}

/**
 * Log performance timing for monitoring
 */
function logPerformanceTiming(eventName: string, startTime: number): void {
  const duration = Date.now() - startTime;
  console.log(`Performance timing: ${eventName} - ${duration}ms`);
  
  // In production, you would send this to your monitoring system
  try {
    fetch('/api/performance-metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        event: eventName, 
        duration, 
        timestamp: new Date().toISOString() 
      }),
      // Use AbortController to avoid hanging on errors
      signal: AbortController && new AbortController().signal
    }).catch(() => {}); // Ignore fetch errors - non-critical
  } catch {
    // Ignore - this is a non-critical operation
  }
}

/**
 * Log each request for analytics purposes
 */
async function logRequest(message: string, sessionId: string, metadata?: ChatbotMetadata) {
  try {
    // This could be implemented to write to a database, analytics service, etc.
    console.log(`Chatbot query [${sessionId}]: ${message}`);
    
    // Enhanced logging with metadata
    const logData = {
      timestamp: new Date().toISOString(),
      sessionId,
      message,
      metadata: metadata || {},
      url: metadata?.url || "unknown",
      userAgent: metadata?.userAgent || "unknown"
    };
    
    console.log("Chatbot analytics:", JSON.stringify(logData));
    
    // Example implementation for actual logging to a database would go here
    // Currently just logging to console for development purposes
  } catch (error) {
    // Non-critical error, just log and continue
    console.error("Error logging chatbot request:", error);
  }
}

/**
 * Enhance user query to improve matching with knowledge base
 */
function enhanceUserQuery(query: string): string {
  // Convert questions to statements
  let enhanced = query;
  
  // Remove question words and question marks at the beginning of the query
  enhanced = enhanced.replace(/^(what|how|when|where|which|who|why|can|do|does|is|are)\s+/i, '');
  enhanced = enhanced.replace(/^\?+\s*/i, '');
  
  // Add context keywords for common topics
  if (query.toLowerCase().includes('sap') && !query.toLowerCase().includes('business one')) {
    enhanced += ' business one';
  }
  
  if (query.toLowerCase().includes('automation') && !query.toLowerCase().includes('rpa')) {
    enhanced += ' rpa solutions';
  }
  
  return enhanced.trim();
}

/**
 * Validate and improve response quality
 */
function validateResponse(response: ChatbotResponse, originalQuery: string): ChatbotResponse {
  // Ensure response has a message
  if (!response.message || response.message.trim().length === 0) {
    return {
      message: "I'm not sure how to answer that question. Would you like to speak to a specialist who can help?",
      suggestedQuestions: [
        "What services does Atlas Technosoft offer?", 
        "Tell me about SAP Business One",
        "How can I contact support?"
      ],
      confidence: 0.3,
      factChecked: true
    };
  }
  
  // Check if factuality was already verified in the knowledge base
  if (response.factChecked) {
    // Check if there were factuality issues and add disclaimer if needed
    if (response.factualityIssues && response.factualityIssues.length > 0) {
      // Only add disclaimer if not already present
      if (!response.message.includes("specialist")) {
        response.message += " For the most accurate information tailored to your specific needs, I recommend speaking with one of our specialists.";
      }
      
      // Adjust confidence downward for issues
      if (response.confidence && response.confidence > 0.6) {
        response.confidence = 0.6;
      }
    }
    
    return response;
  }
  
  // Check for vague responses and enhance them
  const lowQualitySignals = [
    "I don't have specific information", 
    "I'm not sure", 
    "I don't know", 
    "not in my knowledge base"
  ];
  
  if (lowQualitySignals.some(signal => response.message.includes(signal))) {
    return {
      message: "I don't have enough information to provide a complete answer to your question. Would you like me to connect you with a specialist who can provide more detailed information?",
      suggestedQuestions: [
        "Connect with a specialist",
        "What related information can you share?",
        "Let me try a different question"
      ],
      confidence: 0.3,
      factChecked: true
    };
  }
  
  // Ensure the response is related to the query
  const queryKeywords = originalQuery.toLowerCase().split(/\s+/);
  const responseText = response.message.toLowerCase();
  
  const significantQueryWords = queryKeywords.filter(word => 
    word.length > 3 && !["what", "when", "where", "which", "how", "tell", "about", "more"].includes(word)
  );
  
  // Check if none of the significant query words appear in the response
  let potentiallyIrrelevant = false;
  if (significantQueryWords.length > 0) {
    const matchingQueryWords = significantQueryWords.filter(word => responseText.includes(word));
    
    // Calculate relevance as percentage of query words in response
    const relevanceScore = matchingQueryWords.length / significantQueryWords.length;
    
    // If less than 30% of important words are in the response, mark as potentially irrelevant
    if (relevanceScore < 0.3 && significantQueryWords.length > 2) {
      potentiallyIrrelevant = true;
    }
  }
  
  // Response seems unrelated
  if (potentiallyIrrelevant) {
    console.log("Potentially unrelated response detected");
    
    // For web search results, replace with a more transparent message
    if (response.isWebSearch) {
      return {
        ...response,
        message: "I couldn't find information that directly addresses your question. To get the most accurate answer, I'd recommend speaking with one of our specialists who can provide specific details tailored to your needs.",
        confidence: 0.3,
        factChecked: true,
        suggestedQuestions: [
          "Connect with a specialist",
          "What services does Atlas Technosoft offer?",
          "Tell me about your company"
        ]
      };
    }
    
    // For knowledge base results, add a disclaimer
    return {
      ...response,
      message: response.message + "\n\nIf this doesn't fully address your question, please let me know or I can connect you with one of our specialists for more specific information.",
      confidence: response.confidence ? Math.min(response.confidence, 0.5) : 0.5,
      factChecked: true
    };
  }
  
  // Mark response as fact checked
  return {
    ...response,
    factChecked: true
  };
}

// Generate suggested follow-up questions based on the response and query
function generateSuggestedQuestions(response: string, query: string): string[] {
  // Extracted topics are currently not used directly in this function
  // but will be used in future AI-driven question generation.
  // Keep this here as we'll use it in the next version.
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const __topics = extractTopics(response);
  
  // Generate relevant follow-up questions based on the topics
  const questions: string[] = [];
  
  if (response.includes("SAP") || query.includes("SAP")) {
    questions.push("What are the benefits of SAP Business One?");
    questions.push("How does SAP HANA improve performance?");
    questions.push("Do you offer SAP implementation services?");
  }
  
  if (response.includes("automation") || query.includes("automation")) {
    questions.push("What ROI can I expect from automation?");
    questions.push("How long does it take to implement RPA?");
    questions.push("Which processes are best for automation?");
  }
  
  if (response.includes("implementation") || query.includes("implement")) {
    questions.push("What's your implementation methodology?");
    questions.push("Do you provide training during implementation?");
    questions.push("What support is available after implementation?");
  }
  
  if (response.includes("pricing") || query.includes("cost") || query.includes("price")) {
    questions.push("Are there ongoing maintenance costs?");
    questions.push("Do you offer payment plans?");
    questions.push("What factors affect the total cost?");
  }
  
  if (response.includes("industry") || query.includes("industry")) {
    questions.push("What industry-specific solutions do you offer?");
    questions.push("Do you have experience in my industry?");
    questions.push("Can I see case studies from my industry?");
  }
  
  // Always offer contact options if the list is short
  if (questions.length < 2) {
    questions.push("How can I schedule a demo?");
    questions.push("Can I speak with a consultant?");
  }
  
  // If we still don't have enough questions, add general questions
  if (questions.length < 3) {
    questions.push("What makes Atlas Technosoft different?");
    questions.push("Do you offer support services?");
    questions.push("What are your customer success stories?");
  }
  
  // Limit to 3 questions maximum
  return questions
    .filter((question, index, self) => self.indexOf(question) === index) // Remove duplicates
    .slice(0, 3);
}

// Extract key topics from a string
function extractTopics(text: string): string[] {
  const keywords = [
    "SAP", "Business One", "HANA", "automation", "RPA", "implementation",
    "pricing", "support", "training", "cloud", "on-premise", "integration",
    "industry", "manufacturing", "healthcare", "retail", "distribution",
    "financial", "services", "professional", "UiPath", "migration"
  ];
  
  return keywords.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
}

/**
 * Final verification of response accuracy before sending to user
 * This function checks for serious issues and provides safe fallbacks
 */
function verifyResponseAccuracy(response: ChatbotResponse, originalQuery: string): ChatbotResponse {
  // Check for empty or problematic responses
  if (!response || !response.message || response.message.trim().length === 0) {
    return {
      message: "I'm unable to provide a complete answer to your question at this time. Would you like to speak with one of our specialists who can help?",
      suggestedQuestions: [
        "Connect me with a specialist",
        "What services does Atlas Technosoft offer?",
        "Tell me about your company"
      ],
      confidence: 0.3,
      factChecked: true
    };
  }
  
  // NEW: First check if this query is about critical company information
  const isCriticalInfoQuery = checkForCriticalInformationQuery(originalQuery);
  if (isCriticalInfoQuery) {
    // For critical information, verify against known facts database
    const accuracyCheck = verifyCriticalInformation(response.message, isCriticalInfoQuery);
    
    if (!accuracyCheck.isAccurate) {
      // Replace with verified information
      return {
        message: accuracyCheck.correctedMessage || "For the most accurate information about this, I would recommend speaking with one of our specialists who can provide you with up-to-date details.",
        suggestedQuestions: [
          "Connect me with a specialist",
          "What services do you offer?",
          "Tell me about your company"
        ],
        confidence: 0.9, // High confidence in this corrected response
        factChecked: true
      };
    }
  }
  
  // Check for very low confidence responses - these are high risk for inaccuracy
  if (response.confidence !== undefined && response.confidence < 0.3) {
    // Low confidence and not fact checked - replace with safer response
    if (!response.factChecked) {
      return {
        message: "I don't have enough information to provide a reliable answer to your question. To get accurate information, I'd recommend speaking with one of our specialists.",
        suggestedQuestions: [
          "Connect me with a specialist",
          "What general services do you offer?",
          "Tell me about Atlas Technosoft"
        ],
        confidence: 0.3,
        factChecked: true
      };
    }
    
    // Even if fact checked, add disclaimer for very low confidence
    if (!response.message.includes("specialist") && !response.message.includes("accurate")) {
      response.message += " Please note that I may not have complete information on this topic. For the most accurate details, I recommend speaking with one of our specialists.";
    }
  }
  
  // Check for potentially harmful or incorrect response patterns
  const riskPatterns = [
    { pattern: /completely free|0 cost|no charge/i, risk: "pricing misinformation" },
    { pattern: /guarantee|guaranteed|promise|100\%|absolutely/i, risk: "false guarantees" },
    { pattern: /never|always|every time|in all cases/i, risk: "overgeneralization" },
    // NEW: Additional risk patterns
    { pattern: /unlimited|infinite|forever|endlessly/i, risk: "unrealistic claims" },
    { pattern: /cure|heal|fix all|solve all/i, risk: "medical/solution overstatement" },
    { pattern: /best in (market|industry|world|business|class)/i, risk: "unsubstantiated superlative" },
    { pattern: /only provider|only solution|only company/i, risk: "exclusivity claim" },
    { pattern: /instant results|immediately|right away|instantaneous/i, risk: "timing misrepresentation" }
  ];
  
  for (const { pattern, risk } of riskPatterns) {
    if (pattern.test(response.message)) {
      console.warn(`Potential ${risk} detected in response`);
      
      // Add a disclaimer to mitigate the risk
      if (!response.message.includes("specialist")) {
        response.message += " For the most accurate and up-to-date information specific to your needs, please consult with one of our specialists.";
      }
      
      // Create a new response object with adjusted confidence
      response = {
        ...response,
        confidence: 0.5 // Hard-code to 0.5 for risky responses
      };
      
      break;
    }
  }
  
  // NEW: Check for presence of contact information and verify it
  if (response.message.includes("contact") || 
      response.message.includes("phone") || 
      response.message.includes("email") || 
      response.message.includes("address") ||
      originalQuery.toLowerCase().includes("contact") || 
      originalQuery.toLowerCase().includes("reach")) {
    
    const verifiedResponse = verifyContactInformation(response.message);
    if (verifiedResponse !== response.message) {
      response.message = verifiedResponse;
      response.confidence = Math.max(response.confidence || 0.7, 0.8);
    }
  }
  
  // Ensure very general queries about Atlas Technosoft are answered factually  
  if (originalQuery.toLowerCase().includes("atlas") && 
      (originalQuery.toLowerCase().includes("what is") || originalQuery.toLowerCase().includes("who is") || 
       originalQuery.toLowerCase().includes("about") || originalQuery.toLowerCase().includes("tell me about"))) {
    
    // If the response doesn't appear to contain company information, replace with standard info
    if (!response.message.toLowerCase().includes("atlas technosoft") || 
        (response.confidence !== undefined && response.confidence < 0.7)) {
      return {
        message: "Atlas Technosoft is a technology consulting firm that specializes in SAP Business One implementations, enterprise automation solutions, and digital transformation services. The company has been providing IT services to businesses across multiple industries for many years, helping organizations optimize their operations and improve efficiency through technology.",
        suggestedQuestions: [
          "What SAP solutions do you offer?",
          "Tell me about your automation services", 
          "How can I contact Atlas Technosoft?"
        ],
        confidence: 0.9,
        factChecked: true
      };
    }
  }
  
  return response;
}

/**
 * Check if a query is requesting critical company information that needs verification
 * @param query The user query
 * @returns The type of critical information requested or null
 */
function checkForCriticalInformationQuery(query: string): string | null {
  const queryLower = query.toLowerCase();
  
  // Define critical information categories we want to verify
  const criticalPatterns = [
    { pattern: /(where|location|address|office).+(atlas|located|office)/i, type: "address" },
    { pattern: /(phone|call|dial|contact).+(number|atlas)/i, type: "phone" },
    { pattern: /(email|mail|send|write).+(atlas|contact)/i, type: "email" },
    { pattern: /(company|atlas).+(founded|established|started|inception)/i, type: "founding" },
    { pattern: /(how many|number of).+(employees|staff|team|people)/i, type: "team_size" }
  ];
  
  for (const { pattern, type } of criticalPatterns) {
    if (pattern.test(queryLower)) {
      return type;
    }
  }
  
  return null;
}

/**
 * Verify critical company information and correct if necessary
 * @param responseText The response text to verify
 * @param infoType The type of information to verify
 * @returns Object with verification results and corrected message if needed
 */
function verifyCriticalInformation(responseText: string, infoType: string): { 
  isAccurate: boolean, 
  correctedMessage?: string 
} {
  // Define verified correct information for critical data points
  const verifiedInfo = {
    address: {
      headOffice: "Office No.29, Building No.108/116, Vitthalwadi, Kalabadevi Road, Marine Lines, Mumbai - 400 002, Maharashtra, India",
      branch: "F/2nd Floor, Yashodhan Building, Chandavarkar Road, Om Shanti Chowk, Borivali(west), Mumbai - 400 092, Maharashtra, India"
    },
    phone: ["+91-22-2240 1925", "+91-22-4022 1925", "+91-9372329599"],
    email: "info@atlastechnosoft.com",
    founding: null, // We don't have verified founding date info
    team_size: "Our team includes qualified SAP consultants, automation specialists, developers, project managers, and support staff with substantial experience in their respective domains."
  };
  
  const responseLower = responseText.toLowerCase();
  
  switch (infoType) {
    case "address":
      // Check if response contains address information
      if (responseLower.includes("address") || responseLower.includes("office") || responseLower.includes("located")) {
        // Check if it has correct address information
        if (!responseLower.includes("marine lines") && !responseLower.includes("borivali") && 
            !responseLower.includes("kalabadevi") && !responseLower.includes("chandavarkar")) {
          // Address information appears incorrect
          return {
            isAccurate: false,
            correctedMessage: `Atlas Technosoft has two offices in Mumbai, India. Our Head Office is located at ${verifiedInfo.address.headOffice}. We also have a Branch Office at ${verifiedInfo.address.branch}.`
          };
        }
      }
      break;
      
    case "phone":
      // Check if response contains phone information
      if (responseLower.includes("phone") || responseLower.includes("call") || responseLower.includes("contact")) {
        // Verify if response contains at least one correct phone number
        const hasCorrectPhone = verifiedInfo.phone.some(phone => 
          responseLower.includes(phone.replace(/[+\-\s]/g, "")) || 
          responseLower.includes(phone)
        );
        
        if (!hasCorrectPhone) {
          // Phone information appears incorrect
          return {
            isAccurate: false,
            correctedMessage: `You can contact Atlas Technosoft at ${verifiedInfo.phone.join(" or ")}. You can also reach us by email at ${verifiedInfo.email}.`
          };
        }
      }
      break;
      
    case "email":
      // Check if response contains email information
      if (responseLower.includes("email") || responseLower.includes("mail")) {
        if (!responseLower.includes(verifiedInfo.email.toLowerCase())) {
          // Email information appears incorrect
          return {
            isAccurate: false,
            correctedMessage: `You can email Atlas Technosoft at ${verifiedInfo.email}. You can also reach us by phone at ${verifiedInfo.phone[0]} or ${verifiedInfo.phone[2]}.`
          };
        }
      }
      break;
      
    case "team_size":
      // Check for exaggerated team size claims
      const teamSizeMatch = responseLower.match(/(\d+)\s+(employees|staff|people|consultants|team\s+members)/);
      if (teamSizeMatch && parseInt(teamSizeMatch[1], 10) > 500) {
        return {
          isAccurate: false,
          correctedMessage: verifiedInfo.team_size
        };
      }
      break;
  }
  
  // If we don't have a specific correction, the response is considered accurate
  return { isAccurate: true };
}

/**
 * Verify and correct contact information in responses
 * @param responseText The response text to verify
 * @returns Corrected response text if needed
 */
function verifyContactInformation(responseText: string): string {
  // Check for incorrect phone numbers
  const phonePattern = /(\+?\d{1,4}[-\s.]?\d{1,4}[-\s.]?\d{1,4}[-\s.]?\d{1,4})/g;
  const correctPhones = ["+91-22-2240 1925", "+91-22-4022 1925", "+91-9372329599"];
  
  let correctedResponse = responseText;
  const foundPhones = responseText.match(phonePattern);
  
  if (foundPhones) {
    for (const phone of foundPhones) {
      // Remove non-digits to compare
      const cleanPhone = phone.replace(/\D/g, "");
      
      // Check if this is not one of our correct phone numbers
      if (!correctPhones.some(p => p.replace(/\D/g, "") === cleanPhone)) {
        // Replace with first correct phone number
        correctedResponse = correctedResponse.replace(phone, correctPhones[0]);
      }
    }
  }
  
  // Check for incorrect email addresses
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const correctEmail = "info@atlastechnosoft.com";
  
  const foundEmails = responseText.match(emailPattern);
  
  if (foundEmails) {
    for (const email of foundEmails) {
      if (email.toLowerCase() !== correctEmail.toLowerCase()) {
        correctedResponse = correctedResponse.replace(email, correctEmail);
      }
    }
  }
  
  return correctedResponse;
} 