import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Phone, Mail, MessageSquare, Clock, Building, LifeBuoy } from "lucide-react"

export const metadata: Metadata = {
  title: "Automation Solutions Support | Atlas Technosoft",
  description: 
    "Get expert support for your automation solutions. Our dedicated team provides 24/7 assistance, remote diagnostics, and personalized troubleshooting for RPA and workflow automation systems.",
  keywords: "automation support, RPA support, workflow automation support, technical support, UiPath support",
}

export default function AutomationSupportPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Automation Solutions Support
                </h1>
                <p className="max-w-[600px] text-slate-300 md:text-xl dark:text-slate-300">
                  Expert technical support for your automation platforms, workflows, and RPA solutions. Our team is ready to help you maximize your automation investment.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="#contact-support">
                    Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-slate-200 text-white">
                  <Link href="#support-plans">
                    View Support Plans
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24" id="support-plans">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Support Options</h2>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              Choose the support plan that best fits your organization's needs
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {supportPlans.map((plan, index) => (
              <div key={index} className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 pb-2">
                  <div className="mb-4 flex items-center gap-2">
                    <plan.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="p-6 pt-0 flex-grow">
                  <ul className="grid gap-2">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex text-sm">
                        <span className="mr-2 text-primary">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <Button asChild className={index === 1 ? "w-full bg-primary" : "w-full"} variant={index === 1 ? "default" : "outline"}>
                    <Link href="#contact-support">Contact Sales for Pricing</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-slate-50" id="contact-support">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Support</h2>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              Our support team is available to assist you with any technical issues
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm">
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Phone Support</h3>
              <p className="text-muted-foreground mb-4">Speak directly with a support specialist</p>
              <p className="font-medium">+1 (888) 555-1234</p>
            </div>
            
            <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm">
              <Mail className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">Send us an email and we'll respond promptly</p>
              <p className="font-medium">support@atlastechnosoft.com</p>
            </div>
            
            <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm">
              <MessageSquare className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Technical Documentation</h3>
              <p className="text-muted-foreground mb-4">Access our comprehensive knowledge base and documentation</p>
              <Button asChild size="sm">
                <Link href="/resources/documentation">View Documentation</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/contact">
                Go to Contact Page <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const supportPlans = [
  {
    name: "Standard Support",
    description: "Basic support for small to medium organizations",
    icon: LifeBuoy,
    features: [
      "Email and phone support during business hours",
      "24-48 hour response time",
      "Access to knowledge base and documentation",
      "Quarterly system health checks",
      "Remote troubleshooting assistance"
    ]
  },
  {
    name: "Premium Support",
    description: "Enhanced support for business-critical systems",
    icon: Clock,
    features: [
      "24/7 email and phone support",
      "1-4 hour response time for critical issues",
      "Dedicated support engineer",
      "Monthly system health checks",
      "Priority issue resolution",
      "Remote and on-site troubleshooting"
    ]
  },
  {
    name: "Enterprise Support",
    description: "Comprehensive support for enterprise clients",
    icon: Building,
    features: [
      "24/7 priority support on all channels",
      "15-minute response time for critical issues",
      "Dedicated account management team",
      "Weekly system health checks and optimization",
      "Proactive monitoring and issue prevention",
      "On-site emergency support",
      "Custom SLAs available"
    ]
  }
] 