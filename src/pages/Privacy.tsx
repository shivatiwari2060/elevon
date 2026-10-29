import { SITE } from '@/data/site';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import styles from './Privacy.module.css';

export default function Privacy() {
  return (
    <>
      <PageHero
        title="Privacy Notice"
        text="How Elevon handles information submitted through this website."
        crumb="Privacy Notice"
      />
      <Section>
        <Container narrow>
          <div className={styles.prose}>
            <div className={styles.callout}>
              <strong>Draft template:</strong> please have this reviewed and finalized before
              launch.
            </div>
            <h2>What we collect</h2>
            <p>
              When you submit our inquiry form we collect your name, email, optional company,
              services of interest, optional budget and timeline, and your project description. We
              collect only what we need to respond.
            </p>
            <h2>How we use it</h2>
            <p>
              We use this information to respond to your inquiry and discuss your project. We do not
              sell your information.
            </p>
            <h2>Sharing and storage</h2>
            <p>
              Inquiries are sent to Elevon’s designated email account. We may use service providers
              (such as email or form-handling services) to deliver them.
            </p>
            <h2>Analytics and cookies</h2>
            <p>
              This site does not currently use analytics or tracking cookies. If we add them, we
              will update this notice and request consent where required.
            </p>
            <h2>Your choices</h2>
            <p>
              You can ask us to access, correct, or delete your information at{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <p>{SITE.name}, Lalitpur, Nepal.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
