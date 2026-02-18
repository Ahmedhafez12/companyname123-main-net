// src/page/Contact.tsx

import React from 'react';
import ResendEmailForm  from '../components/ResendEmailForm/index';

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Use the form below to send us an email:</p>
      
      <ResendEmailForm />
      
      <div className="contact-info">
        <h2>Other Ways to Reach Us</h2>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Main Street, Anytown, USA</p>
      </div>
    </div>
  );
};

export default Contact;