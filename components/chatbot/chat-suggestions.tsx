"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SuggestionCategory, SuggestionData } from "@/lib/chatbot/types";

export interface ChatSuggestionsProps {
  suggestions: string[] | SuggestionData[];
  onSelect: (suggestion: string) => void;
  className?: string;
}

// Add default export for proper importing
export default function ChatSuggestions({
  suggestions,
  onSelect,
  className,
}: ChatSuggestionsProps) {
  // Process suggestions to ensure they're in the right format
  const processedSuggestions = React.useMemo(() => {
    return suggestions.map((suggestion) => {
      if (typeof suggestion === "string") {
        // Special handling for "Other" option
        if (suggestion === "Other (Ask anything)") {
          return { 
            text: suggestion,
            category: "other",
            icon: "✨",
            priority: -1 // Ensure it appears at the end
          };
        }
        
        // Try to categorize based on content
        let category: SuggestionCategory = "general";
        
        const lowerSuggestion = suggestion.toLowerCase();
        if (lowerSuggestion.includes("sap") || lowerSuggestion.includes("business one")) {
          category = "sap";
        } else if (
          lowerSuggestion.includes("automation") || 
          lowerSuggestion.includes("rpa") || 
          lowerSuggestion.includes("uipath")
        ) {
          category = "automation";
        } else if (
          lowerSuggestion.includes("contact") || 
          lowerSuggestion.includes("call") || 
          lowerSuggestion.includes("email") ||
          lowerSuggestion.includes("representative")
        ) {
          category = "contact";
        } else if (
          lowerSuggestion.includes("about") || 
          lowerSuggestion.includes("who") || 
          lowerSuggestion.includes("what") ||
          lowerSuggestion.includes("where")
        ) {
          category = "info";
        }
        
        return { 
          text: suggestion,
          category,
          icon: getCategoryIcon(category),
          priority: getPriorityByContent(lowerSuggestion)
        };
      }
      
      return {
        ...suggestion,
        icon: suggestion.icon || getCategoryIcon(suggestion.category || "general")
      };
    })
    // Sort by priority if available
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }, [suggestions]);

  // Get appropriate icon based on category
  function getCategoryIcon(category: SuggestionCategory): string {
    switch (category) {
      case "sap":
        return "💼";
      case "automation":
        return "🤖";
      case "contact":
        return "📞";
      case "info":
        return "ℹ️";
      case "other":
        return "✨";
      default:
        return "💬";
    }
  }
  
  // Calculate priority for sorting suggestions
  function getPriorityByContent(text: string): number {
    // Contact-related should usually come last
    if (text.includes("contact") || text.includes("representative")) {
      return 0;
    }
    
    // Direct question answers should be prioritized
    if (text.startsWith("yes") || text.startsWith("no")) {
      return 3;
    }
    
    // Questions about core services should be higher
    if (text.includes("sap") || text.includes("automation")) {
      return 2;
    }
    
    return 1;
  }
  
  // Helper to determine background color based on category
  function getCategoryColor(category: SuggestionCategory): string {
    switch (category) {
      case "sap":
        return "bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 text-blue-800";
      case "automation":
        return "bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200 text-emerald-800";
      case "contact":
        return "bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-orange-200 text-amber-800";
      case "info":
        return "bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 border-purple-200 text-purple-800";
      case "other":
        return "bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 border-pink-200 text-rose-800";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 border-gray-200 text-gray-800";
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {processedSuggestions.map((suggestion, i) => (
          <motion.button
          key={suggestion.text}
          onClick={() => onSelect(suggestion.text)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, delay: i * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
            className={cn(
            "px-3 py-2 rounded-lg text-sm border text-left transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
            getCategoryColor((suggestion.category || "general") as SuggestionCategory)
            )}
          >
          <span className="flex items-center gap-2">
            {suggestion.icon && (
              <span className="text-lg">{suggestion.icon}</span>
            )}
            <span>{suggestion.text}</span>
          </span>
          </motion.button>
        ))}
    </div>
  );
} 