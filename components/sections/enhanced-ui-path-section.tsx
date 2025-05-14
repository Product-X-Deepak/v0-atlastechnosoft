"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Suspense } from "react"
import { 
  ArrowRight, 
  Bot, 
  Workflow, 
  Brain, 
  Database, 
  Zap, 
  Code, 
  Server, 
  Shield, 
  Settings, 
  HardDrive, 
  FileStack,
  LayoutDashboard,
  Key,
  Users,
  FolderClosed
} from "lucide-react"

export function EnhancedUIPathSection() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <EnhancedUIPathSectionContent />
    </Suspense>
  );
}

function EnhancedUIPathSectionContent() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    // Store the current value to avoid capturing sectionRef.current during cleanup
    const currentRef = sectionRef.current
    
    return () => {
      if (currentRef) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12 md:py-16">
      {/* Enhanced animated backgrounds with more visible, higher contrast glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/40 to-secondary/30 blur-[80px] animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-tr from-vibrant-blue/30 to-secondary/30 blur-[80px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-primary/25 blur-[60px] animate-pulse-slow"></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Enhanced content section with improved visibility */}
          <div className="flex flex-col items-center text-center mb-10">
            <div
              className={`mb-3 inline-flex items-center rounded-full border border-primary/80 bg-primary/30 px-2.5 py-1 text-xs font-medium backdrop-blur-sm transition-all duration-500 delay-100 shadow-lg ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <Zap className="mr-1.5 h-3 w-3 text-white" />
              <span className="text-white font-semibold drop-shadow-md">Next-Gen Enterprise Automation</span>
            </div>
            
            <h2 
              className={`mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl transition-all duration-500 delay-200 text-white drop-shadow-lg ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              Unleash Business Potential with <span className="bg-gradient-to-r from-primary via-vibrant-blue to-secondary bg-clip-text text-transparent font-extrabold drop-shadow-xl">UiPath Agentic Automation</span>
            </h2>
            
            <p 
              className={`mb-6 text-base text-white max-w-3xl transition-all duration-500 delay-300 drop-shadow-md font-medium ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              Enter the agentic age with UiPath&apos;s AI-driven enterprise automation platform. Combine RPA, AI, and process 
              mining to eliminate manual work, reduce costs, and enable your workforce to focus on high-value initiatives while 
              maintaining robust IT governance and security.
            </p>
          </div>

          <div 
            className={`mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-500 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {uipathFeatures.map((feature, index) => (
              <div
                key={index}
                className="transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
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
              </div>
            ))}
          </div>

          {/* IT Compliance Framework - Enhanced for better visibility */}
          <div 
            className={`mb-8 p-4 border-2 border-primary/40 rounded-xl bg-black/40 backdrop-blur-md shadow-lg transition-all duration-500 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-lg font-semibold mb-3 text-white drop-shadow-md">Enterprise-Grade IT Compliance</h3>
                  <p className="text-xs text-gray-200 mb-3">
                    Implement RPA with confidence using UiPath&apos;s comprehensive IT compliance framework. Maintain governance, 
                    security, and control while accelerating your digital transformation journey.
                  </p>
                  <div className="bg-gradient-to-r from-primary/30 to-secondary/20 rounded-md p-2 text-xs shadow-inner">
                    <ul className="list-disc list-inside space-y-0.5 text-xs text-white font-medium">
                      <li>Process management and development best practices</li>
                      <li>Enterprise-grade platform security</li>
                      <li>Comprehensive backup and disaster recovery</li>
                      <li>Centralized credential management</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {itComplianceFeatures.map((feature, index) => (
                    <div 
                      key={index}
                    className="flex flex-col items-center justify-center p-3 text-center rounded-lg border border-primary/20 bg-black/60 backdrop-blur-md hover:border-primary/40 transition-all duration-300"
                    >
                    <div className="rounded-full bg-primary/30 p-2 text-white mb-2 shadow-md">{feature.icon}</div>
                    <h4 className="text-xs font-semibold mb-1 text-white">{feature.title}</h4>
                    <p className="text-xs text-gray-300">{feature.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div 
            className={`mb-8 transition-all duration-500 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h3 className="mb-4 text-lg font-semibold text-center text-white drop-shadow-md">Powerful Platform Components</h3>
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
          </div>

          {/* Best Practices for Implementation - Continue styling similarly for the rest */}
          <div 
            className={`mb-8 transition-all duration-500 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h3 className="mb-4 text-lg font-medium text-center text-white drop-shadow-md">Implementation Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {implementationBestPractices.map((practice, index) => (
                <Card 
                  key={index} 
                  className="border border-primary/30 bg-black/50 hover:border-primary/60 transition-all duration-300"
                >
                  <CardContent className="p-3 flex items-start">
                    <div className="rounded-full bg-primary/20 p-2 text-white mr-3 mt-0.5 shadow-md flex-shrink-0">
                      {practice.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1 text-white">{practice.title}</h4>
                      <p className="text-xs text-gray-300">{practice.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA - Enhanced for better visibility */}
          <div 
            className={`text-center transition-all duration-500 delay-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="inline-block">
              <Button asChild size="lg" className="group">
                <Link href="/automation-solutions/ui-path" className="inline-flex items-center">
                  <span>Explore UiPath Solutions</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Need help implementing UiPath? <Link href="/contact" className="text-primary hover:underline">Contact our experts</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Data for the UiPath section
const uipathFeatures = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: "Agentic Automation",
    description: "AI-powered automation that autonomously executes end-to-end business processes with minimal human intervention.",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "AI & Machine Learning",
    description: "Advanced machine learning capabilities to automate complex, judgment-intensive tasks with high accuracy.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Process Mining",
    description: "Discover optimization opportunities by analyzing your business processes using advanced process mining technology.",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Document Understanding",
    description: "Extract and process data from documents of any type with AI-powered document understanding capabilities.",
  },
];

const itComplianceFeatures = [
  {
    icon: <Shield className="h-4 w-4" />,
    title: "Security",
    description: "Role-based access control with end-to-end encryption",
  },
  {
    icon: <Key className="h-4 w-4" />,
    title: "Credentials",
    description: "Centralized secure credential management",
  },
  {
    icon: <Users className="h-4 w-4" />,
    title: "Governance",
    description: "Comprehensive audit logs and compliance tools",
  },
  {
    icon: <HardDrive className="h-4 w-4" />,
    title: "Backup",
    description: "Automated backup and disaster recovery",
  },
  {
    icon: <Server className="h-4 w-4" />,
    title: "Scalability",
    description: "Enterprise-grade architecture to scale securely",
  },
  {
    icon: <FolderClosed className="h-4 w-4" />,
    title: "Versioning",
    description: "Process versioning and change management",
  },
];

const platformHighlights = [
  {
    icon: <Bot className="h-4 w-4" />,
    name: "UiPath Robots",
    description: "Software robots that perfectly emulate human actions to automate any front and back-office process.",
    highlight: "Attended, unattended, and hybrid automation capabilities",
  },
  {
    icon: <LayoutDashboard className="h-4 w-4" />,
    name: "UiPath Orchestrator",
    description: "Centralized platform for deploying, scheduling, monitoring, and managing all your automation processes.",
    highlight: "Enterprise-grade controls and governance",
  },
  {
    icon: <Database className="h-4 w-4" />,
    name: "Document Understanding",
    description: "Extract, classify, and process data from structured and unstructured documents.",
    highlight: "AI-powered document processing with high accuracy",
  },
];

const implementationBestPractices = [
  {
    icon: <Settings className="h-4 w-4" />,
    title: "Establish Governance",
    description: "Create a Center of Excellence (CoE) to set standards and manage your automation program effectively.",
  },
  {
    icon: <FileStack className="h-4 w-4" />,
    title: "Process Assessment",
    description: "Identify and prioritize processes for automation based on complexity, volume and business impact.",
  },
  {
    icon: <Code className="h-4 w-4" />,
    title: "Development Standards",
    description: "Follow development best practices with version control and comprehensive documentation.",
  },
  {
    icon: <Server className="h-4 w-4" />,
    title: "Infrastructure Planning",
    description: "Plan infrastructure requirements to ensure optimal performance and availability.",
  },
];
