export enum MessageType {
  BOT = "bot",
  USER = "user",
  SYSTEM = "system"
}

export interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
  source?: string;
  feedback?: MessageFeedback;
  suggestedQuestions?: string[];
  webSearchResults?: WebSearchResult[];
  confidence?: number;
  isWebSearch?: boolean;
  needsClarification?: boolean;
  isFaq?: boolean;
  isTemporary?: boolean;
}

export interface MessageFeedback {
  isHelpful: boolean;
  timestamp: Date;
  comment?: string;
}

export interface ChatbotQuery {
  message: string;
  context?: string[];
  sessionId?: string;
  metadata?: {
    url?: string;
    userAgent?: string;
    sessionSource?: string;
    pageContext?: string;
    [key: string]: unknown;
  };
}

export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface ChatbotResponse {
  message: string;
  source?: string;
  context?: string;
  suggestedQuestions?: string[];
  error?: string;
  isError?: boolean;
  confidence?: number;
  webSearchResults?: WebSearchResult[];
  isFaq?: boolean;
  isWebSearch?: boolean;
  shouldUseWebSearch?: boolean;
  searchQuery?: string;
  factChecked?: boolean;
  factualityIssues?: string[];
  timestamp?: string;
  requestId?: string;
  processingTime?: number;
  detectedEntities?: string[];
  ruleBasedResponse?: boolean;
  matchedRule?: string;
  contextAware?: boolean;
  needsClarification?: boolean;
  needsWebSearch?: boolean;
  needsFullProcessing?: boolean;
  matches?: {
    id?: string;
    source?: string;
    relevance?: number;
  }[];
  metadata?: Record<string, any>;
}

export interface QueryMetadata {
  url?: string;
  userAgent?: string;
  referrer?: string;
  pageContext?: string;
}

export interface ConversationContext {
  conversationId?: string;
  userSessionId?: string;
  previousMessages?: ContextMessage[];
  messagesCount?: number;
  requestTimestamp?: string;
  lastSearchTimestamp?: string;
  userIntentOverride?: string;
  currentPage?: string;
  isReturningUser?: boolean;
  messages?: string[];
}

export interface ConversationAnalytics {
  messageId: string;
  sessionId: string;
  userMessage: string;
  botResponse: string;
  timestamp: string;
  responseTiming?: number;
  isHelpful?: boolean;
  metadata?: {
    userAgent?: string;
    url?: string;
    referrer?: string;
  };
} 

// User feedback options
export enum Feedback {
  POSITIVE = "positive",
  NEGATIVE = "negative",
}

// Roles in the conversation
export type Role = "user" | "assistant" | "system";

// Web search result structure
export interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

// Message in a chat conversation
export interface ChatMessage {
  id?: string;
  content: string;
  role: Role;
  timestamp?: string;
  feedback?: Feedback;
  
  // Assistant message specific properties
  confidence?: number;
  source?: string;
  suggestedQuestions?: string[];
  webSearchResults?: SearchResult[];
  isWebSearch?: boolean;
  needsWebSearch?: boolean;
  needsFullProcessing?: boolean;
  needsClarification?: boolean;
  factChecked?: boolean;
  isFaq?: boolean;
  error?: boolean | string;
}

// Previous message in context
export interface ContextMessage {
  role: Role;
  content: string;
}

// Analytics event for chatbot usage
export interface ChatbotAnalyticsEvent {
  type: 'conversation' | 'feedback' | 'chat_reset' | 'faq_usage' | 'web_search';
  conversationId?: string;
  userSessionId?: string;
  userMessage?: {
    id: string;
    content: string;
  };
  botMessage?: {
    id: string;
    content: string;
    confidence?: number;
    isWebSearch?: boolean;
    needsClarification?: boolean;
  };
  feedback?: Feedback;
  messageId?: string;
  query?: string;
  responsePreview?: string;
  messageCount?: number;
  timestamp?: string;
}

// User intent categories
export type UserIntent = 
  | 'information_seeking'  // Looking for general information
  | 'product_inquiry'      // Asking about specific products/services
  | 'problem_solving'      // Trying to solve a specific problem
  | 'comparison'           // Comparing different options
  | 'contact_request'      // Wanting to contact the company
  | 'complaint'            // Expressing a complaint
  | 'greeting'             // Simple greeting
  | 'farewell'             // Ending the conversation
  | 'small_talk'           // General chit-chat
  | 'unknown';             // Unable to determine

// Named entities that can be extracted from user messages
export interface ExtractedEntities {
  products?: string[];     // Product names mentioned
  services?: string[];     // Service types mentioned
  locations?: string[];    // Locations mentioned
  companies?: string[];    // Company names mentioned
  people?: string[];       // People mentioned
  dates?: string[];        // Dates mentioned
  numbers?: number[];      // Numeric values mentioned
  emails?: string[];       // Email addresses mentioned
  phones?: string[];       // Phone numbers mentioned
}

// Enhanced message analysis
export interface MessageAnalysis {
  intent: UserIntent;
  entities?: ExtractedEntities;
  sentiment: 'positive' | 'neutral' | 'negative';
  topKeywords: string[];
  confidenceScore: number;
}

// Cache settings for various response types
export interface CacheSettings {
  enabled: boolean;
  maxAge: number;          // Time in seconds
  revalidate?: boolean;    // Whether to revalidate automatically
}

// Performance metrics for chatbot responses
export interface ResponseMetrics {
  processingTimeMs: number;
  tokensUsed?: number;
  apiCalls: number;
  cacheHit: boolean;
  modelName?: string;
}

// Enhanced chatbot features configuration
export interface ChatbotFeatureConfig {
  webSearch: {
    enabled: boolean;
    confidenceThreshold: number;
    maxResults: number;
  };
  faq: {
    enabled: boolean;
    confidenceThreshold: number;
  };
  feedback: {
    enabled: boolean;
    types: Feedback[];
  };
  suggestions: {
    enabled: boolean;
    count: number;
  };
  voice: {
    enabled: boolean;
    language: string;
  };
  cache: {
    faq: CacheSettings;
    webSearch: CacheSettings;
    conversations: CacheSettings;
  };
}

export type SuggestionCategory = "general" | "sap" | "automation" | "contact" | "info" | "other";

export type SuggestionData = {
  text: string;
  category?: SuggestionCategory;
  icon?: string;
  priority?: number;
}; 