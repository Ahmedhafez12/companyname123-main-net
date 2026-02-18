import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 3000, // Increased from 2000 to 3000ms
  suffix = '',
  prefix = '',
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!isInView) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Using easeOutQuart easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      // Slow down the initial acceleration
      const easedProgress = Math.pow(easeOutQuart, 1.5);
      const currentCount = Math.floor(easedProgress * end);
      
      setCount(currentCount);

      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isInView, end, duration]);

  return (
    <div ref={countRef} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
};

export default AnimatedCounter;