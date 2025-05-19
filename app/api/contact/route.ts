import { NextResponse } from "next/server"
import * as Mail from "nodemailer/lib/mailer"
import * as nodemailer from "nodemailer"

// Ensure this email is always used for receiving form submissions
const companyEmail = 'info@atlastechnosoft.com'

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  const host = process.env.EMAIL_SERVER || 'mail.atlastechnosoft.com';
  const port = parseInt(process.env.EMAIL_PORT || '465');
  const secure = process.env.EMAIL_SECURE === 'true' || true;
  const user = process.env.EMAIL_USER || 'info@atlastechnosoft.com';
  const pass = process.env.EMAIL_PASSWORD || 'Shree_Atpl@@**6789';

  console.log('Creating email transporter with:', {
    host,
    port,
    secure,
    auth: {
      user,
      // Password masked for logging
      passLength: pass ? pass.length : 0
    }
  });
  
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

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
    console.log('Contact form submission received');
    let data: FormData;
    const contentType = request.headers.get('content-type') || ''

    // Handle multipart form data (for file uploads)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      
      // Convert formData to a regular object
      data = Object.fromEntries(formData.entries()) as FormData
      
      // Handle file upload if present
      const file = formData.get('resumeFile') as File
      if (file && file instanceof File) {
        const buffer = await file.arrayBuffer()
        data.resumeFile = {
          name: file.name,
          data: Buffer.from(buffer).toString('base64'),
          contentType: file.type
        };
      }
    } else {
      // Handle regular JSON data
      data = await request.json();
    }
    
    console.log('Form data received:', {
      name: data.name,
      email: data.email,
      formType: data.formType,
      hasMessage: Boolean(data.message)
    });
    
    // Validate required fields for regular form submissions
    if (!data.email || !data.name) {
      console.error('Validation error: Required fields are missing');
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      )
    }
    
    // Build email content based on form type
    const formType = data.formType || "contact"
    const formData = formatFormData(data, formType)
    
    // Prepare email options - always send to info@atlastechnosoft.com
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
    
    try {
      console.log('Sending email to company');
      const transporter = createTransporter();
      // Send email to company
      await transporter.sendMail(mailOptions);
      console.log('Email sent to company successfully');
      
      // Send confirmation email to user if requested
      if (data.email) {
        console.log('Sending confirmation email to user');
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || `"Atlas Technosoft" <${companyEmail}>`,
          to: data.email,
          subject: getConfirmationSubject(formType),
          html: getConfirmationEmail(data, formType),
        });
        console.log('Confirmation email sent successfully');
      }
      
      return NextResponse.json({ success: true });
    } catch (emailError) {
      console.error("Email sending error details:", emailError);
      return NextResponse.json(
        { 
          error: "Failed to send email", 
          message: emailError instanceof Error ? emailError.message : String(emailError),
          config: {
            hasServer: Boolean(process.env.EMAIL_SERVER),
            hasUser: Boolean(process.env.EMAIL_USER),
            hasPassword: Boolean(process.env.EMAIL_PASSWORD)
          }
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request processing error:", error)
    return NextResponse.json(
      { error: "Failed to process the request", message: error instanceof Error ? error.message : String(error) },
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
  
  // Content based on form type
  switch (formType) {
    case "contact":
      emailContent = `
        <h2>Thank You for Reaching Out, ${userName}!</h2>
        <p>We've received your message and appreciate your interest in Atlas Technosoft.</p>
        <p>Our team will review your inquiry and get back to you as soon as possible, typically within 24 business hours.</p>
        <p>In the meantime, you might find these resources helpful:</p>
        <ul>
          <li><a href="https://atlastechnosoft.com/sap-solutions/business-one">SAP Business One Solutions</a></li>
          <li><a href="https://atlastechnosoft.com/automation-solutions/rpa-solutions">RPA & Automation Solutions</a></li>
          <li><a href="https://atlastechnosoft.com/services">Our Services</a></li>
        </ul>
      `;
      break;
    
    case "consultation":
      emailContent = `
        <h2>Thank You for Your Consultation Request, ${userName}!</h2>
        <p>We're excited about the opportunity to discuss how Atlas Technosoft can help your business succeed.</p>
        <p>One of our consultants will contact you within 24 business hours to schedule your personalized consultation.</p>
        <p>To make our discussion more productive, please consider:</p>
        <ul>
          <li>Your current business challenges</li>
          <li>Specific goals you're hoping to achieve</li>
          <li>Any timeline constraints you may have</li>
        </ul>
      `;
      break;
      
    case "job-application":
      emailContent = `
        <h2>Thank You for Your Application, ${userName}!</h2>
        <p>We've received your application and appreciate your interest in joining Atlas Technosoft.</p>
        <p>Our HR team will review your qualifications and will contact you if your profile matches our requirements.</p>
        <p>The selection process typically includes:</p>
        <ol>
          <li>Initial resume screening</li>
          <li>Technical assessment</li>
          <li>Interview rounds</li>
          <li>Final selection</li>
        </ol>
        <p>Please note that due to the high volume of applications, we may not be able to respond to all candidates individually. If you don't hear from us within two weeks, we encourage you to apply for other suitable positions in the future.</p>
      `;
      break;
      
    case "newsletter":
      emailContent = `
        <h2>Welcome to Our Newsletter, ${userName}!</h2>
        <p>Thank you for subscribing to the Atlas Technosoft newsletter.</p>
        <p>You'll now receive updates on:</p>
        <ul>
          <li>Industry trends and insights</li>
          <li>New product announcements</li>
          <li>Company updates and events</li>
          <li>Educational content and best practices</li>
        </ul>
        <p>We're committed to providing valuable content and won't spam your inbox. You can unsubscribe at any time using the link in our emails.</p>
      `;
      break;
    
    case "demo-request":
      emailContent = `
        <h2>Your Demo Request Has Been Received, ${userName}!</h2>
        <p>Thank you for your interest in experiencing our solutions firsthand.</p>
        <p>Our team will contact you within 24 business hours to schedule your personalized demo at a convenient time.</p>
        <p>To prepare for an effective demonstration:</p>
        <ul>
          <li>Consider which specific features you're most interested in seeing</li>
          <li>Prepare any questions you might have about implementation or functionality</li>
          <li>Invite any colleagues who might benefit from attending the demo</li>
        </ul>
      `;
      break;
      
    default:
      emailContent = `
        <h2>Thank You for Your Submission, ${userName}!</h2>
        <p>We've received your message and appreciate your interest in Atlas Technosoft.</p>
        <p>Our team will review your submission and get back to you as soon as possible.</p>
      `;
  }
  
  return `${emailHeader}${emailContent}${emailFooter}`;
} 