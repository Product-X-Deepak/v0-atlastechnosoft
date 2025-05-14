"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { X, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Suspense } from "react"

function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    // Check if the popup has been shown in this session
    const hasShown = sessionStorage.getItem("exitIntentShown")
    if (hasShown) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger once and when mouse leaves from the top of the page
      if (!hasTriggeredRef.current && e.clientY <= 5) {
        setIsVisible(true)
        hasTriggeredRef.current = true
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
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsLoading(true)

    try {
      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: "Exit Intent Subscriber", // API requires name field
          formType: 'newsletter'
        })
      });
      
      if (!response.ok) {
        throw new Error('Subscription request failed');
      }

      toast.success("Thank you for subscribing!", {
        description: "We'll keep you updated with our latest news and offers.",
      })

      setIsVisible(false)
      setEmail("")
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="mx-4 max-w-md"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Card className="relative overflow-hidden border-primary/20 bg-background/80 backdrop-blur-md">
              {/* Decorative background elements */}
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-2xl"></div>
              <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-purple-500/10 blur-2xl"></div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>

              <CardHeader>
                <CardTitle className="text-center text-2xl">Before You Go...</CardTitle>
                <CardDescription className="text-center">
                  Subscribe to our newsletter and stay updated with the latest in ERP solutions and automation.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 futuristic-input"
                    disabled={isLoading}
                  />
                  <Button type="submit" className="w-full futuristic-button" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe Now"
                    )}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
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
function ExitIntentPopupWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ExitIntentPopup {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ExitIntentPopupWrapper as ExitIntentPopup };