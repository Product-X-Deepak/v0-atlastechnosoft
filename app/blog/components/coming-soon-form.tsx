"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Suspense } from "react"

function ComingSoonForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address")
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
          name: "Blog Subscriber", // API requires name field
          formType: 'newsletter'
        })
      });
      
      if (!response.ok) {
        throw new Error('Subscription request failed');
      }
      
      // Success
      setSubmitted(true)
      toast.success("Thank you for subscribing! We&apos;ll notify you when our blog launches.")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          We&apos;ll notify you when our blog launches.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-left">
          Email address
        </Label>
        <div className="flex gap-2">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background/60 border-primary/20 focus:border-premium-orange"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-premium-orange hover:bg-premium-orange/90 text-primary-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        We&apos;ll only send you updates about our blog. You can unsubscribe at any time.
      </p>
    </form>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ComingSoonFormWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ComingSoonForm {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ComingSoonFormWrapper as ComingSoonForm };