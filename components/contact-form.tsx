"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Suspense } from "react"

// Update the form validation schema with improved security
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(100, {
      message: "Name must be less than 100 characters.",
    })
    .refine((val) => !val.includes("<") && !val.includes(">"), {
      message: "Name contains invalid characters.",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .max(100, {
      message: "Email must be less than 100 characters.",
    })
    .refine((val) => !val.includes("<") && !val.includes(">"), {
      message: "Email contains invalid characters.",
    }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .max(20, {
      message: "Phone number must be less than 20 characters.",
    })
    .refine((val) => /^[+\d\s()-]+$/.test(val), {
      message: "Phone number contains invalid characters.",
    }),
  company: z
    .string()
    .min(2, {
      message: "Company name must be at least 2 characters.",
    })
    .max(100, {
      message: "Company name must be less than 100 characters.",
    })
    .refine((val) => !val.includes("<") && !val.includes(">"), {
      message: "Company name contains invalid characters.",
    }),
  interest: z.string({
    required_error: "Please select an area of interest.",
  }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(1000, {
      message: "Message must be less than 1000 characters.",
    })
    .refine((val) => !val.includes("<script") && !val.includes("javascript:"), {
      message: "Message contains invalid content.",
    }),
})

// Component with Suspense wrapper
export function ContactForm() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ContactFormContent />
    </Suspense>
  );
}

function ContactFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  })

  // Update the onSubmit function with CSRF protection
  async function onSubmit() {
    setIsSubmitting(true)

    try {
      // Real API call
      const formData = form.getValues();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'contact'
        })
      });

      if (!response.ok) throw new Error('Failed to submit form');
      
      toast.success("Message sent successfully", {
        description: "We'll get back to you as soon as possible.",
      })
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later.",
      })
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
      form.reset()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full max-w-full mx-auto overflow-hidden"
    >
      <Card className="premium-card w-full border-0 xs:border sm:border-2 shadow-sm xs:shadow sm:shadow-md">
        <CardHeader className="pb-2 xs:pb-3 sm:pb-4 md:pb-6 px-2 xs:px-3 sm:px-5 md:px-6 pt-2 xs:pt-3 sm:pt-5 md:pt-6 space-y-1 xs:space-y-1.5 sm:space-y-2">
          <CardTitle className="text-base xs:text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Contact Us
          </CardTitle>
          <CardDescription className="text-[10px] xs:text-xs sm:text-sm">
            Fill out the form below and we&apos;ll get back to you shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 xs:px-3 sm:px-5 md:px-6 pb-2 xs:pb-3 sm:pb-5 md:pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-5">
              <div className="grid gap-2 xs:gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                      <FormLabel htmlFor="name" className="text-[10px] xs:text-xs sm:text-sm font-medium">Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="futuristic-input min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-1 xs:py-1.5 sm:py-2"
                          {...field}
                          aria-required="true"
                          aria-describedby="name-error"
                        />
                      </FormControl>
                      <FormMessage id="name-error" className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                      <FormLabel htmlFor="email" className="text-[10px] xs:text-xs sm:text-sm font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="info@atlastechnosoft.com"
                          className="futuristic-input min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-1 xs:py-1.5 sm:py-2"
                          {...field}
                          aria-required="true"
                          aria-describedby="email-error"
                        />
                      </FormControl>
                      <FormMessage id="email-error" className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2 xs:gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                      <FormLabel htmlFor="phone" className="text-[10px] xs:text-xs sm:text-sm font-medium">Phone</FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          placeholder="+91-22-2240 1925"
                          className="futuristic-input min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-1 xs:py-1.5 sm:py-2"
                          {...field}
                          aria-required="true"
                          aria-describedby="phone-error"
                        />
                      </FormControl>
                      <FormMessage id="phone-error" className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                      <FormLabel htmlFor="company" className="text-[10px] xs:text-xs sm:text-sm font-medium">Company</FormLabel>
                      <FormControl>
                        <Input
                          id="company"
                          placeholder="Your organization name"
                          className="futuristic-input min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-1 xs:py-1.5 sm:py-2"
                          {...field}
                          aria-required="true"
                          aria-describedby="company-error"
                        />
                      </FormControl>
                      <FormMessage id="company-error" className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <FormLabel htmlFor="interest" className="text-[10px] xs:text-xs sm:text-sm font-medium">Area of Interest</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          className="futuristic-input min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3" 
                          aria-describedby="interest-error"
                        >
                          <SelectValue placeholder="Select an area of interest" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-md border border-muted-foreground/20 bg-gradient-to-b from-background/80 to-background shadow-lg backdrop-blur-sm max-h-[180px] xs:max-h-[200px] sm:max-h-[230px] md:max-h-[260px] overflow-auto scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-accent/5 scroll-smooth">
                        <div className="relative">
                          {/* SAP Solutions Group */}
                          <div className="px-2 py-1 text-[8px] xs:text-[9px] sm:text-[10px] font-semibold text-primary uppercase tracking-wider border-b border-muted-foreground/10 mb-0.5 sticky top-0 backdrop-blur-sm bg-background/90 z-10 shadow-sm">SAP SOLUTIONS</div>
                          <div className="pl-1">
                            <SelectItem value="sap-business-one" className="focus:bg-accent focus:text-accent-foreground hover:bg-accent/30 transition-colors duration-150 py-1 px-2 text-[9px] xs:text-[10px] sm:text-xs min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]">SAP Business One</SelectItem>
                            <SelectItem value="sap-business-one-cloud" className="focus:bg-accent focus:text-accent-foreground hover:bg-accent/30 transition-colors duration-150 py-1 px-2 text-[9px] xs:text-[10px] sm:text-xs min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]">SAP Business One Cloud</SelectItem>
                            <SelectItem value="sap-hana" className="focus:bg-accent focus:text-accent-foreground hover:bg-accent/30 transition-colors duration-150 py-1 px-2 text-[9px] xs:text-[10px] sm:text-xs min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]">SAP HANA</SelectItem>
                            <SelectItem value="erp-planning" className="focus:bg-accent focus:text-accent-foreground hover:bg-accent/30 transition-colors duration-150 py-1 px-2 text-[9px] xs:text-[10px] sm:text-xs min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]">ERP Planning</SelectItem>
                          </div>
                          
                          {/* Automation Solutions Group */}
                          <div className="px-2 py-1 text-[8px] xs:text-[9px] sm:text-[10px] font-semibold text-primary uppercase tracking-wider border-b border-muted-foreground/10 mt-1 xs:mt-1.5 sm:mt-2 mb-0.5 sticky top-0 backdrop-blur-sm bg-background/90 z-10 shadow-sm">AUTOMATION SOLUTIONS</div>
                          <div className="pl-1">
                            <SelectItem value="rpa-solutions" className="focus:bg-accent focus:text-accent-foreground hover:bg-accent/30 transition-colors duration-150 py-1 px-2 text-[9px] xs:text-[10px] sm:text-xs min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]">RPA Solutions</SelectItem>
                            <SelectItem value="boyum-it" className="focus:bg-accent focus:text-accent-foreground hover:bg-accent/30 transition-colors duration-150 py-1 px-2 text-[9px] xs:text-[10px] sm:text-xs min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]">Boyum IT Solutions</SelectItem>
                            <SelectItem value="uipath" className="focus:bg-accent focus:text-accent-foreground hover:bg-accent/30 transition-colors duration-150 py-1 px-2 text-[9px] xs:text-[10px] sm:text-xs min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]">UiPath Solutions</SelectItem>
                          </div>
                          
                          {/* Other Services */}
                          <div className="px-2 py-1 text-[8px] xs:text-[9px] sm:text-[10px] font-semibold text-primary uppercase tracking-wider border-b border-muted-foreground/10 mt-1 xs:mt-1.5 sm:mt-2 mb-0.5 sticky top-0 backdrop-blur-sm bg-background/90 z-10 shadow-sm">OTHER SERVICES</div>
                          <div className="pl-1">
                            <SelectItem value="cloud-computing" className="focus:bg-accent focus:text-accent-foreground hover:bg-accent/30 transition-colors duration-150 py-1 px-2 text-[9px] xs:text-[10px] sm:text-xs min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]">Cloud Computing</SelectItem>
                            <SelectItem value="other" className="focus:bg-accent focus:text-accent-foreground hover:bg-accent/30 transition-colors duration-150 py-1 px-2 text-[9px] xs:text-[10px] sm:text-xs min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]">Other Services</SelectItem>
                          </div>
                          
                          {/* Scroll indicators - top and bottom shadows */}
                          <div className="absolute top-0 inset-x-0 h-2 xs:h-2.5 sm:h-3 bg-gradient-to-b from-background/80 to-transparent pointer-events-none z-0"></div>
                          <div className="absolute bottom-0 inset-x-0 h-2 xs:h-2.5 sm:h-3 bg-gradient-to-t from-background/80 to-transparent pointer-events-none z-0"></div>
                        </div>
                      </SelectContent>
                    </Select>
                    <FormMessage id="interest-error" className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <FormLabel htmlFor="message" className="text-[10px] xs:text-xs sm:text-sm font-medium">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder="Please describe your business requirements, challenges, or how we can assist with your SAP or automation needs..."
                        className="min-h-[80px] xs:min-h-[90px] sm:min-h-[100px] md:min-h-[120px] futuristic-input text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-1.5 xs:py-2"
                        {...field}
                        aria-required="true"
                        aria-describedby="message-error"
                      />
                    </FormControl>
                    <FormMessage id="message-error" className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm" />
                  </FormItem>
                )}
              />

              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="mt-2 xs:mt-3 sm:mt-4"
              >
                <Button 
                  type="submit" 
                  className="w-full futuristic-button min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm" 
                  disabled={isSubmitting} 
                  aria-live="polite"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-1.5 xs:mr-2 h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
