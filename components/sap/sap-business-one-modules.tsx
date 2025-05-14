"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Shield } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function SapBusinessOneModules() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  const [activeTab, setActiveTab] = useState("financial")

  return (
    <section ref={ref} className="py-12 md:py-16 relative">
      {/* Removing the background overlay */}
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center rounded-full border border-amber-700 bg-amber-600 px-3 py-1 text-xs font-semibold text-white mb-3 shadow-md">
            <Shield className="mr-1.5 h-3 w-3" />
            <span>Comprehensive Solution</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-premium-heading drop-shadow-sm">Powerful Integrated <span className="text-premium-orange">Modules</span></h2>
          <p className="mt-2 text-base text-premium-text font-medium p-2">
            SAP Business One integrates all core business functions into a single system, eliminating the need for separate applications and complex interfaces.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-4">
              <div className="mx-auto max-w-2xl rounded-lg border border-amber-300 shadow-md overflow-hidden">
                <div className="flex w-full bg-white">
                  <button
                    onClick={() => setActiveTab("financial")}
                    className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
                      activeTab === "financial"
                        ? "bg-amber-600 text-white font-bold"
                        : "bg-white text-slate-900 hover:bg-amber-100"
                    }`}
                  >
                    Financial
                  </button>
                  <button
                    onClick={() => setActiveTab("sales")}
                    className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
                      activeTab === "sales"
                        ? "bg-amber-600 text-white font-bold"
                        : "bg-white text-slate-900 hover:bg-amber-100"
                    }`}
                  >
                    Sales & CRM
                  </button>
                  <button
                    onClick={() => setActiveTab("purchasing")}
                    className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
                      activeTab === "purchasing"
                        ? "bg-amber-600 text-white font-bold"
                        : "bg-white text-slate-900 hover:bg-amber-100"
                    }`}
                  >
                    Purchasing
                  </button>
                  <button
                    onClick={() => setActiveTab("inventory")}
                    className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
                      activeTab === "inventory"
                        ? "bg-amber-600 text-white font-bold"
                        : "bg-white text-slate-900 hover:bg-amber-100"
                    }`}
                  >
                    Inventory
                  </button>
                  <button
                    onClick={() => setActiveTab("production")}
                    className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
                      activeTab === "production"
                        ? "bg-amber-600 text-white font-bold"
                        : "bg-white text-slate-900 hover:bg-amber-100"
                    }`}
                  >
                    Production
                  </button>
                </div>
              </div>
            </div>
            {modules.map((module) => (
              <TabsContent key={module.id} value={module.id} className="mt-4">
                <Card className="overflow-hidden border-amber-200 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 pb-4 pt-4 px-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-xl text-slate-900 font-bold">{module.title}</CardTitle>
                        <CardDescription className="mt-1 text-sm text-slate-800 font-medium">{module.subtitle}</CardDescription>
                      </div>
                      <Button asChild className="mt-3 bg-amber-600 hover:bg-amber-700 shadow-sm text-xs h-8 sm:mt-0">
                        <Link href="/contact" className="flex items-center">
                          Request Demo
                          <ArrowRight className="ml-1.5 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 bg-white">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="space-y-4 p-4">
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-amber-800">Key Capabilities</h3>
                          <p className="text-xs text-slate-900 font-medium bg-amber-50 p-2 rounded-md border border-amber-200">{module.description}</p>
                        </div>
                        <ul className="space-y-2">
                          {module.features.map((feature, index) => (
                            <li key={index} className="flex items-start bg-white p-2 rounded-md shadow-sm border border-amber-200">
                              <div className="mr-2 mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                                <CheckCircle2 className="h-3 w-3" />
                              </div>
                              <div>
                                <h4 className="font-bold text-xs text-slate-900">{feature.title}</h4>
                                <p className="text-xs text-slate-800">{feature.description}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative flex h-full items-center justify-center overflow-hidden p-4">
                        <div className="relative">
                          <div className="relative flex h-[400px] w-full max-w-[800px] items-center justify-center overflow-hidden rounded-md shadow-md border border-amber-200">
                          <Image
                              src={module.imageUrl}
                            alt={module.title}
                              width={800}
                              height={400}
                              className="h-full w-full object-contain bg-white"
                          />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

const modules = [
  {
    id: "financial",
    title: "Financial Management",
    subtitle: "Automate and streamline your financial operations",
    description: "Gain complete control over your finances with AI-powered insights, real-time visibility, and comprehensive financial tools for accounting, banking, and reporting.",
    imageUrl: "/images/solutions/B1_A.jpg",
    features: [
      {
        title: "AI-Assisted Journal Entries",
        description: "Leverage AI to automate journal entry creation, validation, and posting with intelligent data extraction and smart reconciliation.",
      },
      {
        title: "Predictive Financial Analytics",
        description: "Access AI-powered cash flow forecasting, anomaly detection, and scenario modeling to make more informed financial decisions.",
      },
      {
        title: "Enhanced Banking Integration",
        description: "Connect directly to banking systems with secure APIs, automatic reconciliation, and real-time payment tracking across multiple currencies.",
      },
      {
        title: "Web-Based Financial Reporting",
        description: "Create and share interactive financial reports and dashboards through the web client with no additional software required.",
      },
      {
        title: "Automated Compliance Monitoring",
        description: "Stay compliant with automated tax calculations, audit trails, and regulatory reporting tailored to your business region.",
      },
    ],
  },
  {
    id: "sales",
    title: "Sales & Customer Relationship Management",
    subtitle: "Build stronger customer relationships and boost sales",
    description: "Manage the entire sales cycle from initial prospect contact through conversion to long-term customer relationship management.",
    imageUrl: "/images/solutions/B1_B.png",
    features: [
      {
        title: "Opportunity Management",
        description: "Track sales opportunities through the entire sales cycle with lead scoring, pipeline analysis, and revenue forecasting.",
      },
      {
        title: "Customer Management",
        description: "Maintain comprehensive customer records including contacts, communication history, and account-specific pricing and discounts.",
      },
      {
        title: "Sales Order Processing",
        description: "Streamline order entry, delivery scheduling, and invoicing with configurable workflows, pricing rules, and available-to-promise checks.",
      },
      {
        title: "Marketing Campaign Management",
        description: "Plan, execute, and analyze marketing campaigns with budget tracking, lead generation, and ROI measurement tools.",
      },
      {
        title: "Service Management",
        description: "Manage service contracts, warranty information, and customer service calls with integrated knowledge base and resolution tracking.",
      },
    ],
  },
  {
    id: "purchasing",
    title: "Purchasing & Procurement",
    subtitle: "Optimize your supplier relationships and costs",
    description: "Streamline your procurement processes from purchase planning through vendor evaluation with powerful negotiation and analytics tools.",
    imageUrl: "/images/solutions/B1_C.PNG",
    features: [
      {
        title: "Purchase Planning",
        description: "Optimize procurement with MRP recommendations, demand forecasting, and order point management across multiple warehouses.",
      },
      {
        title: "Vendor Management",
        description: "Maintain comprehensive vendor information with performance tracking, preferred pricing, and payment term management.",
      },
      {
        title: "Purchase Order Processing",
        description: "Create and manage purchase orders with approval workflows, goods receipt tracking, and automated invoice processing.",
      },
      {
        title: "Approval Workflows",
        description: "Implement customizable approval processes for purchase requests and orders based on amount thresholds and user hierarchies.",
      },
      {
        title: "Vendor Evaluation",
        description: "Rate and track vendor performance based on delivery times, quality, price competitiveness, and service levels.",
      },
    ],
  },
  {
    id: "inventory",
    title: "Inventory & Distribution Management",
    subtitle: "Ensure optimal inventory levels and efficient distribution",
    description: "Gain complete visibility and control over your inventory with real-time stock information and warehouse management capabilities.",
    imageUrl: "/images/solutions/B1_D.png",
    features: [
      {
        title: "Inventory Management",
        description: "Monitor stock levels, valuations, and movements across multiple warehouses with real-time visibility and alerts.",
      },
      {
        title: "Warehouse Management",
        description: "Optimize pick and pack operations with bin location management, wave picking, and directed putaway strategies.",
      },
      {
        title: "Goods Receipt & Issue",
        description: "Process goods receipts, issues, returns, and transfers with barcode scanning support and lot/serial number tracking.",
      },
      {
        title: "Batch & Serial Number Management",
        description: "Track products with batch and serial numbers throughout the supply chain with full traceability for quality control and recalls.",
      },
      {
        title: "Inventory Planning",
        description: "Optimize inventory levels with forecasting tools, safety stock calculations, and lead time management to balance costs and service levels.",
      },
    ],
  },
  {
    id: "production",
    title: "Production & Manufacturing",
    subtitle: "Streamline your production processes and control costs",
    description: "Optimize your manufacturing operations with comprehensive production planning, scheduling, and cost management tools.",
    imageUrl: "/images/solutions/B1_E.png",
    features: [
      {
        title: "Bill of Materials Management",
        description: "Create and manage multi-level bills of materials with version control, alternatives, and component substitutions.",
      },
      {
        title: "Production Orders",
        description: "Plan and execute production orders with material allocation, capacity scheduling, and order status tracking.",
      },
      {
        title: "Material Requirements Planning",
        description: "Run MRP calculations based on demand forecasts, minimum inventory levels, and lead times to optimize purchasing and production.",
      },
      {
        title: "Capacity Planning",
        description: "Manage resource capacity and constraints with graphical planning boards and load balancing across work centers.",
      },
      {
        title: "Production Costing",
        description: "Track actual vs. standard costs for materials, labor, and overhead with variance analysis and product costing simulations.",
      },
    ],
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneModulesWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneModules {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneModulesWrapper as SapBusinessOneModules };