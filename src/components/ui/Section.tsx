import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Section.module.css';

export type Tone = 'light' | 'subtle' | 'dark' | 'darker';

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  /** Use a tighter top padding, e.g. directly under a page hero. */
  flushTop?: boolean;
  className?: string;
}

export function Section({ children, tone = 'light', id, flushTop, className }: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(styles.section, flushTop && styles.flushTop, className)}
    >
      {children}
    </section>
  );
}
