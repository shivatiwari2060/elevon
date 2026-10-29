import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import styles from './IntroSection.module.css';

export function IntroSection() {
  return (
    <Section>
      <Container>
        <div className={styles.split}>
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2>A digital services company built around your goals.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Elevon is a digital services company based in Lalitpur, Nepal. We help businesses
              build, improve, and grow their online presence, so they can communicate their value,
              reach the right audience, and strengthen their position in a digital marketplace.
            </p>
            <p>
              We work remotely, which lets us serve clients in Nepal and internationally with clear
              communication and a structured process.
            </p>
            <Link className={styles.link} to="/about">
              More about Elevon <Icon name="arrow" size={18} strokeWidth={2.2} />
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
