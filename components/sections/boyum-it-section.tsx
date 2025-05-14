"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Suspense } from "react"
import { 
  ArrowRight, 
  Blocks, 
  BoxSelect, 
  Factory, 
  Boxes, 
  LayoutGrid, 
  Mail, 
  Database,
  FileBox,
  Code,
  Users
} from "lucide-react"

export function BoyumITSection() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumITSectionContent />
    </Suspense>
  );
}

function BoyumITSectionContent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <section ref={ref} className="relative overflow-hidden py-12 md:py-16">
      {/* Enhanced animated backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/40 to-secondary/30 blur-[80px] animate-pulse-slow"></div>
        <div 
          className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-tr from-vibrant-blue/30 to-secondary/30 blur-[80px] animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-primary/25 blur-[60px] animate-pulse-slow"
          style={{ animationDelay: "0.8s" }}
        ></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          {/* Enhanced content section with better contrast */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-10">
            <motion.div
              variants={itemVariants}
              className="mb-3 inline-flex items-center rounded-full border border-primary/80 bg-primary/30 px-2.5 py-1 text-xs font-medium backdrop-blur-sm shadow-lg"
            >
              <Blocks className="mr-1.5 h-3 w-3 text-white" />
              <span className="font-semibold drop-shadow-md text-white">SAP Business One Add-ons</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-white drop-shadow-lg">
              Transform Your Business with <span className="bg-gradient-to-r from-primary via-vibrant-blue to-secondary bg-clip-text text-transparent font-extrabold drop-shadow-xl">Boyum IT Solutions</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="mb-6 text-base text-white max-w-3xl drop-shadow-md font-medium">
              Elevate your SAP Business One experience with award-winning add-ons used by 100,000+ daily users worldwide. 
              Customize interfaces, automate workflows, and gain complete control over your business processes without coding.
            </motion.p>
          </motion.div>

          <motion.div variants={containerVariants} className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {boyumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="h-full border-2 border-primary/40 bg-black/40 backdrop-blur-md hover:border-primary/80 hover:shadow-xl shadow-primary/20">
                  <CardContent className="flex flex-col items-center text-center p-4">
                    <div className="mb-3 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 p-3 text-white shadow-lg">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-1.5 text-sm text-white">{feature.title}</h3>
                      <p className="text-xs text-gray-200">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* B1UP Function Buttons Highlight - Enhanced for better visibility */}
          <motion.div 
            variants={itemVariants} 
            className="mb-8 p-4 border-2 border-primary/40 rounded-xl bg-black/40 backdrop-blur-md shadow-lg"
          >
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-lg font-semibold mb-3 text-white drop-shadow-md">Advanced Function Buttons</h3>
                  <p className="text-xs text-gray-200 mb-3">
                    Create custom buttons in SAP Business One that trigger powerful automation actions. Configure buttons 
                    that launch applications, run queries, open reports, or execute complex business logic.
                  </p>
                  <div className="bg-gradient-to-r from-primary/30 to-secondary/20 rounded-md p-2 text-xs shadow-inner">
                    <ul className="list-disc list-inside space-y-0.5 text-xs text-white font-medium">
                      <li>30+ built-in functions including formatted searches</li>
                      <li>Universal functions and multi-button support</li>
                      <li>User-specific button configurations</li>
                      <li>Context-aware operations based on form state</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
                  <div className="rounded-lg h-full border border-primary/30 bg-black/50 p-3 backdrop-blur-md hover:border-primary/60 hover:shadow-lg transition-all duration-300 shadow-md">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-primary/20 text-white shadow-lg">
                        <Code className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-white font-medium mb-3">Zero coding required to create powerful custom buttons and automation</p>
                      <div className="text-xs text-primary/90 font-semibold">Easy drag & drop configuration</div>
                    </div>
                  </div>
                  <div className="rounded-lg h-full border border-primary/30 bg-black/50 p-3 backdrop-blur-md hover:border-primary/60 hover:shadow-lg transition-all duration-300 shadow-md">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-primary/20 text-white shadow-lg">
                        <Users className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-white font-medium mb-3">User-specific configurations to match different roles and workflows</p>
                      <div className="text-xs text-primary/90 font-semibold">Flexible permission controls</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-center text-white drop-shadow-md">Top Boyum IT Solutions</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {platformHighlights.map((product, index) => (
                <Card 
                  key={index} 
                  className="border-2 border-primary/40 bg-black/40 backdrop-blur-md hover:border-primary/80 hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-primary/20 text-white mb-3 shadow-lg">
                        {product.icon}
                      </div>
                      <h4 className="text-base font-medium mb-1.5 text-white">{product.name}</h4>
                    </div>
                    <p className="text-xs text-gray-200 mb-2">{product.description}</p>
                    <div className="text-xs bg-gradient-to-r from-primary/30 to-secondary/20 rounded-md p-1.5 text-white font-medium shadow-inner">
                      {product.highlight}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Integration Ecosystem - Enhanced */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-center text-white drop-shadow-md">Seamless Integration Ecosystem</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {integrationEcosystem.map((item, index) => (
                <div 
                  key={index}
                  className="rounded-lg border border-primary/30 bg-black/50 p-3 backdrop-blur-md hover:border-primary/60 hover:shadow-lg transition-all duration-300 text-center shadow-md"
                >
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-primary/20 text-white mb-2 shadow-lg">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1">{item.name}</h4>
                  <p className="text-xs text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA - Enhanced */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-block">
              <Button asChild size="lg" className="group">
                <Link href="/sap-solutions/business-one/boyum-it" className="inline-flex items-center">
                  <span>Explore Boyum IT Solutions</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Need help setting up Boyum IT add-ons? <Link href="/contact" className="text-primary hover:underline">Contact our experts</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Data for the Boyum IT section
const boyumFeatures = [
  {
    icon: <BoxSelect className="h-5 w-5" />,
    title: "B1 Usability Package",
    description: "Enhance the SAP Business One user interface with powerful custom buttons and automation tools.",
  },
  {
    icon: <LayoutGrid className="h-5 w-5" />,
    title: "Beas Manufacturing",
    description: "Comprehensive manufacturing solution for production planning, execution, and control.",
  },
  {
    icon: <Factory className="h-5 w-5" />,
    title: "Production One",
    description: "Streamline manufacturing operations with detailed planning and reporting capabilities.",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Produmex WMS",
    description: "Advanced warehouse management system for optimized inventory control and picking processes.",
  },
];

const platformHighlights = [
  {
    icon: <BoxSelect className="h-4 w-4" />,
    name: "B1 Usability Package",
    description: "Create customized buttons, automated functions, and interface enhancements for SAP Business One.",
    highlight: "Used by 100,000+ users daily across 90+ countries",
  },
  {
    icon: <LayoutGrid className="h-4 w-4" />,
    name: "Beas Manufacturing",
    description: "Complete manufacturing solution that handles production planning, execution, and quality control.",
    highlight: "Fully integrated with SAP Business One for seamless operations",
  },
  {
    icon: <Boxes className="h-4 w-4" />,
    name: "Produmex WMS",
    description: "Advanced warehouse management system for optimized inventory and picking processes.",
    highlight: "Real-time inventory visibility and barcode/RFID support",
  },
];

const integrationEcosystem = [
  {
    icon: <FileBox className="h-4 w-4" />,
    name: "Document Management",
    description: "Automate document processes and storage",
  },
  {
    icon: <Mail className="h-4 w-4" />,
    name: "Email Integration",
    description: "Connect emails with business processes",
  },
  {
    icon: <Database className="h-4 w-4" />,
    name: "Data Integration",
    description: "Connect with external data sources",
  },
  {
    icon: <Code className="h-4 w-4" />,
    name: "API Connectivity",
    description: "Extend with custom integrations",
  },
];
