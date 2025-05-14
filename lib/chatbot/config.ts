/**
 * Chatbot Configuration
 * Centralized configuration for the Atlas Assistant chatbot
 */

export const ChatbotConfig = {
  // General settings
  name: "Atlas Assistant",
  welcomeMessage: "Hi there! I'm Atlas Assistant 2.0, your AI-powered guide to Atlas Technosoft's solutions and services. I can provide detailed information on our SAP implementations, automation solutions, and digital transformation services. I can also search the web for the latest information when needed. How can I assist you today?",
  initialSuggestions: [
    "What's new in SAP Business One 2025?",
    "Tell me about agentic automation solutions",
    "What SAP solutions do you offer?",
    "Other (Ask anything)"
  ],
  
  // API endpoints
  endpoints: {
    main: "/api/chatbot",
    webSearch: "/api/chatbot/web-search",
    faq: "/api/chatbot/faq",
    analytics: "/api/analytics/chatbot",
    feedback: "/api/feedback"
  },
  
  // Performance settings
  responseTimeout: 12000, // increased from 10s to 12s for more complex queries
  cacheLifetime: 1800000, // reduced to 30 minutes to ensure fresher data
  maxTokensPerRequest: 4096, // maximum tokens for LLM request
  
  // UI customization
  ui: {
    avatarIcon: "bot",  // Icon to use for the bot messages
    theme: {
      primary: "indigo",
      secondary: "slate"
    },
    position: {
      default: {
        bottom: 24,
        right: 24
      }
    },
    accessibility: {
      reduceMotion: false,  // Will be overridden by user preferences
      highContrast: false,  // Will be overridden by user preferences
      fontSize: "medium"    // Default font size, can be adjusted by user
    },
    chatWindow: {
      maxHeight: "70vh",
      defaultWidth: 380,
      minWidth: 320,
      maxWidth: 500,
      resizable: true,
      dragPosition: true
    }
  },
  
  // Search settings
  search: {
    maxResults: 8,  // increased from 5 to 8
    webSearchEnabled: true,
    localSearchPriority: true, // prioritize knowledge base before web search
    webSearchThreshold: 0.65,  // minimum confidence score to trigger web search
    filters: {
      excludeDomains: ["pinterest.com", "quora.com"],
      preferredDomains: ["sap.com", "uipath.com", "gartner.com", "forrester.com"],
      maxAge: 90 // days - prefer content no older than 90 days
    }
  },
  
  // Analytics settings
  analytics: {
    enabled: true,
    sessionTimeout: 1800000, // 30 minutes
    trackEvents: [
      "message_sent",
      "response_received",
      "feedback_given",
      "chat_opened",
      "chat_closed",
      "suggestion_clicked",
      "web_search_triggered",
      "response_time",
      "error_encountered",
      "user_correction",
      "conversation_length"
    ],
    anonymizeIPs: true,
    collectMetrics: {
      responseTime: true,
      confidenceScores: true,
      usagePatterns: true,
      topQueries: true
    }
  },
  
  // Rate limiting
  rateLimiting: {
    maxMessagesPerMinute: 12, // increased from 10
    maxTokensPerDay: 50000,   // increased from 10000
    gracePeriod: 5 // seconds before rate limiting is enforced
  },

  // Response quality settings
  responseQuality: {
    factCheckEnabled: true,
    minimumConfidence: 0.7, // slightly reduced to allow more answers
    uncertaintyDisclaimer: "I don't have complete information about this topic. Here's what I know, but I can search for more specific details if you'd like:",
    suggestWebSearch: true,
    maxConversationTurns: 30, // max conversation length before suggesting refresh
    contextWindow: 15, // increased for better context awareness
    enhancedResponses: true, // add more specific details to answers
    avoidVagueAnswers: true, // prioritize specific over general responses
    maxResponseLength: 300 // limit response length to be more concise
  },

  // AI behavior settings
  aiBehavior: {
    personality: "professional",
    proactiveMode: true, // suggest related information
    correctionEnabled: true, // can acknowledge and correct mistakes
    maxFollowUpQuestions: 3, // maximum number of follow-up questions to suggest
    languageModel: "gpt-4", // default model to use
    fallbackModel: "gpt-3.5-turbo", // fallback model if primary is unavailable
    ruleBased: {
      enabled: true,
      precedence: "rulesFirst" // rules take precedence over AI responses when applicable
    }
  },
  
  // These properties are added to fix linter errors
  stopWords: [
    "the", "and", "a", "an", "in", "on", "at", "to", "for", "with", "by", 
    "is", "are", "was", "were", "be", "been", "being", "have", "has", 
    "had", "do", "does", "did", "will", "would", "shall", "should", 
    "may", "might", "must", "can", "could", "of", "from", "about"
  ],
  
  fallbackResponses: [
    "I'm not sure I understand your question. Could you rephrase it or ask about our services?",
    "I don't have enough information to answer that question. Can I help you with something specific about our SAP or automation solutions?",
    "That's a bit outside my area of expertise. I'd be happy to connect you with a specialist who can help.",
    "I'm not familiar with that topic. Would you like to know about our SAP Business One implementations or automation services instead?",
    "I don't have the answer to that question. Would you like me to find someone who can help you?"
  ],
  
  confidenceThreshold: 0.65 // Minimum confidence score to consider a response valid
};

export default ChatbotConfig; 