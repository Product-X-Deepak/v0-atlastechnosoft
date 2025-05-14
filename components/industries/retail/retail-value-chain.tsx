"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, ShoppingCart, CreditCard, Truck, MessageCircle } from "lucide-react"
import { Suspense } from "react"

function RetailValueChainComponent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="value-chain" ref={ref} className="py-16 bg-[#1E1E38] text-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Retail Lifecycle</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Connect Your <span className="text-[#E84A0E]">Retail Operations</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Our solutions provide comprehensive support across the entire retail lifecycle, from merchandise planning and inventory management to customer engagement and analytics.
          </p>
        </div>
        
        <div className="relative mt-16">
          {/* Value Chain Diagram */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="relative z-10 grid grid-cols-1 gap-y-8 md:grid-cols-5 md:gap-x-6">
            {customerJourneyStages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex flex-col items-center text-center bg-white rounded-xl shadow-sm p-6 border border-slate-100"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${stage.bgColor} mb-4`}>
                  {stage.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{stage.title}</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-xs">{stage.description}</p>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  {stage.technologies.split(", ").map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center text-xs text-slate-700">
                      <div className={`mr-2 h-1.5 w-1.5 rounded-full ${stage.dotColor}`}></div>
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {journeyBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-white/10 p-6 rounded-xl shadow-sm border border-white/20"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-white/80">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const customerJourneyStages = [
  {
    icon: <MapPin className="h-8 w-8 text-white" />,
    title: "Discovery",
    description: "Help customers find your products through seamless omnichannel experiences",
    technologies: "SEO optimization, social commerce, personalized recommendations",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]"
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-white" />,
    title: "Consideration",
    description: "Provide detailed information and comparison tools to aid decision making",
    technologies: "Virtual try-on, AR product visualization, comparison features",
    bgColor: "bg-[#A73370]",
    dotColor: "bg-[#A73370]"
  },
  {
    icon: <CreditCard className="h-8 w-8 text-white" />,
    title: "Purchase",
    description: "Create frictionless checkout experiences across all channels",
    technologies: "One-click checkout, flexible payment options, saved preferences",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]"
  },
  {
    icon: <Truck className="h-8 w-8 text-white" />,
    title: "Fulfillment",
    description: "Offer flexible delivery and pickup options with real-time tracking",
    technologies: "Order tracking, delivery scheduling, pickup notifications",
    bgColor: "bg-[#A73370]",
    dotColor: "bg-[#A73370]"
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-white" />,
    title: "Retention",
    description: "Build long-term relationships through personalized engagement",
    technologies: "Loyalty programs, personalized recommendations, proactive support",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]"
  }
]

const journeyBenefits = [
  {
    title: "Consistent Experiences",
    description: "Ensure brand consistency and seamless transitions between channels, building trust and recognition."
  },
  {
    title: "Personalized Engagement",
    description: "Deliver contextually relevant messaging and offers based on customer location in their journey."
  },
  {
    title: "Conversion Optimization",
    description: "Identify and eliminate friction points to improve conversion rates at each stage of the customer journey."
  }
]

// Wrapper component with Suspense boundary
function RetailValueChain(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RetailValueChainComponent {...props} />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function RetailValueChainWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <RetailValueChain {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { RetailValueChainWrapper as RetailValueChain };