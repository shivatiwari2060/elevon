import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <>
      <PageHero
        title="Page not found"
        text="The page you’re looking for doesn’t exist or has moved."
        crumb="Not found"
      />
      <Section>
        <Container narrow>
          <Button to="/" arrow>
            Back to the homepage
          </Button>
        </Container>
      </Section>
    </>
  );
}
