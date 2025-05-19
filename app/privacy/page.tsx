import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { StructuredData } from "@/components/seo/structured-data"
import { generateBreadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Privacy Policy | Atlas Technosoft",
  description: "Learn about how Atlas Technosoft collects, uses, and protects your personal information and data privacy rights.",
  keywords: [
    "Atlas Technosoft privacy",
    "data protection policy",
    "privacy notice",
    "GDPR compliance",
    "personal data processing",
    "data security policy",
    "information collection",
    "cookies policy",
    "user data rights",
    "third-party data sharing"
  ],
}

export default function PrivacyPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Privacy Policy", url: "/privacy" },
      ])} />

      <div className="bg-yellow-50 py-12 md:py-20">
        <div className="container px-4 sm:px-6 md:px-8">
          <PageHeader
            title="Privacy Policy"
            description="How we collect, use, and protect your information"
            breadcrumbs={[
              { title: "Home", href: "/" },
              { title: "Privacy Policy", href: "/privacy" },
            ]}
          />
        </div>
      </div>

      <div className="container px-4 py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-4xl prose prose-sm sm:prose-base md:prose-lg dark:prose-invert prose-headings:scroll-mt-24">
          <p className="text-xs sm:text-sm text-muted-foreground">Last Updated: June 1, 2023</p>
          
          <section className="mt-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Introduction</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Atlas Technosoft (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates the <Link href="/" className="text-[#E84A0E] hover:underline">www.atlastechnosoft.com</Link> website (the &quot;Service&quot;). This page informs you of our policies regarding the collection, use, and disclosure of Personal Information when you use our Service.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              We will not use or share your information with anyone except as described in this Privacy Policy. We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Information Collection and Use</h2>
            <p className="text-xs sm:text-sm md:text-base">
              While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your name, email address, postal address, phone number, and other information (&quot;Personal Information&quot;).
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              We collect this information for the purpose of providing the Service, identifying and communicating with you, responding to your requests/inquiries, and improving our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Types of Data Collected</h2>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Personal Data</h3>
            <p className="text-xs sm:text-sm md:text-base">
              When you register for our services, fill out forms on our website, subscribe to our newsletter, or engage with us in other ways, we may collect various types of personal information, including:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Contact information (name, email address, phone number, business address)</li>
              <li>Account credentials (username, password)</li>
              <li>Billing information (billing address, payment details)</li>
              <li>Business information (company name, job title, department)</li>
              <li>User feedback and correspondence (survey responses, customer support inquiries)</li>
              <li>Professional interests and preferences</li>
            </ul>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Usage Data</h3>
            <p className="text-xs sm:text-sm md:text-base">
              We may also collect information on how the Service is accessed and used (&quot;Usage Data&quot;). This Usage Data may include information such as your computer&apos;s Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
            </p>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Cookies and Tracking Data</h3>
            <p className="text-xs sm:text-sm md:text-base">
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              Examples of Cookies we use:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li><strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</li>
              <li><strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.</li>
              <li><strong>Security Cookies.</strong> We use Security Cookies for security purposes.</li>
              <li><strong>Analytical Cookies.</strong> We use Analytical Cookies to analyze how users use our Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Use of Data</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Atlas Technosoft uses the collected data for various purposes:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information</li>
              <li>To fulfill any other purpose for which you provide the information</li>
              <li>To enforce our terms and conditions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Legal Basis for Processing Personal Data</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Atlas Technosoft&apos;s legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect it.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              We may process your Personal Information because:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>We need to perform a contract with you</li>
              <li>You have given us permission to do so</li>
              <li>The processing is in our legitimate interests and it is not overridden by your rights</li>
              <li>To comply with the law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Retention of Data</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Atlas Technosoft will retain your Personal Information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer periods.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Transfer of Data</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Your information, including Personal Information, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Information, to India and process it there.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              Atlas Technosoft will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Information will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Disclosure of Data</h2>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Business Transaction</h3>
            <p className="text-xs sm:text-sm md:text-base">
              If Atlas Technosoft is involved in a merger, acquisition or asset sale, your Personal Information may be transferred. We will provide notice before your Personal Information is transferred and becomes subject to a different Privacy Policy.
            </p>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Disclosure for Law Enforcement</h3>
            <p className="text-xs sm:text-sm md:text-base">
              Under certain circumstances, Atlas Technosoft may be required to disclose your Personal Information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
            </p>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E84A0E]">Legal Requirements</h3>
            <p className="text-xs sm:text-sm md:text-base">
              Atlas Technosoft may disclose your Personal Information in the good faith belief that such action is necessary to:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>To comply with a legal obligation</li>
              <li>To protect and defend the rights or property of Atlas Technosoft</li>
              <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>To protect the personal safety of users of the Service or the public</li>
              <li>To protect against legal liability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Security of Data</h2>
            <p className="text-xs sm:text-sm md:text-base">
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information, including:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Using encryption to protect sensitive information transmitted online</li>
              <li>Protecting your information offline by keeping it on secured servers</li>
              <li>Implementing access controls to limit access to personal information</li>
              <li>Regular security assessments and audits</li>
              <li>Staff training on data protection practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Your Data Protection Rights</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Atlas Technosoft aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Information.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              You have the following data protection rights:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li><strong>The right to access, update or delete the information we have on you.</strong> Whenever made possible, you can access, update or request deletion of your Personal Information directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.</li>
              <li><strong>The right of rectification.</strong> You have the right to have your information rectified if that information is inaccurate or incomplete.</li>
              <li><strong>The right to object.</strong> You have the right to object to our processing of your Personal Information.</li>
              <li><strong>The right of restriction.</strong> You have the right to request that we restrict the processing of your personal information.</li>
              <li><strong>The right to data portability.</strong> You have the right to be provided with a copy of the information we have on you in a structured, machine-readable and commonly used format.</li>
              <li><strong>The right to withdraw consent.</strong> You also have the right to withdraw your consent at any time where Atlas Technosoft relied on your consent to process your personal information.</li>
            </ul>
            <p className="text-xs sm:text-sm md:text-base">
              Please note that we may ask you to verify your identity before responding to such requests.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Service Providers</h2>
            <p className="text-xs sm:text-sm md:text-base">
              We may employ third party companies and individuals to facilitate our Service (&quot;Service Providers&quot;), provide the Service on our behalf, perform Service-related services or assist us in analyzing how our Service is used.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              Examples of third-party service providers we use include:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li><strong>Analytics providers</strong> that help us understand how our Service is used</li>
              <li><strong>Marketing providers</strong> that help us deliver communications and promotional materials</li>
              <li><strong>Payment processors</strong> for secure payment handling</li>
              <li><strong>Hosting providers</strong> for website infrastructure</li>
              <li><strong>Customer support tools</strong> to assist with inquiries</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Links to Other Sites</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party&apos;s site. We strongly advise you to review the Privacy Policy of every site you visit.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Children&apos;s Privacy</h2>
            <p className="text-xs sm:text-sm md:text-base">
              Our Service does not address anyone under the age of 18 (&quot;Children&quot;).
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from children without verification of parental consent, we take steps to remove that information from our servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">GDPR Compliance</h2>
            <p className="text-xs sm:text-sm md:text-base">
              We are committed to complying with the General Data Protection Regulation (GDPR). The GDPR gives people in the EU more control over how their data is used and places certain obligations on businesses that process the information of EU citizens.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              As part of our commitment to GDPR compliance, we:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>Process personal data lawfully, fairly, and in a transparent manner</li>
              <li>Collect personal data only for specified, explicit, and legitimate purposes</li>
              <li>Process personal data only for the minimum amount necessary for the purposes for which it was collected</li>
              <li>Ensure personal data is accurate and up to date</li>
              <li>Store personal data for no longer than necessary</li>
              <li>Process personal data in a manner that ensures appropriate security and protection</li>
            </ul>
            <p className="text-xs sm:text-sm md:text-base">
              If you are in the EU and have any questions about our GDPR compliance, please contact our Data Protection Officer.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Data Protection Officer</h2>
            <p className="text-xs sm:text-sm md:text-base">
              We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions regarding this Privacy Policy. If you have any questions about this Privacy Policy, please contact our DPO at:
            </p>
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 border rounded bg-muted/30 text-xs sm:text-sm md:text-base">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <div className="sm:flex-1">
                  <p className="font-medium">Data Protection Officer</p>
                  <p>Atlas Technosoft</p>
                  <p>Office No.29, Building No.108/116</p>
                  <p>Vitthalwadi, Kalabadevi Road, Marine Lines</p>
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

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Changes to This Privacy Policy</h2>
            <p className="text-xs sm:text-sm md:text-base">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top of this Privacy Policy.
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A73370]">Contact Us</h2>
            <p className="text-xs sm:text-sm md:text-base">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="text-xs sm:text-sm md:text-base">
              <li>By email: <Link href="mailto:info@atlastechnosoft.com" className="text-[#E84A0E] hover:underline">info@atlastechnosoft.com</Link></li>
              <li>By phone: <Link href="tel:+912222401925" className="text-[#E84A0E] hover:underline">+91-22-2240 1925</Link></li>
              <li>By mail: Atlas Technosoft, Office No.29, Building No.108/116, Vitthalwadi, Kalabadevi Road, Marine Lines, Mumbai, Maharashtra 400002, India</li>
            </ul>
          </section>
          
          <div className="mt-10 mb-6 bg-slate-900 text-white rounded-lg p-6 sm:p-8">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">Have questions about our Privacy Policy?</h3>
            <p className="mt-2 mb-6 text-sm text-gray-300">
              Contact our privacy team for any clarifications or to exercise your data rights
            </p>
            <a 
              href="/contact" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#E84A0E] px-6 text-sm font-medium text-white shadow transition-colors hover:bg-[#E84A0E]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Contact Our Privacy Team
            </a>
          </div>
        </div>
      </div>
    </main>
  )
} 