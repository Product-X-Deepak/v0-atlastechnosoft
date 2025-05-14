"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button as _Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ClientChatWidget from "./client-chat-widget";

interface ChatButtonProps {
  className?: string;
  variant?: "default" | "outline" | "subtle";
  label?: string;
  _showLabel?: boolean;
}

export default function ChatButton({
  className,
  variant = "default",
  label = "Chat with us",
  _showLabel = true, // Reserved for future implementation of text labels alongside icon
}: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Determine button variant
  const _getVariant = () => {
    switch (variant) {
      case "outline":
        return "border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50";
      case "subtle":
        return "bg-indigo-100 hover:bg-indigo-200 text-indigo-700";
      default:
        return "bg-indigo-600 text-white hover:bg-indigo-700";
    }
  };

  // Futuristic chatbot icon
  const ChatbotIcon = () => (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-full opacity-90 animate-pulse-slow"></div>
      <div className="absolute inset-0.5 bg-indigo-600 rounded-full flex items-center justify-center">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path 
            d="M12 2C6.48 2 2 6.48 2 12C2 14.1 2.67 16.05 3.79 17.65L2.54 21.35C2.44 21.68 2.53 22.04 2.77 22.28C3.01 22.52 3.37 22.61 3.7 22.51L7.4 21.25C8.99 22.37 10.94 23.04 13.04 23.04C18.56 23.04 23.04 18.56 23.04 13.04C23.04 7.52 18.56 3.04 13.04 3.04" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 13.5C12.5523 13.5 13 13.0523 13 12.5C13 11.9477 12.5523 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5C11 13.0523 11.4477 13.5 12 13.5Z" 
            fill="currentColor"
          />
          <path 
            d="M16 13.5C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5C15.4477 11.5 15 11.9477 15 12.5C15 13.0523 15.4477 13.5 16 13.5Z" 
            fill="currentColor"
          />
          <path 
            d="M8 13.5C8.55228 13.5 9 13.0523 9 12.5C9 11.9477 8.55228 11.5 8 11.5C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5Z" 
            fill="currentColor"
          />
        </svg>
      </div>
      {/* Animated rings */}
      <div className="absolute inset-0 border border-white/30 rounded-full animate-ping-slow opacity-70"></div>
      <div className="absolute -inset-1 border border-white/20 rounded-full animate-ping-slower opacity-50"></div>
    </div>
  );

  return (
    <>
      <div 
        onClick={handleToggle}
        className={cn(
          "fixed bottom-4 right-4 z-40 cursor-pointer transition-all duration-300 transform hover:scale-105",
          isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100", 
          className
        )}
        aria-label={label}
      >
        <ChatbotIcon />
      </div>

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] h-auto max-h-[80vh]">
          <div className="relative w-full h-full">
            <button 
              onClick={handleToggle}
              className="absolute -top-3 -right-3 bg-indigo-600 text-white rounded-full p-1.5 shadow-lg z-10 hover:bg-indigo-700 border border-white/20"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
            <ClientChatWidget />
          </div>
        </div>
      )}
    </>
  );
} 