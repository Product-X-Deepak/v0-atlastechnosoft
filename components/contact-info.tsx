"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Clock, Mail, MapPin, Phone } from "lucide-react"
import { Suspense } from "react"

function ContactInfo(_props: Record<string, unknown>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="premium-card h-full">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Reach out to us through any of these channels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            className="flex items-start space-x-4"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h3 className="font-medium">Head Office</h3>
              <p className="text-sm text-muted-foreground">
                Office No.29, Building No.108/116, Vitthalwadi,
                <br />
                Kalabadevi Road, Marine Lines,
                <br />
                Mumbai - 400 002 Maharashtra, India
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start space-x-4"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Building className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h3 className="font-medium">Branch Office</h3>
              <p className="text-sm text-muted-foreground">
                F/2nd Floor, Yashodhan Building, Chandavarkar Road,
                <br />
                Om Shanti Chowk, Borivali(west),
                <br />
                Mumbai - 400 092 Maharashtra, India
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start space-x-4"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-sm text-muted-foreground">+91-22-2240 1925</p>
              <p className="text-sm text-muted-foreground">+91-22-4022 1925</p>
              <p className="text-sm text-muted-foreground">+91-9372329599 (Mobile)</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start space-x-4"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-muted-foreground">info@atlastechnosoft.com</p>
              <p className="text-sm text-muted-foreground">info@atlastechnosoft.com</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start space-x-4"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h3 className="font-medium">Business Hours</h3>
              <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-sm text-muted-foreground">Saturday: 9:00 AM - 1:00 PM</p>
              <p className="text-sm text-muted-foreground">Sunday: Closed</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function ContactInfoWrapper(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ContactInfo {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { ContactInfoWrapper as ContactInfo };