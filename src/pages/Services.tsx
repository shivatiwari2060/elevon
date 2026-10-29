import { SERVICES } from '@/data/services';
import { usePageMeta } from '@/hooks/usePageMeta';
import { CtaSection } from '@/components/layout/CtaSection';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ServiceBlock } from '@/features/services/ServiceBlock';

export default function Services() {
  usePageMeta(
    'Services | Website Development, SEO & Digital Marketing | Elevon',
    'Elevon offers website design and development, SEO, and digital marketing for small businesses, startups, and growing companies in Nepal and worldwide.',
  );
  return (
    <>
      <PageHero
        title="Our Services"
        text="Practical digital services to help your business get found, build trust, and win customers."
        crumb="Services"
      />
      <Section>
        <Container>
          {SERVICES.map((service) => (
            <ServiceBlock key={service.id} service={service} />
          ))}
        </Container>
      </Section>
      <CtaSection
        title="Not sure which service you need?"
        text="Describe your goals and we’ll recommend a sensible starting point."
      />
    </>
  );
}
