import type { ReactNode } from 'react';
import styles from './Eyebrow.module.css';

/** Small uppercase label that introduces a section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className={styles.eyebrow}>{children}</span>;
}
