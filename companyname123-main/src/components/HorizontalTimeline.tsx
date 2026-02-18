import React from 'react';
import { motion } from 'framer-motion';

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface HorizontalTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ events = [], className = '' }) => {
  // Safety check: return early if no events
  if (!events || events.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-center py-12 text-white/60">
          <p>No timeline events to display.</p>
        </div>
      </div>
    );
  }

  // Calculate minimum width for the timeline container (viewport-aware)
  const minWidth = events.length * 200; // Reduced base width, will be adjusted with clamp
  
  return (
    <>
      {/* Custom scrollbar styles matching global design */}
      <style>{`
        .timeline-scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        .timeline-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .timeline-scroll-container::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          border: transparent;
        }
        .timeline-scroll-container::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        @media (max-width: 640px) {
          .timeline-scroll-container::-webkit-scrollbar {
            height: 3px;
          }
          .timeline-scroll-container::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
        .timeline-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
      `}</style>
      <div className={`w-full ${className}`}>
      {/* Timeline Container with horizontal scroll on mobile */}
      <div className="relative overflow-x-auto overflow-y-visible timeline-scroll-container" style={{ paddingBottom: 'clamp(1rem, 2vh, 2rem)' }}>
        <div className="relative" style={{ minWidth: `max(${minWidth}px, 100%)` }}>
          {/* Horizontal line - runs through center of markers */}
          <div className="absolute top-1/2 left-0 right-0 bg-white/20 transform -translate-y-1/2 z-0" style={{ height: 'clamp(1px, 0.2vh, 2px)' }}>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent opacity-50" 
              style={{ 
                background: 'linear-gradient(to right, transparent, var(--color-secondary), transparent)',
                opacity: 0.5
              }}
            />
          </div>

          {/* Events Container */}
          <div 
            className="relative flex flex-row items-start"
            style={{ 
              gap: 'clamp(1rem, 2vw, 2rem)',
              paddingLeft: 'clamp(0.5rem, 1vw, 1rem)',
              paddingRight: 'clamp(0.5rem, 1vw, 1rem)',
              paddingTop: 'clamp(1.5rem, 3vh, 2rem)',
              paddingBottom: 'clamp(1.5rem, 3vh, 2rem)'
            }}
          >
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex-shrink-0 group"
                  style={{ width: 'clamp(200px, 20vw, 280px)' }}
                >
                  {/* Content Card - Alternating positions on desktop */}
                  <div
                    className="relative transition-all duration-300"
                    style={{
                      top: isEven ? 0 : 'clamp(0px, 4vh, 4rem)'
                    }}
                  >
                    {/* Card */}
                    <div 
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-lg group-hover:-translate-y-1"
                      style={{
                        padding: 'clamp(0.75rem, 1.5vh, 1.5rem)',
                        borderRadius: 'clamp(0.5rem, 1vh, 0.75rem)',
                        marginBottom: 'clamp(0.5rem, 1vh, 1rem)'
                      }}
                    >
                      {/* Date */}
                      <div 
                        className="font-sans font-semibold"
                        style={{ 
                          color: 'var(--color-secondary)',
                          fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)',
                          marginBottom: 'clamp(0.375rem, 0.75vh, 0.5rem)'
                        }}
                      >
                        {event.date}
                      </div>
                      
                      {/* Title */}
                      <h3 
                        className="text-white font-sans font-bold transition-colors duration-300 group-hover:text-[var(--color-cta)]"
                        style={{
                          fontSize: 'clamp(1rem, 2vh, 1.25rem)',
                          marginBottom: 'clamp(0.375rem, 0.75vh, 0.5rem)',
                          lineHeight: '1.3'
                        }}
                      >
                        {event.title}
                      </h3>
                      
                      {/* Description */}
                      <p 
                        className="text-white/70 font-body leading-relaxed"
                        style={{
                          fontSize: 'clamp(0.8125rem, 1.5vh, 0.9375rem)',
                          lineHeight: '1.5'
                        }}
                      >
                        {event.description}
                      </p>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HorizontalTimeline;

