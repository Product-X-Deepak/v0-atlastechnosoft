"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Suspense } from "react"

function ErpPlanningIndustries() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const industries = {
    manufacturing: {
      title: "Manufacturing",
      description: "Optimize production planning, inventory management, and supply chain operations with integrated ERP solutions tailored for manufacturers.",
      features: [
        "Material Requirements Planning (MRP)",
        "Production Order Management",
        "Bill of Materials (BOM) Management",
        "Capacity Planning and Scheduling",
        "Shop Floor Control",
        "Quality Management",
        "Product Costing",
        "Subcontracting Management"
      ],
      benefits: [
        "Reduce production costs by optimizing resource allocation",
        "Minimize inventory while maintaining service levels",
        "Improve on-time delivery performance",
        "Enable real-time production visibility",
        "Streamline product costing and profitability analysis"
      ]
    },
    distribution: {
      title: "Wholesale Distribution",
      description: "Streamline inventory management, pricing, and logistics with integrated ERP solutions designed for wholesale distributors.",
      features: [
        "Inventory Optimization",
        "Warehouse Management",
        "Pick, Pack, and Ship Processes",
        "Sales Order Management",
        "Pricing and Margin Management",
        "Return Management",
        "Lot and Serial Number Tracking",
        "Multi-location Inventory"
      ],
      benefits: [
        "Optimize stock levels with demand forecasting",
        "Streamline order-to-cash processes",
        "Enhance customer service with real-time information",
        "Improve warehouse efficiency and accuracy",
        "Increase visibility across multiple locations"
      ]
    },
    professional: {
      title: "Professional Services",
      description: "Manage projects, resources, and client relationships with integrated ERP solutions designed for service-oriented businesses.",
      features: [
        "Project Management",
        "Resource Planning and Allocation",
        "Time and Expense Tracking",
        "Service Contract Management",
        "Project Accounting",
        "Client Relationship Management",
        "Document Management",
        "Analytics and Reporting"
      ],
      benefits: [
        "Improve project profitability with accurate time tracking",
        "Optimize resource utilization across projects",
        "Enhance client satisfaction with timely delivery",
        "Streamline billing and revenue recognition",
        "Gain insights into practice area performance"
      ]
    },
    retail: {
      title: "Retail",
      description: "Manage inventory, pricing, and customer relationships with integrated ERP solutions designed for retail operations.",
      features: [
        "Point of Sale (POS) Integration",
        "Inventory Management",
        "Customer Loyalty Programs",
        "E-commerce Integration",
        "Price and Promotion Management",
        "Merchandise Planning",
        "Store Operations Management",
        "Returns and Exchanges Processing"
      ],
      benefits: [
        "Provide seamless omnichannel customer experiences",
        "Optimize inventory across stores and channels",
        "Streamline procurement and replenishment",
        "Enhance customer loyalty with personalized service",
        "Gain real-time insights into sales performance"
      ]
    }
  }

  return (
    <section ref={ref} className="py-16 md:py-24 bg-amber-50/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/90 to-white/40"></div>
      
      {/* Abstract pattern */}
      <div className="absolute inset-0 opacity-5" 
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="container relative px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-amber-900/30 bg-amber-900/5 px-3 py-1 text-sm font-medium text-amber-900 mb-2">
            <span>Industry Solutions</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">Industry-Specific Solutions</h2>
          <p className="text-slate-600 sm:text-lg max-w-[90%]">
            Tailored ERP planning approaches that address the unique challenges and requirements of your industry
          </p>
        </motion.div>

        <Tabs defaultValue="manufacturing" className="mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <TabsList className="grid grid-cols-4 w-full max-w-[600px] bg-amber-100 text-amber-900">
              <TabsTrigger 
                value="manufacturing"
                className="data-[state=active]:bg-amber-900 data-[state=active]:text-white"
              >
                Manufacturing
              </TabsTrigger>
              <TabsTrigger 
                value="distribution"
                className="data-[state=active]:bg-amber-900 data-[state=active]:text-white"
              >
                Distribution
              </TabsTrigger>
              <TabsTrigger 
                value="professional"
                className="data-[state=active]:bg-amber-900 data-[state=active]:text-white"
              >
                Professional Services
              </TabsTrigger>
              <TabsTrigger 
                value="retail"
                className="data-[state=active]:bg-amber-900 data-[state=active]:text-white"
              >
                Retail
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {Object.entries(industries).map(([key, industry]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="p-6 bg-white border border-amber-200 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">{industry.title} ERP Planning</h3>
                  <p className="text-slate-600 mb-6">{industry.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold mb-3 text-amber-900">Key Capabilities</h4>
                      <ul className="space-y-2">
                        {industry.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-900 mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-slate-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold mb-3 text-amber-800">Business Benefits</h4>
                      <ul className="space-y-2">
                        {industry.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-800 mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-slate-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button 
                      asChild 
                      className="bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-800/90 hover:to-amber-900/90 text-white gap-2 shadow-sm"
                    >
                      <Link href="/contact">
                        Learn More About {industry.title} Solutions
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center"
              >
                <div className="bg-amber-100 rounded-lg border border-amber-200 p-4 max-w-2xl shadow-sm">
                  <p className="text-sm text-center text-slate-700">
                    Our industry-specific ERP planning methodology ensures that your SAP Business One implementation is optimized for the unique requirements and challenges of the {industry.title.toLowerCase()} sector.
                  </p>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ErpPlanningIndustriesWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ErpPlanningIndustries {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ErpPlanningIndustriesWrapper as ErpPlanningIndustries };