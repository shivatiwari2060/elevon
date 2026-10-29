import { FAQS } from '@/data/faqs';
import { Accordion } from '@/components/ui/Accordion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function FaqSection() {
  return (
    <Section tone="subtle">
      <Container narrow>
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <Accordion items={FAQS} />
      </Container>
    </Section>
  );
}
