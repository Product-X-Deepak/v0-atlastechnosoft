"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  Filter,
  Search,
  Upload,
  Loader2,
  FileText,
  X,
  Check,
} from "lucide-react"
import { Suspense } from "react"

// Define the Job type to fix the linter error
type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  experience: string;
  type: "Full-time" | "Part-time" | "Contract";
  category: string;
}

function CareerOpenings() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 })
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    resumeText: "",
    position: ""
  })
  
  const filteredJobs = activeCategory === "All" 
    ? jobs 
    : jobs.filter(job => job.category === activeCategory)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setResumeFile(file)
  }

  const clearFileSelection = () => {
    setResumeFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create FormData for multipart/form-data (file upload)
      const submitFormData = new FormData()
      
      // Add text fields
      submitFormData.append('name', formData.name)
      submitFormData.append('email', formData.email)
      submitFormData.append('phone', formData.phone || '')
      submitFormData.append('message', formData.message || '')
      submitFormData.append('position', selectedJob?.title || formData.position || '')
      submitFormData.append('formType', 'job-application')
      
      // Add resume file if available, otherwise add resume text
      if (resumeFile) {
        submitFormData.append('resumeFile', resumeFile)
      } else if (formData.resumeText) {
        submitFormData.append('resume', formData.resumeText)
      } else {
        submitFormData.append('resume', "No resume provided")
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: submitFormData
      })
      
      if (!response.ok) {
        throw new Error('Application submission failed')
      }
      
      toast.success("Application submitted successfully", {
        description: "We'll review your application and contact you soon."
      })
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        resumeText: "",
        position: ""
      })
      setResumeFile(null)
      setSelectedJob(null)
      
    } catch (error) {
      console.error("Application submission error:", error)
      toast.error("Failed to submit application", {
        description: "Please try again or contact us directly."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="current-openings" ref={ref} className="relative py-16 bg-white overflow-hidden md:py-20">
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-[#E84A0E]/30 bg-[#E84A0E]/5 px-3 py-1 text-sm font-medium text-[#E84A0E] mb-4">
            <span>Opportunities</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
            Current <span className="text-[#A73370]">Openings</span>
          </h2>
          <p className="text-lg text-slate-700">
            Join our team of passionate professionals and make an impact with your skills and expertise.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-[#1E1E38] text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.length > 0 ? filteredJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex justify-between">
                <div className="rounded-lg bg-[#FFF5D6] p-2">
                  <Briefcase className="h-5 w-5 text-[#E84A0E]" />
                </div>
                <div className={`rounded-full px-3 py-1 text-xs font-medium ${
                  job.type === "Full-time" 
                    ? "bg-green-100 text-green-800" 
                    : job.type === "Part-time" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-amber-100 text-amber-800"
                }`}>
                  {job.type}
                </div>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">{job.title}</h3>
              <p className="mb-4 text-sm text-slate-700">{job.description}</p>
              
              <div className="mb-5 space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="mr-2 h-4 w-4 text-[#A73370]" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="mr-2 h-4 w-4 text-[#A73370]" />
                  {job.experience}
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setSelectedJob(job)}
                    variant="ghost" 
                    className="group flex w-full items-center justify-center gap-1 rounded-md bg-[#1E1E38] text-white hover:bg-[#1E1E38]/90"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Apply for {selectedJob?.title}</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to apply for this position.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleApplySubmit} className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          required
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                        <Input
                          required
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 9372329599"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="message">Cover Letter</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us why you're interested in this position..."
                          className="min-h-[120px]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        <Label>Resume</Label>
                        <div className="space-y-2">
                          {/* File Upload Button */}
                          <div className="border border-dashed border-slate-300 rounded-md p-4 bg-slate-50">
                            <input
                              type="file"
                              ref={fileInputRef}
                              accept=".pdf,.doc,.docx"
                              id="resumeFile"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                            <div className="flex flex-col items-center justify-center gap-2">
                              {resumeFile ? (
                                <div className="w-full">
                                  <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
                                    <div className="flex items-center space-x-2">
                                      <FileText className="h-5 w-5 text-[#A73370]" />
                                      <span className="text-sm font-medium truncate max-w-[200px]">
                                        {resumeFile.name}
                                      </span>
                                    </div>
                                    <Button 
                                      type="button" 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={clearFileSelection}
                                      className="h-8 w-8 p-0 rounded-full"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <p className="text-xs text-slate-500 mt-2 flex items-center">
                                    <Check className="h-3 w-3 text-green-500 mr-1" /> 
                                    Resume selected
                                  </p>
                                </div>
                              ) : (
                                <>
                                  <Upload className="h-10 w-10 text-slate-400" />
                                  <div className="text-center">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => fileInputRef.current?.click()}
                                      className="mb-1"
                                    >
                                      Select Resume
                                    </Button>
                                    <p className="text-xs text-slate-500">
                                      PDF, DOC or DOCX up to 5MB
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {/* Or text divider */}
                          <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-slate-200"></div>
                            <span className="flex-shrink mx-3 text-sm text-slate-500">Or paste your resume text below</span>
                            <div className="flex-grow border-t border-slate-200"></div>
                          </div>
                          
                          {/* Resume Text */}
                          <Textarea
                            id="resumeText"
                            name="resumeText"
                            value={formData.resumeText}
                            onChange={handleInputChange}
                            placeholder="Paste your resume text here"
                            className="min-h-[100px]"
                            disabled={!!resumeFile}
                          />
                          
                          {/* Note for users */}
                          <p className="text-xs text-slate-600 mt-1">
                            Your resume will be sent directly to our recruiting team via info@atlastechnosoft.com.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button type="submit" className="bg-[#A73370] text-white hover:bg-[#A73370]/90" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              
              {/* Design element */}
              <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#E84A0E]/5 transition-all group-hover:bg-[#E84A0E]/10"></div>
            </motion.div>
          )) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center"
            >
              <Search className="mb-3 h-10 w-10 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-900">No openings found</h3>
              <p className="mb-6 text-slate-600">We don&apos;t have any openings in this category at the moment.</p>
              <Button 
                variant="outline" 
                onClick={() => setActiveCategory("All")}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                View all categories
              </Button>
            </motion.div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <p className="mb-6 text-slate-700">
            Don&apos;t see a position that matches your skills? Send us your resume and we&apos;ll contact you when something suitable opens up.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="bg-[#A73370] text-white hover:bg-[#A73370]/90"
              >
                <Upload className="mr-2 h-4 w-4" />
                Submit Your Resume
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">General Application</DialogTitle>
                <DialogDescription>
                  Submit your details and we&apos;ll consider you for future openings.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleApplySubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                    <Input
                      required
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9372329599"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="position">Preferred Position/Department</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="e.g., Marketing, Development, Sales"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="message">Cover Letter</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself and your skills..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <Label>Resume</Label>
                    <div className="space-y-2">
                      {/* File Upload Button */}
                      <div className="border border-dashed border-slate-300 rounded-md p-4 bg-slate-50">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept=".pdf,.doc,.docx"
                          id="resumeFile"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <div className="flex flex-col items-center justify-center gap-2">
                          {resumeFile ? (
                            <div className="w-full">
                              <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-5 w-5 text-[#A73370]" />
                                  <span className="text-sm font-medium truncate max-w-[200px]">
                                    {resumeFile.name}
                                  </span>
                                </div>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={clearFileSelection}
                                  className="h-8 w-8 p-0 rounded-full"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-xs text-slate-500 mt-2 flex items-center">
                                <Check className="h-3 w-3 text-green-500 mr-1" /> 
                                Resume selected
                              </p>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-10 w-10 text-slate-400" />
                              <div className="text-center">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="mb-1"
                                >
                                  Select Resume
                                </Button>
                                <p className="text-xs text-slate-500">
                                  PDF, DOC or DOCX up to 5MB
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Or text divider */}
                      <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink mx-3 text-sm text-slate-500">Or paste your resume text below</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                      </div>
                      
                      {/* Resume Text */}
                      <Textarea
                        id="resumeText"
                        name="resumeText"
                        value={formData.resumeText}
                        onChange={handleInputChange}
                        placeholder="Paste your resume text here"
                        className="min-h-[100px]"
                        disabled={!!resumeFile}
                      />
                      
                      {/* Note for users */}
                      <p className="text-xs text-slate-600 mt-1">
                        Your resume will be sent directly to our recruiting team via info@atlastechnosoft.com.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button type="submit" className="bg-[#A73370] text-white hover:bg-[#A73370]/90" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

const categories = ["All", "Engineering", "Design", "Product", "Marketing", "Sales", "Operations"]

const jobs: Job[] = [] 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CareerOpeningsWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CareerOpenings {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CareerOpeningsWrapper as CareerOpenings };