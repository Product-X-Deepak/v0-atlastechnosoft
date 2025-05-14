"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, X } from "lucide-react"
import { Suspense } from "react"

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if window is defined (not in SSR) and localStorage is available
    if (typeof window !== "undefined" && window.localStorage) {
      const consent = localStorage.getItem("cookie-consent")
      if (!consent) {
        // Add a slight delay for better UX
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 2000)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  const acceptAll = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("cookie-consent", "all")
    }
    setIsVisible(false)
  }

  const acceptNecessary = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("cookie-consent", "necessary")
    }
    setIsVisible(false)
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <Card className="mx-auto max-w-4xl shadow-lg border border-primary/20 backdrop-blur-md bg-background/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <span>Cookie Consent</span>
                  <div className="ml-2 inline-flex h-2 w-2 animate-pulse rounded-full bg-primary"></div>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={toggleDetails}
                  aria-label={showDetails ? "Hide cookie details" : "Show cookie details"}
                >
                  {showDetails ? <X size={16} /> : <Settings size={16} />}
                </Button>
              </div>
              <CardDescription>
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
                traffic.
              </CardDescription>
            </CardHeader>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pb-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Necessary Cookies</h4>
                        <p className="text-xs text-muted-foreground">
                          These cookies are essential for the website to function properly and cannot be disabled.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Analytics Cookies</h4>
                        <p className="text-xs text-muted-foreground">
                          These cookies help us understand how visitors interact with our website, helping us improve
                          our services.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Marketing Cookies</h4>
                        <p className="text-xs text-muted-foreground">
                          These cookies are used to track visitors across websites to display relevant advertisements.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>

            <CardContent className={showDetails ? "pt-0" : ""}>
              <p className="text-sm text-muted-foreground">
                By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can also choose to only accept
                necessary cookies that are required for the website to function properly.{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Learn more about our cookie policy
                </Link>
                .
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={acceptNecessary}
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                Necessary Only
              </Button>
              <Button onClick={acceptAll} className="futuristic-button">
                Accept All
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CookieConsentWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CookieConsent {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CookieConsentWrapper as CookieConsent };