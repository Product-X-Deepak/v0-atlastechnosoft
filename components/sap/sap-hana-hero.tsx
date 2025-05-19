"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Database, Zap, BarChart3, Brain, Globe, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function SapHanaHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  const [dataPoints, setDataPoints] = useState<Array<{
    id: number;
    x: string;
    y: string;
    opacity: number;
    scale: number;
    xAnimated: [string, string];
    yAnimated: [string, string];
    opacityAnimated: [number, number];
    duration: number;
  }>>([]);

  // Generate random positions after component mounts to avoid hydration mismatches
  useEffect(() => {
    const newDataPoints = [...Array(20)].map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.3 + 0.2,
      scale: Math.random() * 1 + 0.5,
      xAnimated: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] as [string, string],
      yAnimated: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] as [string, string],
      opacityAnimated: [Math.random() * 0.3 + 0.2, Math.random() * 0.3 + 0.2] as [number, number],
      duration: 8 + Math.random() * 7
    }));
    setDataPoints(newDataPoints);
  }, []);
  
  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden bg-[#FFF5D6] py-8"
    >
      {/* Abstract data pattern background - subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute h-full w-full">
          {dataPoints.map((point) => (
            <motion.div
              key={point.id}
              className="absolute h-px w-px rounded-full bg-slate-700"
              initial={{
                x: point.x,
                y: point.y,
                opacity: point.opacity,
                scale: point.scale,
              }}
              animate={{
                x: [null, point.xAnimated[0], point.xAnimated[1]],
                y: [null, point.yAnimated[0], point.yAnimated[1]],
                opacity: [null, point.opacityAnimated[0], point.opacityAnimated[1]],
              }}
              transition={{
                duration: point.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-[#E84A0E]/30 bg-[#E84A0E]/10 px-3 py-1 text-sm font-medium text-[#E84A0E]">
            <Database className="mr-1.5 h-3.5 w-3.5" />
            <span>SAP Partner</span>
          </div>
        </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-4 max-w-4xl text-center"
          >
            <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl drop-shadow-sm">
              The Intelligent Foundation for <span className="text-[#E84A0E] font-black">Digital</span> <span className="text-[#A73370] font-black">Transformation</span>
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-base font-medium text-slate-800">
              SAP HANA&apos;s revolutionary in-memory platform processes massive amounts of real-time data at unprecedented speeds, delivering actionable insights that accelerate innovation and drive competitive advantage. With HANA 2.0 SPS 06, you&apos;ll unlock advanced AI capabilities, multi-model processing, and cloud-native flexibility.
            </p>
          </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-4 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                {benefit.icon}
              </div>
              <h3 className="mt-2 text-sm font-semibold text-slate-900">{benefit.title}</h3>
              <p className="mt-1 text-xs text-slate-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button 
            size="sm" 
            className="bg-[#E84A0E] text-white hover:bg-[#E84A0E]/90 group" 
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Request a Demo
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-[#1E1E38] bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90 hover:text-white" 
            asChild
          >
            <Link href="#features" className="flex items-center">
              Explore Features
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
              </Button>
            </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mx-auto mt-8 flex max-w-5xl justify-center"
        >
          <div className="relative flex h-16 w-full max-w-4xl items-center justify-between rounded-2xl border border-[#E84A0E]/10 bg-white/80 px-8 backdrop-blur-md">
            <div className="flex items-center text-slate-800">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E84A0E] to-[#A73370]/70">
                <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                <div className="text-sm font-semibold">Performance Breakthrough</div>
                <div className="text-xs text-slate-600">10,000x faster than traditional databases</div>
              </div>
                </div>
            <div className="hidden items-center text-slate-800 sm:flex">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E84A0E] to-[#A73370]/70">
                <Server className="h-5 w-5 text-white" />
                </div>
                <div>
                <div className="text-sm font-semibold">Data Footprint</div>
                <div className="text-xs text-slate-600">Reduce storage needs by up to 90%</div>
              </div>
            </div>
            <div className="hidden items-center text-slate-800 lg:flex">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E84A0E] to-[#A73370]/70">
                <Brain className="h-5 w-5 text-white" />
                  </div>
              <div>
                <div className="text-sm font-semibold">AI-Powered</div>
                <div className="text-xs text-slate-600">Built-in machine learning capabilities</div>
              </div>
              </div>
            </div>
          </motion.div>
      </div>
    </section>
  )
}

const benefits = [
  {
    icon: <Database className="h-4 w-4 text-[#E84A0E]" />,
    title: "In-Memory Computing",
    description: "Process data 10,000x faster",
  },
  {
    icon: <Brain className="h-4 w-4 text-[#A73370]" />,
    title: "Advanced Analytics",
    description: "Built-in AI and ML capabilities",
  },
  {
    icon: <Globe className="h-4 w-4 text-[#A73370]" />,
    title: "Flexible Deployment",
    description: "Cloud, on-premise, or hybrid",
  },
  {
    icon: <BarChart3 className="h-4 w-4 text-[#E84A0E]" />,
    title: "Real-Time Insights",
    description: "Instant business intelligence",
  },
]

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SapHanaHeroWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SapHanaHero {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SapHanaHeroWrapper as SapHanaHero };