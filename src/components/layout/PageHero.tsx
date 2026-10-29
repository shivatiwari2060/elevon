import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { Container } from '@/components/ui/Container';
import styles from './PageHero.module.css';

interface PageHeroProps {
  title: string;
  text: string;
  crumb: string;
}

export function PageHero({ title, text, crumb }: PageHeroProps) {
  return (
    <header className={styles.hero} data-tone="dark">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className={styles.crumbs}>
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            {crumb}
          </p>
          <h1>{title}</h1>
          <p className={styles.text}>{text}</p>
        </motion.div>
      </Container>
    </header>
  );
}
