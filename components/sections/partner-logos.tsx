"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { Suspense } from "react"

function PartnerLogos() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const partners = [
    { name: "SAP", logo: "/images/partners/SAP.jpeg" },
    { name: "Microsoft", logo: "/images/partners/Microsoft.png" },
    { name: "UiPath", logo: "/images/partners/Ui%20Path.jpeg" },
    { name: "Boyum IT", logo: "/images/partners/Boyum%20it.png" },
    { name: "IBM", logo: "/images/partners/IBM.jpeg" },
    { name: "HP", logo: "/images/partners/HP.jpeg" },
    { name: "Dell", logo: "/images/partners/Dell.png" },
    { name: "Lenovo", logo: "/images/partners/Lenovo.jpeg" },
    { name: "SalesTrendz", logo: "/images/partners/SalesTrendz.jpeg" },
  ]

  // Duplicate partners array for seamless infinite scrolling
  const allPartners = [...partners, ...partners]

  return (
    <section ref={ref} className="w-full py-6 md:py-4 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-1">
            <h2 className="text-lg font-medium tracking-tight md:text-xl text-premium-heading">
              Strategic partnerships with industry leaders
            </h2>
            <p className="text-xs text-premium-text md:text-sm font-medium">
              We collaborate with global technology leaders to deliver integrated enterprise solutions
            </p>
          </div>

          <motion.div
            className="w-full relative mt-4"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="flex whitespace-nowrap animate-scroll-rtl">
              {allPartners.map((partner, index) => (
                <div key={index} className="flex-none mx-4 px-2">
                  <div className="relative h-12 w-24 transition-all duration-200 hover:opacity-100">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 80px, 112px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function PartnerLogosWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PartnerLogos {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { PartnerLogosWrapper as PartnerLogos };