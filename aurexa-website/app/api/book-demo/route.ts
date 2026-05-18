import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, org, industry, customIndustry, date, window, note, region, reference } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const displayIndustry = industry === "Other" ? customIndustry : industry;

    // Email to customer
    const customerMailOptions = {
      from: `"Aurexa Technologies" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Demo Booking Confirmation - Aurexa Technologies",
      text: `Dear ${name},

Thank you for booking a demo with Aurexa Technologies!

Your Demo Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Organization: ${org}
Industry: ${displayIndustry}
Date: ${date}
Time Window: ${window}
Region: ${region}
Reference: ${reference}
${note ? `\nNote: ${note}` : ""}

What's Next?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• A calendar invite will be sent shortly
• Our team will confirm your booking within 1 business day
• We'll prepare a sandbox demo tailored to your industry and compliance needs

If you need to reschedule or have any questions, please contact us at contact@aurexatech.com

Best regards,
The Aurexa Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aurexa Technologies
Building compliant, intelligent systems for regulated industries
https://www.aurexatech.com`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0B5FA5 0%, #063A66 100%); color: white; padding: 30px 20px; border-radius: 12px 12px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
    .content { background: white; padding: 30px 20px; border: 1px solid #e2e8f0; border-top: none; }
    .greeting { font-size: 16px; margin-bottom: 20px; }
    .details-box { background: #f1f5f9; border-left: 4px solid #0B5FA5; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .detail-row { margin: 8px 0; }
    .detail-label { font-weight: 600; color: #475569; display: inline-block; width: 130px; }
    .detail-value { color: #1e293b; }
    .next-steps { background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .next-steps h3 { margin-top: 0; color: #065f46; font-size: 16px; }
    .next-steps ul { margin: 0; padding-left: 20px; color: #047857; }
    .next-steps li { margin: 8px 0; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none; }
    .footer a { color: #0B5FA5; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Demo Booking Confirmed</h1>
    </div>
    <div class="content">
      <div class="greeting">
        <strong>Dear ${name},</strong>
      </div>
      <p>Thank you for booking a demo with Aurexa Technologies!</p>
      
      <div class="details-box">
        <h3 style="margin-top: 0; color: #0B5FA5; font-size: 16px;">Your Demo Details</h3>
        <div class="detail-row">
          <span class="detail-label">Organization:</span>
          <span class="detail-value">${org}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Industry:</span>
          <span class="detail-value">${displayIndustry}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time Window:</span>
          <span class="detail-value">${window}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Region:</span>
          <span class="detail-value">${region}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Reference:</span>
          <span class="detail-value"><strong>${reference}</strong></span>
        </div>
        ${note ? `
        <div class="detail-row" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #cbd5e1;">
          <span class="detail-label">Note:</span>
          <span class="detail-value">${note}</span>
        </div>
        ` : ""}
      </div>
      
      <div class="next-steps">
        <h3>What's Next?</h3>
        <ul>
          <li>A calendar invite will be sent shortly</li>
          <li>Our team will confirm your booking within 1 business day</li>
          <li>We'll prepare a sandbox demo tailored to your industry and compliance needs</li>
        </ul>
      </div>
      
      <p>If you need to reschedule or have any questions, please contact us at <a href="mailto:contact@aurexatech.com">contact@aurexatech.com</a></p>
      
      <p style="margin-top: 30px;">
        <strong>Best regards,</strong><br>
        The Aurexa Team
      </p>
    </div>
    <div class="footer">
      <strong>Aurexa Technologies</strong><br>
      Building compliant, intelligent systems for regulated industries<br>
      <a href="https://www.aurexatech.com">www.aurexatech.com</a>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Email to sales team
    const salesMailOptions = {
      from: `"Aurexa Demo Request" <${process.env.SMTP_USER}>`,
      to: "demos@aurexatech.com",
      subject: `New Demo Booking - ${displayIndustry} [${reference}]`,
      text: `New demo booking received:

Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
Organization: ${org}
Industry: ${displayIndustry}

Demo Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Date: ${date}
Time Window: ${window}
Region: ${region}
${note ? `\nNote: ${note}` : ""}

Reference: ${reference}

Action Required:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Send calendar invite to ${email}
2. Prepare sandbox demo for ${displayIndustry}
3. Confirm booking within 1 business day`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; }
    .card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 16px; }
    .header { background: linear-gradient(135deg, #0B5FA5 0%, #063A66 100%); color: white; padding: 16px; border-radius: 8px; margin-bottom: 20px; }
    .header h2 { margin: 0; font-size: 18px; }
    .section { margin: 20px 0; }
    .section h3 { color: #0B5FA5; font-size: 14px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
    .info-row:last-child { border-bottom: none; }
    .info-label { font-weight: 600; width: 130px; color: #64748b; }
    .info-value { color: #1e293b; flex: 1; }
    .action-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; }
    .action-box h3 { margin-top: 0; color: #92400e; font-size: 14px; }
    .action-box ol { margin: 8px 0; padding-left: 20px; color: #78350f; }
    .reference { background: #0B5FA5; color: white; display: inline-block; padding: 8px 16px; border-radius: 6px; font-weight: 700; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <h2>🎯 New Demo Booking Received</h2>
      </div>
      
      <div class="section">
        <h3>Contact Information</h3>
        <div class="info-row">
          <div class="info-label">Name:</div>
          <div class="info-value"><strong>${name}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Email:</div>
          <div class="info-value"><a href="mailto:${email}">${email}</a></div>
        </div>
        <div class="info-row">
          <div class="info-label">Organization:</div>
          <div class="info-value">${org}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Industry:</div>
          <div class="info-value"><strong>${displayIndustry}</strong></div>
        </div>
      </div>
      
      <div class="section">
        <h3>Demo Details</h3>
        <div class="info-row">
          <div class="info-label">Date:</div>
          <div class="info-value">${date}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Time Window:</div>
          <div class="info-value">${window}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Region:</div>
          <div class="info-value">${region}</div>
        </div>
        ${note ? `
        <div class="info-row">
          <div class="info-label">Note:</div>
          <div class="info-value">${note}</div>
        </div>
        ` : ""}
      </div>
      
      <div style="text-align: center; margin: 24px 0;">
        <div style="color: #64748b; font-size: 12px; margin-bottom: 8px;">REFERENCE NUMBER</div>
        <div class="reference">${reference}</div>
      </div>
      
      <div class="action-box">
        <h3>⚡ Action Required</h3>
        <ol style="margin: 8px 0; padding-left: 20px;">
          <li>Send calendar invite to <strong>${email}</strong></li>
          <li>Prepare sandbox demo for <strong>${displayIndustry}</strong></li>
          <li>Confirm booking within 1 business day</li>
        </ol>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Send both emails
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(salesMailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Demo booking confirmed and emails sent",
      reference 
    });
  } catch (error) {
    console.error("Demo booking email error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to send booking confirmation. Please contact us directly at demos@aurexatech.com" 
      },
      { status: 500 }
    );
  }
}
