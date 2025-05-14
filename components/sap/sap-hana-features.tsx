"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Database, Zap, BarChart3, Clock, Server, Shield, Layers, Cpu, 
  Brain, Lightbulb, LineChart, PieChart, Network, 
  Code, Binary, FileLock2, DatabaseBackup, Boxes, CloudCog, MoveRight
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"

interface Feature {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
}

function SapHanaFeatures() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })

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
    "name": "SAP HANA Features",
    "itemListElement": [
      {
        "@type": "ItemList",
        "name": "Performance Features",
        "itemListElement": generateFeaturesList(performanceFeatures)
      },
      {
        "@type": "ItemList",
        "name": "Analytics Features",
        "itemListElement": generateFeaturesList(analyticsFeatures)
      },
      {
        "@type": "ItemList",
        "name": "Architecture Features",
        "itemListElement": generateFeaturesList(architectureFeatures)
      }
    ]
  }

  return (
    <section 
      id="features" 
      ref={ref} 
      className="py-12 md:py-16"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Add structured data for SEO */}
      <StructuredData data={featureCatalogSchema} />

      <div className="relative overflow-hidden bg-gradient-to-r from-[#f5b800] to-[#ff7a00] py-10">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('/images/noise-pattern.png')]"></div>
        <div className="container relative px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center rounded-full border border-white/50 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs text-white mb-2">
              <Database className="mr-1.5 h-3 w-3" />
              <span className="font-semibold">Next-Generation Platform</span>
            </div>
            <h2 
              className="text-2xl font-extrabold tracking-tight sm:text-3xl text-white drop-shadow-sm"
              itemProp="name"
            >
              Revolutionary Capabilities of SAP HANA
            </h2>
            <p 
              className="mt-2 text-base font-medium text-white/90"
              itemProp="description"
            >
              Explore how SAP HANA 2.0 SPS 06 transforms data processing with cutting-edge features that power the intelligent enterprise.
            </p>
          </motion.div>
        </div>
        </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 max-w-6xl"
        >
          <Tabs defaultValue="performance" className="w-full">
            <div className="flex justify-center mb-4">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="architecture">Architecture</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent 
              value="performance" 
              className="mt-4"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              <meta itemProp="name" content="Performance Features" />
              <meta itemProp="numberOfItems" content={performanceFeatures.length.toString()} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {performanceFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="group"
                    itemScope
                    itemProp="itemListElement"
                    itemType="https://schema.org/ListItem"
                  >
                    <meta itemProp="position" content={(index + 1).toString()} />
                    <Card className="h-full bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <CardHeader className="pb-2 pt-4 px-4">
                        <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#E84A0E] text-white shadow-sm">
                          {feature.icon}
                        </div>
                        <CardTitle 
                          className="flex items-center justify-between text-base text-slate-900"
                          itemProp="name"
                        >
                          {feature.title}
                          <MoveRight className="h-3 w-0 transition-all duration-300 group-hover:w-3 group-hover:text-[#E84A0E]" />
                        </CardTitle>
                        <CardDescription className="text-xs text-slate-600">{feature.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent className="px-4 pb-4 pt-0">
                        <p 
                          className="text-xs text-slate-700"
                          itemProp="description"
                        >
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent 
              value="analytics" 
              className="mt-4"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              <meta itemProp="name" content="Analytics Features" />
              <meta itemProp="numberOfItems" content={analyticsFeatures.length.toString()} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {analyticsFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="group"
                    itemScope
                    itemProp="itemListElement"
                    itemType="https://schema.org/ListItem"
                  >
                    <meta itemProp="position" content={(index + 1).toString()} />
                    <Card className="h-full bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <CardHeader className="pb-2 pt-4 px-4">
                        <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#A73370] text-white shadow-sm">
                          {feature.icon}
                        </div>
                        <CardTitle 
                          className="flex items-center justify-between text-base text-slate-900"
                          itemProp="name"
                        >
                          {feature.title}
                          <MoveRight className="h-3 w-0 transition-all duration-300 group-hover:w-3 group-hover:text-[#A73370]" />
                        </CardTitle>
                        <CardDescription className="text-xs text-slate-600">{feature.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent className="px-4 pb-4 pt-0">
                        <p 
                          className="text-xs text-slate-700"
                          itemProp="description"
                        >
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent 
              value="architecture" 
              className="mt-4"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              <meta itemProp="name" content="Architecture Features" />
              <meta itemProp="numberOfItems" content={architectureFeatures.length.toString()} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {architectureFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="group"
                    itemScope
                    itemProp="itemListElement"
                    itemType="https://schema.org/ListItem"
                  >
                    <meta itemProp="position" content={(index + 1).toString()} />
                    <Card className="h-full bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <CardHeader className="pb-2 pt-4 px-4">
                        <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E1E38] text-white shadow-sm">
                          {feature.icon}
                        </div>
                        <CardTitle 
                          className="flex items-center justify-between text-base text-slate-900"
                          itemProp="name"
                        >
                          {feature.title}
                          <MoveRight className="h-3 w-0 transition-all duration-300 group-hover:w-3 group-hover:text-[#1E1E38]" />
                        </CardTitle>
                        <CardDescription className="text-xs text-slate-600">{feature.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent className="px-4 pb-4 pt-0">
                        <p 
                          className="text-xs text-slate-700"
                          itemProp="description"
                        >
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
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
              <h3 className="text-xl font-bold text-slate-900">SAP HANA Cloud</h3>
              <p className="mt-1.5 text-sm text-slate-700">
                The latest evolution of SAP HANA brings the power of in-memory computing to the cloud with elastic scaling, consumption-based pricing, and seamless connectivity.
              </p>
              <ul className="mt-3 space-y-1.5">
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span className="text-xs text-slate-800">Serverless scaling from gigabytes to petabytes</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span className="text-xs text-slate-800">Unified database and data management</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span className="text-xs text-slate-800">Built-in data integration and quality tools</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                  <span className="text-xs text-slate-800">99.9% uptime SLA and automated operations</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[240px] w-full max-w-[420px] overflow-hidden rounded-lg bg-white p-2 shadow-md border border-slate-200 lg:flex-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E84A0E] to-[#A73370] opacity-80"></div>
              <div className="absolute inset-0 bg-[url('/images/abstract-data.svg')] opacity-10"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                <CloudCog className="h-12 w-12 mb-3" />
                <h4 className="text-xl font-bold">SAP HANA Cloud</h4>
                <p className="mt-2 text-sm text-center">The complete cloud data foundation for the intelligent enterprise</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const performanceFeatures = [
  {
    icon: <Database className="h-5 w-5" />,
    title: "In-Memory Technology",
    subtitle: "Ultra-fast processing",
    description:
      "Process massive amounts of data in-memory, eliminating I/O bottlenecks and enabling real-time analytics and transactions at unprecedented speeds.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Column-Based Storage",
    subtitle: "Optimized data access",
    description:
      "Dramatically improve query performance and compression rates with column-based table storage optimized for analytical workloads.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Real-Time Processing",
    subtitle: "Zero latency insights",
    description:
      "Eliminate batch windows and enable real-time decision making with instant data processing and no performance degradation under high loads.",
  },
  {
    icon: <Binary className="h-5 w-5" />,
    title: "Advanced Compression",
    subtitle: "Reduced data footprint",
    description:
      "Reduce storage requirements by up to 90% through dictionary encoding, sparse encoding, and other advanced compression techniques.",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "Parallel Processing",
    subtitle: "Maximum hardware utilization",
    description:
      "Automatically distribute query processing across available CPU cores to maximize performance and resource utilization.",
  },
  {
    icon: <Code className="h-5 w-5" />,
    title: "Code Push-Down",
    subtitle: "Optimized execution",
    description:
      "Move computation to where the data resides rather than moving data to the application, dramatically reducing data transfers.",
  },
]

const analyticsFeatures = [
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Predictive Analytics",
    subtitle: "Future insights",
    description:
      "Built-in machine learning algorithms and predictive capabilities to forecast trends and identify patterns without moving data to separate systems.",
  },
  {
    icon: <Network className="h-5 w-5" />,
    title: "Graph Processing",
    subtitle: "Relationship analysis",
    description:
      "Native graph processing capabilities to analyze complex networks of relationships and connections within your data.",
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: "Time Series Analysis",
    subtitle: "Temporal patterns",
    description:
      "Advanced time series processing and forecasting to identify patterns, seasonality, and anomalies in time-ordered data.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Text & Search",
    subtitle: "Unstructured data insights",
    description:
      "Powerful text analysis including sentiment analysis, entity extraction, and natural language processing for unstructured data.",
  },
  {
    icon: <PieChart className="h-5 w-5" />,
    title: "Spatial Analytics",
    subtitle: "Location intelligence",
    description:
      "Built-in geospatial capabilities for analyzing location-based data, enabling distance calculations, routing, and geographic visualizations.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Business Intelligence",
    subtitle: "Insightful visualizations",
    description:
      "Integration with SAP Analytics Cloud and other BI tools for stunning visualizations and interactive dashboards powered by real-time data.",
  },
]

const architectureFeatures = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Multi-Model Engine",
    subtitle: "Versatile data processing",
    description:
      "Process different data models (relational, graph, spatial, document) in a single platform without separate specialized systems.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Security Framework",
    subtitle: "Enterprise-grade protection",
    description:
      "Comprehensive security featuring encryption, authentication, authorization, auditing, and data anonymization capabilities.",
  },
  {
    icon: <DatabaseBackup className="h-5 w-5" />,
    title: "High Availability",
    subtitle: "Continuous operations",
    description:
      "Robust high availability and disaster recovery options including system replication, backups, and failover clustering.",
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    title: "Data Tiering",
    subtitle: "Optimized storage",
    description:
      "Dynamic data tiering options to balance performance and cost, with automatic data movement between hot and warm storage.",
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: "Hybrid Deployment",
    subtitle: "Flexible infrastructure",
    description:
      "Deploy on-premise, in the cloud, or in hybrid scenarios with consistent capabilities and seamless data access across environments.",
  },
  {
    icon: <FileLock2 className="h-5 w-5" />,
    title: "Data Governance",
    subtitle: "Compliant data management",
    description:
      "Robust data quality, lineage, and lifecycle management capabilities to ensure trusted data and regulatory compliance.",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapHanaFeaturesWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapHanaFeatures {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapHanaFeaturesWrapper as SapHanaFeatures };