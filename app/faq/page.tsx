import { Metadata } from "next"
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion"
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StructuredData } from "@/components/seo/structured-data"
import { generateFaqSchema,generateBreadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Atlas Technosoft",
  description: "Find answers to commonly asked questions about Atlas Technosoft's services, solutions, and more.",
  keywords: [
    "Atlas Technosoft FAQ",
    "SAP Business One questions",
    "UiPath automation FAQ",
    "RPA solutions FAQ",
    "Boyum IT solutions FAQ",
    "Digital transformation questions",
    "Enterprise automation help",
    "SAP implementation questions",
    "ERP software selection",
    "Process automation benefits"
  ],
}

export default function FAQPage() {
  const faqs = _faqData
  
  // Get unique categories for filtering
  const categories = [...new Set(faqs.map(faq => faq.category))].sort()
  
  // Breadcrumb data for structured data
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]
  
  return (
    <div className="container max-w-5xl py-12 md:py-20">
      <StructuredData data={generateFaqSchema(faqs)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />

      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          Find answers to commonly asked questions about our services, solutions, and company.
          Can't find what you're looking for? <Link href="/contact" className="text-primary underline underline-offset-4">Contact us</Link>.
        </p>
      </div>
      
      <Tabs defaultValue={categories[0]} className="w-full">
        <div className="mb-8 overflow-x-auto">
          <TabsList className="inline-flex w-auto justify-start p-1">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="min-w-[120px] px-4 py-2"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs
                .filter((faq) => faq.category === category)
                .map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="rounded-lg border bg-card px-4 shadow-sm"
                  >
                    <AccordionTrigger className="text-left text-base font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 text-muted-foreground">
                      <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p>{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-16 rounded-xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Still have questions?</h2>
            <p className="text-muted-foreground">
              Our team is ready to help you with any specific questions you might have.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const _faqCategories = [
  { id: "general", title: "General Questions" },
  { id: "automation", title: "Automation & RPA Solutions" },
  { id: "sap", title: "SAP Business One" },
  { id: "services", title: "Implementation & Support Services" },
  { id: "digital", title: "Digital Transformation" }
]

const _faqData = [
  // General Questions
  {
    category: "general",
    question: "What services does Atlas Technosoft offer?",
    answer: "Atlas Technosoft is a leading enterprise solutions provider offering a comprehensive range of services including SAP Business One implementation, HANA migration, UiPath RPA solutions, Boyum IT solutions, digital transformation consulting, automation services, and ongoing technical support. We specialize in helping businesses streamline operations, increase efficiency, and drive growth through technology."
  },
  {
    category: "general",
    question: "How long has Atlas Technosoft been in business?",
    answer: "Atlas Technosoft has been delivering enterprise solutions since 1997. With over 25 years of experience, we have established ourselves as a trusted SAP Partner and have successfully implemented solutions for over 500 clients across various industries worldwide."
  },
  {
    category: "general",
    question: "What industries does Atlas Technosoft specialize in?",
    answer: "We serve clients across multiple industries including manufacturing, wholesale distribution, retail, professional services, healthcare, logistics, and more. Our team has developed deep expertise in understanding industry-specific challenges and implementing tailored solutions that address the unique requirements of each sector."
  },
  {
    category: "general",
    question: "How do I request a demo or consultation?",
    answer: "You can request a demo or consultation by visiting our Contact page, filling out the form with your requirements, or by directly calling us at +91-22-2240 1925. Our team will respond within 24 hours to schedule a personalized demonstration or consultation based on your specific business needs."
  },
  {
    category: "general",
    question: "What partnerships and certifications does Atlas Technosoft maintain?",
    answer: "Atlas Technosoft maintains strategic partnerships with leading technology providers including SAP (Partner), UiPath (Partner), Boyum IT (Gold Partner), and Microsoft (Silver Partner). Our team includes certified consultants in SAP Business One, HANA, UiPath RPA, and various other technologies. These partnerships and certifications ensure we deliver solutions using industry best practices and the latest technological advancements."
  },
  {
    category: "general",
    question: "What is your approach to customer success?",
    answer: "Our customer success approach is built on four pillars: 1) Understanding - we thoroughly analyze your business needs before recommending solutions; 2) Expertise - we leverage our technical knowledge and industry experience to design optimal solutions; 3) Implementation - we follow proven methodologies for efficient delivery; 4) Long-term support - we provide ongoing assistance to ensure continuous value from your investment. We measure our success by your outcomes, not just project completion."
  },
  
  // Automation & RPA Questions
  {
    category: "automation",
    question: "What is UiPath Agentic Automation?",
    answer: "UiPath Agentic Automation combines AI agents with robotic process automation (RPA) to create intelligent, autonomous systems that can understand, decide, and act on business processes. This next-generation approach enables more complex automation scenarios by combining the decision-making capabilities of AI with the execution abilities of RPA bots."
  },
  {
    category: "automation",
    question: "How long does it take to implement an RPA solution?",
    answer: "The implementation timeline for an RPA solution varies depending on the complexity of the processes being automated. Simple automation projects can be completed in 4-6 weeks, while more complex enterprise-wide implementations may take 3-6 months. During our initial assessment, we provide a detailed timeline tailored to your specific requirements."
  },
  {
    category: "automation",
    question: "What ROI can I expect from implementing automation solutions?",
    answer: "Our clients typically see ROI from automation implementations within 6-9 months. Common benefits include cost reduction (20-40%), increased accuracy (up to 99.9%), productivity improvements (40-70%), and faster processing times (50-90% reduction). We work with you to develop ROI models specific to your business case during the consultation phase."
  },
  {
    category: "automation",
    question: "Do you provide training for our team to manage the automation solutions?",
    answer: "Yes, we provide comprehensive training as part of our implementation process. This includes hands-on sessions for technical teams who will manage the solution, as well as user training for employees who will interact with the automated processes. We also offer continued education options through our support packages."
  },
  {
    category: "automation",
    question: "Can automation solutions integrate with our existing systems?",
    answer: "Yes, our automation solutions are designed to integrate seamlessly with your existing IT infrastructure. Whether you're using SAP, Oracle, Microsoft, or custom-built systems, our team has experience integrating RPA and AI solutions with various platforms. We perform a thorough assessment of your current systems during the discovery phase to ensure smooth integration."
  },
  {
    category: "automation",
    question: "What processes are best suited for automation?",
    answer: "Processes that are ideal for automation typically have these characteristics: rule-based decision making, high volume, repetitive nature, structured data inputs, and minimal exceptions. Common examples include data entry and extraction, report generation, order processing, invoice management, HR onboarding, and customer service operations. During our assessment phase, we help identify processes with the highest automation potential and ROI for your organization."
  },
  {
    category: "automation",
    question: "How do you handle exceptions and errors in automated processes?",
    answer: "Our automation solutions include robust exception handling mechanisms. We design automated processes with comprehensive error detection, logging, and notification systems. When exceptions occur, the system can either apply predefined resolution steps, escalate to human operators for intervention, or pause the process while maintaining data integrity. We also implement continuous monitoring tools that provide real-time visibility into process performance and exception rates."
  },
  {
    category: "automation",
    question: "How does AI enhance traditional RPA?",
    answer: "AI significantly enhances traditional RPA by adding cognitive capabilities like understanding unstructured data, making complex decisions, learning from experience, and adapting to changing conditions. While traditional RPA excels at rules-based, repetitive tasks, AI-enhanced automation can handle scenarios involving natural language understanding, document intelligence, predictive analytics, and adaptive decision-making. This combination enables automation of more complex, judgment-intensive processes that previously required human intervention."
  },
  
  // SAP Business One Questions
  {
    category: "sap",
    question: "What is SAP Business One and who is it suitable for?",
    answer: "SAP Business One is an integrated ERP solution designed specifically for small to mid-sized enterprises. It provides comprehensive functionality for managing financials, sales, customer relationships, inventory, operations, and reporting in a single system. It's suitable for businesses looking to replace multiple disconnected systems with one integrated solution to improve efficiency and gain better business insights."
  },
  {
    category: "sap",
    question: "What is the difference between SAP Business One on HANA and SQL?",
    answer: "SAP Business One can run on either SAP HANA or Microsoft SQL Server databases. The HANA version offers significant performance advantages with in-memory computing, advanced analytics capabilities, and exclusive features like predictive analytics and intelligent search. SQL is more traditional and may have lower upfront costs, but HANA provides better long-term value through enhanced performance and capabilities."
  },
  {
    category: "sap",
    question: "How long does a typical SAP Business One implementation take?",
    answer: "A standard SAP Business One implementation typically takes 3-6 months depending on the complexity of your business processes, customization requirements, and data migration needs. Our accelerated implementation methodology can reduce this timeline for companies with simpler requirements, while more complex implementations may take longer."
  },
  {
    category: "sap",
    question: "What Boyum IT solutions do you offer for SAP Business One?",
    answer: "As a Boyum IT partner, we offer their complete product portfolio including B1 Usability Package (B1UP) for enhanced user experience, Beas Manufacturing for production processes, Produmex WMS for warehouse management, and Produmex Scan for barcode scanning integration. These solutions extend the core functionality of SAP Business One to address specific industry and operational needs."
  },
  {
    category: "sap",
    question: "Can SAP Business One be customized for our specific business needs?",
    answer: "Yes, SAP Business One offers extensive customization capabilities. We can tailor the solution to your needs through configuration, user-defined fields and tables, custom reports and dashboards, workflow adjustments, and add-on integrations. For more specialized requirements, we can develop custom functionality using the SAP Business One SDK. Our approach balances customization with standard functionality to ensure system maintainability and smooth upgrades."
  },
  {
    category: "sap",
    question: "What is the pricing model for SAP Business One?",
    answer: "SAP Business One follows a named user licensing model, with different license types available based on user roles (Professional, Limited, or Indirect Access). The total investment depends on the number and type of users, choice of database (HANA or SQL), deployment model (cloud or on-premises), industry-specific requirements, and add-on solutions needed. We provide detailed, transparent pricing during consultation after understanding your specific business requirements."
  },
  {
    category: "sap",
    question: "How does SAP Business One compare to other ERP solutions?",
    answer: "SAP Business One differentiates itself through its integration capabilities, global compliance features, and scalability. Unlike many mid-market solutions, it's built on a single codebase rather than through acquisitions, resulting in more seamless functionality. It offers strong industry-specific capabilities, particularly for manufacturing, distribution, and professional services. While other solutions may offer specific advantages in certain areas, SAP Business One provides a balanced, comprehensive approach with the backing of SAP's global support and continuous development."
  },
  {
    category: "sap",
    question: "Is SAP Business One available in the cloud?",
    answer: "Yes, SAP Business One is available in both cloud and on-premises deployment options. The cloud version offers benefits including lower initial investment, reduced IT overhead, automatic updates, and flexible scaling. We offer several hosting options including SAP's cloud infrastructure, private cloud solutions through our data centers, and public cloud platforms like AWS or Azure. We help clients determine the optimal deployment model based on their requirements for security, customization, compliance, and total cost of ownership."
  },
  
  // Implementation & Support Questions
  {
    category: "services",
    question: "What does your implementation methodology look like?",
    answer: "Our implementation methodology follows a structured approach: 1) Discovery & Analysis - understanding your business requirements; 2) Solution Design - configuring the solution to meet your needs; 3) Development & Testing - building and validating customizations; 4) Data Migration - transferring data from legacy systems; 5) User Training - preparing your team; 6) Go-Live Support - ensuring a smooth transition; 7) Post-Implementation Review - optimizing the solution based on feedback."
  },
  {
    category: "services",
    question: "Do you offer post-implementation support?",
    answer: "Yes, we offer comprehensive post-implementation support through our dedicated support team. Our support packages include various service levels from basic technical support to premium services with dedicated support personnel and regular business reviews. Support is provided through multiple channels including our help desk system, phone support, email, and remote sessions. We also offer proactive maintenance services to optimize system performance and prevent issues before they impact your business."
  },
  {
    category: "services",
    question: "How do you handle data migration from our existing systems?",
    answer: "Our data migration approach includes: 1) Data Assessment - analyzing your current data structure and quality; 2) Mapping - creating detailed mappings between legacy and new system fields; 3) Migration Strategy - determining phased vs. one-time approaches; 4) Cleansing - improving data quality before migration; 5) Tool Selection - using appropriate tools for extraction and loading; 6) Testing - performing multiple test migrations; 7) Validation - ensuring data integrity after migration. We have experience migrating from various systems including QuickBooks, Excel, legacy ERP systems, and custom databases."
  },
  {
    category: "services",
    question: "How do you ensure user adoption of new systems?",
    answer: "We focus on user adoption through: 1) Early Stakeholder Involvement - engaging users from the beginning; 2) Tailored Training Programs - developing role-specific training; 3) User-Friendly Documentation - creating accessible guides and videos; 4) Change Management - helping users understand benefits and navigate changes; 5) Champions Program - training power users who support peers; 6) Phased Implementation - allowing time for adaptation; 7) Post-Go-Live Support - providing readily available assistance during transition; 8) Feedback Loops - continuously improving based on user input."
  },
  {
    category: "services",
    question: "Can you integrate our existing systems with new solutions?",
    answer: "Yes, we specialize in system integration to create a cohesive enterprise architecture. Our integration capabilities include connecting SAP Business One with e-commerce platforms, CRM systems, manufacturing execution systems, warehouse management solutions, third-party logistics services, payment gateways, and custom applications. We use various integration methods including direct database connections, APIs, middleware platforms, and ETL tools depending on the specific requirements and systems involved."
  },
  {
    category: "services",
    question: "What training options do you provide for new system implementations?",
    answer: "We offer flexible training options including: 1) Classroom Training - instructor-led sessions for groups; 2) One-on-One Training - personalized coaching for key users; 3) Role-Based Training - focused on specific job functions; 4) Train-the-Trainer - preparing your internal trainers; 5) Video Tutorials - on-demand learning resources; 6) Documentation - comprehensive user guides and quick reference materials; 7) Refresher Sessions - ongoing training after go-live; 8) Advanced Training - specialized sessions for power users. We customize the training approach based on your team's learning preferences and scheduling needs."
  }
] 