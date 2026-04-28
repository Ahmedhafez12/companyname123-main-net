import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Shield, Lightning } from 'phosphor-react';

interface Partner {
  id: number;
  name: string;
  logo: string;
  category: 'technology' | 'service' | 'innovation';
}

const partners: Partner[] = [
  {
    id: 1,
    name: 'TechVision',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&h=300&q=80',
    category: 'technology'
  },
  {
    id: 2,
    name: 'GlobalNet',
    logo: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=300&h=300&q=80',
    category: 'service'
  },
  {
    id: 3,
    name: 'FutureTel',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=300&h=300&q=80',
    category: 'innovation'
  },
  {
    id: 4,
    name: 'DataStream',
    logo: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=300&h=300&q=80',
    category: 'technology'
  },
  {
    id: 5,
    name: 'ConnectX',
    logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&h=300&q=80',
    category: 'service'
  },
  {
    id: 6,
    name: 'InnovateTech',
    logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300&q=80',
    category: 'innovation'
  }
];

const getCategoryIcon = (category: string) => {
  switch(category) {
    case 'technology':
      return <div className="p-0.5"><Lightning weight="thin" size={20} className="text-cta" /></div>;
    case 'service':
      return <div className="p-0.5"><Shield weight="thin" size={20} className="text-cta" /></div>;
    case 'innovation':
      return <div className="p-0.5"><Trophy weight="thin" size={20} className="text-cta" /></div>;
    default:
      return null;
  }
};

const PartnersSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Adjust height based on viewport
  useEffect(() => {
    const adjustHeight = () => {
      if (sectionRef.current) {
        const viewportHeight = window.innerHeight;
        sectionRef.current.style.minHeight = `${viewportHeight}px`;
      }
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  return (
    <div ref={sectionRef} className="w-full flex flex-col justify-center relative overflow-hidden py-16 md:py-0">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 bg-transparent">
        <div className="max-w-4xl mx-auto">
          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: partner.id * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transition-colors duration-300 group-hover:border-white/20" />
                
                {/* Card Content */}
                <div className="relative p-4 sm:p-6">
                  {/* Logo Container */}
                  <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-black/20 backdrop-blur-sm">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Partner Info */}
                  <div className="text-center">
                    <h3 className="text-white font-medium mb-2">{partner.name}</h3>
                    <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1">
                      {getCategoryIcon(partner.category)}
                      <span className="text-white/80 text-xs capitalize">{partner.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <button className="bg-transparent backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 text-white hover:border-white/30 transition-all duration-300 group">
              <span className="block text-lg font-medium mb-1">Become Our Partner</span>
              <span className="text-sm text-white/70">Join our network of industry leaders</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;