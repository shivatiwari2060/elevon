import { CLIENT_APPROACH, MISSION, VALUES, VISION } from '@/data/company';
import { CtaSection } from '@/components/layout/CtaSection';
import { PageHero } from '@/components/layout/PageHero';
import { Card } from '@/components/ui/Card';
import { CardGrid } from '@/components/ui/CardGrid';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FeatureGrid } from '@/components/ui/FeatureGrid';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './About.module.css';

export default function About() {
  return (
    <>
      <PageHero
        title="About Elevon"
        text="A digital services company helping businesses build, improve, and grow their online presence."
        crumb="About"
      />

      <Section>
        <Container>
          <div className={styles.split}>
            <Reveal>
              <Eyebrow>Our company</Eyebrow>
              <h2 className={styles.slogan}>Elevate. Evolve. Excel.</h2>
            </Reveal>
            <Reveal delay={0.08} className={styles.prose}>
              <p>
                Elevon Private Limited is based in Lalitpur, Nepal. We provide digital solutions
                that help businesses communicate their value, reach target audiences, and strengthen
                their position in an increasingly digital marketplace.
              </p>
              <p>
                We focus on website design and development, search engine optimization, and digital
                marketing, and aim to build long-term client relationships through reliable service,
                effective communication, and solutions tailored to business needs.
              </p>
              <p>
                Our name reflects elevation, progress, and forward momentum: helping businesses move
                forward through thoughtful digital solutions.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container>
          <CardGrid columns={2}>
            <Card>
              <IconBadge name="target" />
              <h3>Our mission</h3>
              <p>{MISSION}</p>
            </Card>
            <Card delay={0.08}>
              <IconBadge name="eye" />
              <h3>Our vision</h3>
              <p>{VISION}</p>
            </Card>
          </CardGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Core values" title="What guides our work" />
          <FeatureGrid items={VALUES} />
        </Container>
      </Section>

      <Section tone="subtle">
        <Container>
          <SectionHeader
            eyebrow="How we work with clients"
            title="Our approach to digital solutions"
            text="We commit to clear communication, honest expectations, and quality work at every stage."
          />
          <CardGrid className={styles.approach}>
            {CLIENT_APPROACH.map((step, index) => (
              <Card key={step.title} delay={index * 0.06}>
                <span className={styles.stepNumber}>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>

      <CtaSection
        title="Ready to move your business forward?"
        text="Tell us about your project and we’ll respond with practical next steps."
      />
    </>
  );
}
