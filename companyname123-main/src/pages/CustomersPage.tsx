import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Building2, Globe, Award, Users, ArrowRight, Star, CheckCircle, TrendingUp } from 'lucide-react';
import Footer from '../components/Footer';
import KeyCustomersBanner from '../components/KeyCustomersBanner';

function CustomersPage() {
  const customers = [
    {
      name: "Global Tech Industries",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&h=300&q=80",
      description: "Implementing 5G infrastructure across 12 countries",
      testimonial: "Hajz Telecommunication Co Ltd. has been instrumental in our digital transformation journey.",
      results: [
        "40% reduction in network latency",
        "99.99% uptime achieved",
        "Seamless IoT integration"
      ]
    },
    {
      name: "Smart City Solutions",
      logo: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=300&h=300&q=80",
      description: "IoT network deployment for smart city initiatives",
      testimonial: "Their expertise in IoT networks has helped us create smarter, more connected cities.",
      results: [
        "Connected 50,000+ devices",
        "30% energy savings",
        "Real-time data analytics"
      ]
    },
    {
      name: "Enterprise Systems",
      logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=300&h=300&q=80",
      description: "Cloud infrastructure and security solutions",
      testimonial: "Reliable, secure, and scalable solutions that grow with our business.",
      results: [
        "Zero security breaches",
        "45% cost reduction",
        "100% compliance maintained"
      ]
    },
    {
      name: "Future Networks",
      logo: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=300&h=300&q=80",
      description: "Advanced telecommunications infrastructure",
      testimonial: "A partner that truly understands the future of connectivity.",
      results: [
        "10x network capacity",
        "Global coverage achieved",
        "24/7 technical support"
      ]
    }
  ];

  const stats = [
    { icon: <Building2 className="w-6 h-6" />, value: "500+", label: "Enterprise Clients" },
    { icon: <Globe className="w-6 h-6" />, value: "50+", label: "Countries Served" },
    { icon: <Award className="w-6 h-6" />, value: "98%", label: "Client Satisfaction" },
    { icon: <Users className="w-6 h-6" />, value: "1M+", label: "End Users" }
  ];

  const successMetrics = [
    {
      icon: <Star className="w-12 h-12" />,
      title: "Customer Success",
      description: "Our customers achieve their business objectives faster with our solutions.",
      metric: "95% success rate"
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "Implementation",
      description: "Smooth and efficient implementation of complex telecommunications projects.",
      metric: "On-time delivery"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "ROI",
      description: "Significant return on investment through optimized infrastructure.",
      metric: "3x average ROI"
    }
  ];

  const keyCustomers = [
    { name: "STC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/STC-01.svg/2560px-STC-01.svg.png" },
    { name: "BT", logo: "https://static.cdnlogo.com/logos/b/58/bt-3.svg" },
    { name: "Ericsson", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ericsson_%282018%29.svg/1200px-Ericsson_%282018%29.svg.png" },
    { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/2048px-HP_logo_2012.svg.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/440px-Microsoft_logo_%282012%29.svg.png" },
    { name: "Nokia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nokia_wordmark.svg/440px-Nokia_wordmark.svg.png" },
    { name: "Citibank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Citi.svg/440px-Citi.svg.png" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/440px-IBM_logo.svg.png" },
    { name: "Goldman Sachs", logo: "https://cdn.worldvectorlogo.com/logos/goldman-sachs-2.svg" },
    { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/440px-Oracle_logo.svg.png" },
    { name: "Xerox", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Xerox_logo.svg/2560px-Xerox_logo.svg.png" },
    { name: "JP Morgan", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/J_P_Morgan_Logo_2008_1.svg/440px-J_P_Morgan_Logo_2008_1.svg.png" }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [/* dependencies that indicate a route change */]);

  return (
    <div className="relative">
      <Helmet>
        <title>Our Customers - Hajz Telecommunication Co Ltd. | Success Stories & Case Studies</title>
        <meta name="description" content="Discover how Hajz Telecommunication Co Ltd. helps enterprises achieve digital transformation through innovative telecommunications solutions. Read our customer success stories." />
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
          paddingTop: 'clamp(6rem, 12vh, 8rem)',
          paddingBottom: 'clamp(2rem, 4vh, 3rem)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
            style={{ marginBottom: 'clamp(1.5rem, 3vh, 2rem)' }}
          >
            <h1 className="font-bold text-white" style={{ 
              fontSize: 'clamp(2rem, 4vh, 3rem)',
              marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)',
              lineHeight: '1.2'
            }}>
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">Success Stories</span>
            </h1>
            <p className="text-white/80" style={{ 
              fontSize: 'clamp(1rem, 1.75vh, 1.125rem)',
              marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
              lineHeight: '1.5'
            }}>
              Discover how leading organizations are transforming their operations with our innovative solutions.
            </p>
          </motion.div>
          
          {/* CTA Section */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-xl" style={{ 
            padding: 'clamp(1.25rem, 2.5vh, 1.75rem)',
            marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
            borderRadius: 'clamp(0.75rem, 1.5vh, 1rem)'
          }}>
            <div className="container mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="font-bold text-white" style={{ 
                  fontSize: 'clamp(1.25rem, 2.5vh, 1.875rem)',
                  marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
                }}>Ready to Transform Your Business?</h2>
                <p className="text-white/80 mx-auto" style={{ 
                  fontSize: 'clamp(0.875rem, 1.5vh, 1rem)',
                  marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)',
                  lineHeight: '1.5',
                  maxWidth: '42rem'
                }}>
                  Join our growing list of satisfied customers and experience the HTC difference.
                </p>
                <button className="btn-primary inline-flex items-center group" style={{
                  padding: 'clamp(0.5rem, 1vh, 0.625rem) clamp(1rem, 2vw, 1.25rem)',
                  fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)'
                }}>
                  <span><a href="/contact" className="button">Get Started</a></span>
                  <ArrowRight style={{ 
                    width: 'clamp(14px, 1.5vh, 16px)', 
                    height: 'clamp(14px, 1.5vh, 16px)',
                    marginLeft: 'clamp(0.375rem, 0.75vw, 0.5rem)'
                  }} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            </div>
          </div>
          
          {/* Key Customers Banner */}
          <div style={{ marginTop: 'clamp(1rem, 2vh, 1.5rem)' }}>
            <KeyCustomersBanner keyCustomers={keyCustomers} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CustomersPage;