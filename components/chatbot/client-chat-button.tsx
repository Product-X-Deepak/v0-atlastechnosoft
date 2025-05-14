"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import the chat widget with loading optimization
const ChatWidgetDynamic = dynamic(() => import("./chat-widget"), {
  ssr: false,
  loading: () => null,
});

interface ClientChatButtonProps {
  label?: string;
  showLabel?: boolean;
}

export default function ClientChatButton({ label = "Chat with us", showLabel = false }: ClientChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="fixed bottom-4 right-4 z-40"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg ${showLabel ? "h-12 px-4 rounded-full" : "h-14 w-14 rounded-full"}`}
          size={showLabel ? "default" : "icon"}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <X className="h-6 w-6" />
                {showLabel && <span className="ml-2">{label}</span>}
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <MessageCircle className="h-6 w-6" />
                {showLabel && <span className="ml-2">{label}</span>}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <ChatWidgetDynamic 
            key="chat-widget"
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
} 