"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bot, 
  Shield,
  Search, 
  LineChart,
  MessagesSquare,
  GanttChartSquare,
  Factory,
  FileCheck,
  Network,
  CreditCard,
  FileSpreadsheet
} from "lucide-react"

export default function UiPathCapabilities() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })
  
  const capabilities = {
    agenticAi: [
      {
        icon: <Bot className="h-6 w-6 text-amber-800" />,
        title: "Robotic Process Automation",
        description: "Software robots that mimic human actions to automate repetitive tasks across applications and systems with high accuracy.",
        features: ["Screen automation", "Keystroke emulation", "Rule-based execution"],
        badge: "Core Module"
      },
      {
        icon: <GanttChartSquare className="h-6 w-6 text-amber-800" />,
        title: "Process Mining",
        description: "Data-driven process discovery and analysis that identifies automation opportunities and process bottlenecks.",
        features: ["Process mapping", "Bottleneck identification", "Opportunity scoring"],
        badge: ""
      },
      {
        icon: <Factory className="h-6 w-6 text-amber-800" />,
        title: "Task Mining",
        description: "Desktop activity monitoring that captures user interactions to identify repetitive tasks suitable for automation.",
        features: ["Pattern recognition", "Task frequency analysis", "ROI calculation"],
        badge: ""
      },
      {
        icon: <FileCheck className="h-6 w-6 text-amber-800" />,
        title: "Test Automation",
        description: "Automated testing capabilities that ensure application quality and reduce manual testing effort across your systems.",
        features: ["UI testing", "API testing", "Regression testing"],
        badge: "Enhanced"
      }
    ],
    rpa: [
      {
        icon: <Bot className="h-6 w-6 text-amber-800" />,
        title: "Robotic Process Automation",
        description: "Software robots that mimic human actions to automate repetitive tasks across applications and systems with high accuracy.",
        features: ["Screen automation", "Keystroke emulation", "Rule-based execution"],
        badge: "Core Module"
      },
      {
        icon: <GanttChartSquare className="h-6 w-6 text-amber-800" />,
        title: "Process Mining",
        description: "Data-driven process discovery and analysis that identifies automation opportunities and process bottlenecks.",
        features: ["Process mapping", "Bottleneck identification", "Opportunity scoring"],
        badge: ""
      },
      {
        icon: <Factory className="h-6 w-6 text-amber-800" />,
        title: "Task Mining",
        description: "Desktop activity monitoring that captures user interactions to identify repetitive tasks suitable for automation.",
        features: ["Pattern recognition", "Task frequency analysis", "ROI calculation"],
        badge: ""
      },
      {
        icon: <FileCheck className="h-6 w-6 text-amber-800" />,
        title: "Test Automation",
        description: "Automated testing capabilities that ensure application quality and reduce manual testing effort across your systems.",
        features: ["UI testing", "API testing", "Regression testing"],
        badge: "Enhanced"
      }
    ],
    integration: [
      {
        icon: <Network className="h-6 w-6 text-amber-700" />,
        title: "API Automation",
        description: "Connect systems and applications through their APIs to create seamless automated workflows across your enterprise.",
        features: ["RESTful integration", "SOAP support", "Authentication handling"],
        badge: ""
      },
      {
        icon: <CreditCard className="h-6 w-6 text-amber-700" />,
        title: "SAP Automation",
        description: "Purpose-built automation for SAP systems that streamlines core business processes and reduces manual effort.",
        features: ["GUI automation", "S/4HANA support", "Transaction automation"],
        badge: "SAP Certified"
      },
      {
        icon: <FileSpreadsheet className="h-6 w-6 text-amber-700" />,
        title: "Microsoft 365 Integration",
        description: "Seamless automation with Microsoft applications including Excel, Outlook, Teams, and SharePoint for office productivity.",
        features: ["Email processing", "Excel automation", "Teams integration"],
        badge: ""
      },
      {
        icon: <Shield className="h-6 w-6 text-amber-700" />,
        title: "Enterprise Integration",
        description: "Connect with enterprise systems like Oracle, Salesforce, and ServiceNow through native connectors and custom APIs.",
        features: ["Bi-directional sync", "Event-driven automation", "Data validation"],
        badge: ""
      }
    ]
  }

  return (
    <section ref={ref} className="py-14 md:py-20 relative overflow-hidden" id="capabilities">
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
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-slate-900">The Complete Agentic Automation Platform</h2>
          <p className="text-slate-800 font-medium text-sm sm:text-base max-w-[85%] mt-2">
            Combining AI agents that think with RPA robots that do, all orchestrated on a secure, enterprise-ready foundation for end-to-end automation.
          </p>
        </motion.div>

        <Tabs defaultValue="ai" className="mt-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-transparent h-auto p-0 mb-8">
            <TabsTrigger 
              value="ai" 
              className="data-[state=active]:border-b-primary data-[state=active]:text-primary py-3 border-b-2 border-transparent"
            >
              <Bot className="h-5 w-5 mr-2" />
              AI & Automation
            </TabsTrigger>
            
            <TabsTrigger 
              value="process" 
              className="data-[state=active]:border-b-primary data-[state=active]:text-primary py-3 border-b-2 border-transparent"
            >
              <Search className="h-5 w-5 mr-2" />
              Process Mining
            </TabsTrigger>
            
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:border-b-primary data-[state=active]:text-primary py-3 border-b-2 border-transparent"
            >
              <LineChart className="h-5 w-5 mr-2" />
              Analytics
            </TabsTrigger>
            
            <TabsTrigger 
              value="communications" 
              className="data-[state=active]:border-b-primary data-[state=active]:text-primary py-3 border-b-2 border-transparent"
            >
              <MessagesSquare className="h-5 w-5 mr-2" />
              Communications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {capabilities.agenticAi.map((capability, index) => (
                <div key={index} className="group bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-shrink-0 mr-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 text-amber-900">
                          {capability.icon}
                        </div>
                      </div>
                      {capability.badge && (
                        <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-900">
                          {capability.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{capability.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{capability.description}</p>
                    <div className="mt-4 space-y-2">
                      {capability.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <div className="mr-2 h-4 w-4 text-amber-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="process" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="mr-4 h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Task Mining</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Automatically discover optimization opportunities by analyzing user interactions with desktop applications.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Identify repetitive tasks suitable for automation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Create detailed process maps from user activity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Discover bottlenecks and inefficiencies</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="mr-4 h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <GanttChartSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Process Mining</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Gain complete visibility into your business processes through event log analysis.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Visualize actual process execution paths</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Identify compliance violations and process deviations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Quantify the impact of process improvements</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="mr-4 h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Factory className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Operational Analytics</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Monitor and measure the performance of your automation program in real time.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Track ROI and cost savings from automation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Monitor bot performance and utilization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Identify opportunities for process improvement</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="mr-4 h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <FileCheck className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Business Intelligence</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Transform raw data into actionable insights with advanced analytics capabilities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Create customizable dashboards and reports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Extract insights from structured and unstructured data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Make data-driven decisions with confidence</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="communications" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="mr-4 h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                    <Network className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Integration Hub</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Connect UiPath with hundreds of applications and systems without complex coding.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Pre-built connectors for popular enterprise applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Low-code integration configuration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Secure data exchange between systems</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="mr-4 h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Identity Management</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Ensure secure access to automation resources with comprehensive identity controls.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Role-based access control for automation assets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Single sign-on integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Credential vault for secure password management</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
} 