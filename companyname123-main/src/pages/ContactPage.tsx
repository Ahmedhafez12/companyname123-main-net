import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Envelope, Phone, MapPin, Globe, Clock, ChatCircle } from 'phosphor-react';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

function ContactPage() {
  const contactInfo = [
    {
      icon: <div className="p-1"><Phone weight="thin" size={20} /></div>,
      title: "Call Us",
      details: [
        "+1 (555) 123-4567",
        "+1 (555) 987-6543"
      ]
    },
    {
      icon: <div className="p-1"><Envelope weight="thin" size={20} /></div>,
      title: "Email Us",
      details: [
        "contact@hajztelecom.com",
        "support@hajztelecom.com"
      ]
    },
    {
      icon: <div className="p-1"><MapPin weight="thin" size={20} /></div>,
      title: "Visit Us",
      details: [
        "123 Tech Street",
        "Innovation City, ST 12345"
      ]
    }
  ];

  const officeLocations = [
    {
      city: "New York",
      country: "United States",
      address: "123 Tech Street, NY 10001",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "London",
      country: "United Kingdom",
      address: "456 Innovation Ave, EC1A 1BB",
      phone: "+44 20 7123 4567"
    },
    {
      city: "Singapore",
      country: "Singapore",
      address: "789 Digital Road, 018956",
      phone: "+65 6789 0123"
    }
  ];

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [/* dependencies that indicate a route change */]);


  return (
    <div className="relative">
      <Helmet>
        <title>Contact Us - Hajz Telecommunication Co Ltd. | Get in Touch</title>
        <meta name="description" content="Contact Hajz Telecommunication Co Ltd. for innovative telecommunications solutions. Our expert team is ready to help transform your infrastructure." />
      </Helmet>

      {/* Background gradient */}
      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />
      
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden scroll-mt-20"
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(5rem, 10vh, 6rem)',
          paddingBottom: 'clamp(2rem, 4vh, 4rem)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 xl:px-8 w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
            style={{ marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)' }}
          >
            {/* <h1 className="font-bold text-white" style={{ 
              fontSize: 'clamp(1.5rem, 3vh, 2.25rem)',
              marginBottom: 'clamp(0.375rem, 0.75vh, 0.5rem)',
              lineHeight: '1.2'
            }}>
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Touch</span>
            </h1>
            <p className="text-white/80" style={{ 
              fontSize: 'clamp(0.75rem, 1.25vh, 0.9375rem)',
              marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)',
              lineHeight: '1.4'
            }}>
              Let's discuss how we can help transform your telecommunications infrastructure.
            </p> */}
          </motion.div>
          
          {/* Contact Section */}
          <div className="w-full">
            <ContactSection size="large" />
          </div>

        </div>
      </section>

      {/* Global Offices */}
      {/* <section className="py-16 md:py-24 relative bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Global Offices</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Find us in major technology hubs around the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{office.city}</h3>
                <p className="text-cta mb-4">{office.country}</p>
                <div className="space-y-3 text-white/70">
                  <p className="flex items-center">
                    <div className="p-0.5 mr-2"><MapPin weight="thin" size={20} className="text-cta" /></div>
                    {office.address}
                  </p>
                  <p className="flex items-center">
                    <div className="p-0.5 mr-2"><Phone weight="thin" size={20} className="text-cta" /></div>
                    {office.phone}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Additional Contact Info */}
      {/* <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="p-1 mb-4"><Globe weight="thin" size={20} className="text-cta" /></div>
              <h3 className="text-lg font-semibold text-white mb-2">Global Support</h3>
              <p className="text-white/70">
                24/7 technical support available worldwide in multiple languages.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="p-1 mb-4"><Clock weight="thin" size={20} className="text-cta" /></div>
              <h3 className="text-lg font-semibold text-white mb-2">Business Hours</h3>
              <p className="text-white/70">
                Monday - Friday: 9:00 AM - 6:00 PM (Local Time)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="p-1 mb-4"><ChatCircle weight="thin" size={20} className="text-cta" /></div>
              <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
              <p className="text-white/70">
                Connect with our team instantly through our live chat support.
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ContactPage;

