import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Wifi, Cloud, Network, Shield, ArrowRight, Zap, Globe, Database, Server, Cpu, Lock } from 'lucide-react';
import SolutionsCarousel from '../components/SolutionsCarousel';
import Footer from '../components/Footer';

function WhatwedoPage() {
  const solutions = [
    {
      icon: <Wifi className="w-12 h-12" />,
      title: "Managed WiFi",
      features: [
        "Seamless Connectivity",
        "Centralized Management",
        "Enhanced Security",
        "Scalability ",
        "Customizable User Access "

      ],
      benefits: [
        "Improved User Experience",
        "Reduced IT Burden",
        "Optimized Network Performance"
      ],
      image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=500"
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Managed Fixed Wireless access",
      features: [
        "High-Speed Wireless Broadband",
        "Rapid Deployment",
        "Scalable Bandwidth Solutions",
        'Advanced Security & Encryption',
        'Network Redundancy'
      ],
      benefits: [
        "Cost-Effective Deployment",
        "Expanded Coverage",
        "Reliable Business Operations"
      ],
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=500"
    },
    {
      icon: <Network className="w-12 h-12" />,
      title: "Managed UC",
      description: "Comprehensive IoT connectivity solutions for smart cities and industries.",
      features: [
        "Multi-Channel Communication",
        "Cloud-Based Collaboration",
        "AI-Powered Call Routing",
        "Integrated Contact Center Solutions",
        "Data analytics"
      ],
      benefits: [
        "Enhanced Productivity",
        "Improved Customer Engagement",
        "Cost Savings"
      ],
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=500"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Infrastructure",
      description: "Advanced security measures protecting your telecommunications infrastructure.",
      features: [
        "Scalable Network Architecture",
        "Cloud & Hybrid Deployments",
        "Automated Management",
        "High-Speed Fiber Backbone",
        "Disaster Recovery & Redundancy"
      ],
      benefits: [
        "Future-Proofing Investments",
        "Enhanced Reliability & Uptime",
        "Optimized IT Efficiency"
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Special MODA solutions",
      description: "Advanced security measures protecting your telecommunications infrastructure.",
      features: [
        "Tailored Network Deployment",
        "Advanced Cybersecurity Measures",
        "Mission-Critical Connectivity",
        "Encrypted Data Transmission",
        "Adaptive Technology Integration"
      ],
      benefits: [
        "Security & Compliance",
        "Reliable Performance in Critical Scenarios",
        "Adaptable to Emerging Threats"
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: " RPM ( Remote Patient Management )",
      description: "Advanced security measures protecting your telecommunications infrastructure.",
      features: [
        "Real-Time Patient Monitoring",
        "Secure Data Transmission",
        "AI-Based Health Analytics",
        "Mobile Access & Telehealth Integration",
        "Automated Alerts & Notifications"
      ],
      benefits: [
        "Real-time threat response",
        "Regulatory compliance",
        "Comprehensive protection"
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500"
    }
  ];

  const additionalSolutions = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "Edge Computing",
      description: "Distributed computing infrastructure for real-time processing."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Centers",
      description: "State-of-the-art facilities for secure data storage and processing."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Network Automation",
      description: "Intelligent automation solutions for network management."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Cybersecurity",
      description: "Advanced protection against evolving cyber threats."
    }
  ];

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [/* dependencies that indicate a route change */]);

  return (
    <div className="relative">
      <Helmet>
        <title>What we do - Hajz Telecommunication Co Ltd. | Advanced Telecommunications Infrastructure</title>
        <meta name="description" content="Explore Hajz Telecommunication Co Ltd.'s comprehensive suite of telecommunications solutions, including 5G infrastructure, cloud services, IoT networks, and security solutions." />
      </Helmet>

      {/* Background gradient */}
      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-[2px] border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <Zap size={16} className="text-[#A6CE39]" />
              <span className="text-sm text-white/90">Next-Generation Solutions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">We do </span>
            </h1>
            <p className="text-xl text-white/80 mb-12">
            Standard projects are our foundation, but breaking through limitations is our specialty.
            </p>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0">
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#005E96]/90 to-transparent" />
                </div>
                
                <div className="relative p-8 min-h-[400px] flex flex-col">
                  <div className="text-[#44C8F5] mb-4">{solution.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
                  <p className="text-white/80 mb-6">{solution.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-3">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-center text-white/70">
                          <ArrowRight size={16} className="mr-2 text-[#A6CE39]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Benefits</h4>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit) => (
                        <li key={benefit} className="text-white/70 flex items-center">
                          <div className="w-2 h-2 bg-[#A6CE39] rounded-full mr-3"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a href={`/assets/htc_Overview-${index + 1}.pdf`} target="_blank" className="mt-auto btn-primary self-start group text-sm inline-flex items-center">
                    <span className="text-xs">Learn More</span>
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      {/* <section className="py-16 md:py-24 relative">
        
      </section> */}

      {/* Additional Solutions */}
      {/* <section className="py-16 md:py-24 relative bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Additional Solutions</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Complementary services that enhance our core solutions and provide comprehensive coverage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalSolutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-[#44C8F5] mb-4">{solution.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{solution.title}</h3>
                <p className="text-white/70">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Interactive Solutions Showcase */}
      {/* <section className="py-16 md:py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Solutions in Action</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Explore our solutions through our interactive showcase.
          </p>
        </motion.div>
        <SolutionsCarousel />
      </section> */}
      <div style={{ height: '100px' }}></div>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}

export default WhatwedoPage;
