import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES } from '@/data/services';
import { SITE } from '@/data/site';
import { EASE } from '@/lib/motion';
import { AnimatedMark } from '@/components/brand/Mark';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import styles from './Hero.module.css';

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

export function Hero() {
  return (
    <section className={styles.hero} data-tone="dark">
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <motion.p className={styles.eyebrow} {...enter(0)}>
              {SITE.name} · {SITE.location}
            </motion.p>
            <motion.h1 {...enter(0.1)}>
              Elevate Your Business with <span className={styles.accent}>Digital Solutions.</span>
            </motion.h1>
            <motion.p className={styles.lead} {...enter(0.2)}>
              Elevon helps businesses in Nepal and around the world strengthen their digital
              presence through website development, search engine optimization, and digital
              marketing.
            </motion.p>
            <motion.div className={styles.actions} {...enter(0.3)}>
              <Button to="/contact" arrow fullWidthOnMobile>
                Let’s Discuss Your Project
              </Button>
              <Button to="/services" variant="secondary" fullWidthOnMobile>
                Explore Our Services
              </Button>
            </motion.div>
          </div>
          <div className={styles.visual}>
            <AnimatedMark className={styles.mark} />
          </div>
        </div>
      </Container>

      <nav className={styles.index} aria-label="Services">
        <Container>
          <ul className={styles.indexList}>
            {SERVICES.map((service, position) => (
              <li key={service.id}>
                <Link to={`/services#${service.id}`} className={styles.indexLink}>
                  <span className={styles.indexNumber}>0{position + 1}</span>
                  <span className={styles.indexTitle}>
                    {service.name}
                    <Icon name="arrow" size={18} strokeWidth={2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </section>
  );
}
