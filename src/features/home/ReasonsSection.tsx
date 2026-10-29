import { REASONS } from '@/data/company';
import { Container } from '@/components/ui/Container';
import { FeatureGrid } from '@/components/ui/FeatureGrid';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ReasonsSection() {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow="Why Elevon" title="Why businesses choose us" />
        <FeatureGrid items={REASONS} />
      </Container>
    </Section>
  );
}
