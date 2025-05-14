"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Suspense } from "react"
import { 
  Building2, 
  HeartPulse, 
  Briefcase, 
  ShoppingCart, 
  Factory, 
  Truck,
  BadgeDollarSign,
  GraduationCap
} from "lucide-react"

function ConsultationIndustries() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section 
      ref={ref} 
      id="industries" 
      className="py-20 bg-gradient-to-b from-[#0A0F17] to-[#0D1321] relative overflow-hidden"
    >
      {/* Background graphic elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute h-96 w-96 rounded-full border border-purple-500/20 top-10 -right-48"></div>
        <div className="absolute h-64 w-64 rounded-full border border-blue-500/20 bottom-10 -left-32"></div>
        <div className="absolute h-80 w-80 rounded-full border-2 border-cyan-500/20 top-1/3 left-1/4"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 mb-6 text-sm font-medium backdrop-blur-sm">
              <Building2 className="mr-2 h-3.5 w-3.5 text-purple-400" />
              <span className="text-purple-300">Industry Expertise</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Tailored Solutions for <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Every Industry</span>
            </h2>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our consulting team brings extensive experience across diverse industries, allowing us to provide specialized automation solutions that address your unique challenges.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 p-3 w-fit mb-5 shadow-lg">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
                  {industry.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {industry.description}
                </p>
                
                <ul className="space-y-2 mt-4">
                  {industry.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 mt-1.5 mr-2"></span>
                      <span className="text-sm text-gray-400">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center mt-12 max-w-3xl mx-auto"
          >
            <p className="text-gray-400 text-sm">
              Don&apos;t see your industry? Our flexible approach allows us to adapt our methodologies to any business sector. <span className="text-purple-400">Contact us</span> to learn how we can help with your specific needs.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-indigo-900/90 to-violet-900/90 rounded-xl text-white overflow-hidden border border-white/10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4">Our Industry Focus</h3>
            <p className="mb-6">
              We specialize in helping businesses across multiple industries unlock their full potential through tailored process automation.
              Here&apos;s how we&apos;ve helped organizations like yours:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* ... rest of the component ... */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const industries = [
  {
    icon: <BadgeDollarSign className="h-6 w-6 text-white" />,
    title: "Financial Services",
    description: "Modernize operations, enhance customer experiences, and meet compliance requirements.",
    benefits: [
      "Automated regulatory compliance",
      "Fraud detection and prevention",
      "Intelligent document processing",
      "Customer journey optimization"
    ]
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-white" />,
    title: "Healthcare",
    description: "Improve patient outcomes, streamline operations, and reduce administrative burden.",
    benefits: [
      "Patient data management",
      "Automated claims processing",
      "Care coordination workflows",
      "Resource optimization"
    ]
  },
  {
    icon: <Factory className="h-6 w-6 text-white" />,
    title: "Manufacturing",
    description: "Enhance productivity, quality control, and supply chain efficiency.",
    benefits: [
      "Smart factory implementation",
      "Predictive maintenance",
      "Quality assurance automation",
      "Supply chain optimization"
    ]
  },
  {
    icon: <ShoppingCart className="h-6 w-6 text-white" />,
    title: "Retail & E-commerce",
    description: "Drive sales growth, improve customer satisfaction, and streamline operations.",
    benefits: [
      "Inventory management automation",
      "Customer service enhancement",
      "Personalized marketing",
      "Order fulfillment optimization"
    ]
  },
  {
    icon: <Truck className="h-6 w-6 text-white" />,
    title: "Logistics & Transport",
    description: "Optimize routes, reduce costs, and enhance delivery performance.",
    benefits: [
      "Fleet management automation",
      "Route optimization",
      "Warehouse automation",
      "Last-mile delivery enhancement"
    ]
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-white" />,
    title: "Education",
    description: "Transform learning experiences and streamline administrative processes.",
    benefits: [
      "Student enrollment automation",
      "Learning management systems",
      "Administrative workflows",
      "Analytics for student success"
    ]
  },
  {
    icon: <Briefcase className="h-6 w-6 text-white" />,
    title: "Professional Services",
    description: "Enhance client delivery, knowledge management, and business operations.",
    benefits: [
      "Project management automation",
      "Document generation & management",
      "Client onboarding workflows",
      "Resource allocation optimization"
    ]
  },
  {
    icon: <Building2 className="h-6 w-6 text-white" />,
    title: "Government",
    description: "Improve citizen services, ensure compliance, and optimize resource allocation.",
    benefits: [
      "Citizen service automation",
      "Regulatory compliance",
      "Resource management",
      "Inter-agency communication"
    ]
  }
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ConsultationIndustriesWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ConsultationIndustries {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ConsultationIndustriesWrapper as ConsultationIndustries };