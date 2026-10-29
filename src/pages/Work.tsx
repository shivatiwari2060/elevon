import { CASE_STUDIES } from '@/data/work';
import { CtaSection } from '@/components/layout/CtaSection';
import { PageHero } from '@/components/layout/PageHero';
import { CardGrid } from '@/components/ui/CardGrid';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { CaseCard } from '@/features/work/CaseCard';
import styles from './Work.module.css';

export default function Work() {
  return (
    <>
      <PageHero
        title="Our Work"
        text="We’re building our client portfolio. Until then, these are clearly labeled concept projects that show how we approach a brief."
        crumb="Our Work"
      />
      <Section>
        <Container>
          <CardGrid>
            {CASE_STUDIES.map((item, index) => (
              <CaseCard key={item.kind} item={item} delay={index * 0.08} />
            ))}
          </CardGrid>
          <Reveal>
            <p className={styles.note}>
              These are demonstrations, not client engagements. Real case studies will appear here
              as projects are completed with client approval.
            </p>
          </Reveal>
        </Container>
      </Section>
      <CtaSection
        title="Want to be our next featured project?"
        text="Tell us about your project and we’ll respond with practical next steps."
      />
    </>
  );
}
