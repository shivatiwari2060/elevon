import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV } from '@/data/site';
import { useUiStore } from '@/store/useUiStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import styles from './MobileMenu.module.css';

export function MobileMenu() {
  const menuOpen = useUiStore((state) => state.menuOpen);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.nav
          id="mobile-menu"
          data-tone="dark"
          className={styles.menu}
          aria-label="Mobile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {NAV.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 + index * 0.04 }}
            >
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => cn(styles.link, isActive && styles.active)}
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
          <Button to="/contact" arrow fullWidthOnMobile>
            Let’s Discuss Your Project
          </Button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
