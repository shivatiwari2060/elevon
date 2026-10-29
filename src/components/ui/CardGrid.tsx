import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './CardGrid.module.css';

interface CardGridProps {
  children: ReactNode;
  columns?: 2 | 3;
  className?: string;
}

export function CardGrid({ children, columns = 3, className }: CardGridProps) {
  return (
    <div className={cn(styles.grid, columns === 2 ? styles.two : styles.three, className)}>
      {children}
    </div>
  );
}
