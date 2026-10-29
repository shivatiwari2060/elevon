import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV } from '@/data/site';
import { useUiStore } from '@/store/useUiStore';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { MobileMenu } from './MobileMenu';
import styles from './Header.module.css';

export function Header() {
  const { menuOpen, toggleMenu, closeMenu } = useUiStore();
  const { pathname } = useLocation();

  useEffect(() => closeMenu(), [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && closeMenu();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className={styles.header} data-tone="dark">
        <Container className={styles.inner}>
          <Logo />
          <nav aria-label="Primary" className={styles.nav}>
            <ul className={styles.list}>
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => cn(styles.link, isActive && styles.active)}
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className={styles.underline}
                            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
              <li>
                <Button to="/contact" size="sm">
                  Let’s Discuss Your Project
                </Button>
              </li>
            </ul>
          </nav>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} strokeWidth={2} />
          </button>
        </Container>
      </header>
      <MobileMenu />
    </>
  );
}
