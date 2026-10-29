import type { CaseStudy } from '@/types';
import { Card } from '@/components/ui/Card';
import { CaseMock } from './CaseMock';
import styles from './CaseCard.module.css';

export function CaseCard({ item, delay }: { item: CaseStudy; delay?: number }) {
  return (
    <Card flush delay={delay}>
      <div className={styles.media}>
        <CaseMock kind={item.kind} />
      </div>
      <div className={styles.body}>
        <span className={styles.tag}>Concept project</span>
        <h3>{item.title}</h3>
        <dl className={styles.facts}>
          <div>
            <dt>Objective</dt>
            <dd>{item.objective}</dd>
          </div>
          <div>
            <dt>Need</dt>
            <dd>{item.need}</dd>
          </div>
          <div>
            <dt>Solution</dt>
            <dd>{item.solution}</dd>
          </div>
          <div>
            <dt>Services</dt>
            <dd>{item.services}</dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}
