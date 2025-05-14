import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Bot, Settings, Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Automation Solutions | Atlas Technosoft",
  description: "Transform your business with our comprehensive automation solutions including RPA, UiPath, Boyum IT, and expert consultation services.",
}

export default function AutomationSolutionsPage() {
  return (
    <div className="relative">
      <PageHeader
        title="Automation Solutions"
        description="Transform your business operations with intelligent automation"
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Automation Solutions", href: "/automation-solutions" },
        ]}
      />

      <Container className="py-6 sm:py-8 md:py-12 lg:py-16 fluid-p-y">
        <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 fluid-gap">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="mb-2 sm:mb-3">
                <Bot className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg md:text-xl fluid-text-lg">RPA Solutions</CardTitle>
              <CardDescription className="text-xs sm:text-sm md:text-base mt-1 sm:mt-1.5 fluid-text-xs">Robotic Process Automation for business efficiency</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex-grow fluid-text-sm">
                Automate repetitive tasks and streamline operations with our RPA solutions that integrate seamlessly with your existing systems.
              </p>
              <Button 
                asChild 
                variant="outline" 
                size="sm" 
                className="mt-auto w-full justify-center h-8 sm:h-9 text-xs sm:text-sm touch-target-improved"
              >
                <Link href="/automation-solutions/rpa-solutions" className="flex items-center justify-center w-full">
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="mb-2 sm:mb-3">
                <Settings className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg md:text-xl fluid-text-lg">UiPath Solutions</CardTitle>
              <CardDescription className="text-xs sm:text-sm md:text-base mt-1 sm:mt-1.5 fluid-text-xs">Leading RPA platform integration</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex-grow fluid-text-sm">
                Leverage the power of UiPath&apos;s enterprise automation platform for comprehensive process automation across your organization.
              </p>
              <Button 
                asChild 
                variant="outline" 
                size="sm" 
                className="mt-auto w-full justify-center h-8 sm:h-9 text-xs sm:text-sm touch-target-improved"
              >
                <Link href="/automation-solutions/ui-path" className="flex items-center justify-center w-full">
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="mb-2 sm:mb-3">
                <Settings className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg md:text-xl fluid-text-lg">Boyum IT Solutions</CardTitle>
              <CardDescription className="text-xs sm:text-sm md:text-base mt-1 sm:mt-1.5 fluid-text-xs">Specialized SAP Business One add-ons</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex-grow fluid-text-sm">
                Enhance your SAP Business One with powerful Boyum IT add-ons and extensions to optimize your business processes.
              </p>
              <Button 
                asChild 
                variant="outline" 
                size="sm" 
                className="mt-auto w-full justify-center h-8 sm:h-9 text-xs sm:text-sm touch-target-improved"
              >
                <Link href="/automation-solutions/boyum-it" className="flex items-center justify-center w-full">
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 flex flex-col h-full sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="mb-2 sm:mb-3">
                <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg md:text-xl fluid-text-lg">Consultation Services</CardTitle>
              <CardDescription className="text-xs sm:text-sm md:text-base mt-1 sm:mt-1.5 fluid-text-xs">Expert automation advice and planning</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex-grow fluid-text-sm">
                Get expert guidance on your automation journey with our specialized consultation services tailored to your business needs.
              </p>
              <Button 
                asChild 
                variant="outline" 
                size="sm" 
                className="mt-auto w-full justify-center h-8 sm:h-9 text-xs sm:text-sm touch-target-improved"
              >
                <Link href="/automation-solutions/consultation" className="flex items-center justify-center w-full">
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  )
} 