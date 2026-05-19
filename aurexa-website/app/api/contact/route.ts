import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, message } = body;

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Determine recipient based on query type
    const recipients: Record<string, string> = {
      Sales: process.env.SALES_EMAIL || "contact@aurexatech.com",
      Support: process.env.SUPPORT_EMAIL || "support@aurexatech.com",
      Careers: process.env.CAREERS_EMAIL || "careers@aurexatech.com",
      Partnership: process.env.PARTNERSHIP_EMAIL || "contact@aurexatech.com",
    };

    const toEmail = recipients[type] || "contact@aurexatech.com";

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Aurexa Website" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `[${type}] New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Query Type: ${type}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Query Type:</strong> ${type}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Generate reference number
    const reference = "ARX-" + Math.random().toString(36).slice(2, 8).toUpperCase();

    return NextResponse.json({ success: true, reference });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
