import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'phosphor-react';

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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isHoveringRef = useRef(false);

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

  // Automatic horizontal scrolling with hover pause
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let frameId: number;
    const direction = 1;

    const step = () => {
      if (!scrollContainerRef.current) return;

      const el = scrollContainerRef.current;

      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;

      if (maxScroll <= 0) {
        return;
      }

      if (!isHoveringRef.current) {
        el.scrollLeft += direction * 0.5;

        if (el.scrollLeft >= maxScroll - 1) {
          el.scrollLeft = 0; // jump back to start
        }
      }

      frameId = window.requestAnimationFrame(step);
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
    };

    const handleTouchStart = () => { isHoveringRef.current = true; };
    const handleTouchEnd = () => { isHoveringRef.current = false; };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    frameId = window.requestAnimationFrame(step);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      window.cancelAnimationFrame(frameId);
    };
  }, [events.length]);
  
  return (
    <>
      {/* Scrollbar visible only on hover */}
      <style>{`
        .timeline-scroll-container {
          scrollbar-width: none;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        .timeline-scroll-container:hover {
          scrollbar-width: thin;
        }
        .timeline-scroll-container::-webkit-scrollbar {
          height: 0;
        }
        .timeline-scroll-container:hover::-webkit-scrollbar {
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
          .timeline-scroll-container:hover::-webkit-scrollbar {
            height: 3px;
          }
          .timeline-scroll-container::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
      <div className={`w-full ${className}`}>
      {/* Swipe hint — mobile only */}
      <p className="flex sm:hidden items-center justify-center gap-1.5 text-xs text-white/40 mb-2 select-none" aria-hidden>
        <span>←</span> swipe to explore <span>→</span>
      </p>
      {/* Timeline Container with horizontal scroll on mobile */}
      <div
        ref={scrollContainerRef}
        className="relative overflow-x-auto overflow-y-visible timeline-scroll-container"
        style={{ paddingBottom: 'clamp(1rem, 2vh, 2rem)' }}
      >
        <div className="relative" style={{ minWidth: `max(${minWidth}px, 100%)` }}>
          {/* Horizontal line - runs through center of markers */}
          <div className="absolute top-1/2 left-0 right-0 bg-primary/30 transform -translate-y-1/2 z-0" style={{ height: 'clamp(1px, 0.2vh, 2px)' }}>
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
                  style={{ width: 'clamp(160px, 48vw, 280px)' }}
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
                      className="bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-xl transition-all duration-300 group-hover:bg-primary/30 group-hover:border-primary/40 group-hover:shadow-lg group-hover:-translate-y-1"
                      style={{
                        padding: 'clamp(0.75rem, 1.5vh, 1.5rem)',
                        borderRadius: 'clamp(0.5rem, 1vh, 0.75rem)',
                        marginBottom: 'clamp(0.5rem, 1vh, 1rem)'
                      }}
                    >
                      {/* Date with icon */}
                      <div 
                        className="font-sans font-semibold flex items-center gap-2"
                        style={{ 
                          color: 'var(--color-cta)',
                          fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)',
                          marginBottom: 'clamp(0.375rem, 0.75vh, 0.5rem)'
                        }}
                      >
                        <Calendar weight="thin" size={16} className="flex-shrink-0" />
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

