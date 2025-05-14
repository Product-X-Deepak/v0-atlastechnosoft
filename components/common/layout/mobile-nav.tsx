"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"

// Inner component that uses usePathname
function MobileNavInner() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const pathname = usePathname() || ''

  // Auto-expand the section that contains the current page
  useEffect(() => {
    if (pathname.startsWith("/sap-solutions") && !openItems.includes("sap-solutions")) {
      setOpenItems((prev) => [...prev, "sap-solutions"])
    } else if (pathname.startsWith("/automation-solutions") && !openItems.includes("automation-solutions")) {
      setOpenItems((prev) => [...prev, "automation-solutions"])
    } else if (pathname.startsWith("/industries") && !openItems.includes("industries")) {
      setOpenItems((prev) => [...prev, "industries"])
    }
  }, [pathname, openItems])

  const toggleItem = (value: string): void => {
    setOpenItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  // Check if current path matches a link to highlight it
  const isActivePath = (path: string): boolean => {
    return pathname === path
  }

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-0 top-[56px] xs:top-[60px] sm:top-[66px] md:top-[70px] z-50 max-h-[calc(100vh-56px)] xs:max-h-[calc(100vh-60px)] sm:max-h-[calc(100vh-66px)] md:max-h-[calc(100vh-70px)] w-full overflow-y-auto bg-background pb-safe-bottom shadow-lg"
        aria-label="Mobile Navigation"
        id="mobile-nav"
      >
        <div className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-6">
          <Accordion type="multiple" value={openItems} className="w-full">
            <AccordionItem value="sap-solutions" className="border-b border-white/10">
              <AccordionTrigger
                onClick={() => toggleItem("sap-solutions")}
                className="py-2 xs:py-3 sm:py-4 text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-primary min-h-[44px] touch-target-improved flex items-center"
                aria-expanded={openItems.includes("sap-solutions")}
              >
                SAP Solutions
              </AccordionTrigger>
              <AccordionContent className="pb-1 xs:pb-2 pt-0 xs:pt-1">
                <motion.div
                  className="flex flex-col space-y-0.5 xs:space-y-1 sm:space-y-2"
                  role="menu"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/sap-solutions/business-one"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/sap-solutions/business-one") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/sap-solutions/business-one") && (
                        <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />
                      )}
                      <span>SAP Business One</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/sap-solutions/business-one-cloud"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/sap-solutions/business-one-cloud") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/sap-solutions/business-one-cloud") && (
                        <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />
                      )}
                      <span>SAP Business One Cloud</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/sap-solutions/hana"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/sap-solutions/hana") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/sap-solutions/hana") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>SAP HANA</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/sap-solutions/erp-planning"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/sap-solutions/erp-planning") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/sap-solutions/erp-planning") && (
                        <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />
                      )}
                      <span>ERP Planning</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="automation-solutions" className="border-b border-white/10">
              <AccordionTrigger
                onClick={() => toggleItem("automation-solutions")}
                className="py-2 xs:py-3 sm:py-4 text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-primary min-h-[44px] touch-target-improved flex items-center"
                aria-expanded={openItems.includes("automation-solutions")}
              >
                Automation Solutions
              </AccordionTrigger>
              <AccordionContent className="pb-1 xs:pb-2 pt-0 xs:pt-1">
                <motion.div
                  className="flex flex-col space-y-0.5 xs:space-y-1 sm:space-y-2"
                  role="menu"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/automation-solutions/ui-path"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/automation-solutions/ui-path") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/automation-solutions/ui-path") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>UiPath Solutions</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/automation-solutions/boyum-it"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/automation-solutions/boyum-it") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/automation-solutions/boyum-it") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Boyum IT Solutions</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/automation-solutions/rpa-solutions"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/automation-solutions/rpa-solutions") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/automation-solutions/rpa-solutions") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>RPA Solutions</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/automation-solutions/workflow-automation"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/automation-solutions/workflow-automation") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/automation-solutions/workflow-automation") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Workflow Automation</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/automation-solutions/consultation"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/automation-solutions/consultation") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/automation-solutions/consultation") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Consultation Services</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/automation-solutions/support"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/automation-solutions/support") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/automation-solutions/support") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Support Services</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="industries" className="border-b border-white/10">
              <AccordionTrigger
                onClick={() => toggleItem("industries")}
                className="py-2 xs:py-3 sm:py-4 text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-primary min-h-[44px] touch-target-improved flex items-center"
                aria-expanded={openItems.includes("industries")}
              >
                Industries
              </AccordionTrigger>
              <AccordionContent className="pb-1 xs:pb-2 pt-0 xs:pt-1">
                <motion.div
                  className="flex flex-col space-y-0.5 xs:space-y-1 sm:space-y-2"
                  role="menu"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/industries/shipping"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/industries/shipping") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/industries/shipping") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Shipping & Import/Export</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/industries/distribution"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/industries/distribution") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/industries/distribution") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Distribution & Logistics</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/industries/manufacturing"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/industries/manufacturing") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/industries/manufacturing") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Manufacturing</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/industries/retail"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/industries/retail") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/industries/retail") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Retail</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/industries/professional-services"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/industries/professional-services") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/industries/professional-services") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Professional Services</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/industries/pharmaceuticals"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/industries/pharmaceuticals") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/industries/pharmaceuticals") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Pharmaceuticals</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/industries/financial-services"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/industries/financial-services") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/industries/financial-services") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Financial Services</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/industries/healthcare"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/industries/healthcare") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/industries/healthcare") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Healthcare</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/industries/construction"
                      className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/industries/construction") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                      role="menuitem"
                    >
                      {isActivePath("/industries/construction") && <ChevronRight className="mr-1 h-3 w-3 xs:h-4 xs:w-4 text-primary flex-shrink-0" />}
                      <span>Construction</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            <div className="border-b border-white/10 py-2 xs:py-3 sm:py-4">
              <Link
                href="/about"
                className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/about") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                role="menuitem"
              >
                <span>About</span>
              </Link>
            </div>

            <div className="border-b border-white/10 py-2 xs:py-3 sm:py-4">
              <Link
                href="/careers"
                className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/careers") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                role="menuitem"
              >
                <span>Careers</span>
              </Link>
            </div>

            <AccordionItem value="blog" className="border-b border-white/10">
              <AccordionContent className="pb-1 pt-1">
                <Link
                  href="/blog"
                  className={`flex items-center py-2 text-xs xs:text-sm sm:text-base transition-colors min-h-[40px] xs:min-h-[44px] touch-target-improved ${isActivePath("/blog") ? "text-primary font-medium" : "text-foreground hover:text-primary font-semibold"}`}
                  role="menuitem"
                >
                  <span>Blog</span>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-4 sm:mt-6 flex flex-col space-y-3">
            <Button asChild className="bg-gradient-to-r from-amber-700 to-amber-800 text-white h-10 xs:h-11 sm:h-12 rounded-md text-xs xs:text-sm sm:text-base min-h-[44px] touch-target-improved">
              <Link href="/contact" className="flex items-center justify-center w-full">Request Demo</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 h-10 xs:h-11 sm:h-12 rounded-md text-xs xs:text-sm sm:text-base min-h-[44px] touch-target-improved">
              <Link href="/contact" className="flex items-center justify-center w-full">Contact Us</Link>
            </Button>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  )
}

// Exported component that wraps the inner component with Suspense
function MobileNav() {
  return (
    <Suspense fallback={null}>
      <MobileNavInner />
    </Suspense>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function MobileNavWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <MobileNav {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { MobileNavWrapper as MobileNav };