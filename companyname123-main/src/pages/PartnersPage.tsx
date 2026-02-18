import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Handshake, Users, Globe, Award, ArrowRight, Shield, Zap, Target } from 'lucide-react';
import PartnersSection from '../components/PartnersSection';
import PartnerLogos from '../components/PartnerLogos';
import Footer from '../components/Footer';

function PartnersPage() {
  const partnerTypes = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Technology Partners",
      description: "Leading technology providers who complement our solutions.",
      benefits: [
        "Access to cutting-edge technology",
        "Integrated solutions",
        "Technical expertise"
      ]
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Solution Partners",
      description: "System integrators and solution providers who implement our technology.",
      benefits: [
        "Comprehensive support",
        "Training programs",
        "Marketing resources"
      ]
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Strategic Partners",
      description: "Long-term partnerships focused on innovation and market expansion.",
      benefits: [
        "Joint development",
        "Market access",
        "Revenue sharing"
      ]
    }
  ];

  const stats = [
    { icon: <Handshake className="w-6 h-6" />, value: "200+", label: "Active Partners" },
    { icon: <Users className="w-6 h-6" />, value: "5000+", label: "Certified Professionals" },
    { icon: <Globe className="w-6 h-6" />, value: "50+", label: "Countries" },
    { icon: <Award className="w-6 h-6" />, value: "25+", label: "Industry Awards" }
  ];

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [/* dependencies that indicate a route change */]);

  return (
    <div className="relative">
      <Helmet>
        <title>Our Partners - Hajz Telecommunication Co Ltd. | Global Partnership Program</title>
        <meta name="description" content="Join Hajz Telecommunication Co Ltd.'s partner ecosystem and help shape the future of telecommunications. Discover partnership opportunities and benefits." />
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
              Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">With Us</span>
            </h1>
            <p className="text-white/80" style={{ 
              fontSize: 'clamp(1rem, 1.75vh, 1.125rem)',
              marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
              lineHeight: '1.5'
            }}>
              Join our global ecosystem of partners and help shape the future of telecommunications.
            </p>

            {/* CTA Section */}
          {/* <div className="py-16 md:py-24 relative bg-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Become a Partner</h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                  Join our partner ecosystem and help shape the future of telecommunications.
                </p>
                <button className="btn-primary inline-flex items-center group">
                  <span><a href="/solutions" className="button">Apply Now</a></span>
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            </div>
          </div> */}

            {/* Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <div className="text-[#005E96] mb-4 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>
          
          {/* Key Partners Section */}
          <div style={{ marginTop: 'clamp(1rem, 2vh, 1.5rem)' }}>
            <PartnerLogos />
          </div>
        </div>
      </section>

     

      {/* Partnership Types */}
      {/* <section className="py-16 md:py-24 relative bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Partnership Programs</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Choose the partnership type that best aligns with your business goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-[#005E96] mb-6">{type.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                <p className="text-white/80 mb-6">{type.description}</p>
                
                <div className="space-y-3">
                  <h4 className="text-white font-semibold mb-2">Key Benefits:</h4>
                  {type.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center text-white/70">
                      <ArrowRight size={16} className="mr-2 text-[#A6CE39]" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <button className="mt-8 btn-primary w-full flex items-center justify-center group">
                  <span>Learn More</span>
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Partners Showcase */}
      {/* <section className="py-16 md:py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Partners</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Meet the innovative companies who partner with us to deliver excellence.
          </p>
        </motion.div>
        <PartnersSection />
      </section> */}


      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PartnersPage;