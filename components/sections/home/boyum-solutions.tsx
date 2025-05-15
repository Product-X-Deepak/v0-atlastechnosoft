"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Suspense } from "react"
import { Factory, Package, Zap, Database, Users, Eye, Boxes, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function BoyumSolutions(_props: Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  
  return (
    <section id="boyum-solutions" ref={ref} className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-900">
            <span>Official Boyum Silver Partner</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-premium-heading md:text-4xl">
            Unleash SAP Business One with <span className="text-premium-orange font-extrabold">Boyum IT Solutions</span>
          </h2>
          <p className="mt-4 text-lg text-premium-text max-w-2xl mx-auto font-medium">
            Take your SAP system to the next level with powerful add-ons tailored for manufacturing, logistics, and usability enhancement.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* B1 Usability Package Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full flex flex-col">
              <div className="mb-4 rounded-full bg-[#E84A0E] p-3 w-fit text-white shadow-md">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">B1 Usability Package (B1UP)</h3>
              <p className="text-sm text-slate-800 mb-4 font-medium">
                Customize, automate, and streamline SAP Business One with zero coding and maximum impact. Enhance user experience, ensure data quality, and optimize daily workflows.
              </p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-amber-100 p-1.5">
                    <Zap className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Data Quality</h4>
                    <p className="text-xs text-slate-700">Validation rules & templates</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-amber-100 p-1.5">
                    <Eye className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Enhanced UX</h4>
                    <p className="text-xs text-slate-700">Custom layouts & controls</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-amber-100 p-1.5">
                    <Database className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Better Decisions</h4>
                    <p className="text-xs text-slate-700">Interactive dashboards</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-amber-100 p-1.5">
                    <Zap className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Workflow Automation</h4>
                    <p className="text-xs text-slate-700">Business rules & macros</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 mb-4">
                  <span className="font-semibold">Trusted by 8,000+ customers</span> in 120+ countries with 160,000+ users. Multiple SAP Global Solution of the Year & People's Choice Awards winner.
                </p>
                <Link href="/automation-solutions/boyum-it">
                  <Button variant="outline" className="w-full border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium hover:text-[#E84A0E] transition-colors">
                    Learn More About B1UP
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Beas Manufacturing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full flex flex-col">
              <div className="mb-4 rounded-full bg-[#A73370] p-3 w-fit text-white shadow-md">
                <Factory className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Beas Manufacturing</h3>
              <p className="text-sm text-slate-800 mb-4 font-medium">
                Advanced manufacturing extension for discrete and process manufacturing companies running SAP Business One. Control your entire production process from a single platform.
              </p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-rose-100 p-1.5">
                    <Factory className="h-4 w-4 text-rose-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Production Planning</h4>
                    <p className="text-xs text-slate-700">Advanced scheduling</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-rose-100 p-1.5">
                    <Database className="h-4 w-4 text-rose-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Shop Floor Control</h4>
                    <p className="text-xs text-slate-700">Real-time data capture</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-rose-100 p-1.5">
                    <Users className="h-4 w-4 text-rose-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Quality Control</h4>
                    <p className="text-xs text-slate-700">Multi-stage QC processes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-rose-100 p-1.5">
                    <Zap className="h-4 w-4 text-rose-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Complete Tracking</h4>
                    <p className="text-xs text-slate-700">Order-wise production tracking</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 mb-4">
                  <span className="font-semibold">2025 Roadmap:</span> Enhanced integrations with Warehouse Management, AI for predictive manufacturing, performance optimizations across core modules.
                </p>
                <Link href="/automation-solutions/boyum-it">
                  <Button variant="outline" className="w-full border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium hover:text-[#A73370] transition-colors">
                    Explore Beas Manufacturing
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Boyum Solutions for 2025 */}
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          {/* Produmex WMS Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full flex flex-col">
              <div className="mb-4 rounded-full bg-[#E84A0E] p-3 w-fit text-white shadow-md">
                <Boxes className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Produmex WMS</h3>
              <p className="text-sm text-slate-800 mb-4 font-medium">
                Comprehensive warehouse management system optimized for SMEs running SAP Business One. Digitalize logistics operations and streamline your supply chain.
              </p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-amber-100 p-1.5">
                    <Boxes className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Inventory Control</h4>
                    <p className="text-xs text-slate-700">Real-time tracking & analytics</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-amber-100 p-1.5">
                    <Zap className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Mobile Operations</h4>
                    <p className="text-xs text-slate-700">Barcode scanning & automation</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 mb-4">
                  <span className="font-semibold">2025 Features:</span> AI-driven warehouse optimization, predictive inventory management, and enhanced mobile scanning capabilities.
                </p>
                <Link href="/automation-solutions/boyum-it">
                  <Button variant="outline" className="w-full border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium hover:text-[#E84A0E] transition-colors">
                    Discover Produmex WMS
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Perfion PIM Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full flex flex-col">
              <div className="mb-4 rounded-full bg-[#A73370] p-3 w-fit text-white shadow-md">
                <Tag className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Perfion PIM</h3>
              <p className="text-sm text-slate-800 mb-4 font-medium">
                Powerful Product Information Management solution that centralizes product data and facilitates seamless distribution across all sales channels.
              </p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-rose-100 p-1.5">
                    <Database className="h-4 w-4 text-rose-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Centralized Data</h4>
                    <p className="text-xs text-slate-700">Single source of truth</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 rounded-full bg-rose-100 p-1.5">
                    <Tag className="h-4 w-4 text-rose-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Omnichannel Ready</h4>
                    <p className="text-xs text-slate-700">Seamless publishing everywhere</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 mb-4">
                  <span className="font-semibold">2025 Integration:</span> Enhanced Microsoft Dynamics 365 BC integration, AI-powered content generation, automated product enrichment.
                </p>
                <Link href="/automation-solutions/boyum-it">
                  <Button variant="outline" className="w-full border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium hover:text-[#A73370] transition-colors">
                    Learn About Perfion PIM
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link href="/contact">
            <Button className="bg-[#E84A0E] hover:bg-[#E84A0E]/90 text-white">
              Request Boyum IT Solutions Demo
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries
function BoyumSolutionsWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BoyumSolutions {...props} />
    </Suspense>
  );
}

export { BoyumSolutionsWrapper as BoyumSolutions }; 