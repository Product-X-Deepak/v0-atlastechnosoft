"use client";

import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ThumbsUp, ThumbsDown, AlertTriangle, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatbotConfig } from "@/lib/chatbot/config";
import { WebSearchResult } from "@/lib/chatbot/types";

// Message types enum
enum MessageType {
  USER = "user",
  BOT = "bot",
}

// Interface for message objects
interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
  source?: string;
  suggestedQuestions?: string[];
  webSearchResults?: Array<{ title: string; url: string; snippet?: string }>;
  isTemporary?: boolean;
}

// Define props interface for the ChatWidget component
interface ChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// ChatWidget component
export function ChatWidget({ onClose }: ChatWidgetProps) {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sessionId] = useState(() => uuidv4());
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [lastFeedbackId, setLastFeedbackId] = useState<string | null>(null);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const chatWidgetRef = useRef<HTMLDivElement>(null);
  
  // Check for reduced motion preference
  const shouldReduceMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  // Initial suggestions
  const initialSuggestions = [
    "What SAP solutions do you offer?",
    "Tell me about your automation services",
    "How can you help my business?",
    "What industries do you serve?"
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Add click outside listener to minimize chatbot
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWidgetRef.current && !isMinimized && !chatWidgetRef.current.contains(event.target as Node)) {
        setIsMinimized(true);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMinimized]);
  
  // Update conversation context when messages change
  useEffect(() => {
    // Extract the last 5 message exchanges for context
    setConversationContext(
      messages
        .slice(-10)
        .map((msg) => `${msg.type === MessageType.USER ? "User" : "Bot"}: ${msg.text}`)
    );
  }, [messages]);

  // Log chat analytics
  const logChatAnalytics = (
    userMessage: string,
    botResponse: string,
    messageId: string
  ) => {
    try {
      if (typeof window !== "undefined") {
        fetch("/api/analytics/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "chat_message",
            userMessage,
            botResponse,
            messageId,
            sessionId,
            timestamp: new Date().toISOString(),
              url: window.location.href,
          }),
        });
      }
    } catch (error) {
      console.error("Failed to log analytics:", error);
    }
  };
  
  // Handle feedback submission
  const handleFeedback = (messageId: string, isPositive: boolean) => {
    setLastFeedbackId(messageId);
    
    try {
      fetch("/api/analytics/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "feedback",
          messageId,
          isPositive,
          sessionId,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Failed to log feedback:", error);
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    // Don't update the input field, but execute the query directly
    // Add user message immediately
    const userMessageId = uuidv4();
    const userMessage: Message = {
      id: userMessageId,
      type: MessageType.USER,
      text: suggestion,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setIsError(false);
    setIsLoading(true);
    setShowSuggestions(false);
    
    // Analytics tracking for suggested questions
    if (typeof window !== "undefined") {
      const eventData = {
        event: "suggested_question_clicked",
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        sessionId: sessionId,
      };
      
      try {
        fetch("/api/analytics/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });
      } catch (error) {
        console.error("Failed to log suggestion click:", error);
      }
    }
    
    // Process the suggestion like a normal query
    processQuery(suggestion);
  };

  // Process query function to handle both direct inputs and suggestions
  const processQuery = async (query: string) => {
    try {
      // Define the payload once to be consistent across endpoints
      const payload = {
        message: query,
        query: query,
        prioritizeLocalKnowledge: true, // Flag to prioritize local knowledge
        searchSiteFirst: true,
        context: conversationContext,
        sessionId,
        metadata: {
          url: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          pageContext: typeof document !== 'undefined' ? document.title : ''
        }
      };

      // Try to handle the API call gracefully with fallbacks
      let data;
      
      // First try the FAQ endpoint for local knowledge
      try {
        const siteSearchResponse = await fetch(ChatbotConfig.endpoints.faq, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        
        if (siteSearchResponse.ok) {
          const responseData = await siteSearchResponse.json();
          
          // Check if we have a valid response with good confidence
          if (responseData.message && 
              responseData.message.trim() !== '' && 
              (responseData.confidence === undefined || responseData.confidence >= 0.7)) {
            // We have a good match from local knowledge
            data = responseData;
          } else {
            // Low confidence or empty response, try main endpoint
            console.log(`FAQ endpoint returned low confidence (${responseData.confidence}), trying main endpoint`);
            
            const mainResponse = await fetch(ChatbotConfig.endpoints.main, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
            
            if (mainResponse.ok) {
              data = await mainResponse.json();
              // Check confidence again
              if (!data.message || data.message.trim() === '' || 
                  (data.confidence !== undefined && data.confidence < 0.6)) {
                // Still no good match, set flag to try web search
                data.needsWebSearch = true;
              }
            } else {
              throw new Error(`Both endpoints failed, main API status: ${mainResponse.status}`);
            }
          }
        } else {
          // If FAQ endpoint fails, fall back to main endpoint
          console.log(`FAQ endpoint failed with status ${siteSearchResponse.status}, falling back to main endpoint`);
          
          const mainResponse = await fetch(ChatbotConfig.endpoints.main, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          
          if (mainResponse.ok) {
            data = await mainResponse.json();
            // Ensure we have a valid message
            if (!data.message || data.message.trim() === '' ||
                (data.confidence !== undefined && data.confidence < 0.6)) {
              data.needsWebSearch = true;
            }
          } else {
            throw new Error(`Both endpoints failed, main API status: ${mainResponse.status}`);
          }
        }
      } catch (apiError) {
        console.error("API call failed:", apiError);
        
        // Fallback to a local response when all APIs fail
        data = {
          message: "I'm having trouble connecting to our knowledge base right now. Let me try to answer based on general information.",
          confidence: 0.5,
          suggestedQuestions: [
            "What SAP solutions do you offer?",
            "Tell me about your automation services",
            "What industries do you serve?"
          ]
        };
      }
      
      // Only if no good match found on local knowledge, try web search
      if (data.needsWebSearch) {
        // Show that we're searching the web
        const searchingMessage: Message = {
          id: "searching-web",
          type: MessageType.BOT,
          text: "I don't have specific information about that in my knowledge base. Let me search the web for you...",
          timestamp: new Date(),
          isTemporary: true
        };
        
        setMessages(prev => [...prev, searchingMessage]);
        
        try {
          // Create abort controller for timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000);
          
          let searchResult;
          try {
            // Perform the web search
            const searchResponse = await fetch(ChatbotConfig.endpoints.webSearch, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                query: query,
                message: query,
                forceSearch: true,
                sessionId: sessionId,
                requestDetailedSummary: true, // Request a detailed summary
                enhanceResults: true // Request enhanced results
              }),
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (searchResponse.ok) {
              searchResult = await searchResponse.json();
              // Verify we have a valid message
              if (!searchResult.message || searchResult.message.trim() === '') {
                searchResult.message = "I searched the web but couldn't find specific information about your question.";
              }
              
              // Format the response to create a more detailed answer
              if (searchResult.webSearchResults && searchResult.webSearchResults.length > 0) {
                // Extract key information from search results
                const topResults = searchResult.webSearchResults.slice(0, 3);
                const sourcesInfo = topResults.map((r: WebSearchResult) => r.snippet || r.title || '').filter(Boolean);
                
                // If the main message is short, enhance it with information from the search results
                if (searchResult.message.length < 150 && sourcesInfo.length > 0) {
                  const formattedSummary = 
                    `${searchResult.message}\n\n**Key information from search results:**\n\n` +
                    sourcesInfo.map((info: string, _idx: number) => `- ${info}`).join('\n\n');
                  
                  searchResult.message = formattedSummary;
                }
                
                // Structure the content to be more informative
                if (!searchResult.message.includes("Key information")) {
                  searchResult.message = `${searchResult.message}\n\nI've found ${topResults.length} relevant sources that might help answer your question.`;
                }
              }
            } else {
              throw new Error(`Web search failed with status ${searchResponse.status}`);
            }
          } catch (error) {
            console.error("Web search error:", error);
            searchResult = {
              message: "I wasn't able to search the web successfully. Let me try to answer from my training instead.",
              source: "Fallback"
            };
          }
          
          // Only update data if we got a valid response
          if (searchResult && typeof searchResult === 'object' && searchResult.message) {
            data = searchResult;
            
            // Make sure we include the web search results in the response
            if (searchResult.webSearchResults) {
              data.isWebSearch = true;
              data.webSearchResults = searchResult.webSearchResults;
            }
          }
        } finally {
          // Always remove the temporary searching message
          setMessages(prev => prev.filter(msg => !msg.isTemporary));
        }
      }
      
      // Generate related follow-up questions based on the current topic
      const generateRelatedQuestions = (currentQuery: string, currentResponse: string) => {
        // Extract topics from the query and response
        const combinedText = `${currentQuery} ${currentResponse}`.toLowerCase();
        
        // Define topic-based question sets
        const sapRelatedQuestions = [
          "What are the benefits of SAP Business One?",
          "How do you implement SAP solutions?",
          "What's new in SAP Business One 2025?",
          "Can you explain SAP HANA architecture?"
        ];
        
        const automationRelatedQuestions = [
          "How does RPA compare to traditional automation?",
          "What's your automation implementation process?",
          "What industries benefit most from automation?",
          "Can automation integrate with our existing systems?"
        ];
        
        const industryRelatedQuestions = [
          "How do you serve the manufacturing industry?",
          "What solutions do you offer for healthcare?",
          "How do retail businesses benefit from your services?",
          "What's your experience in distribution?"
        ];
        
        const implementationQuestions = [
          "What's your implementation methodology?",
          "How long does implementation typically take?",
          "What's included in your support packages?",
          "Do you offer training for new systems?"
        ];
        
        // Determine which question set to use based on the content
        if (combinedText.includes("sap") || combinedText.includes("business one") || combinedText.includes("erp")) {
          return sapRelatedQuestions;
        } else if (combinedText.includes("automation") || combinedText.includes("rpa") || combinedText.includes("robot")) {
          return automationRelatedQuestions;
        } else if (combinedText.includes("industry") || combinedText.includes("sector") || 
                  combinedText.includes("manufacturing") || combinedText.includes("healthcare")) {
          return industryRelatedQuestions;
        } else {
          return implementationQuestions;
        }
      };
      
      // Make sure the bot always provides suggested questions
      const defaultQuestions = [
        "What SAP solutions do you offer?",
        "Tell me about your automation services",
        "What industries do you serve?",
        "How can I contact a specialist?"
      ];
      
      // If data doesn't have suggested questions or they're empty, generate them
      if (!data.suggestedQuestions || data.suggestedQuestions.length === 0) {
        data.suggestedQuestions = generateRelatedQuestions(query, data.message || "");
      }
      
      // If we have fewer than 3 questions, add some defaults
      if (data.suggestedQuestions.length < 3) {
        const additionalQuestions = defaultQuestions.filter(
          q => !data.suggestedQuestions.includes(q)
        );
        data.suggestedQuestions = [
          ...data.suggestedQuestions, 
          ...additionalQuestions.slice(0, 4 - data.suggestedQuestions.length)
        ];
      }
      
      // Add bot message with a slight delay to simulate natural conversation
      const botMessageId = uuidv4();
      const botMessage: Message = {
        id: botMessageId,
        type: MessageType.BOT,
        text: data.message,
        timestamp: new Date(),
        source: data.source,
        suggestedQuestions: data.suggestedQuestions,
        webSearchResults: data.webSearchResults,
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setIsLoading(false);
        
        // Reset last feedback ID to allow feedback on new message
        setLastFeedbackId(null);
        
        // Log analytics after the bot responds
        logChatAnalytics(query, data.message, botMessageId);
        
        // Only show suggested questions after actual response content is displayed
        if (botMessage.text && botMessage.text.trim().length > 0) {
          setShowSuggestions(true);
        } else {
          // If there's no valid response, don't show suggestions immediately
          setShowSuggestions(false);
        }
      }, shouldReduceMotion ? 0 : 400); // Shorter delay for reduced motion
      
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsError(true);
      
      // Add error message
      const errorMessageId = uuidv4();
      const errorMessage: Message = {
        id: errorMessageId,
        type: MessageType.BOT,
        text: "Sorry, I'm having trouble connecting. Please try again later or rephrase your question.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
      setIsLoading(false);
      
      // Log error analytics
      logChatAnalytics(
        query,
        "Sorry, I'm having trouble connecting. Please try again later or rephrase your question.",
        errorMessageId
      );
    }
  };

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isTyping) return;
    
    // Add user message
    const userMessageId = uuidv4();
    const userMessage: Message = {
      id: userMessageId,
      type: MessageType.USER,
      text: trimmedInput,
        timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setIsError(false);
    setIsLoading(true);
    // Hide suggestions while loading the answer
    setShowSuggestions(false);
    
    // Process the query
    processQuery(trimmedInput);
  };

  return (
    <div 
      ref={chatWidgetRef}
      className={`flex flex-col rounded-lg shadow-md overflow-hidden ${isMinimized ? 'bg-transparent shadow-none' : darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} ${isMinimized ? 'w-auto h-auto' : 'w-[420px] max-w-full h-[600px] max-h-[85vh]'}`}
    >
      {isMinimized ? (
        // Small circular icon when minimized - Updated to futuristic 2025 design
        <button 
          onClick={() => setIsMinimized(false)}
          className={`relative group overflow-hidden ${darkMode ? 'bg-indigo-900' : 'bg-indigo-700'} text-white p-2 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
          aria-label="Expand chat"
        >
          {/* Animated background effects */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-violet-500 to-blue-500 opacity-80 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-purple-800 opacity-90"></div>
          
          {/* Outer glow rings */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-30 blur-sm animate-ping-slower"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-40 blur-sm animate-ping-slow"></div>
          
          {/* Inner content with z-index to appear above the effects */}
          <div className="relative z-10 w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow-md">
              {/* Updated modern AI chatbot icon */}
              <path 
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C13.33 22 14.61 21.73 15.8 21.24L19.4 21.95C20.16 22.07 20.85 21.39 20.73 20.63L20.02 17.03C20.51 15.84 20.78 14.56 20.78 13.23C20.78 7.71 16.3 3.23 10.78 3.23" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="animate-pulse-slow"
              />
              <path 
                d="M14.5 15C14.5 15 13 16.5 12 16.5C11 16.5 9.5 15 9.5 15" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M9 10H9.01" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M15 10H15.01" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* Hover effect highlight */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-full"></div>
        </button>
      ) : (
        // Full header when expanded
        <div className={`${darkMode ? 'bg-indigo-800' : 'bg-indigo-600'} text-white px-4 py-3 flex justify-between items-center`}>
          <h3 className="font-medium">Atlas Technosoft Chat</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-white hover:text-gray-200 focus:outline-none mr-2"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Minimize chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/></svg>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 focus:outline-none ml-2"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
          </div>
        </div>
      )}
      
      {!isMinimized && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages display area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            ref={messagesRef}
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Welcome to Atlas Technosoft</h2>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    I'm your AI assistant. Ask me anything about SAP Business One, 
                    automation solutions, or how Atlas can help your business.
                  </p>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    {initialSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`px-3 py-2.5 rounded-lg text-left transition-colors ${
                          darkMode 
                            ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200' 
                            : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700'
                        }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === MessageType.USER ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 shadow-sm ${
                      message.type === MessageType.USER
                        ? "bg-indigo-600 text-white"
                        : darkMode 
                          ? "bg-gray-800 border border-gray-700 text-gray-200" 
                          : "bg-gray-50 border border-gray-200 text-gray-800"
                    }`}
                  >
                    {/* Handle bot message with special formatting */}
                    {message.type === MessageType.BOT ? (
                      <div>
                        {/* Main bot response */}
                        <div className={`prose prose-sm max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                          {/* @ts-ignore - Type issues with ReactMarkdown components */}
                          <ReactMarkdown 
                            components={{
                              a: ({ ...props }) => (
                                <a 
                                  {...props} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className={`${darkMode ? 'text-blue-400' : 'text-indigo-600'} hover:underline`}
                                />
                              ),
                              ul: ({ ...props }) => (
                                <ul {...props} className="list-disc pl-4 mt-2 mb-2" />
                              ),
                              ol: ({ ...props }) => (
                                <ol {...props} className="list-decimal pl-4 mt-2 mb-2" />
                              ),
                              li: ({ ...props }) => (
                                <li {...props} className="mb-1" />
                              ),
                              p: ({ ...props }) => (
                                <p {...props} className="mb-2" />
                              ),
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              code: ({ className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || '');
                                const isInline = !match && children && typeof children[0] === 'string';
                                
                                return isInline ? 
                                  <code {...props} className={`px-1 py-0.5 rounded text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>{children}</code> :
                                  <code {...props} className={`block p-2 rounded text-sm overflow-x-auto my-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>{children}</code>;
                              },
                              pre: ({ ...props }) => (
                                <pre {...props} className="bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto my-3" />
                              ),
                            }}
                          >
                            {message.text}
                          </ReactMarkdown>
                        </div>

                        {/* Web search results if available */}
                        {message.webSearchResults && message.webSearchResults.length > 0 && (
                          <div className={`mt-3 pt-3 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
                            <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sources:</p>
                            <div className="space-y-2">
                              {message.webSearchResults.slice(0, 3).map((result, index) => (
                                <div key={index} className="text-xs">
                                  <a
                                    href={result.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`font-medium hover:underline ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`}
                                  >
                                    {result.title || result.url}
                                  </a>
                                  {result.snippet && (
                                    <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xs line-clamp-2`}>
                                      {result.snippet}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Only show feedback if the message is eligible */}
                        {lastFeedbackId !== message.id && (
                          <div className="mt-2 flex justify-end items-center space-x-2">
                            <button
                              onClick={() => handleFeedback(message.id, true)}
                              className={`text-xs transition-colors ${darkMode ? 'text-gray-500 hover:text-green-400' : 'text-gray-400 hover:text-green-500'}`}
                              aria-label="Thumbs up"
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                <button
                              onClick={() => handleFeedback(message.id, false)}
                              className={`text-xs transition-colors ${darkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}
                              aria-label="Thumbs down"
                            >
                              <ThumbsDown className="w-4 h-4" />
                </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      // User message (simpler)
                      <div className="font-medium">{message.text}</div>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {/* Show typing indicator when response is loading */}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`rounded-lg px-4 py-2 max-w-[85%] shadow-sm ${
                  darkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Error message */}
            {isError && (
              <div className="flex justify-center my-2">
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm flex items-center border border-red-200">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Connection error. Please try again.
                </div>
              </div>
            )}
          </div>
          
          {/* Suggested questions display */}
          {showSuggestions && messages.length > 0 && (
            <div className={`px-4 py-3 ${darkMode ? 'border-t border-gray-800' : 'border-t border-gray-200'}`}>
              <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {messages[messages.length - 1].suggestedQuestions?.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSuggestionClick(question)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                      darkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200' 
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700'
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>
                </div>
              )}

          {/* Input area */}
          <div className={`p-4 ${darkMode ? 'border-t border-gray-800' : 'border-t border-gray-200'}`}>
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className={`w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 min-h-[40px] max-h-[120px] ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white focus:ring-indigo-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-indigo-500'
                  }`}
                  style={{ height: "40px" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  disabled={isLoading}
                  rows={1}
                />
              </div>
              
              <button
                type="submit"
                className={`text-white rounded-lg p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode 
                    ? 'bg-indigo-500 hover:bg-indigo-600' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        )}
    </div>
  );
} 

// Export as both named and default export for backward compatibility
export default ChatWidget; 