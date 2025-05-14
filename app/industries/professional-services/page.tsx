import { Metadata } from "next"
import { Suspense } from "react"
import { ArrowRight, Users, Clock, BarChart3, Calendar, FileText, CheckCircle, Scale, GraduationCap, Lightbulb, Database, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StructuredData } from "@/components/seo/structured-data"
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo"

// Loading fallback for Suspense
const SectionLoading = () => <div className="w-full animate-pulse bg-muted/20 h-[300px] rounded-lg"></div>

export const metadata: Metadata = {
  title: "Professional Services Solutions | Atlas Technosoft",
  description: "Advanced SAP and automation solutions for professional services firms to streamline project management, optimize resource allocation, and automate client engagement with intelligent workflows.",
  keywords: [
    "Professional Services",
    "Project Management",
    "Resource Management",
    "Financial Management",
    "Legal Services",
    "Management Consulting",
    "IT Consulting",
    "Accounting Services",
    "Atlas Technosoft",
    "SAP Business One",
    "Professional Services ERP"
  ],
}

export default function ProfessionalServicesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <StructuredData data={generateServiceSchema(
        "Professional Services Solutions",
        "Advanced SAP and automation solutions for professional services firms to streamline project management, optimize resource allocation, and automate client engagement with intelligent workflows.",
        "/industries/professional-services",
        "/images/industries/professional-services.jpg"
      )} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Industries", url: "/industries" },
        { name: "Professional Services", url: "/industries/professional-services" },
      ])} />
      
      {/* Wrap all client components in Suspense boundaries */}
      <Suspense fallback={<SectionLoading />}>
        <ProfessionalServicesHero />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <ProfessionalServicesValueChain />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <ProfessionalServicesSolutions />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <ProfessionalServicesIndustries />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <ProfessionalServicesOptimization />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <ProfessionalServicesCta />
      </Suspense>
    </main>
  )
}

function ProfessionalServicesHero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF5D6] py-8">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-800">
            <span>Professional Services Solutions</span>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-4xl text-center">
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl">
            Elevate Your <span className="text-[#E84A0E]">Services</span> Delivery with <br />
            <span className="text-[#A73370]">Intelligent Technology</span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-base text-slate-700">
            In today&apos;s competitive landscape, firms need to deliver exceptional client outcomes while maximizing efficiency and profitability. Our solutions streamline project management, optimize resource allocation, and deliver actionable insights.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          {heroBenefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                {benefit.icon}
              </div>
              <h3 className="mt-2 text-sm font-semibold text-slate-900">{benefit.title}</h3>
              <p className="mt-1 text-xs text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button 
            size="sm" 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request a Consultation
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white" 
            asChild
          >
            <Link href="#solutions" className="flex items-center">
              Explore Solutions
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const heroBenefits = [
  {
    icon: <Database className="h-4 w-4 text-[#E84A0E]" />,
    title: "Process Efficiency",
    description: "Streamlined workflows and approvals",
  },
  {
    icon: <Clock className="h-4 w-4 text-[#A73370]" />,
    title: "Resource Optimization",
    description: "Up to 24% higher utilization rates",
  },
  {
    icon: <BarChart3 className="h-4 w-4 text-[#A73370]" />,
    title: "Revenue Growth",
    description: "Improved client satisfaction and retention",
  },
  {
    icon: <CheckCircle className="h-4 w-4 text-[#E84A0E]" />,
    title: "Actionable Insights",
    description: "Data-driven decision making",
  },
]

function ProfessionalServicesValueChain() {
  return (
    <section id="value-chain" className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Service Value Chain</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Connect Your <span className="text-[#E84A0E]">Service Value Chain</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Creating value for your clients requires connecting people, processes, and technology. Our solutions help you optimize each stage of your service delivery.
          </p>
        </div>
        
        <div className="relative">
          {/* Value Chain Diagram */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="relative z-10 grid grid-cols-1 gap-y-8 md:grid-cols-5 md:gap-x-6">
            {valueChainSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white rounded-xl shadow-sm p-6 border border-slate-100"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step.bgColor} mb-4`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-xs">{step.description}</p>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-slate-700">
                      <div className={`mr-2 h-1.5 w-1.5 rounded-full ${step.dotColor}`}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const valueChainSteps = [
  {
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    title: "Client Engagement",
    description: "Establish strong relationships with clients through systematic engagement processes and communication.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Opportunity management",
      "Client onboarding",
      "Expectations alignment"
    ]
  },
  {
    icon: <Calendar className="h-8 w-8 text-white" />,
    title: "Planning",
    description: "Create comprehensive project plans with clear deliverables, milestones, and resource requirements.",
    bgColor: "bg-[#A73370]",
    dotColor: "bg-[#A73370]",
    features: [
      "Project scoping",
      "Resource allocation",
      "Timeline development"
    ]
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Execution",
    description: "Deliver services efficiently while maintaining quality standards and client communication.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Task tracking",
      "Time & expense capture",
      "Progress reporting"
    ]
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-white" />,
    title: "Performance",
    description: "Measure and optimize service delivery metrics to ensure client satisfaction and profitability.",
    bgColor: "bg-[#A73370]",
    dotColor: "bg-[#A73370]",
    features: [
      "KPI monitoring",
      "Profitability analysis",
      "Quality assurance"
    ]
  },
  {
    icon: <Rocket className="h-8 w-8 text-white" />,
    title: "Growth",
    description: "Leverage insights from completed projects to enhance service offerings and expand client relationships.",
    bgColor: "bg-[#E84A0E]",
    dotColor: "bg-[#E84A0E]",
    features: [
      "Knowledge management",
      "Service expansion",
      "Continuous improvement"
    ]
  }
]

function ProfessionalServicesSolutions() {
  return (
    <section id="solutions" className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Solutions</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Your Business. Your Goals. <span className="text-[#A73370]">Choose What Suits You Best.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our solutions are tailored for professional services firms to help you deliver exceptional client outcomes, maximize utilization, and increase profitability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {profServicesSolutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all"
            >
              <div className="p-6">
                <div className={`h-12 w-12 rounded-lg ${solution.iconBg} flex items-center justify-center mb-4`}>
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{solution.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{solution.description}</p>
                <div className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request a Demo
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const profServicesSolutions = [
  {
    icon: <Calendar className="h-6 w-6 text-white" />,
    title: "Project Management",
    description: "Comprehensive project planning, execution, and monitoring tools to ensure on-time, on-budget delivery.",
    iconBg: "bg-[#E84A0E]",
    features: [
      "Interactive Gantt charts and visual planning",
      "Task dependencies and critical path analysis",
      "Budget tracking and variance analysis",
      "Client collaboration portals"
    ]
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Resource Management",
    description: "Optimize resource allocation and utilization with AI-powered scheduling and skills matching.",
    iconBg: "bg-[#A73370]",
    features: [
      "Skills-based resource allocation",
      "Capacity planning and forecasting",
      "Real-time utilization tracking",
      "What-if scenario planning"
    ]
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    title: "Financial Management",
    description: "Streamline financial processes from time tracking to billing and revenue recognition.",
    iconBg: "bg-[#E84A0E]",
    features: [
      "Multi-currency project accounting",
      "Flexible billing methods and rate cards",
      "Revenue recognition automation",
      "Profitability analytics"
    ]
  }
]

function ProfessionalServicesIndustries() {
  return (
    <section id="industries" className="py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Specializations</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Solutions Tailored to Your <span className="text-[#E84A0E]">Industry</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We understand the unique challenges of different professional services disciplines and offer specialized solutions to address your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industryExpertise.map((industry, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-0"></div>
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-20" style={{ background: industry.accentColor }}></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 -ml-10 -mb-10 rounded-full opacity-10" style={{ background: industry.accentColor }}></div>
              
              <div className="relative z-10 p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg mb-6`} style={{ background: industry.accentColor }}>
                  {industry.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{industry.title}</h3>
                <p className="text-slate-300 text-sm mb-6">{industry.description}</p>
                
                <div className="space-y-2 mb-8">
                  {industry.capabilities.map((capability, capabilityIndex) => (
                    <div key={capabilityIndex} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm text-slate-300">{capability}</span>
                    </div>
                  ))}
                </div>
                
                <div>
                  <Button 
                    size="sm"
                    className="border-white bg-transparent hover:bg-white hover:text-slate-900 group"
                    variant="outline"
                    asChild
                  >
                    <Link href="/contact" className="flex items-center">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const industryExpertise = [
  {
    icon: <Scale className="h-6 w-6 text-white" />,
    title: "Legal Services",
    description: "Comprehensive solutions for law firms to manage matters, track billable hours, and enhance client service.",
    accentColor: "#E84A0E",
    capabilities: [
      "Matter management and intake workflow automation",
      "Document management with AI-powered search",
      "Secure client portals and collaboration tools",
      "Compliance tracking and conflict checking"
    ]
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    title: "Management Consulting",
    description: "Integrated tools for consulting firms to optimize resource planning, project delivery, and knowledge management.",
    accentColor: "#A73370",
    capabilities: [
      "Advanced resource optimization algorithms",
      "Client engagement lifecycle management",
      "Deliverable collaboration and version control",
      "Knowledge sharing and expertise location"
    ]
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-white" />,
    title: "Accounting & Tax",
    description: "Streamlined workflows for accounting firms to enhance productivity, ensure compliance, and improve client relationships.",
    accentColor: "#E84A0E",
    capabilities: [
      "Automated tax preparation workflows",
      "Client document collection portals",
      "Engagement tracking and management",
      "Compliance calendar and deadline tracking"
    ]
  }
]

function ProfessionalServicesOptimization() {
  return (
    <section className="py-16 bg-[#F8F8FA]">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-600/30 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-800">
            <span>Business Impact</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Measurable <span className="text-[#E84A0E]">Results</span> for Professional Services
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our clients experience significant improvements across key performance indicators:
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {businessImpacts.map((impact, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-all"
            >
              <div className="mb-3 inline-flex rounded-full bg-gradient-to-br from-primary/40 to-primary/20 p-3 text-white">
                {impact.icon}
              </div>
              <div className="text-3xl font-bold text-[#E84A0E] mb-2">{impact.value}</div>
              <div className="text-sm text-slate-700">{impact.label}</div>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-[#E84A0E]/20 p-2 rounded-full mr-2">
                  <Users className="h-5 w-5 text-[#E84A0E]" />
                </span>
                Resource Utilization
              </h3>
              <p className="mb-4 text-slate-600">
                One of the biggest challenges for professional services firms is maximizing billable utilization while 
                maintaining staff satisfaction and preventing burnout. Our solutions help you:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start bg-[#F8F8FA] p-4 rounded-lg">
                  <div className="mr-3 mt-1 text-[#E84A0E]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Skills-Based Resource Matching</h4>
                    <p className="text-sm text-slate-600">
                      Automatically match the right consultants to projects based on skills, experience, location, and availability.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start bg-[#F8F8FA] p-4 rounded-lg">
                  <div className="mr-3 mt-1 text-[#E84A0E]">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Capacity Planning & Forecasting</h4>
                    <p className="text-sm text-slate-600">
                      Predict future resource needs and identify potential gaps or over-allocations before they impact service delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-[#A73370]/20 p-2 rounded-full mr-2">
                  <Clock className="h-5 w-5 text-[#A73370]" />
                </span>
                Time & Expense Management
              </h3>
              <p className="mb-4 text-slate-600">
                Accurate and timely time and expense tracking is critical for professional services firms. Our solutions streamline 
                this process with:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start bg-[#F8F8FA] p-4 rounded-lg">
                  <div className="mr-3 mt-1 text-[#A73370]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Mobile Time Tracking</h4>
                    <p className="text-sm text-slate-600">
                      Enable consultants to log time from anywhere, with intuitive interfaces that increase accuracy and compliance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start bg-[#F8F8FA] p-4 rounded-lg">
                  <div className="mr-3 mt-1 text-[#A73370]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Automated Expense Processing</h4>
                    <p className="text-sm text-slate-600">
                      Capture receipts with OCR technology, automatically categorize expenses, and enforce policy compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const businessImpacts = [
  {
    icon: <BarChart3 className="h-5 w-5 text-[#E84A0E]" />,
    value: "24%",
    label: "Increase in Utilization Rates"
  },
  {
    icon: <CheckCircle className="h-5 w-5 text-[#E84A0E]" />,
    value: "35%",
    label: "Faster Project Completion"
  },
  {
    icon: <Clock className="h-5 w-5 text-[#E84A0E]" />,
    value: "18%",
    label: "Reduction in Administrative Time"
  },
  {
    icon: <FileText className="h-5 w-5 text-[#E84A0E]" />,
    value: "4.2X",
    label: "ROI Within First Year"
  }
]

function ProfessionalServicesCta() {
  return (
    <section className="relative overflow-hidden py-16 bg-[#1E1E38]">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1E1E38] via-[#1E1E38] to-[#A73370]/30 opacity-90"></div>
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#E84A0E]/10 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#A73370]/10 -ml-24 -mb-24"></div>
      
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to <span className="text-[#E84A0E]">Transform</span> Your Service Delivery?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Take the first step towards optimizing your processes and delivering exceptional service to your clients.
          </p>
          
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {ctaBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-[#E84A0E]">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="ml-3 text-sm text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 w-full sm:w-auto group"
              asChild
            >
              <Link href="/contact" className="flex items-center justify-center">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
              asChild
            >
              <Link href="/industries" className="flex items-center justify-center">
                Explore Industries
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const ctaBenefits = [
  "Streamlined project and resource management",
  "Enhanced financial control and visibility",
  "Improved client satisfaction and retention",
  "Data-driven decision making with real-time insights"
] 