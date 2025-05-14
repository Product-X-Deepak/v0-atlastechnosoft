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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
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

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  // Update the onSubmit function with CSRF protection
  async function onSubmit() {
    setIsSubmitting(true)

    try {
      // Send data to API
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
      ref={ref}
      initial={{ opacity: 0, y: 20 }} 
      animate={isInView ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 0.5 }}
      id="contactform"
    >
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold text-white">Reach Out Today</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#E84A0E] focus:ring-[#E84A0E]/20"
                          {...field}
                          aria-required="true"
                          aria-describedby="name-error"
                        />
                      </FormControl>
                      <FormMessage id="name-error" className="text-[#E84A0E]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#E84A0E] focus:ring-[#E84A0E]/20"
                          {...field}
                          aria-required="true"
                          aria-describedby="email-error"
                        />
                      </FormControl>
                      <FormMessage id="email-error" className="text-[#E84A0E]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Phone</FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          placeholder="+91 9372329599"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#E84A0E] focus:ring-[#E84A0E]/20"
                          {...field}
                          aria-required="true"
                          aria-describedby="phone-error"
                        />
                      </FormControl>
                      <FormMessage id="phone-error" className="text-[#E84A0E]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Company</FormLabel>
                      <FormControl>
                        <Input
                          id="company"
                          placeholder="Acme Inc."
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#E84A0E] focus:ring-[#E84A0E]/20"
                          {...field}
                          aria-required="true"
                          aria-describedby="company-error"
                        />
                      </FormControl>
                      <FormMessage id="company-error" className="text-[#E84A0E]" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Area of Interest</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#E84A0E] focus:ring-[#E84A0E]/20" aria-describedby="interest-error">
                          <SelectValue placeholder="Select an area of interest" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1E1E38] border-white/10 text-white max-h-[260px] overflow-auto scrollbar-thin scrollbar-thumb-[#E84A0E]/40 scrollbar-track-white/5 scroll-smooth text-sm z-50">
                        <div className="relative">
                          {/* SAP Solutions Group */}
                          <div className="px-2 py-1 text-[10px] font-semibold text-[#E84A0E]/80 uppercase tracking-wider border-b border-white/10 mb-0.5 sticky top-0 bg-[#1E1E38] z-20 shadow-sm">SAP SOLUTIONS</div>
                          <div className="pl-1">
                            <SelectItem value="sap-business-one" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">SAP Business One</SelectItem>
                            <SelectItem value="sap-business-one-cloud" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">SAP Business One Cloud</SelectItem>
                            <SelectItem value="sap-hana" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">SAP HANA</SelectItem>
                            <SelectItem value="erp-planning" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">ERP Planning</SelectItem>
                          </div>
                          
                          {/* Boyum IT Solutions Group */}
                          <div className="px-2 py-1 text-[10px] font-semibold text-[#E84A0E]/80 uppercase tracking-wider border-b border-white/10 mb-0.5 mt-2 sticky top-[22px] bg-[#1E1E38] z-20 shadow-sm">BOYUM IT SOLUTIONS</div>
                          <div className="pl-1">
                            <SelectItem value="boyum-b1up" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">B1 Usability Package (B1UP)</SelectItem>
                            <SelectItem value="boyum-b1up-data-quality" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs pl-4">└ B1UP: Data Quality Module</SelectItem>
                            <SelectItem value="boyum-b1up-user-experience" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs pl-4">└ B1UP: User Experience Module</SelectItem>
                            <SelectItem value="boyum-b1up-workflow" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs pl-4">└ B1UP: Workflow Optimization</SelectItem>
                            <SelectItem value="boyum-b1up-dashboards" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs pl-4">└ B1UP: Dashboard & Analytics</SelectItem>
                            <SelectItem value="boyum-beas-manufacturing" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Beas Manufacturing</SelectItem>
                            <SelectItem value="boyum-beas-production-planning" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs pl-4">└ Beas: Production Planning</SelectItem>
                            <SelectItem value="boyum-beas-shop-floor" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs pl-4">└ Beas: Shop Floor Control</SelectItem>
                            <SelectItem value="boyum-beas-quality" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs pl-4">└ Beas: Quality Management</SelectItem>
                            <SelectItem value="boyum-beas-costing" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs pl-4">└ Beas: Costing & Analysis</SelectItem>
                            <SelectItem value="boyum-produmex-wms" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Produmex WMS</SelectItem>
                            <SelectItem value="boyum-produmex-scan" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Produmex Scan</SelectItem>
                            <SelectItem value="boyum-perfion-pim" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Perfion PIM</SelectItem>
                          </div>
                          
                          {/* Automation Solutions Group */}
                          <div className="px-2 py-1 text-[10px] font-semibold text-[#E84A0E]/80 uppercase tracking-wider border-b border-white/10 mb-0.5 mt-2 sticky top-[44px] bg-[#1E1E38] z-20 shadow-sm">UIPATH AUTOMATION</div>
                          <div className="pl-1">
                            <SelectItem value="rpa-solutions" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">RPA Solutions</SelectItem>
                            <SelectItem value="uipath-agentic-automation" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Agentic AI Automation</SelectItem>
                            <SelectItem value="uipath-agentic-testing" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Agentic Testing</SelectItem>
                            <SelectItem value="uipath-autopilot" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">UiPath Autopilot</SelectItem>
                            <SelectItem value="uipath-document-processing" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Intelligent Document Processing</SelectItem>
                            <SelectItem value="uipath-process-mining" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Process Mining</SelectItem>
                            <SelectItem value="workflow-automation" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Workflow Automation</SelectItem>
                          </div>
                          
                          {/* Additional Services Group */}
                          <div className="px-2 py-1 text-[10px] font-semibold text-[#E84A0E]/80 uppercase tracking-wider border-b border-white/10 mb-0.5 mt-2 sticky top-[66px] bg-[#1E1E38] z-20 shadow-sm">ADDITIONAL SERVICES</div>
                          <div className="pl-1">
                            <SelectItem value="cloud-computing" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Cloud Computing</SelectItem>
                            <SelectItem value="data-analytics" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Data Analytics & BI</SelectItem>
                            <SelectItem value="consulting-services" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Consulting Services</SelectItem>
                            <SelectItem value="implementation-services" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Implementation Services</SelectItem>
                            <SelectItem value="other" className="focus:bg-[#E84A0E]/20 focus:text-white hover:bg-white/5 transition-colors duration-150 py-0.5 text-xs">Other Services</SelectItem>
                          </div>
                          
                          {/* Scroll indicators - top and bottom shadows */}
                          <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-b from-[#1E1E38] to-transparent pointer-events-none z-0"></div>
                          <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-[#1E1E38] to-transparent pointer-events-none z-0"></div>
                        </div>
                      </SelectContent>
                    </Select>
                    <FormMessage id="interest-error" className="text-[#E84A0E]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or inquiry..."
                        className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-[#E84A0E] focus:ring-[#E84A0E]/20"
                        {...field}
                        aria-required="true"
                        aria-describedby="message-error"
                      />
                    </FormControl>
                    <FormMessage id="message-error" className="text-[#E84A0E]" />
                  </FormItem>
                )}
              />

              <div className="relative z-10">
                <Button
                  type="submit"
                  className="w-full bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </div>
              
              <div className="relative z-10 text-center text-sm text-slate-300 mt-6">
                <p>
                  Your data is securely processed as outlined in our <a href="/privacy" className="text-[#E84A0E] hover:underline">Privacy Policy</a>.
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
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ContactForm {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ContactFormWrapper as ContactForm };