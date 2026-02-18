import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#005E96]"
    >
      {/* SVG Logo with adjusted viewBox */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        className="w-18 sm:w-24 md:w-27 flex items-center justify-center"
      >
        <svg viewBox="0 0 500 491" className="w-full h-auto">
          <defs>
            <linearGradient id="loading-gradient" x1="334.22" y1="73.86" x2="184.73" y2="428.91" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#A6CE39">
                <animate attributeName="stop-color" values="#A6CE39; #7CCCBF; #44C8F5; #005E96; #A6CE39" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="0.34" stopColor="#7CCCBF">
                <animate attributeName="stop-color" values="#7CCCBF; #44C8F5; #005E96; #A6CE39; #7CCCBF" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="0.65" stopColor="#44C8F5">
                <animate attributeName="stop-color" values="#44C8F5; #005E96; #A6CE39; #7CCCBF; #44C8F5" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="1" stopColor="#005E96">
                <animate attributeName="stop-color" values="#005E96; #A6CE39; #7CCCBF; #44C8F5; #005E96" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
          <g transform="translate(-60, 0)">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              fill="url(#loading-gradient)"
              d="M221.3,426.81c-7.85,0-15.41-2.39-21.85-6.91-17.21-12.06-21.4-35.88-9.33-53.09,6.62-9.45,17.47-15.5,29-16.18,25.7-1.51,45.51-23.25,44.63-48.98-.06-1.72-.02-3.46.11-5.18,1.05-13.73-3.93-27.24-13.63-37.02-8.94-9-21.07-14.02-33.67-14.02-1.08,0-2.16.04-3.25.11-1.06.07-2.14.11-3.2.11-9.6,0-18.84-2.92-26.73-8.45-10.17-7.12-16.95-17.82-19.11-30.11s.57-24.66,7.7-34.83c8.72-12.44,23-19.86,38.21-19.86.51,0,1.03,0,1.54.02.52.02,1.05.03,1.57.03,12.35,0,24.24-4.82,33.12-13.48,9.25-9.02,14.42-21.42,14.32-34.34-.09-11.71,4.39-22.69,12.62-30.93s18.86-12.67,30.58-12.67,22.29,4.38,30.58,12.67c16.86,16.86,16.86,44.29,0,61.15-8.27,8.27-18.81,12.65-30.5,12.67-12.93.02-25.29,5.32-34.23,14.68-8.93,9.35-13.66,21.95-13.08,34.87.08,1.88.05,3.79-.09,5.66-1.05,13.73,3.93,27.24,13.63,37.02,8.94,9,21.07,14.02,33.67,14.02,1.08,0,2.16-.04,3.25-.11,1.06-.07,2.14-.11,3.2-.11,9.6,0,18.84,2.92,26.73,8.45,10.16,7.12,16.95,17.82,19.11,30.11s-.57,24.66-7.7,34.83c-8.72,12.44-23,19.86-38.21,19.86-.59,0-1.18-.01-1.77-.03-.6-.02-1.2-.03-1.8-.03-24.93,0-45.75,19.4-47.32,44.49-.43,6.97-2.74,13.48-6.85,19.34-7.13,10.17-18.81,16.24-31.24,16.24Z"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              fill="url(#loading-gradient)"
              cx="402.03"
              cy="208.84"
              r="46.38"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              fill="url(#loading-gradient)"
              cx="121.54"
              cy="286.02"
              r="38.06"
            />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;