// This would be in your backend API file (e.g., server.js or api/index.js)

import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend("re_e9SLW4J4_46N5mRcNiKbMs56GiNLs8B4f");


// Example Express.js route handler
export async function sendEmailHandler(req, res) {
  const { to, subject, message } = req.body;
  console.log('Hello from the server!');

  // Validate inputs
  if (!to || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }
  
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev', // Use your verified domain or default
      to,
      subject,
      html: message,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }

    return res.status(200).json({ 
      success: true, 
      id: data.id 
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}

// If using Express, you'd set up the route like this:
// app.post('/api/send-email', sendEmailHandler);

// If using Next.js API routes:
// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     return sendEmailHandler(req, res);
//   }
//   return res.status(405).json({ message: 'Method not allowed' });
// }