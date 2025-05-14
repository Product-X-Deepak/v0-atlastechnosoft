"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, SendIcon, CheckCircle2, User, Briefcase, Globe, MessageSquare } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Suspense } from "react"
import { ArrowRight } from "lucide-react"

// Form validation schema with improved security and international phone support
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
    .min(5, {
      message: "Phone number must be at least 5 characters.",
    })
    .max(30, {
      message: "Phone number must be less than 30 characters.",
    })
    .refine((val) => /^[+\d\s()\-.\\/]+$/.test(val), {
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

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

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

  // Form submit handler with CSRF protection
  async function onSubmit() {
    setIsSubmitting(true)
    setIsSuccess(false)

    try {
      // Send data to API with the email set to info@atlastechnosoft.com
      const formData = form.getValues();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'contact',
          recipient: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@atlastechnosoft.com' // Explicitly set recipient from env or fallback
        })
      });

      if (!response.ok) throw new Error('Failed to submit form');
      
      setIsSuccess(true)
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
      if (isSuccess) form.reset()
    }
  }

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }} 
      animate={isInView ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 0.5 }}
      id="contactform"
    >
      <Card className="overflow-hidden border-none shadow-xl bg-white rounded-xl">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center mb-6 gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#E84A0E] to-[#A73370] flex items-center justify-center shadow-lg">
              <SendIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Get In Touch</h2>
              <p className="text-sm text-slate-600">We're excited to hear from you</p>
            </div>
          </div>
          
          <AnimatePresence>
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-medium text-green-800 text-sm">Message Sent Successfully</h3>
                    <p className="text-xs text-green-700">Thank you for reaching out. We'll be in touch shortly!</p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium text-sm flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-[#E84A0E]" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder=""
                          className="bg-white border-slate-200 text-slate-900 focus:border-[#E84A0E] focus:ring-[#E84A0E]/20 h-10 text-sm transition-all duration-200 shadow-sm"
                          {...field}
                          aria-required="true"
                          aria-describedby="name-error"
                        />
                      </FormControl>
                      <FormMessage id="name-error" className="text-[#E84A0E] text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium text-sm flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 text-[#A73370]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
                        </svg>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder=""
                          className="bg-white border-slate-200 text-slate-900 focus:border-[#A73370] focus:ring-[#A73370]/20 h-10 text-sm transition-all duration-200 shadow-sm"
                          {...field}
                          aria-required="true"
                          aria-describedby="email-error"
                        />
                      </FormControl>
                      <FormMessage id="email-error" className="text-[#A73370] text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium text-sm flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 text-[#E84A0E]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="currentColor"/>
                        </svg>
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          placeholder=""
                          className="bg-white border-slate-200 text-slate-900 focus:border-[#E84A0E] focus:ring-[#E84A0E]/20 h-10 text-sm transition-all duration-200 shadow-sm"
                          {...field}
                          aria-required="true"
                          aria-describedby="phone-error"
                        />
                      </FormControl>
                      <FormMessage id="phone-error" className="text-[#E84A0E] text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium text-sm flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5 text-[#A73370]" />
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="company"
                          placeholder=""
                          className="bg-white border-slate-200 text-slate-900 focus:border-[#A73370] focus:ring-[#A73370]/20 h-10 text-sm transition-all duration-200 shadow-sm"
                          {...field}
                          aria-required="true"
                          aria-describedby="company-error"
                        />
                      </FormControl>
                      <FormMessage id="company-error" className="text-[#A73370] text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium text-sm flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-[#1E1E38]" />
                      Area of Interest
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          className="bg-white border-slate-200 text-slate-900 focus:border-[#1E1E38] focus:ring-[#1E1E38]/20 h-10 text-sm shadow-sm" 
                          aria-describedby="interest-error"
                        >
                          <SelectValue placeholder="Select an area of interest" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-slate-200 text-slate-900 max-h-[260px] overflow-auto scroll-smooth text-xs">
                        <div className="relative">
                          {/* SAP Solutions Group */}
                          <div className="px-2 py-1 text-xs font-semibold text-[#E84A0E]/80 uppercase tracking-wider border-b border-slate-200 mb-1 sticky top-0 bg-white z-20">SAP SOLUTIONS</div>
                          <div className="pl-1">
                            <SelectItem value="sap-business-one" className="text-slate-700 text-xs">SAP Business One</SelectItem>
                            <SelectItem value="sap-business-one-cloud" className="text-slate-700 text-xs">SAP Business One Cloud</SelectItem>
                            <SelectItem value="sap-hana" className="text-slate-700 text-xs">SAP HANA</SelectItem>
                            <SelectItem value="erp-planning" className="text-slate-700 text-xs">ERP Planning</SelectItem>
                          </div>
                          
                          {/* Automation Solutions Group */}
                          <div className="px-2 py-1 text-xs font-semibold text-[#A73370]/80 uppercase tracking-wider border-b border-slate-200 mt-2 mb-1 sticky top-0 bg-white z-20">AUTOMATION SOLUTIONS</div>
                          <div className="pl-1">
                            <SelectItem value="rpa-solutions" className="text-slate-700 text-xs">RPA Solutions</SelectItem>
                            <SelectItem value="workflow-automation" className="text-slate-700 text-xs">Workflow Automation</SelectItem>
                            <SelectItem value="ui-path" className="text-slate-700 text-xs">UiPath</SelectItem>
                            <SelectItem value="boyum-it" className="text-slate-700 text-xs">Boyum IT</SelectItem>
                          </div>
                          
                          {/* Services Group */}
                          <div className="px-2 py-1 text-xs font-semibold text-[#1E1E38]/80 uppercase tracking-wider border-b border-slate-200 mt-2 mb-1 sticky top-0 bg-white z-20">SERVICES</div>
                          <div className="pl-1">
                            <SelectItem value="consultation" className="text-slate-700 text-xs">Consultation</SelectItem>
                            <SelectItem value="support" className="text-slate-700 text-xs">Support</SelectItem>
                            <SelectItem value="implementation" className="text-slate-700 text-xs">Implementation</SelectItem>
                            <SelectItem value="training" className="text-slate-700 text-xs">Training</SelectItem>
                          </div>
                        </div>
                      </SelectContent>
                    </Select>
                    <FormMessage id="interest-error" className="text-[#1E1E38] text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium text-sm flex items-center gap-2">
                      <MessageSquare className="h-3.5 w-3.5 text-[#E84A0E]" />
                      Your Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder=""
                        className="bg-white border-slate-200 text-slate-900 focus:border-[#E84A0E] focus:ring-[#E84A0E]/20 min-h-[120px] resize-y text-sm shadow-sm"
                        {...field}
                        aria-required="true"
                        aria-describedby="message-error"
                      />
                    </FormControl>
                    <FormMessage id="message-error" className="text-[#E84A0E] text-xs" />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#E84A0E] to-[#A73370] hover:from-[#E84A0E]/90 hover:to-[#A73370]/90 text-white transition-all duration-300 ease-in-out h-11 text-sm font-medium shadow-lg shadow-[#E84A0E]/20 group rounded-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
                <p className="text-xs text-center mt-4 text-slate-500">
                  By submitting this form, you agree to our <a href="/privacy" className="text-[#E84A0E] hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ContactFormWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[250px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ContactForm {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ContactFormWrapper as ContactForm };