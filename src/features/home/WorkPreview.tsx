import { CASE_STUDIES } from '@/data/work';
import { CaseCard } from '@/features/work/CaseCard';
import { Button } from '@/components/ui/Button';
import { CardGrid } from '@/components/ui/CardGrid';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './WorkPreview.module.css';

export function WorkPreview() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Our work"
          title="How we approach a brief"
          text="We’re building our client portfolio. For now, these clearly labeled concept projects demonstrate our approach."
        />
        <CardGrid>
          {CASE_STUDIES.map((item, index) => (
            <CaseCard key={item.kind} item={item} delay={index * 0.08} />
          ))}
        </CardGrid>
        <Reveal>
          <div className={styles.more}>
            <Button to="/work" variant="secondary" arrow>
              View Our Work
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
