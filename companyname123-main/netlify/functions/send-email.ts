import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.TO_EMAIL || "ahmedhafez943@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

export async function handler(event: { httpMethod: string; body: string | null }) {
  console.log(`[send-email] ${event.httpMethod} request received, RESEND_API_KEY=${process.env.RESEND_API_KEY ? "set" : "MISSING"}`);

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !subject || !message) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid email address" }) };
    }

    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #005E96; border-bottom: 2px solid #44C8F5; padding-bottom: 8px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #333; width: 100px;">Name:</td>
              <td style="padding: 8px 12px; color: #555;">${esc(name)}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px 12px; color: #555;">${esc(email)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Subject:</td>
              <td style="padding: 8px 12px; color: #555;">${esc(subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <strong style="color: #333;">Message:</strong>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${esc(message)}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[send-email] Resend API error:", JSON.stringify(error));
      return { statusCode: 500, headers, body: JSON.stringify({ error: error.message || "Failed to send email" }) };
    }

    console.log(`[send-email] ✓ Sent to ${TO_EMAIL} from ${FROM_EMAIL}, id=${data?.id}`);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: data?.id }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Internal server error" }) };
  }
}
