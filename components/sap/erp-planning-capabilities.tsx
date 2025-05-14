"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  Boxes, 
  CalendarClock, 
  CoinsIcon, 
  FileSpreadsheet, 
  ShoppingCart, 
  TruckIcon, 
  Users,
  LayoutGrid,
  Warehouse,
  ClipboardCheck,
  Workflow,
  Shield,
  Globe,
  Bot,
  PieChart,
  Landmark,
  Receipt,
  Building,
  LineChart
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"

function ErpPlanningCapabilities() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const capabilities = {
    mrp: [
      {
        icon: <LayoutGrid className="h-6 w-6 text-amber-900" />,
        title: "MRP Area Planning",
        description: "Multi-level planning across plants, storage locations, and subcontractors with dedicated MRP areas for streamlined resource management.",
        features: ["Cross-location planning", "Decentralized inventory control", "Independent procurement strategy"],
        badge: "Latest Release"
      },
      {
        icon: <Warehouse className="h-6 w-6 text-amber-900" />,
        title: "Storage Location Planning",
        description: "Granular control over inventory levels and resources at specific storage locations with separate planning and replenishment strategies.",
        features: ["Location-specific parameters", "Transfer requirement automation", "Visual capacity monitoring"],
        badge: ""
      },
      {
        icon: <TruckIcon className="h-6 w-6 text-amber-900" />,
        title: "Subcontracting Management",
        description: "End-to-end subcontracting process management with integrated planning for materials, capacity, and vendor scheduling.",
        features: ["Vendor-managed inventory", "Quality inspection workflow", "Cost control tracking"],
        badge: ""
      },
      {
        icon: <ClipboardCheck className="h-6 w-6 text-amber-900" />,
        title: "Lot-Size Optimization",
        description: "Dynamic lot-sizing procedures (lot-for-lot, fixed lot size, optimal order quantity) to minimize inventory costs and maximize efficiency.",
        features: ["Economic order quantity", "Just-in-time support", "Cost-based optimization"],
        badge: ""
      },
      {
        icon: <CalendarClock className="h-6 w-6 text-amber-900" />,
        title: "Planning Time Fence",
        description: "Flexible time fence settings that balance short-term stability with long-term planning horizons for optimal material management.",
        features: ["Frozen zone controls", "Rolling forecast integration", "Exception handling workflow"],
        badge: "Enhanced"
      },
      {
        icon: <Workflow className="h-6 w-6 text-amber-900" />,
        title: "Material Flow Analysis",
        description: "Comprehensive visibility into material movements, bottlenecks, and process dependencies for continuous improvement.",
        features: ["Visual flow mapping", "Constraint identification", "Simulation capabilities"],
        badge: ""
      }
    ],
    financial: [
      {
        icon: <FileSpreadsheet className="h-6 w-6 text-amber-800" />,
        title: "Financial Management",
        description: "Integrated multi-ledger system with comprehensive journal functionality, real-time currency conversion, and automated reconciliation capabilities.",
        features: ["Multi-GAAP compliance", "Intercompany transactions", "Unlimited dimensions"],
        badge: "Core Module"
      },
      {
        icon: <CoinsIcon className="h-6 w-6 text-amber-800" />,
        title: "Cost Accounting",
        description: "Sophisticated cost center accounting with activity-based costing, project accounting, and granular profitability analysis for strategic decision support.",
        features: ["Allocation engine", "Variance analysis", "Contribution margin reporting"],
        badge: ""
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-amber-800" />,
        title: "Financial Analytics",
        description: "AI-powered financial analytics with real-time data visualization, predictive forecasting, and custom KPI dashboards for leadership insight.",
        features: ["Predictive cash flow", "Scenario modeling", "Drill-down capabilities"],
        badge: "AI-Enhanced"
      },
      {
        icon: <Landmark className="h-6 w-6 text-amber-800" />,
        title: "Banking & Treasury",
        description: "Comprehensive banking integration with electronic payment processing, cash position monitoring, and automated bank statement reconciliation.",
        features: ["SWIFT/SEPA support", "Cash pooling", "Investment management"],
        badge: ""
      },
      {
        icon: <Receipt className="h-6 w-6 text-amber-800" />,
        title: "Tax Management",
        description: "Automated tax calculation and reporting system with multi-jurisdiction support, digital filing capabilities, and audit trail documentation.",
        features: ["VAT/GST compliance", "Withholding tax", "Digital reporting ready"],
        badge: "Compliance Certified"
      },
      {
        icon: <Shield className="h-6 w-6 text-amber-800" />,
        title: "Financial Controls",
        description: "Robust control framework with segregation of duties, approval workflows, and comprehensive audit trails for regulatory compliance.",
        features: ["SOX compliance tools", "Approval matrix", "Audit documentation"],
        badge: ""
      }
    ],
    operations: [
      {
        icon: <ShoppingCart className="h-6 w-6 text-amber-700" />,
        title: "Sales & Purchasing",
        description: "Unified order-to-cash and procure-to-pay processes with automated approval workflows, margin control, and customer/vendor scorecards.",
        features: ["Dynamic discounting", "Contract management", "Mobile approvals"],
        badge: "Mobile Enabled"
      },
      {
        icon: <Boxes className="h-6 w-6 text-amber-700" />,
        title: "Inventory Control",
        description: "Advanced inventory management with real-time tracking, multiple valuation methods, batch/lot control, and automated replenishment processing.",
        features: ["Serial tracking", "Consignment handling", "ABC analysis"],
        badge: ""
      },
      {
        icon: <PieChart className="h-6 w-6 text-amber-700" />,
        title: "Production Planning",
        description: "Comprehensive production scheduling with capacity planning, material requirements calculation, and shop floor control for manufacturing operations.",
        features: ["Finite scheduling", "Co-product handling", "Yield management"],
        badge: "Industry Standard"
      },
      {
        icon: <Users className="h-6 w-6 text-amber-700" />,
        title: "CRM Integration",
        description: "360-degree customer view with integrated sales, service, and marketing capabilities, opportunity management, and customer insights dashboard.",
        features: ["Sales pipeline", "Service call tracking", "Customer retention tools"],
        badge: ""
      },
      {
        icon: <Building className="h-6 w-6 text-amber-700" />,
        title: "Project Management",
        description: "End-to-end project management with resource scheduling, time and expense tracking, milestone billing, and profitability analysis.",
        features: ["Gantt visualization", "Resource utilization", "Budget control"],
        badge: "Enhanced"
      },
      {
        icon: <Globe className="h-6 w-6 text-amber-700" />,
        title: "International Operations",
        description: "Global business support with multi-language, multi-currency, and localization features for seamless international operations management.",
        features: ["Legal compliance", "Global consolidation", "Intercompany automation"],
        badge: "Global Ready"
      }
    ],
    intelligence: [
      {
        icon: <LineChart className="h-6 w-6 text-amber-600" />,
        title: "Business Intelligence",
        description: "Embedded analytics and reporting with interactive dashboards, KPI monitoring, and self-service data exploration capabilities.",
        features: ["Real-time metrics", "Interactive visualization", "Role-based dashboards"],
        badge: "Visual Analytics"
      },
      {
        icon: <Bot className="h-6 w-6 text-amber-600" />,
        title: "AI & Automation",
        description: "AI-powered forecasting, anomaly detection, and process automation for enhanced decision-making and operational efficiency.",
        features: ["Predictive analytics", "Natural language queries", "Process automation"],
        badge: "Next-Gen"
      }
    ]
  }

  return (
    <section ref={ref} className="py-14 md:py-20 relative overflow-hidden mt-16 md:mt-24">
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-800/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-900/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-amber-600/5 rounded-full mix-blend-multiply blur-3xl opacity-75 animate-blob animation-delay-2000"></div>

      <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-3 text-center mb-10"
        >
          <div className="inline-flex items-center rounded-full border border-amber-700 bg-amber-100 px-4 py-1 text-sm font-bold text-amber-900 mb-1 shadow-sm">
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-premium-heading">SAP Business One <span className="text-premium-orange">Core Capabilities</span></h2>
          <p className="text-premium-text font-medium text-sm sm:text-base max-w-[85%] mt-2">
            Leveraging the powerful SAP Business One platform to deliver comprehensive functionality that streamlines operations, optimizes resources, and drives business growth.
          </p>
        </motion.div>

        <Tabs defaultValue="mrp" className="mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <TabsList className="grid sm:grid-cols-4 w-full max-w-[700px] bg-amber-100 text-amber-900 p-1 rounded-lg">
              <TabsTrigger 
                value="mrp" 
                className="data-[state=active]:bg-amber-900 data-[state=active]:text-white rounded-md transition-all duration-200 text-sm py-1.5"
              >
                MRP & Planning
              </TabsTrigger>
              <TabsTrigger 
                value="financial"
                className="data-[state=active]:bg-amber-900 data-[state=active]:text-white rounded-md transition-all duration-200 text-sm py-1.5"
              >
                Financial
              </TabsTrigger>
              <TabsTrigger 
                value="operations"
                className="data-[state=active]:bg-amber-900 data-[state=active]:text-white rounded-md transition-all duration-200 text-sm py-1.5"
              >
                Operations
              </TabsTrigger>
              <TabsTrigger 
                value="intelligence"
                className="data-[state=active]:bg-amber-900 data-[state=active]:text-white rounded-md transition-all duration-200 text-sm py-1.5"
              >
                Intelligence
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="mrp" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {capabilities.mrp.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col p-4 md:p-5 bg-white rounded-lg border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all duration-300 group h-full relative overflow-hidden"
                >
                  {capability.badge && (
                    <Badge className="absolute top-3 right-3 bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 text-xs font-medium py-0 px-2">
                      {capability.badge}
                    </Badge>
                  )}
                  <div className="mb-3 p-2 bg-amber-50 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-300">
                    {capability.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2 text-slate-900">{capability.title}</h3>
                  <p className="text-slate-700 text-xs mb-3 flex-grow">{capability.description}</p>
                  <div className="mt-auto border-t border-amber-100 pt-2">
                    <h4 className="text-[10px] font-bold text-amber-900 mb-1.5">CORE FEATURES</h4>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {capability.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="financial" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {capabilities.financial.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col p-4 md:p-5 bg-white rounded-lg border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all duration-300 group h-full relative overflow-hidden"
                >
                  {capability.badge && (
                    <Badge className="absolute top-3 right-3 bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 text-xs font-medium py-0 px-2">
                      {capability.badge}
                    </Badge>
                  )}
                  <div className="mb-3 p-2 bg-amber-50 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-300">
                    {capability.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2 text-slate-900">{capability.title}</h3>
                  <p className="text-slate-700 text-xs mb-3 flex-grow">{capability.description}</p>
                  <div className="mt-auto border-t border-amber-100 pt-2">
                    <h4 className="text-[10px] font-bold text-amber-900 mb-1.5">CORE FEATURES</h4>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {capability.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="operations" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {capabilities.operations.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col p-4 md:p-5 bg-white rounded-lg border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all duration-300 group h-full relative overflow-hidden"
                >
                  {capability.badge && (
                    <Badge className="absolute top-3 right-3 bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 text-xs font-medium py-0 px-2">
                      {capability.badge}
                    </Badge>
                  )}
                  <div className="mb-3 p-2 bg-amber-50 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-300">
                    {capability.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2 text-slate-900">{capability.title}</h3>
                  <p className="text-slate-700 text-xs mb-3 flex-grow">{capability.description}</p>
                  <div className="mt-auto border-t border-amber-100 pt-2">
                    <h4 className="text-[10px] font-bold text-amber-900 mb-1.5">CORE FEATURES</h4>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {capability.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="intelligence" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2"
            >
              {capabilities.intelligence.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col p-4 md:p-5 bg-white rounded-lg border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all duration-300 group h-full relative overflow-hidden"
                >
                  {capability.badge && (
                    <Badge className="absolute top-3 right-3 bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 text-xs font-medium py-0 px-2">
                      {capability.badge}
                    </Badge>
                  )}
                  <div className="mb-3 p-2 bg-amber-50 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-300">
                    {capability.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2 text-slate-900">{capability.title}</h3>
                  <p className="text-slate-700 text-xs mb-3 flex-grow">{capability.description}</p>
                  <div className="mt-auto border-t border-amber-100 pt-2">
                    <h4 className="text-[10px] font-bold text-amber-900 mb-1.5">CORE FEATURES</h4>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {capability.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 flex flex-col items-center"
        >
          <div className="max-w-3xl rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 p-5 border border-amber-200 shadow-sm text-center">
            <h3 className="text-lg font-bold text-amber-900 mb-2">Strategic Implementation Approach</h3>
            <p className="text-slate-700 text-sm">
              SAP Business One provides a comprehensive ERP platform that adapts to your specific business needs through strategic configuration and customization. Our ERP planning methodology ensures you leverage these capabilities to their fullest potential, resulting in a 40% faster implementation timeline and 35% higher user adoption rates.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ErpPlanningCapabilitiesWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ErpPlanningCapabilities {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ErpPlanningCapabilitiesWrapper as ErpPlanningCapabilities };