"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Suspense } from "react"

function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    // Check if the popup has been shown in this session
    const hasShown = sessionStorage.getItem("exitIntentShown")
    if (hasShown) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger once and when mouse leaves from the top of the page
      if (!hasTriggered && e.clientY <= 5) {
        setIsVisible(true)
        setHasTriggered(true)
        // Mark as shown in this session
        sessionStorage.setItem("exitIntentShown", "true")
      }
    }

    // Add a delay before enabling the exit intent detection
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hasTriggered])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    // Here you would typically send the email to your server
    toast.success("Thank you for subscribing!", {
      description: "We'll keep you updated with our latest news and offers.",
    })

    setIsVisible(false)
    setEmail("")
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 xs:p-3 sm:p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-full max-w-[300px] xs:max-w-[320px] sm:max-w-md"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Card className="relative overflow-hidden border-primary/20 bg-background/80 backdrop-blur-md">
              {/* Decorative background elements */}
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-2xl"></div>
              <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-purple-500/10 blur-2xl"></div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 xs:right-2 xs:top-2 h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 rounded-full min-h-[24px] min-w-[24px]"
                onClick={handleClose}
              >
                <X className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">Close</span>
              </Button>

              <CardHeader className="px-3 xs:px-4 sm:px-6 pt-3 xs:pt-4 sm:pt-6 pb-1 xs:pb-2 sm:pb-3">
                <CardTitle className="text-center text-base xs:text-lg sm:text-xl md:text-2xl">Before You Go...</CardTitle>
                <CardDescription className="text-center text-[10px] xs:text-xs sm:text-sm">
                  Subscribe to our newsletter and stay updated with the latest in ERP solutions and automation.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-3 xs:px-4 sm:px-6 pt-1 xs:pt-2 pb-2 xs:pb-3">
                <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-9 xs:h-10 sm:h-11 futuristic-input min-h-[36px] xs:min-h-[40px] text-xs xs:text-sm"
                  />
                  <Button type="submit" className="w-full futuristic-button min-h-[36px] xs:min-h-[40px] text-xs xs:text-sm h-9 xs:h-10 sm:h-11">
                    Subscribe Now
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-1 xs:space-y-2 text-center text-[8px] xs:text-[10px] sm:text-xs text-muted-foreground px-3 xs:px-4 sm:px-6 pb-3 xs:pb-4 sm:pb-6">
                <p>We respect your privacy and will never share your information.</p>
                <p>
                  Already a subscriber?{" "}
                  <Link href="/contact" className="text-primary hover:underline" onClick={handleClose}>
                    Contact us
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ExitIntentPopupWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ExitIntentPopup />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ExitIntentPopupWrapper as ExitIntentPopup };
