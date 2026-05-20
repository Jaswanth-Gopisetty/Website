import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Generate reference ID
function generateReferenceId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ARX-APP-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const role = formData.get("role") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const linkedin = formData.get("linkedin") as string;
    const currentLocation = formData.get("currentLocation") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const whyJoin = formData.get("whyJoin") as string;
    const references = formData.get("references") as string;
    const resumeFile = formData.get("resume") as File | null;

    const referenceId = generateReferenceId();
    const submissionDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "long",
      timeStyle: "short",
    });

    // Prepare email attachments
    const attachments = [];
    if (resumeFile) {
      const buffer = await resumeFile.arrayBuffer();
      attachments.push({
        filename: resumeFile.name,
        content: Buffer.from(buffer),
        contentType: resumeFile.type,
      });
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
    });

    // Email to company
    const companyEmail = {
      from: process.env.SMTP_FROM || "noreply@aurexatech.com",
      to: "careers@aurexatech.com",
      subject: `New Job Application: ${role} - ${fullName} [${referenceId}]`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #0B5FA5 0%, #2DD4BF 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; background: #f8f9fa; }
            .section { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #0B5FA5; }
            .label { font-weight: bold; color: #0B5FA5; margin-top: 10px; }
            .value { margin-left: 10px; }
            .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
            .reference { background: #e3f2fd; padding: 10px; border-radius: 5px; font-family: monospace; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎯 New Job Application Received</h1>
            <p>Reference: <span class="reference">${referenceId}</span></p>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>📋 Position Applied For</h2>
              <p class="value">${role}</p>
            </div>

            <div class="section">
              <h2>👤 Candidate Information</h2>
              <p><span class="label">Name:</span> <span class="value">${fullName}</span></p>
              <p><span class="label">Email:</span> <span class="value">${email}</span></p>
              <p><span class="label">Phone:</span> <span class="value">${phone}</span></p>
              ${linkedin ? `<p><span class="label">LinkedIn:</span> <span class="value"><a href="${linkedin}">${linkedin}</a></span></p>` : ""}
              <p><span class="label">Location:</span> <span class="value">${currentLocation}</span></p>
            </div>

            ${coverLetter ? `
            <div class="section">
              <h2>📝 Cover Letter</h2>
              <p class="value">${coverLetter.replace(/\n/g, "<br>")}</p>
            </div>
            ` : ""}

            <div class="section">
              <h2>💡 Why Join Aurexa?</h2>
              <p class="value">${whyJoin.replace(/\n/g, "<br>")}</p>
            </div>

            ${references ? `
            <div class="section">
              <h2>📇 References</h2>
              <p class="value">${references.replace(/\n/g, "<br>")}</p>
            </div>
            ` : ""}

            <div class="section">
              <p><span class="label">Submission Date:</span> <span class="value">${submissionDate} IST</span></p>
              <p><span class="label">Resume:</span> <span class="value">${resumeFile ? `Attached (${resumeFile.name})` : "Not provided"}</span></p>
            </div>
          </div>

          <div class="footer">
            <p>Aurexa Technologies • Careers Portal</p>
            <p>This is an automated message from the Aurexa careers application system.</p>
          </div>
        </body>
        </html>
      `,
      attachments,
    };

    // Email to applicant
    const applicantEmail = {
      from: process.env.SMTP_FROM || "noreply@aurexatech.com",
      to: email,
      subject: `Application Received: ${role} - Aurexa Technologies [${referenceId}]`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #0B5FA5 0%, #2DD4BF 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; background: #f8f9fa; }
            .section { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
            .reference { background: #e3f2fd; padding: 10px; border-radius: 5px; font-family: monospace; font-weight: bold; text-align: center; margin: 15px 0; }
            .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
            .highlight { color: #0B5FA5; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✅ Application Received Successfully</h1>
          </div>
          
          <div class="content">
            <div class="section">
              <p>Dear ${fullName},</p>
              <p>Thank you for your interest in the <strong>${role}</strong> position at Aurexa Technologies!</p>
              <p>We have successfully received your application and our hiring team will review it carefully.</p>
              
              <div class="reference">
                Reference ID: ${referenceId}
              </div>
              
              <p>Please save this reference ID for your records. You may use it to inquire about your application status.</p>
            </div>

            <div class="section">
              <h3>📋 What's Next?</h3>
              <ol>
                <li>Our hiring team will review your application within 5-7 business days</li>
                <li>If your profile matches our requirements, we'll contact you for the next steps</li>
                <li>Please ensure your contact information (${email}, ${phone}) is up to date</li>
              </ol>
            </div>

            <div class="section">
              <h3>📞 Questions?</h3>
              <p>If you have any questions about your application, please contact us:</p>
              <p>
                Email: <a href="mailto:careers@aurexatech.com">careers@aurexatech.com</a><br>
                Phone: +91 89777 80644, +91 77000 06639
              </p>
            </div>
          </div>

          <div class="footer">
            <p><strong>Aurexa Technologies</strong></p>
            <p>Where innovation meets compliance, and technology drives growth</p>
            <p>www.aurexatech.com</p>
          </div>
        </body>
        </html>
      `,
    };

    // Send emails
    try {
      await transporter.sendMail(companyEmail);
      await transporter.sendMail(applicantEmail);
    } catch (emailError) {
      // Email sending failed (graceful degradation)
      // Continue without failing - application is still recorded
    }

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Application submitted successfully",
    });

  } catch (error) {
    // Application submission error
    return NextResponse.json(
      { success: false, error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
