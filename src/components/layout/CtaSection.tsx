import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import styles from './CtaSection.module.css';

interface CtaSectionProps {
  title: string;
  text: string;
}

export function CtaSection({ title, text }: CtaSectionProps) {
  return (
    <Section tone="dark">
      <Container>
        <Reveal className={styles.cta}>
          <h2>{title}</h2>
          <p>{text}</p>
          <Button to="/contact" arrow fullWidthOnMobile>
            Let’s Discuss Your Project
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
