import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  text?: string;
}

export function SectionHeader({ eyebrow, title, text }: SectionHeaderProps) {
  return (
    <Reveal className={styles.header}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
    </Reveal>
  );
}
