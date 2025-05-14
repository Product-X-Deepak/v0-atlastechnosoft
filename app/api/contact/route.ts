import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || "",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASSWORD || "",
  },
})

const companyEmail = "info@atlastechnosoft.com"

// Create a more flexible type for form data
interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  jobTitle?: string;
  experience?: string;
  resumeLink?: string;
  resume?: string;
  resumeFile?: {
    name: string;
    data: string;
    contentType: string;
  };
  interest?: string;
  product?: string;
  currentPage?: string;
  formType?: string;
  sendConfirmation?: boolean;
  [key: string]: string | boolean | number | object | undefined; // Updated index signature
}

export async function POST(request: Request) {
  try {
    // Check if request is multipart/form-data
    const contentType = request.headers.get('content-type') || '';
    let data: FormData;

    if (contentType.includes('multipart/form-data')) {
      // Handle multipart form data (with file)
      const formData = await request.formData();
      data = Object.fromEntries(formData) as unknown as FormData;
      
      // Process resume file if it exists
      const file = formData.get('resumeFile') as File | null;
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        data.resumeFile = {
          name: file.name,
          data: buffer.toString('base64'),
          contentType: file.type
        };
      }
    } else {
      // Handle regular JSON data
      data = await request.json();
    }
    
    // Validate required fields
    if (data.formType === 'chat') {
      // Handle chat messages
      if (!data.message) {
        return NextResponse.json(
          { error: "Message is required for chat" },
          { status: 400 }
        )
      }

      // Generate automated response based on message content
      const reply = generateChatResponse(data.message)
      
      // Log chat in the system for follow-up
      await sendChatLog(data)
      
      // Return immediate response to the client
      return NextResponse.json({ success: true, reply })
    }
    else {
      // Handle regular form submissions
      if (!data.email || !data.name) {
        return NextResponse.json(
          { error: "Required fields are missing" },
          { status: 400 }
        )
      }
    }
    
    // Build email content based on form type
    const formType = data.formType || "contact"
    const formData = formatFormData(data, formType)
    
    // Prepare email options
    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_FROM || `"Website Form" <${data.email}>`,
      to: companyEmail,
      subject: `New ${formType} form submission from ${data.name}`,
      html: `
        <h1>New ${formType} Form Submission</h1>
        <p><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</p>
        ${formData}
        <p>This message was sent from the website form.</p>
      `,
    };
    
    // Add attachment if resume file exists
    if (data.resumeFile) {
      mailOptions.attachments = [
        {
          filename: data.resumeFile.name,
          content: data.resumeFile.data,
          encoding: 'base64',
          contentType: data.resumeFile.contentType
        }
      ];
    }
    
    // Send email to company
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to user if requested
    if (data.email) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || `"Atlas Technosoft" <${companyEmail}>`,
        to: data.email,
        subject: getConfirmationSubject(formType),
        html: getConfirmationEmail(data, formType),
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    )
  }
}

function formatFormData(data: FormData, formType: string): string {
  let formattedData = ""
  
  switch (formType) {
    case "contact":
      formattedData = `
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
        <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
      `
      break
    
    case "consultation":
      formattedData = `
        <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
        <p><strong>Interest:</strong> ${data.interest || 'Not specified'}</p>
        <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
      `
      break
    
    case "job-application":
      formattedData = `
        <p><strong>Position Applied For:</strong> ${data.jobTitle || data.position || 'Not specified'}</p>
        <p><strong>Experience:</strong> ${data.experience || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Cover Letter:</strong> ${data.message || 'No message provided'}</p>
        ${data.resumeFile ? `<p><strong>Resume:</strong> Attached as file</p>` : `<p><strong>Resume Text:</strong> ${data.resume || 'Not provided'}</p>`}
      `
      break
    
    case "newsletter":
      formattedData = `
        <p><strong>Email:</strong> ${data.email}</p>
        <p>User has subscribed to the newsletter.</p>
      `
      break
      
    case "demo-request":
      formattedData = `
        <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Product Interest:</strong> ${data.product || 'Not specified'}</p>
        <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
      `
      break
      
    case "chat":
      formattedData = `
        <p><strong>Message:</strong> ${data.message}</p>
        <p><strong>Current Page:</strong> ${data.currentPage || 'Unknown'}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
      break
    
    default:
      // Generic form data formatting
      formattedData = Object.keys(data)
        .filter(key => !['formType', 'sendConfirmation'].includes(key))
        .map(key => `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${data[key]}</p>`)
        .join('')
  }
  
  return formattedData
}

function getConfirmationSubject(formType: string): string {
  switch (formType) {
    case "contact": 
      return "Thank you for contacting Atlas Technosoft"
    case "consultation": 
      return "Your Consultation Request Has Been Received"
    case "job-application": 
      return "We've Received Your Job Application"
    case "newsletter": 
      return "Welcome to Atlas Technosoft Newsletter"
    case "demo-request": 
      return "Your Demo Request Has Been Received"
    case "chat":
      return "Thanks for chatting with Atlas Technosoft"
    default: 
      return "Thank you for your submission"
  }
}

function getConfirmationEmail(data: FormData, formType: string): string {
  const userName = data.name ? data.name.split(' ')[0] : 'there'
  
  // Common email template header and footer
  const emailHeader = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://atlastechnosoft.com/img/atlas-technosoft-logo.png" alt="Atlas Technosoft Logo" style="max-width: 200px; height: auto;" />
      </div>
  `;
  
  const emailFooter = `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
        <p>This is an automated message. Please do not reply directly to this email.</p>
        <p>If you need immediate assistance, please contact us at +91-22-2240-1925 or email us at <a href="mailto:info@atlastechnosoft.com">info@atlastechnosoft.com</a>.</p>
        <div style="margin-top: 20px;">
          <p>Atlas Technosoft | <a href="https://atlastechnosoft.com">https://atlastechnosoft.com</a></p>
          <p>© ${new Date().getFullYear()} Atlas Technosoft. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;
  
  let emailContent = '';
  
  switch (formType) {
    case "contact":
      emailContent = `
        <h2 style="color: #143d59; margin-bottom: 20px;">Thank You for Contacting Atlas Technosoft</h2>
        <p>Hello ${userName},</p>
        <p>Thank you for reaching out to us. We have received your message and appreciate your interest in Atlas Technosoft.</p>
        <p>Our team is reviewing your inquiry and will get back to you within 1-2 business days.</p>
        <p>For urgent matters, please call us at <strong>+91-22-2240-1925</strong>.</p>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-left: 4px solid #143d59;">
          <p style="margin: 0; font-style: italic;">Reference: Your inquiry has been assigned a tracking number and our team has been notified.</p>
        </div>
        <p>Best regards,<br>The Atlas Technosoft Team</p>
      `;
      break;
    
    case "consultation":
      emailContent = `
        <h2 style="color: #143d59; margin-bottom: 20px;">Your Consultation Request Has Been Received</h2>
        <p>Hello ${userName},</p>
        <p>Thank you for your interest in our consultation services. We have received your request and are excited to discuss how we can help you achieve your business goals.</p>
        <p>Here's what happens next:</p>
        <ol style="padding-left: 20px; line-height: 1.6;">
          <li>Our team will review your requirements within the next 24 hours</li>
          <li>A consultant specializing in your area of interest will be assigned</li>
          <li>You'll receive a call or email to schedule your consultation session</li>
        </ol>
        <p>If you have any immediate questions or wish to provide additional information, please reply to this email or call us at <strong>+91-22-2240-1925</strong>.</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="https://atlastechnosoft.com/resources" style="background-color: #143d59; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Explore Our Resources</a>
        </div>
        <p>We look forward to our conversation.</p>
        <p>Best regards,<br>The Atlas Technosoft Consulting Team</p>
      `;
      break;
      
    case "job-application":
      emailContent = `
        <h2 style="color: #143d59; margin-bottom: 20px;">Your Application Has Been Received</h2>
        <p>Hello ${userName},</p>
        <p>Thank you for applying to Atlas Technosoft. We have received your application for the ${data.jobTitle || data.position || 'position'} and appreciate your interest in joining our team.</p>
        <p>What to expect next:</p>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li>Our HR team will review your application within 5-7 business days</li>
          <li>If your qualifications match our requirements, we'll contact you to schedule an interview</li>
          <li>If we don't have a suitable position at this time, we'll keep your resume in our database for future opportunities</li>
        </ul>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-left: 4px solid #143d59;">
          <p style="margin: 0; font-style: italic;">Due to the high volume of applications, we may not be able to respond to all candidates individually. If you don't hear from us within two weeks, please feel free to apply for other positions that match your skills.</p>
        </div>
        <p>We wish you the best in your job search.</p>
        <p>Best regards,<br>HR Team, Atlas Technosoft</p>
      `;
      break;
      
    case "newsletter":
      emailContent = `
        <h2 style="color: #143d59; margin-bottom: 20px;">Welcome to the Atlas Technosoft Newsletter!</h2>
        <p>Hello ${userName},</p>
        <p>Thank you for subscribing to our newsletter. We're excited to have you join our community!</p>
        <p>You'll now receive regular updates on:</p>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li>Latest innovations in SAP and ERP solutions</li>
          <li>Automation and digital transformation insights</li>
          <li>Industry trends and best practices</li>
          <li>Exclusive offers and events</li>
        </ul>
        <div style="text-align: center; margin: 25px 0;">
          <a href="https://atlastechnosoft.com/blog" style="background-color: #143d59; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Read Our Latest Articles</a>
        </div>
        <p>We're committed to providing valuable content and keeping your inbox clutter-free. You can expect to hear from us approximately once per month.</p>
        <p>Best regards,<br>The Atlas Technosoft Team</p>
      `;
      break;
    
    case "demo-request":
      emailContent = `
        <h2 style="color: #143d59; margin-bottom: 20px;">Your Demo Request Has Been Received</h2>
        <p>Hello ${userName},</p>
        <p>Thank you for your interest in experiencing our solutions firsthand. We have received your demo request for ${data.product || 'our products'}.</p>
        <p>Here's what happens next:</p>
        <ol style="padding-left: 20px; line-height: 1.6;">
          <li>Our team will prepare a personalized demonstration based on your specific requirements</li>
          <li>A product specialist will contact you within 24-48 hours to schedule a convenient time</li>
          <li>You'll receive a calendar invitation with connection details for the demo session</li>
        </ol>
        <p>In the meantime, you might find these resources helpful:</p>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li><a href="https://atlastechnosoft.com/resources/product-brochures">Product Brochures</a></li>
          <li><a href="https://atlastechnosoft.com/blog">Solution Guides</a></li>
          <li><a href="https://atlastechnosoft.com/case-studies">Customer Success Stories</a></li>
        </ul>
        <p>We look forward to showing you how our solutions can benefit your business.</p>
        <p>Best regards,<br>The Atlas Technosoft Team</p>
      `;
      break;
    
    case "chat":
      emailContent = `
        <h2 style="color: #143d59; margin-bottom: 20px;">Thank You for Your Message</h2>
        <p>Hello ${userName},</p>
        <p>Thank you for reaching out through our chat system. We have received your message and a member of our team will respond promptly.</p>
        <p>If your inquiry is urgent, please feel free to call us directly at <strong>+91-22-2240-1925</strong>.</p>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-left: 4px solid #143d59;">
          <p style="margin: 0; font-style: italic;">Our business hours are Monday to Friday, 9:00 AM to 6:00 PM IST.</p>
        </div>
        <p>Best regards,<br>The Atlas Technosoft Support Team</p>
      `;
      break;
      
    default:
      emailContent = `
        <h2 style="color: #143d59; margin-bottom: 20px;">Thank You for Your Submission</h2>
        <p>Hello ${userName},</p>
        <p>We have received your submission and will process it promptly.</p>
        <p>If we need any additional information, we'll reach out to you directly.</p>
        <p>Thank you for your interest in Atlas Technosoft.</p>
        <p>Best regards,<br>The Atlas Technosoft Team</p>
      `;
  }
  
  return emailHeader + emailContent + emailFooter;
}

// Generate an appropriate response for chat messages
function generateChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
    return "Our pricing depends on your specific business needs. I&apos;d be happy to connect you with our sales team for a personalized quote. Would you like me to arrange a call?"
  }

  if (lowerMessage.includes("demo") || lowerMessage.includes("trial") || lowerMessage.includes("try")) {
    return "We offer personalized demos of our solutions. Please provide your email address and our team will reach out to schedule one that fits your requirements."
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("support") || lowerMessage.includes("help")) {
    return "You can reach our support team at info@atlastechnosoft.com or call us at +91-22-2240-1925. Would you like me to arrange a callback instead?"
  }

  if (lowerMessage.includes("sap") || lowerMessage.includes("business one") || lowerMessage.includes("erp")) {
    return "SAP Business One is our comprehensive ERP solution designed for small and medium-sized businesses. It helps streamline operations, gain better business insights, and accelerate profitable growth. Would you like to learn more about specific features?"
  }

  if (lowerMessage.includes("automation") || lowerMessage.includes("ai") || lowerMessage.includes("rpa")) {
    return "Our automation solutions leverage AI and RPA technologies to streamline workflows, reduce manual tasks, and boost productivity. We can help automate various business processes including finance, HR, customer service, and more. What specific processes are you looking to automate?"
  }

  return "Thank you for your message. Our team will review it and provide a detailed response soon. Is there anything specific you&apos;d like to know in the meantime?"
}

// Send a log of the chat conversation to the company email for follow-up
async function sendChatLog(data: FormData) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"Chat Widget" <noreply@atlastechnosoft.com>`,
      to: "info@atlastechnosoft.com",
      subject: `New Chat Conversation`,
      html: `
        <h1>New Chat Message from Website</h1>
        <p><strong>Message:</strong> ${data.message}</p>
        <p><strong>Current Page:</strong> ${data.currentPage || 'Unknown'}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Contact Details:</strong> ${data.email || 'No email provided'}</p>
        <p>This conversation may require follow-up from the sales or support team.</p>
      `,
    })
    return true
  } catch (error) {
    console.error("Failed to send chat log:", error)
    return false
  }
} 