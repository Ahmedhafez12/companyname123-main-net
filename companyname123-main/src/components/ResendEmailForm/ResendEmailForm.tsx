import React, { useState } from 'react';
import './ResendEmailForm.css';

// Define our interfaces
interface EmailFormData {
  to: string;
  subject: string;
  message: string;
}

interface FormStatus {
  submitting: boolean;
  success: boolean;
  error: string | null;
}

interface ResendEmailFormProps {
  className?: string;
}

const ResendEmailForm: React.FC<ResendEmailFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<EmailFormData>({
    to: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    submitting: false,
    success: false,
    error: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      // Call the backend API endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email');
      }
      
      setStatus({
        submitting: false,
        success: true,
        error: null
      });
      
      // Reset form after successful submission
      setFormData({
        to: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 3000);
      
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  };

  return (
    <div className={`email-form-container ${className}`}>
      <h2>Send Email with Resend</h2>
      
      {status.success && (
        <div className="status-success">
          Email sent successfully!
        </div>
      )}
      
      {status.error && (
        <div className="status-error">
          Error: {status.error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="to">Recipient Email</label>
          <input
            type="email"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            required
            placeholder="recipient@example.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            placeholder="Email subject"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            placeholder="Your message here..."
          />
        </div>
        
        <button
          type="submit"
          className="form-button"
          disabled={status.submitting}
        >
          {status.submitting ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  );
};

export default ResendEmailForm;