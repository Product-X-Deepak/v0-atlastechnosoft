import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { StructuredData } from "@/components/seo/structured-data"
import { generateBreadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Terms & Conditions | Atlas Technosoft",
  description: "Learn about Atlas Technosoft's terms and conditions governing the use of our services, website, and solutions.",
  keywords: [
    "Atlas Technosoft terms",
    "terms of service",
    "legal agreement",
    "user agreement",
    "service terms",
    "usage policy",
    "intellectual property rights",
    "service limitations",
    "liability terms",
    "software licensing"
  ],
}

export default function TermsAndConditionsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Terms & Conditions", url: "/terms" },
      ])} />

      <div className="bg-yellow-50 py-12 md:py-20">
        <div className="container px-4 sm:px-6 md:px-8">
          <PageHeader
            title="Terms & Conditions"
            description="Agreement governing the use of our services"
            breadcrumbs={[
              { title: "Home", href: "/" },
              { title: "Terms & Conditions", href: "/terms" },
            ]}
          />
        </div>
      </div>

      <div className="container px-4 py-10 sm:py-14 md:py-16">
        <div className="mx-auto mt-6 sm:mt-8 max-w-4xl prose prose-sm sm:prose-base md:prose-lg dark:prose-invert prose-headings:scroll-mt-24">
          <p className="text-xs sm:text-sm text-muted-foreground">Last Updated: June 1, 2023</p>
          
          <section>
            <h2 className="mt-6 sm:mt-8 md:mt-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Introduction</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Welcome to Atlas Technosoft. These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of Atlas Technosoft&apos;s website, software, products, and services (collectively, our &quot;Services&quot;).
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              Please read these Terms carefully before using our Services. By accessing or using our Services, you agree to be bound by these Terms, our Privacy Policy, and any other policies referenced herein. If you do not agree to these Terms, you must not access or use our Services.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              Atlas Technosoft (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) reserves the right to modify these Terms at any time. Changes will be effective upon posting to our website. Your continued use of our Services after any changes indicates your acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Definitions</h2>
            <p className="text-xs sm:text-sm md:text-base">
              In these Terms, the following terms shall have the meanings assigned to them:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li><strong>Content:</strong> All information, data, text, software, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork, and computer code made available through our Services.</li>
              <li><strong>Services:</strong> Any software, products, applications, website, or services offered by Atlas Technosoft.</li>
              <li><strong>User:</strong> Any individual or entity that accesses or uses our Services.</li>
              <li><strong>Customer:</strong> Any individual or entity that enters into a contract with us for the provision of our Services.</li>
              <li><strong>Subscription:</strong> A recurring payment arrangement for continued use of certain Services.</li>
              <li><strong>User Account:</strong> An account created by a User to access and use certain Services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">User Accounts</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Some of our Services require you to create a user account. When you create an account, you must provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              You agree to:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Immediately notify us of any unauthorized use of your account or any other breach of security.</li>
              <li>Ensure you exit from your account at the end of each session when accessing the Services on a shared computer.</li>
              <li>Not share your account credentials with any third party.</li>
              <li>Not create more than one account unless explicitly permitted.</li>
              <li>Not use another User&apos;s account without permission.</li>
            </ul>
            <p className="text-xs sm:text-sm md:text-base">
              We reserve the right to disable any user account if, in our opinion, you have violated any provision of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Service License and Restrictions</h2>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">License</h3>
            <p className="text-xs sm:text-sm md:text-base">
              Subject to these Terms and your compliance with them, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use our Services for your internal business purposes or personal use, as applicable.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              For Services that require a subscription or one-time payment, this license is conditional upon your timely payment of all applicable fees.
            </p>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Restrictions</h3>
            <p className="text-xs sm:text-sm md:text-base">
              You shall not:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Copy, modify, distribute, sell, lease, loan, or sublicense any part of our Services.</li>
              <li>Reverse engineer, decompile, disassemble, or attempt to discover the source code of our Services unless expressly permitted by applicable law.</li>
              <li>Remove any copyright, trademark, or other proprietary notices from our Services.</li>
              <li>Use our Services to transmit any viruses, malware, or other malicious code.</li>
              <li>Use our Services to send unsolicited communications (spam).</li>
              <li>Interfere with or disrupt the integrity or performance of our Services.</li>
              <li>Use our Services for any illegal, harmful, or fraudulent purpose.</li>
              <li>Attempt to gain unauthorized access to our Services or related systems or networks.</li>
              <li>Use any automated system, including robots, spiders, or scrapers, to access or interact with our Services without our explicit permission.</li>
              <li>Circumvent any access or use restrictions put in place to prevent certain uses of our Services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Fees and Payment</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Some of our Services may require payment of fees. All fees are stated in the relevant order form, statement of work, or service agreement.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              You agree to:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Pay all applicable fees on time according to the payment terms specified in the relevant agreement.</li>
              <li>Provide valid and updated payment information.</li>
              <li>Bear all applicable taxes, unless stated otherwise.</li>
            </ul>
            <p className="text-xs sm:text-sm md:text-base">
              For subscription-based Services:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Fees are billed in advance on a recurring basis, as specified in the service agreement.</li>
              <li>You authorize us to charge your payment method on a recurring basis.</li>
              <li>Subscription fees may change upon notice provided at least 30 days before the change takes effect.</li>
              <li>To terminate a subscription, you must follow the cancellation procedures specified in the service agreement or on our website. If you cancel a subscription, you may continue to access the Service until the end of your current billing period.</li>
            </ul>
            <p className="text-xs sm:text-sm md:text-base">
              We do not offer refunds unless required by law or as expressly stated in the service agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Intellectual Property Rights</h2>
            <p className="text-xs sm:text-sm md:text-base">
              All intellectual property rights in our Services, including but not limited to software, code, content, design, logos, and trademarks, are owned by or licensed to Atlas Technosoft. Nothing in these Terms transfers any of these rights to you.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              You may not use, copy, reproduce, modify, republish, upload, post, transmit, translate, sell, create derivative works, exploit, or distribute our Services or any Content in any way without our prior written consent, except as expressly provided in these Terms or as permitted by applicable law.
            </p>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Feedback</h3>
            <p className="text-xs sm:text-sm md:text-base">
              If you provide us with any feedback, suggestions, or ideas regarding our Services (&quot;Feedback&quot;), you grant us a perpetual, worldwide, royalty-free, irrevocable, non-exclusive, sublicensable, and transferable license to use, reproduce, modify, create derivative works from, distribute, and display the Feedback in any manner and for any purpose, without compensation to you.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Data Processing and Security</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Our processing of personal data is governed by our <Link href="/privacy" className="text-[#E84A0E] hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              For Customers who use our Services to process personal data of third parties, the following provisions apply:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>You remain the data controller for such personal data, and we process the data only as a data processor on your behalf.</li>
              <li>You are responsible for ensuring that you have the right to collect, use, and share such personal data with us.</li>
              <li>You must comply with all applicable data protection laws.</li>
              <li>We will process the personal data only in accordance with your documented instructions and these Terms.</li>
              <li>We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.</li>
              <li>Upon termination of the Services, we will delete or return all personal data as specified in the service agreement, subject to legal retention requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Confidentiality</h2>
            <p className="text-xs sm:text-sm md:text-base">
              &quot;Confidential Information&quot; means non-public information disclosed by one party (&quot;Disclosing Party&quot;) to the other (&quot;Receiving Party&quot;) that is designated as confidential or that, given the nature of the information or circumstances surrounding its disclosure, should reasonably be understood to be confidential.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              The Receiving Party agrees to:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Protect the Confidential Information using the same degree of care it uses to protect its own confidential information, but no less than a reasonable degree of care.</li>
              <li>Not disclose Confidential Information to any third party without the Disclosing Party&apos;s prior written consent, except to the Receiving Party&apos;s employees, contractors, and advisors who need to know for the purpose of these Terms and who are bound by confidentiality obligations no less restrictive than these Terms.</li>
              <li>Use Confidential Information only for the purpose of performing its obligations or exercising its rights under these Terms.</li>
            </ul>
            <p className="text-xs sm:text-sm md:text-base">
              Confidential Information does not include information that:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Is or becomes publicly available through no fault of the Receiving Party.</li>
              <li>Was rightfully known to the Receiving Party without restriction before disclosure by the Disclosing Party.</li>
              <li>Was independently developed by the Receiving Party without use of the Confidential Information.</li>
              <li>Is rightfully obtained by the Receiving Party from a third party without restriction and without breach of any obligation of confidentiality.</li>
            </ul>
            <p className="text-xs sm:text-sm md:text-base">
              The Receiving Party may disclose Confidential Information to the extent required by law, regulation, or court order, provided that it gives the Disclosing Party prior written notice (where legally permitted) and cooperates with the Disclosing Party&apos;s efforts to obtain confidential treatment or a protective order.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Warranties and Disclaimers</h2>
            <p className="text-xs sm:text-sm md:text-base">
              We warrant that our Services will substantially conform to any documentation or specifications provided by us. If the Services do not conform to this warranty, we will, at our option and as your exclusive remedy, either (a) repair or replace the non-conforming Services, or (b) refund the fees paid for the non-conforming Services.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              EXCEPT AS EXPRESSLY SET FORTH ABOVE, OUR SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTY OF ANY KIND. WE EXPRESSLY DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, RELIABILITY, SECURITY, OR UNINTERRUPTED SERVICE.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              WE DO NOT WARRANT THAT OUR SERVICES WILL MEET YOUR REQUIREMENTS, THAT OPERATION OF OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED. WE ARE NOT RESPONSIBLE FOR ANY ISSUES RESULTING FROM YOUR USE OF OUR SERVICES WITH ANY THIRD-PARTY PRODUCTS OR SERVICES.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              YOU UNDERSTAND AND AGREE THAT YOUR USE OF OUR SERVICES IS AT YOUR OWN RISK.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Limitation of Liability</h2>
            <p className="text-xs sm:text-sm md:text-base">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ATLAS TECHNOSOFT, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF, OR INABILITY TO USE, OUR SERVICES.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF OUR SERVICES EXCEED THE AMOUNT PAID BY YOU TO US FOR THE SERVICES DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN WARRANTIES OR LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Indemnification</h2>
            <p className="text-xs sm:text-sm md:text-base">
              You agree to indemnify, defend, and hold harmless Atlas Technosoft, its officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) that arise from or relate to:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Your use of our Services;</li>
              <li>Your violation of these Terms;</li>
              <li>Your violation of any rights of another person or entity; or</li>
              <li>Your breach of any applicable laws or regulations.</li>
            </ul>
            <p className="text-xs sm:text-sm md:text-base">
              We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will cooperate with us in asserting any available defenses.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Term and Termination</h2>
            <p className="text-xs sm:text-sm md:text-base">
              These Terms will continue until terminated by either you or us.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              You may terminate these Terms by discontinuing use of our Services. If you have a subscription, you must follow the cancellation procedures specified in the service agreement or on our website.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              We may terminate these Terms or suspend your access to our Services at any time, with or without cause, and with or without notice. Cause for termination includes, but is not limited to:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Violation of these Terms;</li>
              <li>Non-payment of fees;</li>
              <li>Upon request by law enforcement or other government agencies;</li>
              <li>Unexpected technical or security issues; or</li>
              <li>Extended periods of inactivity.</li>
            </ul>
            <p className="text-xs sm:text-sm md:text-base">
              Upon termination, your right to use our Services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Governing Law and Jurisdiction</h2>
            <p className="text-xs sm:text-sm md:text-base">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Dispute Resolution</h2>
            <p className="text-xs sm:text-sm md:text-base">
              In the event of any dispute, claim, or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation, or validity thereof (collectively, &quot;Disputes&quot;), you and Atlas Technosoft shall first attempt to resolve the Dispute informally by negotiation.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              If we cannot resolve a Dispute informally within 30 days, either party may initiate formal proceedings, subject to the Governing Law and Jurisdiction section above.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              Notwithstanding the foregoing, either party may seek injunctive or other equitable relief to prevent or stop the breach of these Terms, the infringement or misappropriation of intellectual property rights, or the unauthorized use of confidential information.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Miscellaneous</h2>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Entire Agreement</h3>
            <p className="text-xs sm:text-sm md:text-base">
              These Terms, together with any service agreements or other agreements referenced herein, constitute the entire agreement between you and Atlas Technosoft regarding your use of our Services, superseding any prior agreements between you and us (including, but not limited to, any prior versions of these Terms).
            </p>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Waiver</h3>
            <p className="text-xs sm:text-sm md:text-base">
              No waiver of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or any other term, and any failure by us to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Severability</h3>
            <p className="text-xs sm:text-sm md:text-base">
              If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of these Terms will continue in full force and effect.
            </p>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Assignment</h3>
            <p className="text-xs sm:text-sm md:text-base">
              You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. Any attempt to assign or transfer these Terms without such consent shall be null and void. We may assign or transfer these Terms, at our sole discretion, without restriction.
            </p>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Force Majeure</h3>
            <p className="text-xs sm:text-sm md:text-base">
              We will not be liable or responsible for any failure to perform, or delay in performance of, any of our obligations under these Terms that is caused by events outside our reasonable control, including, but not limited to, acts of God, fire, flood, natural disaster, pandemic, epidemic, war, terrorist activity, riot, civil commotion, malicious damage, government action, industrial dispute, failure of telecommunications networks, or inability to obtain raw materials or transportation.
            </p>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">No Third-Party Beneficiaries</h3>
            <p className="text-xs sm:text-sm md:text-base">
              These Terms do not confer any rights, remedies, obligations, or liabilities upon any person or entity other than you and Atlas Technosoft.
            </p>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Notices</h3>
            <p className="text-xs sm:text-sm md:text-base">
              Any notices or other communications provided by us under these Terms, including those regarding modifications to these Terms, will be given by posting to our website or by email to the address specified in your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Contact Us</h2>
            <p className="text-xs sm:text-sm md:text-base">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 border rounded bg-muted/30 text-xs sm:text-sm md:text-base">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <div className="sm:flex-1">
                  <p className="font-medium">Atlas Technosoft</p>
                  <p>Office No.29, Building No.108/116, Vitthalwadi, Kalabadevi Road, Marine Lines</p>
                  <p>Mumbai, Maharashtra 400002</p>
                  <p>India</p>
                </div>
                <div className="mt-3 sm:mt-0 sm:flex-1">
                  <p className="mt-1 sm:mt-2">Email: <Link href="mailto:info@atlastechnosoft.com" className="text-[#E84A0E] hover:underline break-words">info@atlastechnosoft.com</Link></p>
                  <p>Phone: <Link href="tel:+912222401925" className="text-[#E84A0E] hover:underline">+91-22-2240 1925</Link></p>
                </div>
              </div>
            </div>
          </section>
          
          <div className="mt-10 mb-6 bg-slate-900 text-white rounded-lg p-6 sm:p-8">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">Have questions about our Terms & Conditions?</h3>
            <p className="mt-2 mb-6 text-sm text-gray-300">
              Contact our legal team for any clarifications or inquiries
            </p>
            <a 
              href="/contact" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#E84A0E] px-6 text-sm font-medium text-white shadow transition-colors hover:bg-[#E84A0E]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Contact Our Legal Team
            </a>
          </div>
        </div>
      </div>
    </main>
  )
} 