"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, CalendarDays, Zap, Rocket } from "lucide-react"
import { Suspense } from "react"

function FuturisticCTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: string;
    y: string;
    opacity: number;
    xAnimated: [string, string, string];
    yAnimated: [string, string, string];
    duration: number;
  }>>([]);

  // Generate random particles after component mounts to avoid hydration mismatches
  useEffect(() => {
    const newParticles = [...Array(15)].map((_, index) => ({
      id: index,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.3 + 0.2,
      xAnimated: [
        `${Math.random() * 100}%`,
        `${Math.random() * 100}%`,
        `${Math.random() * 100}%`
      ] as [string, string, string],
      yAnimated: [
        `${Math.random() * 100}%`,
        `${Math.random() * 100}%`,
        `${Math.random() * 100}%`
      ] as [string, string, string],
      duration: Math.random() * 20 + 10
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden py-24"
    >
      {/* Background with futuristic gradient */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#1E1E38] via-[#1E1E38] to-[#1E1E38]"
          aria-hidden="true"
        />
        
        {/* Abstract background shapes */}
        <div className="absolute inset-0">
          <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-[#E84A0E]/20 blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full bg-[#A73370]/20 blur-3xl"></div>
        </div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute h-1 w-1 rounded-full bg-[#E84A0E]"
              initial={{ 
                x: particle.x, 
                y: particle.y, 
                opacity: particle.opacity
              }}
              animate={{ 
                x: particle.xAnimated,
                y: particle.yAnimated,
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: particle.duration, 
                repeat: Infinity,
                ease: "linear" 
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-amber-600/30 bg-amber-500/10 px-4 py-1 text-base text-amber-300">
              <Zap className="h-4 w-4" />
              <span>Ready to Transform Your Business?</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Experience the Future of <span className="bg-gradient-to-r from-[#E84A0E] to-[#A73370] bg-clip-text text-transparent">Enterprise Solutions</span>
            </h2>
            <p className="text-lg text-white/80">
              Connect with our team of experts to discover how our cutting-edge SAP and automation solutions can revolutionize your business operations
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#E84A0E]/30 hover:bg-white/10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E84A0E]/20 text-[#E84A0E]">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Schedule a Consultation</h3>
              <p className="mb-5 text-sm text-white/70">
                Connect with our experts for a personalized assessment of your business needs and tailored solution recommendations.
              </p>
              <Button 
                className="w-full group bg-[#E84A0E] hover:bg-[#E84A0E]/90" 
                size="sm" 
                asChild
              >
                <Link href="/contact" className="flex items-center justify-center">
                  Book a Free Consultation
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              
              {/* Decorative corner */}
              <div className="absolute -right-2 -top-2 h-12 w-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48 0V48H0" stroke="#E84A0E" strokeOpacity="0.4" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#A73370]/30 hover:bg-white/10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#A73370]/20 text-[#A73370]">
                <CalendarDays className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Request a Demo</h3>
              <p className="mb-5 text-sm text-white/70">
                See our SAP Business One and automation solutions in action with a personalized demonstration tailored to your industry.
              </p>
              <Button 
                variant="outline" 
                className="w-full group border-[#A73370]/30 text-white hover:bg-[#A73370]/20 hover:text-white" 
                size="sm" 
                asChild
              >
                <Link href="/contact/demo" className="flex items-center justify-center">
                  Schedule Live Demo
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              
              {/* Decorative corner */}
              <div className="absolute -right-2 -top-2 h-12 w-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48 0V48H0" stroke="#A73370" strokeOpacity="0.4" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#E84A0E]/30 hover:bg-white/10 sm:col-span-2 lg:col-span-1">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E84A0E]/20 text-[#E84A0E]">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Product Overview</h3>
              <p className="mb-5 text-sm text-white/70">
                Download our comprehensive product brochure with detailed information about our solutions and implementation methodology.
              </p>
              <Button 
                className="w-full group bg-[#1E1E38] border border-white/20 hover:bg-[#1E1E38]/80" 
                size="sm" 
                asChild
              >
                <Link href="/resources/brochure" className="flex items-center justify-center">
                  Download Resources
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              
              {/* Decorative corner */}
              <div className="absolute -right-2 -top-2 h-12 w-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48 0V48H0" stroke="#E84A0E" strokeOpacity="0.4" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E84A0E] via-[#A73370] to-[#E84A0E]"></div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function FuturisticCTAWrapper() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <FuturisticCTA />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { FuturisticCTAWrapper as FuturisticCTA };
