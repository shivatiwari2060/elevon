import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Fades content up into place the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div className={className} {...fadeUp(delay)}>
      {children}
    </motion.div>
  );
}
