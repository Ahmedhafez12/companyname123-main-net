import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Handshake, Users, Globe, Trophy, ArrowRight, Shield, Lightning, Target } from 'phosphor-react';
import PartnersSection from '../components/PartnersSection';
import KeyCustomersBanner from '../components/KeyCustomersBanner';
import Footer from '../components/Footer';

function PartnersPage() {
  const partnerTypes = [
    {
      icon: <div className="p-2"><Shield weight="thin" size={20} /></div>,
      title: "Technology Partners",
      description: "Leading technology providers who complement our solutions.",
      benefits: [
        "Access to cutting-edge technology",
        "Integrated solutions",
        "Technical expertise"
      ]
    },
    {
      icon: <div className="p-2"><Lightning weight="thin" size={20} /></div>,
      title: "Solution Partners",
      description: "System integrators and solution providers who implement our technology.",
      benefits: [
        "Comprehensive support",
        "Training programs",
        "Marketing resources"
      ]
    },
    {
      icon: <div className="p-2"><Target weight="thin" size={20} /></div>,
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
    { icon: <div className="p-1"><Handshake weight="thin" size={20} /></div>, value: "200+", label: "Active Partners" },
    { icon: <div className="p-1"><Users weight="thin" size={20} /></div>, value: "5000+", label: "Certified Professionals" },
    { icon: <div className="p-1"><Globe weight="thin" size={20} /></div>, value: "50+", label: "Countries" },
    { icon: <div className="p-1"><Trophy weight="thin" size={20} /></div>, value: "25+", label: "Industry Awards" }
  ];

  const keyPartners = [
    { name: "FORA", logo: "https://cdn.shopify.com/s/files/1/0510/8655/7362/files/FORA_Logo_e69f5314-5a32-440e-9f1b-a3d2f9676bb1.png", url: "https://foracare.com/" },
    { name: "Cambium Networks", logo: "/assets/Cambium-Networks-Logo.png", url: "https://www.cambiumnetworks.com/" },
    { name: "Patton", logo: "https://tritech.co.il/wp-content/uploads/2018/04/formation-patton-1.png", url: "https://www.patton.com/" },
    { name: "Ip Tech", logo: "https://iptechlabs.com/wp-content/uploads/BrandingGraphicsLogos/IPTL_Logo_Transparent_PNG.png", url: "https://iptechlabs.com/" },
    { name: "M5 Technologies", logo: "https://documentation.media5corp.com/download/attachments/524289/atl.site.logo?version=7&modificationDate=1771424618039&api=v2", url: "https://www.m5technologies.com/" },
    { name: "Kerpen", logo: "https://www.secomp.nl/thumbor/OrDiZJB3a2ytXjNkifZBsqPip3A=/filters:cachevalid(2022-11-18T15:16:15.230772):strip_icc():strip_exif()/cms_secde/cms/ueber_uns/markenwelt/kerpen_datacom/kerpen-datacom.png", url: "https://kerpen-data.com/en/" },
    { name: "Avaya", logo: "/assets/avaya_red_logo_600x300.jpg", url: "https://www.avaya.com/" },
    { name: "3cx", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/3CX_logo.svg", url: "https://www.3cx.com/" },
    { name: "J&R Technology", logo: "https://www.jrtelephone.com/uploads/7137/logo.png", url: "https://www.jrtelephone.com/" },
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
          paddingTop: 'clamp(5rem, 10vh, 6rem)',
          paddingBottom: 'clamp(2rem, 4vh, 4rem)'
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
                  <div className="p-0.5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight weight="thin" size={20} />
                  </div>
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
                  <div className="text-cta mb-4 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>
          
          {/* Key Partners Banner */}
          <div style={{ marginTop: 'clamp(1rem, 2vh, 1.5rem)' }}>
            <KeyCustomersBanner keyCustomers={keyPartners} />
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
                <div className="text-cta mb-6">{type.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                <p className="text-white/80 mb-6">{type.description}</p>
                
                <div className="space-y-3">
                  <h4 className="text-white font-semibold mb-2">Key Benefits:</h4>
                  {type.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center text-white/70">
                      <div className="p-0.5 mr-2">
                        <ArrowRight weight="thin" size={20} className="text-cta" />
                      </div>
                      {benefit}
                    </div>
                  ))}
                </div>

                <button className="mt-8 btn-primary w-full flex items-center justify-center group">
                  <span>Learn More</span>
                  <div className="p-0.5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight weight="thin" size={20} />
                  </div>
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