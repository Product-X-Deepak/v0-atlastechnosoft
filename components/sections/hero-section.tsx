"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Shield, Zap, PieChart, TrendingUp, Clock, CheckCircle, Users, HeadphonesIcon, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Handle scroll using window.scrollY
  useEffect(() => {
    const handleScroll = () => {
      // Keep this function for scrolling functionality
      // but remove the unused variables
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  useEffect(() => {
    setMounted(true)
    
    // Rotate through features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#E84A0E]" />,
      title: "30% Average ROI",
      description: "Companies see 30% average return on investment within first year",
    },
    {
      icon: <PieChart className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#A73370]" />,
      title: "Cost Reduction",
      description: "20-25% reduction in operational costs through automation",
    },
    {
      icon: <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" />,
      title: "Faster Decision-Making",
      description: "45% improvement in data processing speed and analytics",
    },
    {
      icon: <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#E84A0E]" />,
      title: "Compliance Assurance",
      description: "99.9% data security with regulatory compliance for all industries",
    }
  ]

  // Stats data for Proven Track Record
  const stats = [
    {
      value: "25+",
      label: "Years",
      description: "Since 1997",
      icon: <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#E84A0E]" />,
      accent: "from-amber-500 to-[#E84A0E]"
    },
    {
      value: "500+",
      label: "Implementations",
      description: "Across industries",
      icon: <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#A73370]" />,
      accent: "from-[#A73370] to-[#E84A0E]"
    },
    {
      value: "98%",
      label: "Retention",
      description: "Client partnerships",
      icon: <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#E84A0E]" />,
      accent: "from-amber-500 to-[#E84A0E]"
    },
    {
      value: "24/7",
      label: "Support",
      description: "Always available",
      icon: <HeadphonesIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#A73370]" />,
      accent: "from-[#A73370] to-[#E84A0E]"
    },
  ]

  // Animation variants with enhanced effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  }

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const statsItemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
  }

  if (!mounted) return null

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-[75vh] flex items-center justify-center py-4 sm:py-6 md:py-8 lg:py-10"
      aria-labelledby="hero-heading"
    >
      {/* No background element as per requirements */}
      
      <motion.div 
        className="container px-4 md:px-6 relative z-10 flex flex-col items-center justify-center space-y-4"
      >
        <div className="flex justify-center pb-2">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#fffef9] to-[#fffcf0] border border-amber-100/40 shadow-sm px-3 py-1 text-sm font-medium text-amber-800">
            <Sparkles className="mr-1 h-3 w-3" />
            <span>Accelerating Digital Excellence Since 1997</span>
          </div>
        </div>

        <motion.div 
          className="space-y-2 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 id="hero-heading" className="sr-only">
            Transform your business with Atlas Technosoft
          </h1>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 text-premium-heading"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-[#FF5B14] via-[#FF7A00] to-[#FF9A56] bg-clip-text text-transparent drop-shadow-sm font-extrabold animate-text-shine">Transform</span> 
            <span className="text-premium-heading">your business with</span> 
            <span className="bg-gradient-to-r from-[#FF5B14] via-[#FF7A00] to-[#FFB347] bg-clip-text text-transparent font-extrabold animate-text-shine ml-2">SAP</span>
            <span className="bg-gradient-to-r from-[#DCB0FF] via-[#C56CD6] to-[#A73370] bg-clip-text text-transparent font-extrabold animate-text-shine ml-2">Solutions</span>
          </motion.h2>

          <motion.p 
            className="mx-auto max-w-xl sm:max-w-2xl md:text-xl text-premium-text font-medium"
            variants={itemVariants}
          >
            We offer a complete range of SAP Solutions to help businesses of all sizes streamline operations, gain insights, and accelerate growth.
          </motion.p>
        </motion.div>

        <motion.div 
          className="w-full max-w-3xl pt-2 pb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="relative h-7 sm:h-8 max-w-[14rem] mx-auto overflow-hidden rounded-md bg-gradient-to-r from-[#fffef9] to-[#fffcf0] shadow-sm border border-amber-100/40"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={featureVariants}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0 mr-2 p-1 rounded-full bg-amber-50">
                    {features[activeFeature].icon}
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {features[activeFeature].title}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 pb-6"
          variants={statsContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center space-y-1 p-4 rounded-lg bg-[#fffff0] border border-[#fffff0]/30 text-center shadow-sm"
              variants={statsItemVariants}
            >
              <div className="flex items-center justify-center space-x-1">
                <span className="text-xs text-slate-800">{stat.icon}</span>
                <span className={`text-xl font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
              </div>
              <div className="space-y-px">
                <h3 className="text-xs font-medium text-slate-900">{stat.label}</h3>
                <p className="text-xs text-slate-800">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="pt-0 flex flex-col sm:flex-row gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Button 
              className="bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white group w-full sm:w-auto"
              size="lg"
              asChild
            >
              <Link href="/contact" className="flex items-center">
                Request Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button 
              variant="outline" 
              className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white w-full sm:w-auto"
              size="lg"
              asChild
            >
              <Link href="/about" className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Book Demo
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Add minimal CSS for text animation */}
      <style jsx global>{`
        @keyframes text-shine {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        
        .animate-text-shine {
          background-size: 200% auto;
          animation: text-shine 3s linear infinite alternate;
        }
      `}</style>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function HeroSectionWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <HeroSection {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { HeroSectionWrapper as HeroSection };