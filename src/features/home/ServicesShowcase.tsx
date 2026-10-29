import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICES } from '@/data/services';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { useServicesStore } from '@/store/useServicesStore';
import { Checklist } from '@/components/ui/Checklist';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './ServicesShowcase.module.css';

export function ServicesShowcase() {
  const { activeId, setActive } = useServicesStore();
  const active = SERVICES.find((service) => service.id === activeId) ?? SERVICES[0];

  return (
    <Section tone="subtle">
      <Container>
        <SectionHeader
          eyebrow="Core services"
          title="What we do"
          text="Three focused services that work together to help you be found, trusted, and chosen online."
        />
        <Reveal className={styles.showcase}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
          >
            {SERVICES.map((service, position) => {
              const selected = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  id={`tab-${service.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${service.id}`}
                  className={cn(styles.tab, selected && styles.selected)}
                  onClick={() => setActive(service.id)}
                >
                  {selected && (
                    <motion.span
                      layoutId="tab-indicator"
                      className={styles.indicator}
                      transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                    />
                  )}
                  <span className={styles.number}>0{position + 1}</span>
                  <span>
                    <span className={styles.tabTitle}>{service.title}</span>
                    <span className={styles.tabSummary}>{service.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              className={styles.panel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <IconBadge name={active.icon} />
              <h3 className={styles.panelTitle}>{active.title}</h3>
              <p className={styles.intro}>{active.intro}</p>
              <div className={styles.lists}>
                <div>
                  <h4 className={styles.listHeading}>Typical deliverables</h4>
                  <Checklist items={active.deliverables.slice(0, 5)} />
                </div>
                <div>
                  <h4 className={styles.listHeading}>Problems it addresses</h4>
                  <Checklist items={active.problems} />
                </div>
              </div>
              <Link className={styles.link} to={`/services#${active.id}`}>
                Full details <Icon name="arrow" size={18} strokeWidth={2.2} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </Container>
    </Section>
  );
}
