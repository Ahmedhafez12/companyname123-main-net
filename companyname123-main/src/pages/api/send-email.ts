// src/pages/api/send-email.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

// Initialize Resend with your API key
// You'll need to add this to your environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the email recipient - you'd typically set this in your env vars
const TO_EMAIL = process.env.TO_EMAIL || "your-email@example.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "contact@yourdomain.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate form data
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Email sent successfully",
      id: data?.id 
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}