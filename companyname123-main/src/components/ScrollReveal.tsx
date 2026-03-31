import React from 'react';
import { motion } from 'framer-motion';

type ScrollRevealDirection = 'up' | 'down' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: ScrollRevealDirection;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const hiddenY = direction === 'up' ? 30 : 0;

  const variants = {
    hidden: { opacity: 0, y: hiddenY },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay },
    },
  };

  return (
    <motion.div
      className={className || undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
