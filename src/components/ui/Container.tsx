import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
}

export function Container({ children, narrow, className }: ContainerProps) {
  return <div className={cn(styles.container, narrow && styles.narrow, className)}>{children}</div>;
}
