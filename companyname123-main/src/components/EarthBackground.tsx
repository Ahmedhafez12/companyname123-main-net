import React from 'react';
import { Suspense } from 'react';
import EarthVisualization from './EarthVisualization';

// Fallback component if 3D visualization fails
const FallbackEarth: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-[90%] md:w-[70%] lg:w-[60%] max-w-3xl aspect-square">
          <img
            src="https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/globe_east_540.jpg"
            alt="Earth globe representing global telecommunications connectivity"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain opacity-20 rounded-full"
            style={{ 
              filter: 'drop-shadow(0 0 15px rgba(79, 195, 225, 0.3))',
              transformOrigin: 'center center',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
          
          {/* Subtle glow effect */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(79, 195, 225, 0.07) 0%, rgba(4, 92, 148, 0.03) 50%, transparent 70%)',
              animation: 'pulse 8s ease-in-out infinite'
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Loading component
const LoadingEarth: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
      <div className="w-16 h-16 border-4 border-[#44C8F5] border-t-transparent rounded-full animate-spin opacity-30"></div>
    </div>
  );
};

const EarthBackground: React.FC = () => {
  return (
    <Suspense fallback={<LoadingEarth />}>
      <EarthVisualization />
    </Suspense>
  );
};

export default EarthBackground;