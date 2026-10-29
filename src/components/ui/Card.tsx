import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { fadeUp } from '@/lib/motion';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  delay?: number;
  /** Removes inner padding, for cards that start with media. */
  flush?: boolean;
  className?: string;
}

export function Card({ children, delay = 0, flush, className }: CardProps) {
  return (
    <motion.div className={cn(styles.card, flush && styles.flush, className)} {...fadeUp(delay)}>
      {children}
    </motion.div>
  );
}
