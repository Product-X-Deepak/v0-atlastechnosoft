"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, ArrowRight, ArrowLeft, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Suspense } from "react"

type FormData = {
  step1: {
    name: string
    email: string
    company: string
  }
  step2: {
    industry: string
    companySize: string
    phone: string
  }
  step3: {
    requirements: string
    budget: string
    timeline: string
  }
}

const industries = [
  "Manufacturing",
  "Retail",
  "Logistics",
  "Healthcare",
  "Financial Services",
  "IT and Software",
  "Construction",
  "Food Processing",
  "Professional Services",
  "Other",
]

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
]

const budgetRanges = [
  "Less than $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
]

const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "Within 3 months",
  "Within 6 months",
  "No specific timeline",
]

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    step1: { name: "", email: "", company: "" },
    step2: { industry: "", companySize: "", phone: "" },
    step3: { requirements: "", budget: "", timeline: "" },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { toast } = useToast()

  const updateFormData = (step: keyof FormData, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      const currentStepData = formData[`step${currentStep}` as keyof FormData]
      const isValid = Object.values(currentStepData).every((val) => val.trim() !== "")

      if (!isValid) {
        toast({
          title: "Please complete all fields",
          description: "All fields are required to proceed to the next step.",
          variant: "destructive",
        })
        return
      }

      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    // Validate step 3
    const step3Data = formData.step3
    const isValid = Object.values(step3Data).every((val) => val.trim() !== "")

    if (!isValid) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to submit the form.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Send data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.step1.name,
          email: formData.step1.email,
          company: formData.step1.company,
          phone: formData.step2.phone,
          industry: formData.step2.industry,
          companySize: formData.step2.companySize,
          requirements: formData.step3.requirements,
          budget: formData.step3.budget,
          timeline: formData.step3.timeline,
          formType: 'request-information'
        })
      });
      
      if (!response.ok) {
        throw new Error('Form submission failed');
      }
      
      setIsComplete(true)
      toast({
        title: "Form submitted successfully",
        description: "We'll be in touch with you shortly!",
        variant: "default",
      })
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  }

  const successVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const progressBarWidth = `${(currentStep / 3) * 100}%`

  return (
    <Card className="w-full max-w-lg mx-auto shadow-sm xs:shadow md:shadow-md border-0 xs:border">
      <CardHeader className="px-2 xs:px-3 sm:px-4 md:px-6 pt-2 xs:pt-3 sm:pt-4 md:pt-6 pb-1 xs:pb-2 sm:pb-3 md:pb-4">
        <CardTitle className="text-base xs:text-lg sm:text-xl md:text-2xl text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Request Information</CardTitle>
        <CardDescription className="text-[10px] xs:text-xs sm:text-sm md:text-base text-center">
          {isComplete
            ? "Thank you for your interest!"
            : "Complete the form to receive detailed information about our services"}
        </CardDescription>
        {!isComplete && (
          <div className="mt-1 xs:mt-2 sm:mt-3 md:mt-4">
            <div className="relative h-1 xs:h-1.5 sm:h-2 md:h-2.5 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: progressBarWidth }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-0.5 xs:mt-1 sm:mt-1.5 md:mt-2 flex justify-between">
              <div className={`text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-medium ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                Basic Info
              </div>
              <div className={`text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-medium ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                Company Details
              </div>
              <div className={`text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-medium ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                Project Info
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="px-2 xs:px-3 sm:px-4 md:px-6 pt-1 xs:pt-2 sm:pt-3 md:pt-4">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              className="flex flex-col items-center text-center space-y-2 xs:space-y-3 sm:space-y-4 py-2 xs:py-3 sm:py-4 md:py-6"
              variants={successVariants}
              initial="initial"
              animate="animate"
            >
              <div className="rounded-full bg-primary/10 p-2 xs:p-3 sm:p-4">
                <CheckCircle2 className="h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary" />
              </div>
              <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-medium">Request Submitted!</h3>
              <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground max-w-md">
                Thank you for your interest in our services. One of our representatives will contact you within 24
                hours.
              </p>
              <Button
                onClick={() => {
                  setIsComplete(false)
                  setCurrentStep(1)
                  setFormData({
                    step1: { name: "", email: "", company: "" },
                    step2: { industry: "", companySize: "", phone: "" },
                    step3: { requirements: "", budget: "", timeline: "" },
                  })
                }}
                variant="outline"
                className="mt-1 xs:mt-2 sm:mt-3 md:mt-4 min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm"
              >
                Submit another request
              </Button>
            </motion.div>
          ) : (
            <>
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-2 xs:space-y-3 sm:space-y-4"
                >
                  <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <Label htmlFor="name" className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.step1.name}
                      onChange={(e) => updateFormData("step1", "name", e.target.value)}
                      placeholder="Enter your full name"
                      className="min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-1 xs:py-2"
                    />
                  </div>

                  <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email" className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.step1.email}
                      onChange={(e) => updateFormData("step1", "email", e.target.value)}
                      placeholder="you@example.com"
                      className="min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-1 xs:py-2"
                    />
                  </div>

                  <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <Label htmlFor="company" className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.step1.company}
                      onChange={(e) => updateFormData("step1", "company", e.target.value)}
                      placeholder="Your company name"
                      className="min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-1 xs:py-2"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-2 xs:space-y-3 sm:space-y-4"
                >
                  <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <Label htmlFor="industry" className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium">Industry</Label>
                    <Select
                      value={formData.step2.industry}
                      onValueChange={(value) => updateFormData("step2", "industry", value)}
                    >
                      <SelectTrigger 
                        id="industry" 
                        className="min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3"
                      >
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent className="text-[10px] xs:text-xs sm:text-sm max-h-[180px] xs:max-h-[200px] sm:max-h-[220px] overflow-y-auto">
                        {industries.map((industry) => (
                          <SelectItem 
                            key={industry} 
                            value={industry}
                            className="py-1 px-2 min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]"
                          >
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <Label htmlFor="companySize" className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium">Company Size</Label>
                    <Select
                      value={formData.step2.companySize}
                      onValueChange={(value) => updateFormData("step2", "companySize", value)}
                    >
                      <SelectTrigger 
                        id="companySize" 
                        className="min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3"
                      >
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent className="text-[10px] xs:text-xs sm:text-sm max-h-[180px] xs:max-h-[200px] sm:max-h-[220px] overflow-y-auto">
                        {companySizes.map((size) => (
                          <SelectItem 
                            key={size} 
                            value={size}
                            className="py-1 px-2 min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]"
                          >
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <Label htmlFor="phone" className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.step2.phone}
                      onChange={(e) => updateFormData("step2", "phone", e.target.value)}
                      placeholder="Your phone number"
                      className="min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-1 xs:py-2"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-2 xs:space-y-3 sm:space-y-4"
                >
                  <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <Label htmlFor="requirements" className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium">Project Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.step3.requirements}
                      onChange={(e) => updateFormData("step3", "requirements", e.target.value)}
                      placeholder="Describe your requirements"
                      rows={3}
                      className="min-h-[70px] xs:min-h-[80px] sm:min-h-[90px] md:min-h-[110px] text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-1.5 xs:py-2 resize-y"
                    />
                  </div>

                  <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <Label htmlFor="budget" className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium">Budget Range</Label>
                    <Select
                      value={formData.step3.budget}
                      onValueChange={(value) => updateFormData("step3", "budget", value)}
                    >
                      <SelectTrigger 
                        id="budget" 
                        className="min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3"
                      >
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent className="text-[10px] xs:text-xs sm:text-sm max-h-[180px] xs:max-h-[200px] sm:max-h-[220px] overflow-y-auto">
                        {budgetRanges.map((range) => (
                          <SelectItem 
                            key={range} 
                            value={range}
                            className="py-1 px-2 min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]"
                          >
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                    <Label htmlFor="timeline" className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium">Project Timeline</Label>
                    <Select
                      value={formData.step3.timeline}
                      onValueChange={(value) => updateFormData("step3", "timeline", value)}
                    >
                      <SelectTrigger 
                        id="timeline" 
                        className="min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3"
                      >
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent className="text-[10px] xs:text-xs sm:text-sm max-h-[180px] xs:max-h-[200px] sm:max-h-[220px] overflow-y-auto">
                        {timelineOptions.map((option) => (
                          <SelectItem 
                            key={option} 
                            value={option}
                            className="py-1 px-2 min-h-[28px] xs:min-h-[32px] sm:min-h-[36px]"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </CardContent>

      {!isComplete && (
        <CardFooter className="flex justify-between px-2 xs:px-3 sm:px-4 md:px-6 pt-0 xs:pt-1 sm:pt-2 md:pt-3 pb-2 xs:pb-3 sm:pb-4 md:pb-6 gap-2">
          {currentStep > 1 ? (
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={isSubmitting} 
              className="min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm"
            >
              <ArrowLeft className="mr-1 xs:mr-1.5 sm:mr-2 h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />
              Back
            </Button>
          ) : (
            <div /> // Empty div for spacing
          )}

          {currentStep < 3 ? (
            <Button 
              onClick={handleNext} 
              disabled={isSubmitting} 
              className="min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm"
            >
              Next
              <ArrowRight className="ml-1 xs:ml-1.5 sm:ml-2 h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting} 
              className="group min-h-[32px] xs:min-h-[36px] sm:min-h-[40px] md:min-h-[44px] h-8 xs:h-9 sm:h-10 md:h-11 text-[10px] xs:text-xs sm:text-sm"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
              <Send className="ml-1 xs:ml-1.5 sm:ml-2 h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function MultiStepFormWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <MultiStepForm {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { MultiStepFormWrapper as MultiStepForm };