"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  NavigationMenu as BaseNavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { NavigationMenuItemLink } from "@/components/common/layout/navigation/navigation-menu-item"
import { NavigationDropdown } from "@/components/common/layout/navigation/navigation-dropdown"
import { Suspense } from "react"

function MainNavigationMenu() {
  const pathname = usePathname() || ''
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null)
  const [sapB1ImageError, setSapB1ImageError] = useState(false)
  const [rpaImageError, setRpaImageError] = useState(false)

  // Check if current path matches a link to highlight it
  const isActivePath = (path: string): boolean => {
    return pathname === path
  }

  // Check if current path starts with a prefix to highlight dropdown menu
  const isActiveSection = (pathPrefix: string): boolean => {
    return pathname.startsWith(pathPrefix)
  }

  // SAP Solutions dropdown content
  const SapSolutionsContent = (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background/90 backdrop-blur-xl rounded-lg border border-white/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" role="menu">
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <Link
            href="/sap-solutions/business-one"
            className={cn(
              "flex h-full w-full select-none flex-col rounded-md backdrop-blur-sm no-underline outline-none transition-all duration-300 hover:shadow-md hover:scale-[1.01] overflow-hidden relative group",
              isActivePath("/sap-solutions/business-one") && "ring-1 ring-primary/50 shadow-sm"
            )}
            role="menuitem"
          >
            <div className="w-full bg-white p-4 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image 
                src={sapB1ImageError ? "/images/solutions/CompanyLogo.png" : "/images/solutions/SAP_B1.png"}
                alt="SAP Business One Logo" 
                className="w-full max-h-[140px] object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                width={400}
                height={140}
                priority={true}
                loading="eager"
                quality={90}
                unoptimized
                onError={() => setSapB1ImageError(true)}
              />
            </div>
            <div className="bg-gradient-to-b from-muted/30 to-muted/70 p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-2 text-lg font-medium relative z-10">SAP Business One</div>
              <p className="text-sm leading-tight text-muted-foreground dark:text-white/80">
                Comprehensive ERP solution designed for small and medium-sized businesses
              </p>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
      <li>
        <Link
          href="/sap-solutions/business-one-cloud"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/sap-solutions/business-one-cloud") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">SAP Business One Cloud</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Cloud-based ERP solution with flexible deployment options
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/sap-solutions/hana"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/sap-solutions/hana") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">SAP HANA</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            In-memory database technology for real-time analytics
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/sap-solutions/erp-planning"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/sap-solutions/erp-planning") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">ERP Planning</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Expert implementation and customization services
          </p>
        </Link>
      </li>
    </ul>
  )

  // Automation Solutions dropdown content
  const AutomationSolutionsContent = (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background/90 backdrop-blur-xl rounded-lg border border-white/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" role="menu">
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <Link
            href="/automation-solutions/ui-path"
            className={cn(
              "flex h-full w-full select-none flex-col rounded-md backdrop-blur-sm no-underline outline-none transition-all duration-300 hover:shadow-md hover:scale-[1.01] overflow-hidden relative group",
              isActivePath("/automation-solutions/ui-path") && "ring-1 ring-primary/50 shadow-sm"
            )}
            role="menuitem"
          >
            <div className="w-full bg-white p-4 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image 
                src={rpaImageError ? "/images/solutions/Automation.jpg" : "/images/solutions/RPA.jpg"} 
                alt="UiPath Solutions" 
                className="w-full max-h-[140px] object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                width={400}
                height={140}
                priority={true}
                loading="eager"
                quality={90}
                unoptimized
                onError={() => setRpaImageError(true)}
              />
            </div>
            <div className="bg-gradient-to-b from-muted/30 to-muted/70 p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-2 text-lg font-medium relative z-10">UiPath Solutions</div>
              <p className="text-sm leading-tight text-muted-foreground dark:text-white/80">
                Enterprise automation platform for end-to-end process automation
              </p>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
      <li>
        <Link
          href="/automation-solutions/boyum-it"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/automation-solutions/boyum-it") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">Boyum IT Solutions</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Specialized add-ons and extensions for SAP Business One
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/automation-solutions/rpa-solutions"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/automation-solutions/rpa-solutions") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">RPA Solutions</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Robotic Process Automation for streamlining business processes
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/automation-solutions/consultation"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/automation-solutions/consultation") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">Consultation Services</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Expert guidance and strategic planning for your business technology needs
          </p>
        </Link>
      </li>
    </ul>
  )

  // Industries dropdown content
  const IndustriesContent = (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background/90 backdrop-blur-xl rounded-lg border border-white/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" role="menu">
      <li>
          <Link
            href="/industries/shipping"
            className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/industries/shipping") ? "bg-white/10 text-primary" : ""
            )}
            role="menuitem"
          >
          <div className="text-sm font-medium leading-none">Shipping & Import/Export</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
                Digitize customs documentation, optimize container logistics, and achieve real-time global supply chain visibility
              </p>
          </Link>
      </li>
      <li>
        <Link
          href="/industries/distribution"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/industries/distribution") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">Distribution & Logistics</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Optimize inventory management and streamline supply chains
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/industries/manufacturing"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/industries/manufacturing") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">Manufacturing</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Integrate production planning, quality control, and supply chain management
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/industries/retail"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/industries/retail") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">Retail</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Unify online and offline channels with advanced inventory management
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/industries/professional-services"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/industries/professional-services") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">Professional Services</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Streamline project management and automate client engagement
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/industries/pharmaceuticals"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/industries/pharmaceuticals") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">Pharmaceuticals</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Ensure regulatory compliance and optimize production
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/industries/financial-services"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/industries/financial-services") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">Financial Services</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Automate compliance processes and enhance security
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/industries/healthcare"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/industries/healthcare") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">Healthcare</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Streamline patient management and ensure compliance
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/industries/construction"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 dark:hover:bg-white/5 hover:translate-x-0.5",
            isActivePath("/industries/construction") ? "bg-white/10 text-primary" : ""
          )}
          role="menuitem"
        >
          <div className="text-sm font-medium leading-none">Construction</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-white/80">
            Manage projects, track resources, and control costs
          </p>
        </Link>
      </li>
    </ul>
  )

  return (
    <BaseNavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-2">
        {/* SAP Solutions Dropdown */}
        <NavigationDropdown
          title="SAP Solutions"
          isActive={isActiveSection("/sap-solutions")}
          onMouseEnter={() => setHoveredMenuItem("sap")}
          onMouseLeave={() => setHoveredMenuItem(null)}
          isHovered={hoveredMenuItem === "sap"}
        >
          {SapSolutionsContent}
        </NavigationDropdown>

        {/* Automation Solutions Dropdown */}
        <NavigationDropdown
          title="Automation Solutions"
          isActive={isActiveSection("/automation-solutions")}
          onMouseEnter={() => setHoveredMenuItem("ai")}
          onMouseLeave={() => setHoveredMenuItem(null)}
          isHovered={hoveredMenuItem === "ai"}
        >
          {AutomationSolutionsContent}
        </NavigationDropdown>

        {/* Industries Dropdown */}
        <NavigationDropdown
          title="Industries"
          isActive={isActiveSection("/industries")}
          onMouseEnter={() => setHoveredMenuItem("industries")}
          onMouseLeave={() => setHoveredMenuItem(null)}
          isHovered={hoveredMenuItem === "industries"}
        >
          {IndustriesContent}
        </NavigationDropdown>

        {/* Regular Menu Items */}
        <NavigationMenuItemLink
          href="/about"
          isActive={isActivePath("/about")}
          onMouseEnter={() => setHoveredMenuItem("about")}
          onMouseLeave={() => setHoveredMenuItem(null)}
          className={hoveredMenuItem === "about" ? "bg-white/5 text-foreground" : ""}
        >
          About
        </NavigationMenuItemLink>

        <NavigationMenuItemLink
          href="/careers"
          isActive={isActivePath("/careers")}
          onMouseEnter={() => setHoveredMenuItem("careers")}
          onMouseLeave={() => setHoveredMenuItem(null)}
          className={hoveredMenuItem === "careers" ? "bg-white/5 text-foreground" : ""}
        >
          Careers
        </NavigationMenuItemLink>

        <NavigationMenuItemLink
          href="/blog"
          isActive={isActivePath("/blog")}
          onMouseEnter={() => setHoveredMenuItem("blog")}
          onMouseLeave={() => setHoveredMenuItem(null)}
          className={hoveredMenuItem === "blog" ? "bg-white/5 text-foreground" : ""}
        >
          Blog
        </NavigationMenuItemLink>
      </NavigationMenuList>
    </BaseNavigationMenu>
  )
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function MainNavigationMenuWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <MainNavigationMenu {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { MainNavigationMenuWrapper as MainNavigationMenu };