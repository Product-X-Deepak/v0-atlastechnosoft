"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  CreditCard, 
  Factory, 
  Package, 
  ShoppingCart, 
  Activity,
  Layers,
  PieChart,
  Globe,
  Lock,
  MoveRight
} from "lucide-react"
import { Suspense } from "react"

function SapBusinessOneFeatures() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })

  return (
    <section 
      id="features" 
      ref={ref} 
      className="py-16"
    >
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Core Capabilities</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-premium-heading md:text-4xl">
            Powerful <span className="text-premium-orange">Features</span> That Drive Business Growth
          </h2>
          <p className="mt-4 text-lg text-premium-text max-w-2xl mx-auto">
            SAP Business One offers a comprehensive suite of features to manage every aspect of your business operations with precision and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="group"
            >
              <Card className="h-full bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#E84A0E] text-white shadow-sm">
                    {feature.icon}
                  </div>
                  <CardTitle className="flex items-center justify-between text-base text-slate-900">
                    {feature.title}
                    <MoveRight className="h-3 w-0 transition-all duration-300 group-hover:w-3 group-hover:text-[#E84A0E]" />
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600">{feature.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-5 pt-0">
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {feature.capabilities.map((capability, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="mr-1.5 mt-1 h-1.5 w-1.5 rounded-full bg-[#E84A0E]"></div>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "Financial Management",
    subtitle: "Complete financial control and transparency",
    capabilities: [
      "Automate key accounting processes (journal entries, AR, AP)",
      "Real-time cash flow management and forecasting",
      "Fixed asset management and depreciation automation",
      "Banking and reconciliation with multiple methods",
      "Standard and customized financial reporting",
    ],
  },
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    title: "Sales & CRM",
    subtitle: "Streamline your entire sales process",
    capabilities: [
      "End-to-end sales opportunity management",
      "Marketing campaign planning and tracking",
      "Customer data management and synchronization",
      "Service contract and warranty management",
      "Mobile sales access on any device, anywhere",
    ],
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: "Purchasing & Inventory",
    subtitle: "Optimize sourcing and stock management",
    capabilities: [
      "Streamlined procurement and purchase planning",
      "Centralized master data management",
      "Real-time warehouse and accounting integration",
      "Accounts payable optimization",
      "Multi-warehouse management and transfers",
    ],
  },
  {
    icon: <Factory className="h-5 w-5" />,
    title: "Production & MRP",
    subtitle: "Enhance manufacturing efficiency",
    capabilities: [
      "Bill of materials and production orders management",
      "Resource capacity planning and scheduling",
      "Material requirements planning with forecasting",
      "Quality control and inspection throughout production",
      "Production cost tracking and variance analysis",
    ],
  },
  {
    icon: <PieChart className="h-5 w-5" />,
    title: "Business Intelligence",
    subtitle: "Make data-driven decisions faster",
    capabilities: [
      "Interactive web-based dashboards with real-time KPIs",
      "AI-assisted analytics for automatic insight generation",
      "Natural language queries for business data exploration",
      "Self-service reporting with drag-and-drop interfaces",
      "Predictive analytics with machine learning capabilities",
    ],
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Cloud & Mobility",
    subtitle: "Access your business from anywhere",
    capabilities: [
      "Enhanced web client with complete functionality access",
      "Flexible deployment: public cloud, private cloud, or hybrid",
      "Native mobile apps with offline capabilities",
      "Seamless switching between web and desktop clients",
      "Automatic updates with zero downtime maintenance",
    ],
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Integration & APIs",
    subtitle: "Connect your entire business ecosystem",
    capabilities: [
      "Pre-built integrations with Microsoft 365",
      "Open API architecture for extended connectivity",
      "Third-party application integrations",
      "EDI and eCommerce platform connections",
      "Integration Hub for simplified connections",
    ],
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Analytics & Reporting",
    subtitle: "Transform data into actionable insights",
    capabilities: [
      "Real-time reporting across all business areas",
      "Interactive dashboard creation and sharing",
      "Custom report design without IT assistance",
      "Advanced analytics for trend identification",
      "Export capabilities to multiple formats",
    ],
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Compliance & Security",
    subtitle: "Protect your data and meet regulations",
    capabilities: [
      "Role-based user permissions and access control",
      "Data encryption at rest and in transit",
      "Audit trails and change logs for all activities",
      "Compliance with international standards",
      "Regular security updates and patches",
    ],
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapBusinessOneFeaturesWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapBusinessOneFeatures {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapBusinessOneFeaturesWrapper as SapBusinessOneFeatures };