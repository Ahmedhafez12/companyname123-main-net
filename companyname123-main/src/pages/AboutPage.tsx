import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  Globe,
  Rocket,
  Target,
  Heart,
  Lightbulb,
  Shield,
} from "lucide-react";
import HorizontalTimeline from "../components/HorizontalTimeline";
import VennDiagram2 from "../components/VennDiagram2";
import EnhancedDimensions from "../components/EnhancedDimensions";
import Footer from "../components/Footer";

function AboutPage() {
  // Timeline events data
  const timelineEvents = [
    {
      date: "1994",
      title: "First Cloud Service",
      description: "Offer Worldspan ticketing system as service in the kingdom to travel agencies over STC legacy technology X.25 and connected with the world servers 700+ agencies"
    },
    {
      date: "1998",
      title: "First DID/DOD Service",
      description: "STC reach out to htc resolve the distance issue to serve the customers with E1, htc use the pregain solution and serve more than 2500+ key customer"
    },
    {
      date: "2002",
      title: "First MPLS Technology",
      description: "We have reseller agreement with STC to serve the customer with MPLS and connect their head office with the branch office through our solutions 300+ branches"
    },
    {
      date: "2009",
      title: "First SIP Trunk",
      description: "We provided with STC the new technology for DID/DOD service the SIP trunk providing the solution to 450+ customer"
    },
    {
      date: "2012",
      title: "STC NGN Migration",
      description: "Provide STC with the solution to migrate their Key customer from the DDN technology to NGN as MODA, RSAF, RSAD 1550+ Links"
    },
    {
      date: "2016",
      title: "STC Hazm Room",
      description: "htc have been chosen by STC, MODA and RSADF to provide off hook service to all the remote areas during the Hazm War over different technologies IPMPLS, MW and VSAT over 500+ links"
    },
    {
      date: "2022",
      title: "STC Service Concept and 2 Contract",
      description: "Work with STC to launch new service concept for Digital convertors over PLL service with the current to project to serve the key customer. Key customer Active equipment project (exclusive for htc) Customer premises equipment project"
    }
  ];
  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "People First",
      description:
        "Our team is our greatest asset. We foster a culture of innovation, collaboration, and continuous learning.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from technical solutions to customer service.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Impact",
      description:
        "Making a positive difference in communities worldwide through innovative telecommunications solutions.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Pushing boundaries and embracing new technologies to shape the future of telecommunications.",
    },
  ];

  const principles = [
    {
      icon: <Target className="w-12 h-12" />,
      title: "Strategic Vision",
      description:
        "We maintain a clear focus on long-term goals while delivering immediate value to our clients.",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Customer Commitment",
      description:
        "Our success is measured by the success of our clients and their satisfaction with our solutions.",
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Continuous Innovation",
      description:
        "We invest in research and development to stay ahead of technological advancements.",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Sustainable Growth",
      description:
        "We believe in responsible expansion that benefits our stakeholders and the environment.",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
           
      <Helmet>
                <title>About Us - Hajz Telecommunication Co Ltd. | Real Transformation</title>   
           
        <meta
          name="description"
          content="Learn about Hajz Telecommunication Co Ltd.'s journey, values, and mission in revolutionizing global connectivity through innovative telecommunications solutions."
        />
             
      </Helmet>
      {/* Background gradient */}      
      <div className="fixed inset-0 bg-[#005E96] opacity-20 pointer-events-none" />
                  {/* Hero div */}     
      <div className="min-h-screen relative overflow-hidden pt-20">
               
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
                   
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
                       
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6CE39] via-[#7CCCBF] to-[#44C8F5]">
                Story
              </span>
            </h1>
                       
            <p className="text-xl text-white/80 mb-12">
                          We deliver our customers valuable, secure, and
              reliable telecom solutions that effectively meet their specific
              needs and bridge the technology gap in the market            
            </p>
                     
          </motion.div>
                    {/* Mission & Vision */}     
          <div className="py-16 md:py-24 relative">
                   
            <div className="container mx-auto px-4 sm:px-6">
                       
              <div className="grid md:grid-cols-2 gap-12 items-center">
                           
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8" // Added relative here
                >
                                {/* Dark overlay */}             
                  <div className="absolute inset-0 bg-[#005E96] opacity-30 rounded-xl"></div>
                               
                  <h2 className="relative z-10 text-3xl font-bold text-white mb-6">
                    Our Mission
                  </h2>
                  {/* Added relative z-10 */}             
                  <p className="relative z-10 text-white/80 text-lg leading-relaxed mb-6">
                    {/* Added relative z-10 */}             " Our mission Is to
                    deliver advanced, high-quality communication technology
                    services that enrich the quality of life and foster economic
                    development in the communities we serve. We are committed to
                    providing innovative solutions that positively impact the
                    areas where we operate. "             
                  </p>
                               
                  <ul className="relative z-10 space-y-3 text-white/70">
                    {/* Added relative z-10 */}               
                    <li className="flex items-center">
                                       
                      <div className="w-2 h-2 bg-[#44C8F5] rounded-full mr-3"></div>
                                        Empowering communities through
                      cutting-edge communication technology.                
                    </li>
                                   
                    <li className="flex items-center">
                                       
                      <div className="w-2 h-2 bg-[#7CCCBF] rounded-full mr-3"></div>
                                        Driving progress and innovation with
                      high-quality solutions.                
                    </li>
                                   
                    <li className="flex items-center">
                                       
                      <div className="w-2 h-2 bg-[#A6CE39] rounded-full mr-3"></div>
                                        Enhancing connectivity and accessibility
                      to improve daily life and economic growth.                
                    </li>
                                 
                  </ul>
                             
                </motion.div>
                           
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8" // Added relative here
                >
                                {/* Dark overlay */}             
                  <div className="absolute inset-0 bg-[#005E96] opacity-30 rounded-xl"></div>
                               
                  <h2 className="relative z-10 text-3xl font-bold text-white mb-6">
                    Our Vision
                  </h2>
                  {/* Added relative z-10 */}             
                  <p className="relative z-10 text-white/80 text-lg leading-relaxed mb-6">
                    {/* Added relative z-10 */}              " Centered around
                    providing tailored solutions to our customers, aiming to
                    address their unique needs and challenges. We are committed
                    to delivering the best possible services and products in the
                    industry, ensuring that they contribute to the enhancement
                    of our customers' businesses and lives. "             
                  </p>
                               
                  <ul className="relative z-10 space-y-3 text-white/70">
                    {/* Added relative z-10 */}               
                    <li className="flex items-center">
                                       
                      <div className="w-2 h-2 bg-[#44C8F5] rounded-full mr-3"></div>
                                        Focused on personalized solutions that
                      serves to the unique needs of customers.                
                    </li>
                                   
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#7CCCBF] rounded-full mr-3"></div>
                                        Dedicated to delivering top-tier
                      services and products that add value.                
                    </li>
                                   
                    <li className="flex items-center">
                                       
                      <div className="w-2 h-2 bg-[#A6CE39] rounded-full mr-3"></div>
                                        Committed to improving businesses and
                      lives through high-quality offerings.                
                    </li>
                                 
                  </ul>
                             
                </motion.div>
                         
              </div>
                     
            </div>
                 
          </div>
                    {/* Company Values */}         
          {/* If you uncomment this section, apply similar changes:
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-[#005E96] opacity-30 rounded-xl"></div>
                <div className="relative z-10 text-[#44C8F5] mb-4">{value.icon}</div>
                <h3 className="relative z-10 text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="relative z-10 text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div> */}
                 
        </div>
             
      </div>
            {/* Enhanced Dimensions div */}     
      {/* <div className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Approach</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Discover how we're revolutionizing telecommunications through our three-dimensional approach.
            </p>
          </motion.div>
          
          <EnhancedDimensions />
        </div>
      </div> */}
            {/* Core Values Venn Diagram */}     
      <div className="py-16 md:py-24 relative bg-white/5 backdrop-blur-sm">
               
        <div className="container mx-auto px-4 sm:px-6">
                   
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
                       
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Strategy
            </h2>
                       
            {/* <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Connectivity is key 
            </p> */}
                     
          </motion.div>
                    <VennDiagram2 />       
        </div>
               
        <div className="container mx-auto px-4 sm:px-6">
                   
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
                       
            {/* <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Approach</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Discover how we're revolutionizing telecommunications through our three-dimensional approach.
            </p> */}
                     
          </motion.div>
                              <EnhancedDimensions />       
        </div>
             
      </div>
            {/* Guiding Principles */}     
      {/* If you uncomment this section, apply similar changes:
      <div className="py-16 md:py-24 relative bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Guiding Principles</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Our core principles shape every decision we make and every solution we deliver.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="absolute inset-0 bg-[#005E96] opacity-30 rounded-full"></div> // Note: rounded-full for this specific element
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#44C8F5]">
                  {principle.icon}
                </div>
                <h3 className="relative z-10 text-xl font-semibold text-white mb-3">{principle.title}</h3>
                <p className="relative z-10 text-white/70">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}
            {/* Timeline div */}     
      <div className="py-16 md:py-24 relative">
               
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
                   
          {/* <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Journey</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            From our founding to today, we've been at the forefront of telecommunications innovation.
          </p> */}
                 
        </motion.div>
                <HorizontalTimeline events={timelineEvents} />     
      </div>
            {/* Footer */}
            <Footer />   
    </div>
  );
}

export default AboutPage;
