"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Message, MessageType, WebSearchResult as _WebSearchResult } from "@/lib/chatbot/types";
import { cn } from "@/lib/utils";
import { ChevronDown as _ChevronDown, ChevronUp as _ChevronUp, Bot as _Bot, ThumbsDown, ThumbsUp, User as _User, ExternalLink, Globe as _Globe, Search as _Search, Link as _Link, Info as _Info, AlertCircle } from "lucide-react";
import { Button as _Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils/formatting";

// Adding missing properties to the Message type interface
declare module "@/lib/chatbot/types" {
  interface Message {
    confidence?: number;
    isWebSearch?: boolean;
    needsClarification?: boolean;
    isFaq?: boolean;
    isTemporary?: boolean;
  }
}

export interface ChatMessageProps {
  message: Message;
  onFeedback?: (messageId: string, isHelpful: boolean, comment?: string) => void;
  disableFeedback?: boolean;
  showTimestamp?: boolean;
}

// Export ChatMessage as default for proper importing
export default function ChatMessage({ 
  message, 
  onFeedback,
  disableFeedback,
  showTimestamp = false
}: ChatMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  
  const isBot = message.type === MessageType.BOT;
  const isUser = message.type === MessageType.USER;
  const _isWelcomeMessage = message.id === "welcome" || message.id === "welcome-reset";
  const hasWebSearchResults = message.webSearchResults && message.webSearchResults.length > 0;

  // Format the timestamp if available
  const formattedTime = message.timestamp ? 
    formatRelativeTime(new Date(message.timestamp)) : "";

  // Calculate the text to display
  const displayText = isExpanded || message.text.length <= 300 
    ? message.text 
    : message.text.substring(0, 300) + "...";

  // Handle feedback submission
  const handleFeedback = async (isHelpful: boolean) => {
    if (!onFeedback || isSubmittingFeedback || feedbackGiven !== null) return;
    
    try {
      setIsSubmittingFeedback(true);
      await onFeedback(message.id, isHelpful);
      
      setFeedbackGiven(isHelpful);
      setIsSubmittingFeedback(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setIsSubmittingFeedback(false);
    }
  };
  
  // Security function to sanitize URLs
  function sanitizeUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      // Remove any unwanted parameters that could be used for tracking
      urlObj.searchParams.delete('utm_source');
      urlObj.searchParams.delete('utm_medium');
      urlObj.searchParams.delete('utm_campaign');
      return urlObj.toString();
    } catch {
      // If URL is invalid, return a safe value
      return '#';
    }
  }
    
    return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
          className={cn(
        "flex items-start gap-3",
        isBot ? "justify-start" : "justify-end"
          )}
    >
      {isBot && (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
          A
        </div>
      )}
      
      <div className="flex flex-col">
        <div className={cn(
          "px-4 py-3 rounded-lg max-w-[85%] sm:max-w-md shadow-sm",
          isBot ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-800 border border-indigo-100" : 
                 "bg-gradient-to-r from-indigo-500 to-blue-600 text-white ml-auto"
        )}>
          {/* Message metadata */}
          {isBot && (
            <div className="flex items-center gap-2 mb-1">
              {message.isWebSearch && (
                <div className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                  Web Search
                </div>
              )}
              {message.isFaq && (
                <div className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  FAQ
                </div>
              )}
              {message.confidence && message.confidence < 0.5 && (
                <div className="px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Low confidence
        </div>
              )}
          </div>
        )}
        
          {/* Message content */}
          <div className="whitespace-pre-wrap">{displayText}</div>
          
          {/* Show read more button for long messages */}
          {message.text.length > 300 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs mt-2 font-medium"
              type="button"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
          
          {/* Sources section for bot messages */}
          {isBot && isExpanded && message.source && (
            <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
              <p className="font-medium">Source: {message.source}</p>
            </div>
          )}
          
          {/* Web search results */}
          {isBot && isExpanded && hasWebSearchResults && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 mb-1">Web Search Results:</p>
              <div className="space-y-1">
                {message.webSearchResults!.slice(0, 2).map((result, index) => {
                  const safeUrl = sanitizeUrl(result.url);
                  return (
                    <div key={index} className="text-xs bg-white p-1.5 rounded border border-gray-200">
                      <a 
                        href={safeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline flex items-center"
                      >
                        {result.title}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                      <p className="text-gray-600 line-clamp-1 mt-0.5">{result.snippet}</p>
                    </div>
                  );
                })}
              </div>
              </div>
            )}
          </div>
        
        {/* Timestamp */}
        {showTimestamp && formattedTime && (
          <div className="text-xs text-gray-400 mt-1 px-1">
            {formattedTime}
        </div>
        )}
        
        {/* Feedback buttons */}
        {isBot && onFeedback && !disableFeedback && (
          <div className="flex items-center space-x-2 mt-1.5 ml-auto">
            <button
                  onClick={() => handleFeedback(true)}
              disabled={feedbackGiven !== null || isSubmittingFeedback}
              className={cn(
                "p-1 rounded transition-colors",
                feedbackGiven === true ? "text-green-500 bg-green-50" : "text-gray-400 hover:bg-gray-100"
              )}
                  aria-label="Mark as helpful"
                >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
            <button
                  onClick={() => handleFeedback(false)}
              disabled={feedbackGiven !== null || isSubmittingFeedback}
              className={cn(
                "p-1 rounded transition-colors",
                feedbackGiven === false ? "text-red-500 bg-red-50" : "text-gray-400 hover:bg-gray-100"
              )}
                  aria-label="Mark as not helpful"
                >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-bold">
          U
    </div>
      )}
    </motion.div>
  );
} 