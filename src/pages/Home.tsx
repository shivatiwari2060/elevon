import { SITE } from '@/data/site';
import { usePageMeta } from '@/hooks/usePageMeta';
import { CtaSection } from '@/components/layout/CtaSection';
import { FaqSection } from '@/features/home/FaqSection';
import { Hero } from '@/features/home/Hero';
import { IntroSection } from '@/features/home/IntroSection';
import { ProcessTimeline } from '@/features/home/ProcessTimeline';
import { ReasonsSection } from '@/features/home/ReasonsSection';
import { ServicesShowcase } from '@/features/home/ServicesShowcase';
import { WorkPreview } from '@/features/home/WorkPreview';

export default function Home() {
  usePageMeta(
    'Elevon Private Limited | Website Development, SEO & Digital Marketing',
    SITE.description,
  );
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesShowcase />
      <ReasonsSection />
      <ProcessTimeline />
      <WorkPreview />
      <FaqSection />
      <CtaSection
        title="Ready to move your business forward?"
        text="Tell us about your project and we’ll respond with practical next steps."
      />
    </>
  );
}
