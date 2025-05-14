import { NextRequest, NextResponse } from 'next/server'

interface SearchResult {
  title: string
  description: string
  url: string
  category: string
}

// Static search data (in a real app, this would come from a database or search engine)
const searchData: SearchResult[] = [
  {
    title: "SAP Business One",
    description: "Comprehensive ERP solution for small and medium-sized businesses",
    url: "/sap-solutions/business-one",
    category: "SAP Solutions",
  },
  {
    title: "SAP Business One Cloud",
    description: "Cloud-based ERP solution with flexible deployment options",
    url: "/sap-solutions/business-one-cloud",
    category: "SAP Solutions",
  },
  {
    title: "SAP HANA",
    description: "In-memory database technology for real-time analytics and applications",
    url: "/sap-solutions/hana",
    category: "SAP Solutions",
  },
  {
    title: "ERP Planning",
    description: "Strategic ERP implementation planning for business growth",
    url: "/sap-solutions/erp-planning",
    category: "SAP Solutions",
  },
  {
    title: "UiPath RPA Solutions",
    description: "Robotic Process Automation solutions powered by UiPath",
    url: "/automation-solutions/ui-path",
    category: "Automation Solutions",
  },
  {
    title: "Boyum IT Solutions",
    description: "Specialized add-ons and extensions for SAP Business One",
    url: "/automation-solutions/boyum-it",
    category: "Automation Solutions",
  },
  {
    title: "RPA Solutions",
    description: "Comprehensive Robotic Process Automation services",
    url: "/automation-solutions/rpa-solutions",
    category: "Automation Solutions",
  },
  {
    title: "Workflow Automation",
    description: "Streamline business processes with intelligent workflow automation",
    url: "/automation-solutions/workflow-automation",
    category: "Automation Solutions",
  },
  {
    title: "Manufacturing",
    description: "Industry-specific solutions for manufacturing companies",
    url: "/industries/manufacturing",
    category: "Industries",
  },
  {
    title: "Distribution",
    description: "Specialized solutions for distribution and supply chain operations",
    url: "/industries/distribution",
    category: "Industries",
  },
  {
    title: "Retail",
    description: "Complete solutions for retail operations and customer experience",
    url: "/industries/retail",
    category: "Industries",
  },
  {
    title: "Healthcare",
    description: "Tailored solutions for healthcare organizations and providers",
    url: "/industries/healthcare",
    category: "Industries",
  },
  {
    title: "Professional Services",
    description: "Digital solutions for service-based businesses",
    url: "/industries/professional-services",
    category: "Industries",
  },
  {
    title: "Contact Us",
    description: "Get in touch with our team of experts",
    url: "/contact",
    category: "Contact",
  },
  {
    title: "About Atlas Technosoft",
    description: "Learn more about our company, mission, and values",
    url: "/about",
    category: "Company",
  },
  {
    title: "Careers",
    description: "Join our team and grow your career with us",
    url: "/careers",
    category: "Company",
  }
]

export async function GET(request: NextRequest) {
  // Parse the search query from the URL
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  
  if (!query) {
    return NextResponse.json({ results: [] })
  }
  
  // Filter search results based on the query
  const results = searchData.filter(
    (result) =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase()) ||
      result.category.toLowerCase().includes(query.toLowerCase())
  )
  
  // Add a slight delay to simulate real-world API behavior
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return NextResponse.json({
    results,
    query,
    timestamp: new Date().toISOString()
  })
} 