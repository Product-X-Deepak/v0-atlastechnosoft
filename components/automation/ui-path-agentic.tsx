"use client"

import React from "react"
import Image from "next/image"

export default function UiPathAgentic() {
  return (
    <section className="py-14 md:py-20 relative overflow-hidden" id="agentic">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-600/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-3 text-center mb-8">
          <div className="inline-flex items-center rounded-full border border-amber-700 bg-amber-100 px-4 py-1 text-sm font-bold text-amber-900 mb-1 shadow-sm">
            <span>Strategic Approach</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-slate-900">
            A Strategic Approach to ERP Planning
          </h2>
          <p className="text-slate-900 font-medium text-sm sm:text-base max-w-[85%] mt-2">
            Our modern agentic approach ensures your UiPath automation investments align perfectly with your business strategy, achieving maximum ROI through proven strategic planning.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center mt-12">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg mb-8">
              <Image 
                src="/images/solutions/B4_A.png"
                alt="UiPath Agentic AI"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platformComponents.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3 text-[#E84A0E]">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const platformComponents = [
  {
    title: "Processes",
    description: "Model and orchestrate agents, robots, and people end-to-end for complete business process automation."
  },
  {
    title: "Workflows",
    description: "Plan, build, and deploy automated workflows that connect systems, data, and people across the enterprise."
  },
  {
    title: "Activities",
    description: "Empower agents and robots with specialized AI, API connections, and rules-based decision-making capabilities."
  },
  {
    title: "Foundation",
    description: "Enterprise-grade platform with built-in security, governance, and scalability for mission-critical automation."
  }
] 