import { usePageMeta } from '@/hooks/usePageMeta';
import { useInquiryStore } from '@/store/useInquiryStore';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ContactDetails } from '@/features/contact/ContactDetails';
import { ContactForm } from '@/features/contact/ContactForm';
import { SuccessNotice } from '@/features/contact/SuccessNotice';
import styles from './Contact.module.css';

export default function Contact() {
  usePageMeta(
    'Contact Elevon | Start Your Project',
    'Tell Elevon about your project. Request a quote for website development, SEO, or digital marketing.',
  );
  const status = useInquiryStore((state) => state.status);
  const submitted = status === 'sent' || status === 'mailto';

  return (
    <>
      <PageHero
        title="Let’s Discuss Your Project"
        text="Share a few details and we’ll get back to you with next steps."
        crumb="Contact"
      />
      <Section>
        <Container>
          <div className={styles.layout}>
            {submitted ? <SuccessNotice /> : <ContactForm />}
            <ContactDetails />
          </div>
        </Container>
      </Section>
    </>
  );
}
