"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Search, MapPin, Briefcase, Clock } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export function CareersOpenings() {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareersOpeningsContent />
    </Suspense>
  );
}

function CareersOpeningsContent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Filter job openings based on search term and filters
  const filteredJobs = jobOpenings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter
    const matchesLocation = locationFilter === "all" || job.location === locationFilter

    return matchesSearch && matchesDepartment && matchesLocation
  })

  return (
    <section id="current-openings" ref={ref} className="py-16 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Current Openings</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our current job opportunities and find the perfect role to advance your career with Atlas
            Technosoft.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search positions..."
              className="pl-10 futuristic-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-[180px] futuristic-input">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="customer-success">Customer Success</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-[180px] futuristic-input">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * (index % 6) }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(2, 8, 23, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
                }}
              >
                <Card className="h-full premium-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {job.department}
                      </div>
                      {job.isNew && (
                        <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
                          New
                        </div>
                      )}
                    </div>
                    <CardTitle className="mt-2">{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4 text-primary" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="mr-2 h-4 w-4 text-primary" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        Posted {job.postedDate}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full group">
                      <Link href={`/careers/job/${job.id}`} className="flex items-center justify-center">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-muted-foreground">No job openings match your search criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setDepartmentFilter("all")
                  setLocationFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const jobOpenings = [
  {
    id: "sap-consultant-2025",
    title: "SAP Business One Consultant",
    department: "engineering",
    description:
      "We're looking for an experienced SAP Business One Consultant to help our clients implement and optimize their ERP solutions.",
    location: "Mumbai",
    type: "Full-time",
    postedDate: "2 days ago",
    isNew: true,
  },
  {
    id: "ai-engineer-2025",
    title: "AI/ML Engineer",
    department: "engineering",
    description:
      "Join our AI team to develop cutting-edge machine learning solutions that enhance our automation and analytics capabilities.",
    location: "Bangalore",
    type: "Full-time",
    postedDate: "1 week ago",
    isNew: true,
  },
  {
    id: "rpa-developer-2025",
    title: "RPA Developer",
    department: "engineering",
    description:
      "Design and implement robotic process automation solutions using UiPath, Blue Prism, or Automation Anywhere.",
    location: "Pune",
    type: "Full-time",
    postedDate: "2 weeks ago",
    isNew: false,
  },
  {
    id: "cloud-architect-2025",
    title: "Cloud Solutions Architect",
    department: "engineering",
    description:
      "Design and implement scalable cloud solutions on AWS, Azure, and Google Cloud for our enterprise clients.",
    location: "Delhi",
    type: "Full-time",
    postedDate: "3 weeks ago",
    isNew: false,
  },
  {
    id: "sales-executive-2025",
    title: "Enterprise Sales Executive",
    department: "sales",
    description: "Drive sales of our SAP and automation solutions to enterprise clients across various industries.",
    location: "Mumbai",
    type: "Full-time",
    postedDate: "1 month ago",
    isNew: false,
  },
  {
    id: "marketing-specialist-2025",
    title: "Digital Marketing Specialist",
    department: "marketing",
    description: "Execute digital marketing campaigns to generate leads and build brand awareness for our solutions.",
    location: "Chennai",
    type: "Full-time",
    postedDate: "1 month ago",
    isNew: false,
  },
  {
    id: "customer-success-manager-2025",
    title: "Customer Success Manager",
    department: "customer-success",
    description: "Ensure our clients achieve their business goals and maximize the value of our solutions.",
    location: "Bangalore",
    type: "Full-time",
    postedDate: "1 month ago",
    isNew: false,
  },
  {
    id: "hr-specialist-2025",
    title: "HR Specialist",
    department: "hr",
    description: "Support our growing team with recruitment, onboarding, and employee experience initiatives.",
    location: "Mumbai",
    type: "Full-time",
    postedDate: "1 month ago",
    isNew: false,
  }
]
