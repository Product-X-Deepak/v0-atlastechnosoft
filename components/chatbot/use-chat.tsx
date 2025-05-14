"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { 
  ChatMessage as ChatMessageType, 
  ConversationContext, 
  Feedback as _Feedback,
  ChatbotResponse 
} from "@/lib/chatbot/types";
import { ChatbotConfig } from "@/lib/chatbot/config";

const STORAGE_KEY = "atlas_chatbot_conversation";
const MAX_MESSAGES = 50;
const MAX_RETRIES = 2;

// Interface for cached response data
interface CachedResponseData {
  data: ChatbotResponse;
  timestamp: number;
}

/**
 * Custom hook for managing chatbot interactions
 */
export function useChat() {
  // Main state management
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [conversationId, setConversationId] = useState<string>("");
  const [botTyping, setBotTyping] = useState(false);
  const [webSearchActive, setWebSearchActive] = useState(false);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<string | null>(null);
  
  // User session tracking
  const [userSessionId, setUserSessionId] = useState<string>("");
  const [_messagesBeforeLogin, setMessagesBeforeLogin] = useState<number>(0);
  
  // Add the welcome message
  const addWelcomeMessage = useCallback(() => {
    const welcomeMessage: ChatMessageType = {
      id: uuidv4(),
      content: ChatbotConfig.welcomeMessage,
      role: "assistant",
      suggestedQuestions: ChatbotConfig.initialSuggestions,
      timestamp: new Date().toISOString()
    };
    
    setMessages([welcomeMessage]);
    setLastMessageTimestamp(welcomeMessage.timestamp || null);
  }, []);
  
  // Initialize the conversation
  useEffect(() => {
    // Generate conversation ID
    const newConversationId = uuidv4();
    setConversationId(newConversationId);
    
    // Generate or retrieve session ID
    let sessionId = localStorage.getItem("atlas_user_session_id");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("atlas_user_session_id", sessionId);
    }
    setUserSessionId(sessionId);
    
    // Check for existing conversation
    const savedConversation = localStorage.getItem(STORAGE_KEY);
    if (savedConversation) {
      try {
        const parsed = JSON.parse(savedConversation);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure the parsed messages have the correct structure
          const validMessages = parsed.filter(msg => 
            msg && 
            msg.content && 
            typeof msg.content === 'string' && 
            (msg.role === 'user' || msg.role === 'assistant' || msg.role === 'system')
          );
          
          if (validMessages.length > 0) {
            // Make sure timestamps are properly formatted
            const formattedMessages = validMessages.map(msg => ({
              ...msg,
              id: msg.id || uuidv4() // Ensure each message has an ID
            }));
            
            setMessages(formattedMessages);
            setMessagesBeforeLogin(formattedMessages.length);
            
            // Set the last message timestamp if available
            const lastMessage = formattedMessages[formattedMessages.length - 1];
            if (lastMessage && lastMessage.timestamp) {
              setLastMessageTimestamp(lastMessage.timestamp);
            }
          } else {
            // No valid messages found
            addWelcomeMessage();
          }
        } else {
          // Add welcome message if no saved conversation
          addWelcomeMessage();
        }
      } catch (e: unknown) {
        console.error("Failed to load saved conversation", e);
        addWelcomeMessage();
      }
    } else {
      // No saved conversation, add welcome message
      addWelcomeMessage();
    }
  }, [addWelcomeMessage]);
  
  // Save conversation to local storage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        // Only save up to MAX_MESSAGES to prevent storage issues
        const messagesToSave = messages.slice(-MAX_MESSAGES);
        // Ensure timestamps are stored as strings
        const processedMessages = messagesToSave.map(msg => {
          let timestamp: string;
          if (typeof msg.timestamp === 'string') {
            timestamp = msg.timestamp;
          } else {
            // If it's not a string, use current time
            timestamp = new Date().toISOString();
          }
          return {
            ...msg,
            timestamp
          };
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(processedMessages));
      } catch (error: unknown) {
        console.error("Error saving chat history:", error);
      }
    }
  }, [messages]);
  
  // Build the conversation context from messages
  const buildContext = useCallback((): ConversationContext => {
    const previousMessages = messages.slice(-10).map(m => ({
      role: m.role,
      content: m.content
    }));
    
    return {
      conversationId,
      userSessionId,
      previousMessages,
      messagesCount: messages.length,
      requestTimestamp: new Date().toISOString()
    };
  }, [messages, conversationId, userSessionId]);
  
  // Helper function to fetch with timeout
  const fetchWithTimeout = useCallback(async (url: string, options: RequestInit, timeout = 8000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error: unknown) {
      clearTimeout(id);
      throw error;
    }
  }, []);
  
  // Simple in-memory cache for quicker responses
  const responseCache = useRef<Record<string, CachedResponseData>>({});
  
  // Process a chatbot response
  const processResponse = useCallback(async (
    response: ChatbotResponse, 
    userMessage: string
  ) => {
    // Check cache first for identical questions (case insensitive)
    const cacheKey = userMessage.trim().toLowerCase();
    const cachedResponse = responseCache.current[cacheKey];
    
    // Use cache if available and recent (less than 5 minutes old)
    if (cachedResponse && (Date.now() - cachedResponse.timestamp < 5 * 60 * 1000)) {
      console.log("Using cached response");
      return cachedResponse.data;
    }
    
    // If we need web search for the latest info
    if (response.needsWebSearch === true) {
      setWebSearchActive(true);
      
      try {
        // Perform web search with timeout
        const webSearchResponse = await fetchWithTimeout(
          "/api/chatbot/web-search", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: userMessage,
              context: buildContext(),
              conversationId,
              userSessionId
            }),
          },
          10000 // 10 second timeout for web search
        );
        
        if (!webSearchResponse.ok) {
          throw new Error("Web search failed");
        }
        
        const webSearchData = await webSearchResponse.json();
        
        // Cache the response
        responseCache.current[cacheKey] = {
          data: webSearchData,
          timestamp: Date.now()
        };
        
        // Return the web search results
        setWebSearchActive(false);
        return webSearchData;
      } catch (err: unknown) {
        console.error("Web search error:", err);
        setWebSearchActive(false);
        
        // Fallback to original response if web search fails
        return response;
      }
    }
    
    // If it needs clarification, pass through
    if (response.needsClarification) {
      return response;
    }
    
    // If we need full processing (from FAQ endpoint)
    if (response.needsFullProcessing === true) {
      setBotTyping(true);
      
      try {
        // Get full response from main API
        const fullResponse = await fetchWithTimeout(
          "/api/chatbot", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: userMessage,
              context: buildContext()
            }),
          }
        );
        
        if (!fullResponse.ok) {
          throw new Error("Failed to get full response");
        }
        
        const fullData = await fullResponse.json();
        setBotTyping(false);
        return fullData;
      } catch (err: unknown) {
        console.error("Full processing error:", err);
        setBotTyping(false);
        
        // Fallback to original response
        return response;
      }
    }
    
    return response;
  }, [buildContext, fetchWithTimeout, conversationId, userSessionId]);

  // Submit a message to the chatbot
  const submitMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Reset error state
    setError(null);
    
    // Check cache first for identical questions (case insensitive)
    const cacheKey = content.trim().toLowerCase();
    const cachedResponse = responseCache.current[cacheKey];
    
    // Create the user message
    const userMessage: ChatMessageType = {
      id: uuidv4(),
      content: content.trim(),
      role: "user",
      timestamp: new Date().toISOString()
    };
    
    // Update messages with user input immediately
    setMessages(prev => [...prev, userMessage]);
    
    // Show bot typing indicator
    setBotTyping(true);
    setIsLoading(true);
    
    // Use cache if available and less than 5 minutes old
    if (cachedResponse && (Date.now() - cachedResponse.timestamp < 5 * 60 * 1000)) {
      // Simulate a brief loading time for better UX
      setTimeout(() => {
        const botMessage: ChatMessageType = {
          id: uuidv4(),
          content: cachedResponse.data.message,
          role: "assistant",
          confidence: cachedResponse.data.confidence,
          suggestedQuestions: cachedResponse.data.suggestedQuestions,
          source: cachedResponse.data.source,
          webSearchResults: cachedResponse.data.webSearchResults,
          isWebSearch: cachedResponse.data.isWebSearch,
          needsClarification: cachedResponse.data.needsClarification,
          factChecked: cachedResponse.data.factChecked,
          isFaq: cachedResponse.data.isFaq,
          timestamp: new Date().toISOString()
        };
        
        // Update messages with cached bot response
        setMessages(prev => [...prev, botMessage]);
        setLastMessageTimestamp(botMessage.timestamp || null);
        setBotTyping(false);
        setIsLoading(false);
      }, 500); // Brief delay to appear natural
      
      return;
    }
    
    let retries = 0;
    let success = false;
    
    // Process the message with retries
    while (retries <= MAX_RETRIES && !success) {
      try {
        // First check if it's a simple FAQ that can be answered quickly
        const faqResponse = await fetchWithTimeout(
          "/api/chatbot/faq", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: content,
              context: buildContext()
            }),
          },
          5000 // 5 second timeout for FAQ checks
        );
        
        if (!faqResponse.ok) {
          throw new Error(`FAQ API error: ${faqResponse.status}`);
        }
        
        let responseData = await faqResponse.json();
        
        // Process the response (handles web search, full processing, etc.)
        responseData = await processResponse(responseData, content);
        
        // Cache the response for future use
        responseCache.current[cacheKey] = {
          data: responseData,
          timestamp: Date.now()
        };
        
        // Create the assistant message
        const botMessage: ChatMessageType = {
          id: uuidv4(),
          content: responseData.message,
          role: "assistant",
          confidence: responseData.confidence,
          suggestedQuestions: responseData.suggestedQuestions || [
            "What SAP solutions do you offer?", 
            "Tell me about your automation services", 
            "Other (Ask anything)"
          ],
          source: responseData.source,
          webSearchResults: responseData.webSearchResults,
          isWebSearch: responseData.isWebSearch,
          needsClarification: responseData.needsClarification,
          factChecked: responseData.factChecked,
          isFaq: responseData.isFaq,
          timestamp: new Date().toISOString()
        };
        
        // Update messages with bot response
        setMessages(prev => [...prev, botMessage]);
        setLastMessageTimestamp(botMessage.timestamp || null);
        
        // Track conversation analytics
        try {
          await fetchWithTimeout(
            "/api/analytics/chatbot",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "conversation",
                conversationId,
                userSessionId,
                userMessage: {
                  id: userMessage.id,
                  content: userMessage.content
                },
                botMessage: {
                  id: botMessage.id,
                  content: botMessage.content,
                  confidence: botMessage.confidence,
                  isWebSearch: botMessage.isWebSearch,
                  needsClarification: botMessage.needsClarification
                }
              }),
            },
            3000 // Analytics has a shorter timeout since it's not critical
          );
        } catch (analyticsError: unknown) {
          console.error("Analytics tracking error:", analyticsError);
          // Non-critical, continue
        }
        
        success = true;
      } catch (err: unknown) {
        console.error(`Chat API error (attempt ${retries + 1}/${MAX_RETRIES + 1}):`, err);
        retries++;
        
        // If we've reached max retries, show an error
        if (retries > MAX_RETRIES) {
          setError(err instanceof Error ? err : new Error('Sorry, I\'m having trouble connecting. Please try again.'));
          
          // Add error message from bot
          const errorMessage: ChatMessageType = {
            id: uuidv4(),
            content: "I apologize, but I'm experiencing technical difficulties right now. Could you please try again or ask a different question?",
            role: "assistant",
            suggestedQuestions: [
              "What services does Atlas Technosoft offer?",
              "Tell me about SAP Business One",
              "How can I contact your team?"
            ],
            timestamp: new Date().toISOString(),
            error: true
          };
          
          setMessages(prev => [...prev, errorMessage]);
        } else {
          // Small delay before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    // Reset states
    setBotTyping(false);
    setIsLoading(false);
  }, [buildContext, processResponse, fetchWithTimeout, conversationId, userSessionId]);

  // Submit feedback for a message
  const submitFeedback = useCallback(async (messageId: string, isHelpful: boolean, comment?: string) => {
    try {
      await fetch(ChatbotConfig.endpoints.feedback, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          isHelpful,
          comment,
          timestamp: new Date().toISOString(),
        }),
      });
      
      return true;
    } catch (error: unknown) {
      console.error('Failed to submit feedback:', error);
      return false;
    }
  }, []);

  // Reset the chat
  const resetChat = useCallback(async () => {
    // Clear local messages
    setMessages([]);
    
    // Add welcome message
    addWelcomeMessage();
    
    // Track reset event
    try {
      await fetch("/api/analytics/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chat_reset",
          conversationId,
          userSessionId,
          messageCount: messages.length
        }),
      });
    } catch (err: unknown) {
      console.error("Error tracking reset:", err);
    }
    
    // Generate a new conversation ID
    setConversationId(uuidv4());
  }, [addWelcomeMessage, conversationId, userSessionId, messages.length]);

  // Track conversation for analytics - Now this is a no-op since we use fetchWithTimeout directly
  const _trackConversation = async () => {
    // Implementation moved to direct fetchWithTimeout calls
  };
  
  // Clean up old cache entries
  useEffect(() => {
    const cleanupCache = () => {
      const now = Date.now();
      const newCache: Record<string, CachedResponseData> = {};
      
      // Keep only entries less than 30 minutes old
      Object.keys(responseCache.current).forEach(key => {
        const entry = responseCache.current[key];
        if (now - entry.timestamp < 30 * 60 * 1000) {
          newCache[key] = entry;
        }
      });
      
      responseCache.current = newCache;
    };
    
    // Clean cache every 5 minutes
    const interval = setInterval(cleanupCache, 5 * 60 * 1000);
    
    // Initial cleanup
    cleanupCache();
    
    return () => clearInterval(interval);
  }, []);

  // New function to perform direct web searches
  const performWebSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setWebSearchActive(true);
    setError(null);
    
    // Check cache first
    const cacheKey = `web_${query.trim().toLowerCase()}`;
    const cachedResponse = responseCache.current[cacheKey];
    
    // Use cache if available and less than 3 minutes old (web results should be fresher)
    if (cachedResponse && (Date.now() - cachedResponse.timestamp < 3 * 60 * 1000)) {
      console.log("Using cached web search result");
      setIsLoading(false);
      setWebSearchActive(false);
      return cachedResponse.data;
    }
    
    try {
      const response = await fetchWithTimeout(
        ChatbotConfig.endpoints.webSearch,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            query,
            conversationId,
            userSessionId,
            forceSearch: true
          }),
        },
        12000 // 12 seconds timeout for web search
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Enhance the response to be more direct if possible
      if (data.webSearchResults && data.webSearchResults.length > 0) {
        // Format a better direct answer using the search results
        const firstResult = data.webSearchResults[0];
        let enhancedMessage = data.message;
        
        // Only enhance if the original response seems generic
        if (enhancedMessage.includes("I found some information") || 
            enhancedMessage.includes("According to my search") ||
            enhancedMessage.includes("Here's what I found")) {
          
          enhancedMessage = firstResult.snippet + 
            "\n\nThis information comes from " + 
            new URL(firstResult.url).hostname.replace('www.', '');
        }
        
        data.message = enhancedMessage;
      }
      
      setLastMessageTimestamp(new Date().toISOString());
      
      // Cache the response
      responseCache.current[cacheKey] = {
        data: data,
        timestamp: Date.now()
      };
      
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error('Failed to perform web search'));
      throw err;
    } finally {
      setIsLoading(false);
      setWebSearchActive(false);
    }
  }, [fetchWithTimeout, conversationId, userSessionId]);

  return {
    messages,
    isLoading,
    error,
    submitMessage,
    submitFeedback,
    resetChat,
    botTyping,
    webSearchActive,
    lastMessageTimestamp,
    performWebSearch
  };
} 