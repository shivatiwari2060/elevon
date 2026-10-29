import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { RouteSeo } from '@/components/seo/RouteSeo';
import { Header } from './Header';
import { Footer } from './Footer';

/** Scrolls to the top on navigation, or to the #anchor when the URL has one. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const timer = window.setTimeout(
      () => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      300,
    );
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <RouteSeo />
      <ScrollManager />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          id="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  );
}
