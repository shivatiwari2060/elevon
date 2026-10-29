import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { WORKFLOW } from '@/data/company';
import { cn } from '@/lib/cn';
import { fadeUp } from '@/lib/motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './ProcessTimeline.module.css';

/** A vertical timeline whose rail fills as the visitor scrolls through the stages. */
export function ProcessTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 65%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const index = Math.round(progress * (WORKFLOW.length - 1) + 0.15);
    setActiveStep(Math.min(WORKFLOW.length - 1, Math.max(0, index)));
  });

  return (
    <Section tone="subtle">
      <Container>
        <div className={styles.layout}>
          <div className={styles.heading}>
            <SectionHeader
              eyebrow="Our approach"
              title="A structured workflow, start to finish"
              text="Five clear stages, so you always know what happens next."
            />
          </div>
          <ol className={styles.timeline} ref={listRef}>
            <li className={styles.rail} aria-hidden="true">
              <motion.span className={styles.fill} style={{ scaleY: fill }} />
            </li>
            {WORKFLOW.map((step, index) => (
              <motion.li
                key={step.title}
                className={cn(styles.step, index <= activeStep && styles.reached)}
                {...fadeUp()}
              >
                <span className={styles.dot}>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
