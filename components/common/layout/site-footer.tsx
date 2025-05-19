"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter, MapPin, Clock } from "lucide-react"
import { Suspense, useState, useEffect } from "react"

function SiteFooter() {
  // Initialize with an empty string to avoid hydration mismatch
  const [currentYear, setCurrentYear] = useState("");
  const [_logoError, setLogoError] = useState(false)

  // Set the year after hydration is complete
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="relative w-full border-t border-white/10 overflow-hidden bg-gradient-to-b from-background via-background/95 to-black/40" role="contentinfo" aria-label="Site Footer">
      {/* Subtle background elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main footer content */}
      <div className="container relative z-10 mx-auto px-3 xs:px-4 sm:px-6 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-y-6 xs:gap-y-8 sm:gap-y-10 md:grid-cols-12 md:gap-x-4 lg:gap-x-6 xl:gap-x-8 md:gap-y-8 lg:gap-y-10">
          {/* Company info */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 md:col-span-12 lg:col-span-3">
            <Link href="/" className="inline-block" aria-label="Atlas Technosoft - Home">
              <div className="bg-white p-2 xs:p-2.5 sm:p-3 rounded-lg shadow-md">
                <Image
                  alt="Atlas Technosoft Logo"
                  src="/images/Main_Logo.png"
                  width={150}
                  height={80}
                  className="h-10 xs:h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain"
                  unoptimized={false}
                  priority
                  onError={() => setLogoError(true)}
                />
              </div>
            </Link>
            <p className="text-xs xs:text-sm text-gray-300 max-w-xs">
              Leading SAP Gold Certified Partner providing cutting-edge ERP solutions and AI-powered automation since 1997.
            </p>
            <div className="flex space-x-2 xs:space-x-3 sm:space-x-4">
              <Link
                href="https://twitter.com/Atlas_SAP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200 touch-target-improved p-1 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={14} className="xs:w-[16px] xs:h-[16px] sm:w-[18px] sm:h-[18px]" />
              </Link>
              <Link
                href="https://www.facebook.com/Atlascomputer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200 touch-target-improved p-1 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={14} className="xs:w-[16px] xs:h-[16px] sm:w-[18px] sm:h-[18px]" />
              </Link>
              <Link
                href="https://www.instagram.com/atlas_technosoft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200 touch-target-improved p-1 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={14} className="xs:w-[16px] xs:h-[16px] sm:w-[18px] sm:h-[18px]" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/atlas-technosoft-pvt-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200 touch-target-improved p-1 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin size={14} className="xs:w-[16px] xs:h-[16px] sm:w-[18px] sm:h-[18px]" />
              </Link>
            </div>
          </div>

          {/* Section groups */}
          <div className="md:col-span-12 lg:col-span-6 grid grid-cols-1 xs:grid-cols-2 gap-y-6 xs:gap-y-7 sm:gap-y-8 gap-x-3 xs:gap-x-4 sm:gap-x-6 lg:gap-x-8">
            {/* First column: SAP Solutions and Industries */}
            <div className="space-y-5 xs:space-y-6 sm:space-y-8">
              {/* SAP Solutions */}
              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                <h3 className="text-xs xs:text-sm sm:text-base font-medium text-white border-b border-primary/30 pb-1.5 xs:pb-2 mb-1.5 xs:mb-2 sm:mb-3">
                  <span className="bg-gradient-to-r from-primary/80 to-blue-400 bg-clip-text text-transparent">SAP Solutions</span>
                </h3>
                <ul className="space-y-0 xs:space-y-1 sm:space-y-2">
                  <li>
                    <Link
                      href="/sap-solutions/business-one"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      SAP Business One
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sap-solutions/business-one-cloud"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      SAP Business One Cloud
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sap-solutions/hana"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      SAP HANA
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sap-solutions/erp-planning"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      ERP Planning
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Industries */}
              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                <h3 className="text-xs xs:text-sm sm:text-base font-medium text-white border-b border-primary/30 pb-1.5 xs:pb-2 mb-1.5 xs:mb-2 sm:mb-3">
                  <span className="bg-gradient-to-r from-primary/80 to-blue-400 bg-clip-text text-transparent">Industries</span>
                </h3>
                <ul className="space-y-0 xs:space-y-1 sm:space-y-2">
                  <li>
                    <Link
                      href="/industries/shipping"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      Shipping & Import/Export
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/industries/distribution"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      Distribution & Logistics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/industries/manufacturing"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      Manufacturing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/industries/retail"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      Retail
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/industries/healthcare"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      Healthcare
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Second column: Automation Solutions and Quick Links */}
            <div className="space-y-5 xs:space-y-6 sm:space-y-8">
              {/* Automation Solutions */}
              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                <h3 className="text-xs xs:text-sm sm:text-base font-medium text-white border-b border-primary/30 pb-1.5 xs:pb-2 mb-1.5 xs:mb-2 sm:mb-3">
                  <span className="bg-gradient-to-r from-primary/80 to-blue-400 bg-clip-text text-transparent">Automation Solutions</span>
                </h3>
                <ul className="space-y-0 xs:space-y-1 sm:space-y-2">
                  <li>
                    <Link
                      href="/automation-solutions/ui-path"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      UiPath Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/automation-solutions/boyum-it"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      Boyum IT Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/automation-solutions/rpa-solutions"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      RPA Solutions
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                <h3 className="text-xs xs:text-sm sm:text-base font-medium text-white border-b border-primary/30 pb-1.5 xs:pb-2 mb-1.5 xs:mb-2 sm:mb-3">
                  <span className="bg-gradient-to-r from-primary/80 to-blue-400 bg-clip-text text-transparent">Quick Links</span>
                </h3>
                <ul className="space-y-0 xs:space-y-1 sm:space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="group flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-all duration-200 py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                    >
                      <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-primary rounded-full"></span>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2 xs:space-y-3 sm:space-y-4 md:col-span-12 lg:col-span-3">
            <h3 className="text-xs xs:text-sm sm:text-base font-medium text-white border-b border-primary/30 pb-1.5 xs:pb-2 mb-1.5 xs:mb-2 sm:mb-3">
              <span className="bg-gradient-to-r from-primary/80 to-blue-400 bg-clip-text text-transparent">Contact Us</span>
            </h3>
            <ul className="space-y-2 xs:space-y-3 sm:space-y-4">
              <li>
                <Link
                  href="mailto:info@atlastechnosoft.com"
                  className="flex items-start text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors duration-200 group py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                >
                  <Mail size={12} className="mr-1.5 xs:mr-2 sm:mr-3 mt-0.5 flex-shrink-0 text-primary/70 group-hover:text-primary transition-colors duration-200 xs:w-[14px] xs:h-[14px] sm:w-4 sm:h-4" />
                  <span>info@atlastechnosoft.com</span>
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+912222401925"
                  className="flex items-start text-[10px] xs:text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors duration-200 group py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px] touch-target-improved"
                >
                  <Phone size={12} className="mr-1.5 xs:mr-2 sm:mr-3 mt-0.5 flex-shrink-0 text-primary/70 group-hover:text-primary transition-colors duration-200 xs:w-[14px] xs:h-[14px] sm:w-4 sm:h-4" />
                  <div className="flex flex-col">
                    <span>+91-22-2240 1925</span>
                    <span>+91-22-4022 1925</span>
                    <span>Mobile: +91-9372329599</span>
                  </div>
                </Link>
              </li>
              <li className="flex items-start text-[10px] xs:text-xs sm:text-sm text-gray-300 group py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px]">
                <MapPin size={12} className="mr-1.5 xs:mr-2 sm:mr-3 mt-0.5 flex-shrink-0 text-primary/70 group-hover:text-primary transition-colors duration-200 xs:w-[14px] xs:h-[14px] sm:w-4 sm:h-4" />
                <div className="space-y-1 xs:space-y-2">
                <div>
                    <strong>Head Office:</strong>
                    <address className="not-italic">
                      Office No.29, Building No.108/116,<br />
                      Vitthalwadi, Kalabadevi Road,<br />
                      Marine Lines, Mumbai - 400 002<br />
                      Maharashtra, India
                    </address>
                  </div>
                  <div>
                    <strong>Branch Office:</strong>
                    <address className="not-italic">
                      F/2nd Floor, Yashodhan Building,<br />
                      Chandavarkar Road, Om Shanti Chowk,<br />
                      Borivali(west), Mumbai - 400 092<br />
                      Maharashtra, India
                    </address>
                  </div>
                </div>
              </li>
              <li className="flex items-start text-[10px] xs:text-xs sm:text-sm text-gray-300 group py-1.5 xs:py-2 min-h-[40px] xs:min-h-[44px]">
                <Clock size={12} className="mr-1.5 xs:mr-2 sm:mr-3 mt-0.5 flex-shrink-0 text-primary/70 group-hover:text-primary transition-colors duration-200 xs:w-[14px] xs:h-[14px] sm:w-4 sm:h-4" />
                <div>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-6 xs:mt-8 sm:mt-10 pt-2 xs:pt-3 sm:pt-4 border-t border-white/10">
          <div className="flex flex-col xs:flex-row items-center justify-between gap-2 xs:gap-3">
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500">
              &copy; {currentYear} Atlas Technosoft. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-3 xs:gap-x-4 sm:gap-x-6 gap-y-1">
              <li>
                <Link
                  href="/privacy"
                  className="text-[10px] xs:text-xs text-gray-500 hover:text-primary transition-colors duration-200 touch-target-improved py-2 px-1 min-h-[40px] flex items-center"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO and Schema.org JSON-LD data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Atlas Technosoft",
            url: "https://www.atlastechnosoft.com",
            logo: "https://www.atlastechnosoft.com/images/Main_Logo.png",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91-22-2240-1925",
                contactType: "customer service",
                email: "info@atlastechnosoft.com",
              },
              {
                "@type": "ContactPoint",
                telephone: "+91-9372329599",
                contactType: "sales",
                email: "info@atlastechnosoft.com",
              },
              {
                "@type": "ContactPoint",
                telephone: "+91-22-4022-1925",
                contactType: "support",
                email: "info@atlastechnosoft.com",
              }
            ],
            address: [
              {
                "@type": "PostalAddress",
                streetAddress: "Office No.29, Building No.108/116, Vitthalwadi, Kalabadevi Road, Marine Lines",
                addressLocality: "Mumbai",
                addressRegion: "Maharashtra",
                postalCode: "400002",
                addressCountry: "IN",
              },
              {
                "@type": "PostalAddress",
                streetAddress: "F/2nd Floor, Yashodhan Building, Chandavarkar Road, Om Shanti Chowk, Borivali(west)",
                addressLocality: "Mumbai",
                addressRegion: "Maharashtra",
                postalCode: "400092",
                addressCountry: "IN",
              }
            ],
            sameAs: [
              "https://twitter.com/Atlas_SAP",
              "https://www.facebook.com/Atlascomputer/",
              "https://www.instagram.com/atlas_technosoft",
              "https://www.linkedin.com/company/atlas-technosoft-pvt-ltd",
            ],
          }),
        }}
      />
    </footer>
  )
}
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SiteFooterWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SiteFooter {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SiteFooterWrapper as SiteFooter };