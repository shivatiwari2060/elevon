import type { ReactNode } from 'react';
import { SITE } from '@/data/site';
import { Card } from '@/components/ui/Card';
import { Icon, type IconName } from '@/components/ui/Icon';
import styles from './ContactDetails.module.css';

interface DetailRow {
  icon: IconName;
  label: string;
  content: ReactNode;
}

const ROWS: DetailRow[] = [
  {
    icon: 'mail',
    label: 'Email',
    content: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>,
  },
  {
    icon: 'pin',
    label: 'Location',
    content: (
      <>
        {SITE.location}
        <br />
        Working remotely with clients in Nepal and worldwide.
      </>
    ),
  },
  { icon: 'clock', label: 'Response', content: 'We typically reply to inquiries by email.' },
];

export function ContactDetails() {
  return (
    <Card>
      <h3>Contact Elevon</h3>
      <ul className={styles.list}>
        {ROWS.map((row) => (
          <li key={row.label}>
            <Icon name={row.icon} size={20} />
            <div>
              <strong>{row.label}</strong>
              {row.content}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
