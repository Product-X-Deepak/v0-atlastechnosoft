"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, BarChart3, Cloud, Database, Globe, HardDrive, RefreshCw, Rocket, Shield, Users, Zap } from "lucide-react"
import { StructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"

// Define feature type
interface Feature {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
}

// Define props for FeatureCard component
interface FeatureCardProps {
  feature: Feature
  index: number
  isInView: boolean
}

function SapBusinessOneCloudFeatures() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })

  // Generate schema for structured data
  const generateFeaturesList = (features: Feature[]) => {
    return features.map((feature, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": feature.title,
      "description": feature.description
    }))
  }

  // Create structured data for feature categories
  const featureCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "SAP Business One Cloud Features",
    "itemListElement": [
      {
        "@type": "ItemList",
        "name": "Operational Features",
        "itemListElement": generateFeaturesList(operationalFeatures)
      },
      {
        "@type": "ItemList",
        "name": "Technical Features",
        "itemListElement": generateFeaturesList(technicalFeatures)
      },
      {
        "@type": "ItemList",
        "name": "Business Features",
        "itemListElement": generateFeaturesList(businessFeatures)
      }
    ]
  }

  return (
    <section 
      ref={ref}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Add structured data for SEO */}
      <StructuredData data={featureCatalogSchema} />

      <div className="relative bg-gradient-to-r from-amber-600 to-yellow-500 py-12 md:py-16">
        <div className="absolute inset-0 bg-[url('/images/hex-grid.svg')] opacity-40"></div>
        <div className="container relative px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
            <div className="inline-flex items-center justify-center rounded-full bg-white/25 px-2 py-0.5 text-xs font-medium text-white">
              <Cloud className="mr-1.5 h-3 w-3" />
              <span>Next-Generation Cloud ERP</span>
            </div>
            <h2 
              className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
              itemProp="name"
            >
              Business-Transforming Features
            </h2>
            <p 
              className="mt-3 text-base text-white"
              itemProp="description"
            >
              SAP Business One Cloud 2025 delivers powerful capabilities that drive operational excellence, enhance decision-making, and accelerate business growth.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-5xl"
        >
          <Tabs defaultValue="operations" className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="operations">Operations</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="business">Business Impact</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent 
              value="operations" 
              className="mt-6"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              <meta itemProp="name" content="Operational Features" />
              <meta itemProp="numberOfItems" content={operationalFeatures.length.toString()} />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {operationalFeatures.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} isInView={isInView} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent 
              value="technology" 
              className="mt-6"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              <meta itemProp="name" content="Technical Features" />
              <meta itemProp="numberOfItems" content={technicalFeatures.length.toString()} />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {technicalFeatures.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} isInView={isInView} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent 
              value="business" 
              className="mt-6"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              <meta itemProp="name" content="Business Features" />
              <meta itemProp="numberOfItems" content={businessFeatures.length.toString()} />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {businessFeatures.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} isInView={isInView} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto mt-12 max-w-6xl rounded-xl bg-white p-6 shadow-sm border border-slate-200"
            >
          <div className="flex flex-col items-center gap-6 lg:flex-row">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900">Enhanced Web Interface</h3>
              <p className="mt-1.5 text-sm text-slate-700">
                The 2025 web version delivers a completely reimagined user experience with responsive design, intuitive navigation, and personalized dashboards.
              </p>
              <ul className="mt-3 space-y-1.5">
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span className="text-xs text-slate-800">Customizable role-based dashboards</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span className="text-xs text-slate-800">Seamless mobile-to-desktop experience</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span className="text-xs text-slate-800">Contextual AI-powered assistance</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span className="text-xs text-slate-800">Real-time collaboration tools</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[240px] w-full max-w-[420px] overflow-hidden rounded-lg bg-white p-2 shadow-md border border-slate-200 lg:flex-1">
              <Image
                src="/images/solutions/B2_A.png" 
                alt="SAP Business One Cloud 2025 Web Interface"
                fill
                className="object-contain p-1"
              />
            </div>
          </div>
            </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index, isInView }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      itemScope
      itemProp="itemListElement"
      itemType="https://schema.org/ListItem"
    >
      <meta itemProp="position" content={(index + 1).toString()} />
      <Card className="h-full bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="relative p-4 pb-2">
          <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="h-3 w-3 text-[#E84A0E]" />
          </div>
          <div className="mb-1.5 w-fit rounded-md bg-[#E84A0E] p-1.5 text-white shadow-sm">{feature.icon}</div>
          <CardTitle className="text-base text-slate-900" itemProp="name">{feature.title}</CardTitle>
          <CardDescription className="text-xs text-slate-600">{feature.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1">
          <p className="text-xs text-slate-700" itemProp="description">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const operationalFeatures = [
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Universal Access",
    subtitle: "Work from anywhere",
    description:
      "Access your complete ERP system from any browser on any device with an optimized experience for both desktop and mobile interfaces.",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Real-Time Data",
    subtitle: "Instant insights",
    description:
      "Leverage SAP HANA in-memory database technology for real-time analytics and reporting, with zero latency data processing.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Collaborative Workflows",
    subtitle: "Streamlined processes",
    description:
      "Enable cross-departmental collaboration with integrated workflows, approvals, and notifications that keep your business moving.",
  },
]

const technicalFeatures = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Enterprise Security",
    subtitle: "Advanced protection",
    description:
      "Enterprise-grade security with multi-factor authentication, data encryption, and compliance with international standards.",
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    title: "Continuous Updates",
    subtitle: "Always current",
    description:
      "Automatic updates ensure you always have the latest features, security patches, and performance improvements without disruption.",
  },
  {
    icon: <HardDrive className="h-5 w-5" />,
    title: "Integrated Architecture",
    subtitle: "Seamless connections",
    description:
      "Open architecture enables seamless integration with other SAP solutions, third-party applications, and custom systems.",
  },
]

const businessFeatures = [
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Accelerated Growth",
    subtitle: "Scale with confidence",
    description:
      "Easily scale your solution as your business grows, adding users, functionality, and processing capacity when needed.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Business Intelligence",
    subtitle: "Data-driven decisions",
    description:
      "Interactive dashboards and AI-powered analytics transform your data into actionable insights for better decision-making.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Operational Efficiency",
    subtitle: "Optimized processes",
    description:
      "Automate routine tasks and streamline processes to reduce operational costs and focus on strategic initiatives.",
  },
]


// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneCloudFeaturesWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneCloudFeatures {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneCloudFeaturesWrapper as SapBusinessOneCloudFeatures };