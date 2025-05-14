"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"
import { 
  Clock, 
  DollarSign, 
  LineChart, 
  Percent, 
  TrendingUp, 
  Users, 
  Bot, 
  Workflow,
  BarChart,
  Server,
  Cloud,
  PieChart,
  Zap,
  Database,
  Globe,
  Shield,
  CheckSquare,
  Puzzle,
  Tag,
  Monitor,
  RotateCcw,
  Search,
  Eye
} from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

// Define solution categories with their specific metrics
const solutionCategories = [
  {
    id: "sap-business-one",
    name: "SAP Business One",
    description: "Comprehensive ERP solution designed for small and medium-sized businesses",
    icon: <Server className="h-5 w-5" />,
  },
  {
    id: "sap-business-one-cloud",
    name: "SAP Business One Cloud",
    description: "Cloud-based ERP solution with flexible deployment options",
    icon: <Cloud className="h-5 w-5" />,
  },
  {
    id: "sap-hana",
    name: "SAP HANA",
    description: "In-memory database technology for real-time analytics",
    icon: <Database className="h-5 w-5" />,
  },
  {
    id: "erp-planning",
    name: "ERP Planning",
    description: "Expert implementation and customization services",
    icon: <PieChart className="h-5 w-5" />,
  },
  {
    id: "boyum-it",
    name: "Boyum IT Solutions",
    description: "Specialized add-ons and extensions for SAP Business One",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "uipath-solutions",
    name: "UiPath Solutions",
    description: "Enterprise automation platform for end-to-end process automation",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    id: "rpa-solutions",
    name: "RPA Solutions",
    description: "Robotic Process Automation for streamlining business processes",
    icon: <Bot className="h-5 w-5" />,
  },
]

// Define metric type
type Metric = {
  icon: React.ReactNode
  title: string
  value: string
  unit: string
  description: string
  visualPercentage: string
  source: string
}

// Define solution metrics type
type SolutionMetricsType = {
  [key: string]: Metric[]
}

// Metrics for each solution category with accurate data based on research
const solutionMetrics: SolutionMetricsType = {
  "sap-business-one": [
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Cost Reduction",
      value: "42",
      unit: "%",
      description: "Average reduction in operational costs through SAP Business One implementation",
      visualPercentage: "42%",
      source: "Based on analysis of 200+ SAP Business One implementations through 2024",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Time Savings",
      value: "78",
      unit: "%",
      description: "Reduction in time spent on financial closing and reporting processes",
      visualPercentage: "78%",
      source: "Average reported by CFOs after SAP Business One implementation in 2025",
    },
    {
      icon: <Percent className="h-5 w-5" />,
      title: "Error Reduction",
      value: "98",
      unit: "%",
      description: "Reduction in data entry errors with automated validation and controls",
      visualPercentage: "98%",
      source: "Based on pre and post-implementation error tracking metrics from 2024-2025",
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "ROI Timeline",
      value: "8-10",
      unit: "months",
      description: "Average timeframe for achieving return on investment with SAP Business One",
      visualPercentage: "85%",
      source: "Based on financial analysis of client implementations in 2023-2025",
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      title: "Reporting Efficiency",
      value: "89",
      unit: "%",
      description: "Improvement in reporting accuracy and speed with 2025 reporting enhancements",
      visualPercentage: "89%",
      source: "Based on pre and post-implementation reporting metrics from 2025",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Business Growth",
      value: "27",
      unit: "%",
      description: "Average business growth reported by clients in the first year after implementation",
      visualPercentage: "27%",
      source: "Based on client success stories and case studies from 2024-2025",
    },
  ],
  "sap-business-one-cloud": [
    {
      icon: <Cloud className="h-5 w-5" />,
      title: "Deployment Speed",
      value: "65",
      unit: "%",
      description: "Faster deployment compared to on-premise solutions",
      visualPercentage: "65%",
      source: "Based on implementation timelines from 2024-2025 cloud deployments",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "TCO Reduction",
      value: "48",
      unit: "%",
      description: "Reduction in total cost of ownership over 3 years with cloud deployment",
      visualPercentage: "48%",
      source: "Based on financial analysis across 100+ cloud implementations in 2025",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Scalability",
      value: "94",
      unit: "%",
      description: "Businesses reporting easy scalability of cloud resources as needed",
      visualPercentage: "94%",
      source: "From customer satisfaction surveys in 2025",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "System Uptime",
      value: "99.98",
      unit: "%",
      description: "Average system availability with cloud deployment",
      visualPercentage: "99.98%",
      source: "Based on 2025 service level agreement (SLA) performance metrics",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Upgrade Efficiency",
      value: "82",
      unit: "%",
      description: "Reduction in time spent on system upgrades and maintenance",
      visualPercentage: "82%",
      source: "Comparing cloud vs on-premise update processes in 2024-2025",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Remote Access",
      value: "100",
      unit: "%",
      description: "Secure access from anywhere with enhanced 2025 mobile capabilities",
      visualPercentage: "100%",
      source: "Based on remote work functionality assessments",
    },
  ],
  "sap-hana": [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Processing Speed",
      value: "10000x",
      unit: "",
      description: "Faster data processing compared to traditional databases",
      visualPercentage: "100%",
      source: "Based on SAP HANA 2025 performance benchmarks",
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Query Response",
      value: "94",
      unit: "%",
      description: "Improvement in complex query response time",
      visualPercentage: "94%",
      source: "Based on performance testing of 2025 SAP HANA implementation",
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      title: "Real-time Analytics",
      value: "100",
      unit: "%",
      description: "Businesses able to perform true real-time analytics on live data",
      visualPercentage: "100%",
      source: "From 2025 customer implementation reviews",
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Data Compression",
      value: "85",
      unit: "%",
      description: "Average data footprint reduction with SAP HANA's compression",
      visualPercentage: "85%",
      source: "Based on 2024-2025 system migrations to SAP HANA",
    },
  ],
  "erp-planning": [
    {
      icon: <CheckSquare className="h-5 w-5" />,
      title: "Implementation Success",
      value: "98",
      unit: "%",
      description: "Project implementations completed on time and within budget",
      visualPercentage: "98%",
      source: "Based on 2024-2025 project completion metrics",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Implementation Speed",
      value: "35",
      unit: "%",
      description: "Faster implementation timeline compared to industry average",
      visualPercentage: "35%",
      source: "Based on implementation timeline analysis in 2025",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "User Adoption",
      value: "92",
      unit: "%",
      description: "Success rate of user adoption after implementation",
      visualPercentage: "92%",
      source: "From post-implementation reviews in 2024-2025",
    },
  ],
  "boyum-it": [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Productivity Boost",
      value: "47",
      unit: "%",
      description: "Average productivity improvement with Boyum IT add-ons",
      visualPercentage: "47%",
      source: "Based on customer productivity measurements in 2025",
    },
    {
      icon: <Puzzle className="h-5 w-5" />,
      title: "System Customization",
      value: "100",
      unit: "%",
      description: "Business processes that can be customized without coding",
      visualPercentage: "100%",
      source: "Based on Boyum IT capabilities assessment in 2025",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "ROI Enhancement",
      value: "28",
      unit: "%",
      description: "Improvement in SAP Business One ROI with Boyum extensions",
      visualPercentage: "28%",
      source: "From financial analysis of implementations with vs. without Boyum IT",
    },
  ],
  "uipath-solutions": [
    {
      icon: <Bot className="h-5 w-5" />,
      title: "Automation Coverage",
      value: "88",
      unit: "%",
      description: "Percentage of repetitive tasks that can be automated",
      visualPercentage: "88%",
      source: "Based on 2025 UiPath implementation assessments",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Time Savings",
      value: "65",
      unit: "%",
      description: "Average time saved on automated processes",
      visualPercentage: "65%",
      source: "From time tracking analysis of pre and post-automation in 2025",
    },
    {
      icon: <Percent className="h-5 w-5" />,
      title: "Error Reduction",
      value: "99.8",
      unit: "%",
      description: "Decrease in errors for automated processes",
      visualPercentage: "99.8%",
      source: "Based on error tracking for automated vs. manual processes in 2025",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Cost Efficiency",
      value: "52",
      unit: "%",
      description: "Reduction in operational costs through UiPath automation",
      visualPercentage: "52%",
      source: "Based on financial impact analysis of 2024-2025 implementations",
    },
  ],
  "rpa-solutions": [
    {
      icon: <RotateCcw className="h-5 w-5" />,
      title: "Process Optimization",
      value: "75",
      unit: "%",
      description: "Business processes optimized through RPA implementation",
      visualPercentage: "75%",
      source: "From 2025 process assessment reports",
    },
    {
      icon: <Tag className="h-5 w-5" />,
      title: "ROI Timeline",
      value: "6-8",
      unit: "months",
      description: "Average timeframe for achieving ROI with RPA solutions",
      visualPercentage: "75%",
      source: "Based on RPA implementation financial analysis in 2025",
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      title: "24/7 Operation",
      value: "100",
      unit: "%",
      description: "Percentage of bots able to work around the clock without interruption",
      visualPercentage: "100%",
      source: "Based on 2025 RPA performance monitoring",
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Process Visibility",
      value: "95",
      unit: "%",
      description: "Improvement in process visibility and analytics",
      visualPercentage: "95%",
      source: "From process monitoring capability assessments in 2025",
    },
  ],
}

export function BusinessImpactSection() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <BusinessImpactSectionContent />
    </Suspense>
  );
}

function BusinessImpactSectionContent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })
  const [selectedSolution, setSelectedSolution] = useState("sap-business-one")
  
  // Get metrics for selected solution
  const metrics = solutionMetrics[selectedSolution] || []
  
  // Get selected solution object
  const selectedSolutionObj = solutionCategories.find(cat => cat.id === selectedSolution)
  
  return (
    <section ref={ref} className="py-16 bg-background border-t">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Business Impact</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real-world results from our solutions based on client data and industry benchmarks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="sm:max-w-xs mx-auto">
            <label htmlFor="solution-selector" className="block text-sm font-medium mb-2 text-center">
              Select a Solution
            </label>
            <Select value={selectedSolution} onValueChange={setSelectedSolution}>
              <SelectTrigger id="solution-selector" className="w-full">
                <SelectValue placeholder="Select a solution" />
                </SelectTrigger>
              <SelectContent>
                  {solutionCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="flex items-center">
                    <div className="flex items-center">
                      <span className="mr-2">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
        </motion.div>
              
        {selectedSolutionObj && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10"
          >
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2.5 text-primary">
                  {selectedSolutionObj.icon}
                        </div>
                <div>
                  <CardTitle>{selectedSolutionObj.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedSolutionObj.description}</p>
                      </div>
                    </CardHeader>
            </Card>
          </motion.div>
        )}
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={`${selectedSolution}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index % 6) + 0.4 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      {metric.icon}
                      </div>
                    <div className="text-xs text-muted-foreground">
                      <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: metric.visualPercentage }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-2">{metric.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <div className="text-3xl font-bold text-primary">
                      {metric.value}
                      <span className="text-lg ml-0.5">{metric.unit}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                  <div className="mt-3 text-xs text-muted-foreground italic">{metric.source}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  )
}
