"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Cloud, Shield, Smartphone, Zap, Globe, Lock } from "lucide-react"
import { Suspense } from "react"

function TechnologyAdvantages(_props: Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="technology" ref={ref} className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-900">
            <span>Technology Advantages</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-premium-heading md:text-4xl">
            Modern <span className="text-premium-orange font-extrabold">Technology Platform</span>
          </h2>
          <p className="mt-4 text-lg text-premium-text max-w-2xl mx-auto font-medium">
            Our solutions leverage the latest technologies to provide secure, scalable, and flexible platforms that adapt to your business needs.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {technologyAdvantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full flex flex-col">
                <div className={`mb-4 rounded-full ${advantage.iconBg} p-3 w-fit text-white shadow-md`}>
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{advantage.title}</h3>
                <p className="text-sm text-slate-800 mb-4 font-medium">{advantage.description}</p>
                <div className="mt-auto space-y-2">
                  {advantage.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-slate-800 font-medium">
                      <div className={`mr-2 h-1.5 w-1.5 rounded-full ${advantage.dotColor}`}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-slate-200"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Future-Proof Your Business</h3>
              <p className="text-sm text-slate-800 mb-4 font-medium">
                Our technology platform is designed to evolve with your business needs and adapt to changing market conditions, ensuring your investment is protected for the long term.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {statHighlights.map((stat, index) => (
                  <div key={index} className={`rounded-lg p-3 ${stat.bgColor} ${stat.textColor}`}>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              {futureProofFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start rounded-lg p-3 bg-slate-50 border border-slate-200"
                >
                  <div className={`rounded-full ${feature.iconBg} p-2 text-white shadow-sm mr-3 flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{feature.title}</h4>
                    <p className="text-xs text-slate-800 font-medium">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const technologyAdvantages = [
  {
    icon: <Cloud className="h-6 w-6" />,
    iconBg: "bg-[#E84A0E]",
    title: "Cloud Deployment",
    description: "Flexible cloud deployment options with enhanced security and scalability.",
    features: [
      "Public, private, and hybrid cloud options",
      "Automatic updates and maintenance",
      "Scalable infrastructure",
    ],
    dotColor: "bg-[#E84A0E]"
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    iconBg: "bg-[#A73370]",
    title: "Mobile Accessibility",
    description: "Access business data and perform critical tasks from anywhere, on any device.",
    features: [
      "Native mobile applications",
      "Responsive web interfaces",
      "Offline capabilities",
    ],
    dotColor: "bg-[#A73370]"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    iconBg: "bg-[#E84A0E]",
    title: "Enterprise Security",
    description: "Robust security features to protect your business data and ensure compliance.",
    features: [
      "Role-based access control",
      "Data encryption at rest and in transit",
      "Regular security updates",
    ],
    dotColor: "bg-[#E84A0E]"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    iconBg: "bg-[#A73370]",
    title: "Performance Optimization",
    description: "High-performance architecture designed for speed and efficiency.",
    features: [
      "In-memory computing",
      "Optimized database queries",
      "Efficient resource utilization",
    ],
    dotColor: "bg-[#A73370]"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    iconBg: "bg-[#E84A0E]",
    title: "Global Availability",
    description: "Worldwide deployment options with localization and compliance support.",
    features: [
      "Multi-language support",
      "Regional compliance adherence",
      "Global data centers",
    ],
    dotColor: "bg-[#E84A0E]"
  },
  {
    icon: <Lock className="h-6 w-6" />,
    iconBg: "bg-[#A73370]",
    title: "Data Privacy",
    description: "Advanced data privacy features to help meet regulatory requirements.",
    features: [
      "GDPR compliance support",
      "Data anonymization options",
      "Audit trail and logging",
    ],
    dotColor: "bg-[#A73370]"
  },
]

const statHighlights = [
  {
    value: "99.9%",
    label: "Uptime Guarantee",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
  },
  {
    value: "30+",
    label: "Supported Countries",
    bgColor: "bg-rose-50",
    textColor: "text-rose-800",
  },
  {
    value: "4x",
    label: "Faster Performance",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
  },
  {
    value: "24/7",
    label: "Technical Support",
    bgColor: "bg-rose-50",
    textColor: "text-rose-800",
  },
]

const futureProofFeatures = [
  {
    icon: <Zap className="h-4 w-4" />,
    iconBg: "bg-[#E84A0E]",
    title: "Continuous Innovation",
    description: "Regular updates with the latest features and technologies",
  },
  {
    icon: <Shield className="h-4 w-4" />,
    iconBg: "bg-[#A73370]",
    title: "Extensible Architecture",
    description: "Open APIs and flexible customization options",
  },
  {
    icon: <Cloud className="h-4 w-4" />,
    iconBg: "bg-[#E84A0E]",
    title: "AI-Ready Platform",
    description: "Built to integrate with AI and machine learning capabilities",
  },
] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function TechnologyAdvantagesWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <TechnologyAdvantages {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { TechnologyAdvantagesWrapper as TechnologyAdvantages };