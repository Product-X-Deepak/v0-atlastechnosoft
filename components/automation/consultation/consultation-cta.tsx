"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Check, Calendar, Send, PhoneCall, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function ConsultationCta() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    // Submit to API simulation
    setTimeout(() => {
      try {
        // Simulate successful submission
        setFormStatus('success')
      } catch (error) {
        setFormStatus('error')
        setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form. Please try again.')
      }
    }, 1500)
  }

  return (
    <section 
      ref={ref} 
      id="contact" 
      className="py-16 bg-[#1E1E38] relative overflow-hidden"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to <span className="text-[#E84A0E]">Transform</span> Your Business?
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Take the first step toward automation excellence. Schedule a consultation with our experts or send us a message about your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 lg:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
              
              {formStatus === 'success' && (
                <div className="py-12">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-400" />
                    </div>
                  </div>
                  <h4 className="text-xl font-medium text-white text-center mb-2">Message Received!</h4>
                  <p className="text-center text-gray-300 mb-8">
                    Thank you for reaching out. One of our consultants will get back to you within 24 hours.
                  </p>
                  <div className="flex justify-center">
                    <Button 
                      onClick={() => setFormStatus('idle')}
                      className="bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="py-12">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-xl font-medium text-white text-center mb-2">Submission Error</h4>
                  <p className="text-center text-gray-300 mb-8">
                    {errorMessage || "We couldn't send your message. Please try again or contact us directly."}
                  </p>
                  <div className="flex justify-center">
                    <Button 
                      onClick={() => setFormStatus('idle')}
                      className="bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              )}
              
              {(formStatus === 'idle' || formStatus === 'submitting') && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E84A0E]/50 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E84A0E]/50 focus:border-transparent transition-all"
                        placeholder="info@yourcompany.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E84A0E]/50 focus:border-transparent transition-all"
                      placeholder="Your organization name"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                      Area of Interest
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E84A0E]/50 focus:border-transparent transition-all"
                    >
                      <option value="" disabled selected className="bg-[#1E1E38]">Select your area of interest</option>
                      <option value="hyperautomation" className="bg-[#1E1E38]">Hyperautomation Strategy</option>
                      <option value="process-mining" className="bg-[#1E1E38]">Process Mining & Intelligence</option>
                      <option value="low-code" className="bg-[#1E1E38]">Low-Code/No-Code Automation</option>
                      <option value="integration" className="bg-[#1E1E38]">Intelligent Integration</option>
                      <option value="business-intelligence" className="bg-[#1E1E38]">AI-Powered Business Intelligence</option>
                      <option value="sustainable-automation" className="bg-[#1E1E38]">Sustainable Automation</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E84A0E]/50 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your automation goals and challenges"
                    ></textarea>
                  </div>
                  <div>
                    <Button 
                      type="submit"
                      className="w-full bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white flex items-center justify-center group"
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </div>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF5D6] flex-shrink-0 mr-4">
                    <Calendar className="h-5 w-5 text-[#E84A0E]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Schedule a Consultation</h3>
                    <p className="text-gray-300 mb-4">
                      Book a personalized consultation with our automation experts to discuss your specific needs and challenges.
                    </p>
                    <Button 
                      className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
                      asChild
                      size="sm"
                    >
                      <Link href="/contact" className="flex items-center">
                        Book a Meeting
                        <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF5D6] flex-shrink-0 mr-4">
                    <PhoneCall className="h-5 w-5 text-[#A73370]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Call Us Directly</h3>
                    <p className="text-gray-300 mb-4">
                      Prefer to speak with someone immediately? Our automation consultants are just a phone call away.
                    </p>
                    <Button 
                      variant="outline"
                      className="border-[#A73370] text-white hover:bg-[#A73370]/10" 
                      asChild
                      size="sm"
                    >
                      <Link href="tel:+11234567890" className="flex items-center">
                        +1 (123) 456-7890
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF5D6] flex-shrink-0 mr-4">
                    <Mail className="h-5 w-5 text-[#E84A0E]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                    <p className="text-gray-300 mb-4">
                      Send us an email with your questions or requirements, and we'll get back to you promptly.
                    </p>
                    <Button 
                      variant="outline"
                      className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white" 
                      asChild
                      size="sm"
                    >
                      <Link href="mailto:info@atlastechnosoft.com" className="flex items-center">
                        Send Email
                        <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ConsultationCtaWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ConsultationCta {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ConsultationCtaWrapper as ConsultationCta };