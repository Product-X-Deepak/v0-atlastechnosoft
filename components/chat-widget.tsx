"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Bot, User, Loader2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { Suspense } from "react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Inner component that uses usePathname
function ChatWidgetInner() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pathname = usePathname()

  // Get context-aware greeting based on current page
  const getContextAwareGreeting = useCallback(() => {
    const pagePath = pathname.split("/").filter(Boolean)

    if (pagePath.length === 0) {
      return "👋 Welcome to Atlas Technosoft! How can I assist you today?"
    }

    const pageContext = {
      "sap-solutions": "👋 Interested in our SAP solutions? Ask me anything about our offerings!",
      "business-one": "👋 Looking for information about SAP Business One? I&apos;m here to help!",
      "ai-automation": "👋 Curious about our AI & Automation solutions? Let me know your questions!",
      services: "👋 Need information about our services? Feel free to ask!",
      about: "👋 Want to learn more about Atlas Technosoft? I&apos;m here to help!",
      contact: "👋 Ready to get in touch? I can help connect you with the right team!",
      careers: "👋 Interested in joining our team? Ask me about our open positions!",
    }

    const contextKey = Object.keys(pageContext).find((key) => pagePath[0] === key || pagePath[1] === key)
    return contextKey ? pageContext[contextKey as keyof typeof pageContext] : "👋 How can I help you today?"
  }, [pathname])

  // Set isMounted and add the initial welcome message once
  useEffect(() => {
    setIsMounted(true)
    setMessages([
      {
        id: "welcome",
        content: getContextAwareGreeting(),
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }, [getContextAwareGreeting]) // Only depends on getContextAwareGreeting

  // Update greeting when page changes, but don't create an infinite loop
  useEffect(() => {
    // Skip if no messages or if there's more than just the welcome message
    if (messages.length !== 1 || messages[0]?.id !== "welcome") {
      return;
    }
    
    const newGreeting = getContextAwareGreeting();
    // Only update if greeting has actually changed
    if (messages[0]?.content !== newGreeting) {
      setMessages([
        {
          id: "welcome",
          content: newGreeting,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [pathname, getContextAwareGreeting, messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isSubmitting) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsSubmitting(true)

    try {
      // Show typing indicator by adding a temporary message
      const typingIndicatorId = `typing-${Date.now()}`
      setMessages((prev) => [
        ...prev,
        {
          id: typingIndicatorId,
          content: "Typing...",
          sender: "bot",
          timestamp: new Date(),
        },
      ])

      // Send message to the API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          name: "Chat User", // Generic name for chat users
          email: "chat@visitor.com", // Generic email for tracking purposes
          formType: 'chat',
          currentPage: pathname
        })
      })

      // Remove typing indicator
      setMessages((prev) => prev.filter((msg) => msg.id !== typingIndicatorId))

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      // Bot response
      const responseData = await response.json()
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: responseData.reply || getBotResponse(userMessage.content),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      // Fallback to local response
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "I&apos;m having trouble connecting to our servers. Please try again later or contact us at info@atlastechnosoft.com.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsSubmitting(false)
    }
  }

  // Simple bot response based on keywords (fallback)
  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
      return "Our pricing depends on your specific business needs. I&apos;d be happy to connect you with our sales team for a personalized quote. Would you like me to arrange a call?"
    }

    if (lowerMessage.includes("demo") || lowerMessage.includes("trial") || lowerMessage.includes("try")) {
      return "We offer personalized demos of our solutions. Please provide your email address and our team will reach out to schedule one that fits your requirements."
    }

    if (lowerMessage.includes("contact") || lowerMessage.includes("support") || lowerMessage.includes("help")) {
      return "You can reach our team at info@atlastechnosoft.com or call us at +91-22-2240 1925. Would you like me to arrange a callback instead?"
    }

    if (lowerMessage.includes("sap") || lowerMessage.includes("business one") || lowerMessage.includes("erp")) {
      return "SAP Business One is our comprehensive ERP solution designed for small and medium-sized businesses. It helps streamline operations, gain better business insights, and accelerate profitable growth. Would you like to learn more about specific features?"
    }

    if (lowerMessage.includes("automation") || lowerMessage.includes("ai") || lowerMessage.includes("rpa")) {
      return "Our automation solutions leverage AI and RPA technologies to streamline workflows, reduce manual tasks, and boost productivity. We can help automate various business processes including finance, HR, customer service, and more. What specific processes are you looking to automate?"
    }

    return "Thank you for your message. Our team will get back to you shortly with more information. Is there anything specific you&apos;d like to know in the meantime?"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!isMounted) return null

  return (
    <>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-14 xs:bottom-16 sm:bottom-20 right-2 xs:right-4 z-50 w-[calc(100%-1rem)] xs:w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[380px] sm:right-6 md:right-8"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Subtle glow effect behind card */}
            <div className="absolute -inset-1 xs:-inset-1.5 sm:-inset-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-400/20 rounded-2xl blur-xl opacity-70"></div>
            
            <Card className="border-amber-500/20 shadow-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-md relative overflow-hidden rounded-xl border-[1.5px]">
              {/* Subtle gradient overlay on the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-yellow-500/[0.03]"></div>
              
              <CardHeader className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-400/5 pb-1 xs:pb-1.5 sm:pb-2 pt-1 xs:pt-1.5 sm:pt-2 px-1.5 xs:px-2 sm:px-3 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/3"></div>
                
                <div className="flex items-center justify-between relative z-10">
                  <CardTitle className="text-xs xs:text-sm font-medium flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                    <Bot className="h-3 w-3 xs:h-3.5 xs:w-3.5 text-amber-500" />
                    <span className="bg-gradient-to-r from-amber-700 to-yellow-600 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">AI Chat Assistant</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 xs:h-7 xs:w-7 rounded-full hover:bg-amber-500/10 transition-colors min-h-[36px] min-w-[36px] touch-target"
                    onClick={() => setIsChatOpen(false)}
                  >
                    <X className="h-3 w-3 xs:h-3.5 xs:w-3.5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-1 xs:p-1.5 sm:p-2 relative">
                <div className="h-[30vh] xs:h-[35vh] sm:h-[40vh] max-h-[180px] xs:max-h-[250px] sm:max-h-[280px] space-y-1.5 xs:space-y-2 sm:space-y-3 overflow-y-auto py-1 xs:py-1.5 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent pr-1 xs:pr-1.5">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className={`flex max-w-[90%] items-start rounded-xl px-1.5 xs:px-2 sm:px-2.5 py-1 xs:py-1.5 ${
                          message.sender === "user" 
                            ? "bg-gradient-to-r from-amber-600 to-yellow-500 text-white" 
                            : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
                        } shadow-sm`}
                      >
                        <div className="mr-1 xs:mr-1.5 mt-0.5">
                          {message.sender === "user" ? (
                            <div className="rounded-full bg-white/20 p-0.5 flex items-center justify-center">
                              <User className="h-2 w-2 xs:h-2.5 xs:w-2.5 text-white" />
                            </div>
                          ) : (
                            <div className="rounded-full bg-amber-500/20 dark:bg-amber-500/40 p-0.5 flex items-center justify-center">
                              {message.content === "Typing..." ? (
                                <Loader2 className="h-2 w-2 xs:h-2.5 xs:w-2.5 text-amber-600 dark:text-amber-400 animate-spin" />
                              ) : (
                                <Bot className="h-2 w-2 xs:h-2.5 xs:w-2.5 text-amber-600 dark:text-amber-400" />
                              )}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className={`text-[10px] xs:text-xs ${message.sender === "user" ? "text-white" : "text-gray-800 dark:text-gray-200"}`}>{message.content}</p>
                          <p className={`mt-0.5 text-[8px] xs:text-[9px] ${message.sender === "user" ? "text-white/60" : "text-gray-500 dark:text-gray-400"}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-1 xs:gap-1.5 border-t border-amber-500/10 p-1 xs:p-1.5 sm:p-2 bg-gradient-to-r from-amber-50/30 to-yellow-50/30 dark:from-gray-900/50 dark:to-gray-900/50">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isSubmitting}
                  className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-amber-500/20 focus:border-amber-500/50 focus:ring-amber-500/50 rounded-full placeholder:text-gray-400 dark:placeholder:text-gray-500 text-[10px] xs:text-xs min-h-[36px] h-8 xs:h-9 px-2.5 touch-target"
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage} 
                  disabled={isSubmitting}
                  className="rounded-full h-8 w-8 xs:h-9 xs:w-9 min-h-[36px] min-w-[36px] bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 shadow-md touch-target"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-3 w-3 xs:h-3.5 xs:w-3.5 text-white animate-spin" />
                  ) : (
                    <Send className="h-3 w-3 xs:h-3.5 xs:w-3.5 text-white" />
                  )}
                  <span className="sr-only">Send</span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-2 xs:bottom-3 sm:bottom-4 right-2 xs:right-3 sm:right-4 z-50 md:right-6 lg:right-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
          delay: 1,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            y: [0, -3, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut" 
          }}
          className="relative"
        >
          {/* Glow effect behind button */}
          <div className="absolute -inset-1 xs:-inset-1.5 bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-orange-400/30 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Main button */}
          <Button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14 rounded-full shadow-[0_8px_25px_rgba(234,179,8,0.4)] relative overflow-hidden z-10 border-2 border-amber-500/20 dark:border-amber-600/20 min-h-[44px] min-w-[44px] touch-target"
            style={{
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(234, 179, 8, 0.9) 50%, rgba(252, 211, 77, 0.9) 100%)",
              boxShadow: "0 10px 25px -3px rgba(245, 158, 11, 0.4)"
            }}
            aria-label={isChatOpen ? "Close chat" : "Open chat"}
          >
            {/* Animated gradient inside button */}
            <div 
              className="absolute inset-0 rounded-full opacity-80"
              style={{
                background: "linear-gradient(45deg, rgba(245, 158, 11, 0.5) 0%, rgba(234, 179, 8, 0.5) 25%, rgba(252, 211, 77, 0.5) 50%, rgba(253, 230, 138, 0.5) 75%, rgba(252, 211, 77, 0.5) 100%)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 8s ease infinite"
              }}
            ></div>
            
            {/* Inner glow and texture */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent"></div>
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
            
            {/* Light reflection */}
            <div className="absolute top-2 left-3 w-3 h-1 rounded-full bg-white/50 blur-[0.5px] rotate-[30deg] scale-75 xs:scale-90"></div>
            <div className="absolute top-3 left-5 w-1.5 h-1.5 rounded-full bg-white/30 scale-75 xs:scale-90"></div>
            
            {/* Chat icon with pulse effect */}
            <div className="relative z-20 flex items-center justify-center">
              <MessageCircle className={`h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white drop-shadow-xl ${isChatOpen ? "opacity-0" : "opacity-100"} transition-opacity`} />
              <X className={`absolute h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white drop-shadow-xl ${isChatOpen ? "opacity-100" : "opacity-0"} transition-opacity`} />
            </div>
          </Button>
          
          {/* Interactive particle effects */}
          <div className="absolute inset-0 rounded-full pointer-events-none">
            <div className="absolute w-1 h-1 xs:w-1.5 xs:h-1.5 rounded-full bg-amber-400/70 blur-[1px]" style={{ 
              top: '5%', 
              left: '85%',
              animation: 'chat-orbit 3s linear infinite' 
            }}></div>
            <div className="absolute w-0.5 h-0.5 xs:w-1 xs:h-1 rounded-full bg-yellow-400/70 blur-[1px]" style={{ 
              top: '75%', 
              left: '15%',
              animation: 'chat-orbit 4s linear infinite reverse' 
            }}></div>
          </div>
        </motion.div>
        
        {/* Enhanced notification badge */}
        {!isChatOpen && (
          <div className="absolute -top-1 -right-1 flex">
            <div className="absolute inset-0 bg-red-500/30 rounded-full blur-lg animate-pulse"></div>
            <span className="flex h-3.5 w-3.5 xs:h-4 xs:w-4 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-[8px] xs:text-[9px] font-bold text-white shadow-lg relative z-10 border border-amber-500/20">
              1
            </span>
            <span className="absolute inset-0 rounded-full bg-red-500/50 animate-ping"></span>
          </div>
        )}
      </motion.div>
      
      <style jsx global>{`
        @keyframes chat-orbit {
          0% { transform: rotate(0deg) translateX(8px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(8px) rotate(-360deg); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-5px) translateX(3px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  )
}

// Exported component that wraps the inner component with Suspense
function ChatWidget(_props: Record<string, unknown>) {
  return (
    <Suspense fallback={null}>
      <ChatWidgetInner />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ChatWidgetWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ChatWidget {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ChatWidgetWrapper as ChatWidget };