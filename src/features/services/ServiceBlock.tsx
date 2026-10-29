import type { Service } from '@/types';
import { Button } from '@/components/ui/Button';
import { Checklist } from '@/components/ui/Checklist';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import styles from './ServiceBlock.module.css';

function DetailCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={styles.detail}>
      <h3 className={styles.detailTitle}>{title}</h3>
      <Checklist items={items} />
    </div>
  );
}

export function ServiceBlock({ service }: { service: Service }) {
  return (
    <article className={styles.service} id={service.id}>
      <Reveal className={styles.intro}>
        <IconBadge name={service.icon} />
        <h2>{service.title}</h2>
        <p>{service.intro}</p>
        <Button to="/contact" arrow>
          Request a Quote
        </Button>
      </Reveal>
      <Reveal className={styles.details} delay={0.08}>
        <DetailCard title="Typical deliverables" items={service.deliverables} />
        <DetailCard title="Problems it addresses" items={service.problems} />
        <DetailCard title="Suited to" items={service.suitedTo} />
        <DetailCard title="Process" items={service.process} />
      </Reveal>
    </article>
  );
}
