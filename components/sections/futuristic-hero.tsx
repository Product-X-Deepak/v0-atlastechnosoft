"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Clock, Globe, Zap } from "lucide-react"
import Link from "next/link"

export function FuturisticHero() {
  const controls = useAnimation()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const keyStats = [
    { value: "1997", label: "Founded", description: "Established in Mumbai, India", icon: <Clock className="h-4 w-4 text-[#E84A0E]" /> },
    { value: "750+", label: "Implementations", description: "Successful client transformations", icon: <Award className="h-4 w-4 text-[#A73370]" /> },
    { value: "28", label: "Years", description: "Of innovation excellence", icon: <Zap className="h-4 w-4 text-[#E84A0E]" /> },
    { value: "300+", label: "Global Clients", description: "Across 5 continents", icon: <Globe className="h-4 w-4 text-[#A73370]" /> },
  ]

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden bg-[#FFF5D6] py-16 lg:py-20"
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 z-0 bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,transparent,25%,white,75%,transparent)]"></div>
      
      {/* Glowing orbs effect */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#E84A0E] opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#A73370] opacity-10 blur-3xl"></div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-800">
            <span className="mr-1 text-xs font-semibold">EST.</span> 1997
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-4xl text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
            Redefining <span className="text-[#E84A0E]">Enterprise</span> <br />
            <span className="text-[#A73370]">Transformation</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-base text-slate-700">
            Atlas Technosoft is your strategic ally in navigating digital transformation. 
            We craft innovative solutions that empower businesses to evolve, optimize, and thrive in the digital age.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {keyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                    {stat.icon}
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold text-[#1E1E38]">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-900">{stat.label}</div>
                  <div className="text-xs text-slate-600">{stat.description}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group"
              >
                <Link href="/contact" className="flex items-center">
                  Connect With Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white"
                asChild
              >
                <Link href="/contact/request-form">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            onMouseMove={handleMouseMove}
          >
            <motion.div
              className="relative h-[450px] w-full max-w-[550px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md"
              style={{ 
                rotateX,
                rotateY,
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1E1E38] to-[#A73370]">
                <div className="absolute inset-0 z-10 bg-[url('/images/grid-pattern.svg')] bg-center opacity-20"></div>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">The Future of Enterprise Tech</h3>
                    <p className="text-white/80 text-sm max-w-xs mx-auto">Quantum-powered solutions that redefine what&apos;s possible for businesses</p>
                  </div>
                </div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute right-0 top-0 h-20 w-20 origin-top-right z-30">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0L80 0L80 80" fill="#E84A0E" fillOpacity="0.3" />
                  <path d="M0 0L80 0L80 80" stroke="#E84A0E" strokeOpacity="0.5" />
                </svg>
              </div>
              
              {/* Futuristic elements */}
              <div className="absolute bottom-4 right-4 z-30 flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-[#E84A0E] animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-[#A73370] animate-pulse" style={{ animationDelay: "500ms" }}></div>
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "1000ms" }}></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 