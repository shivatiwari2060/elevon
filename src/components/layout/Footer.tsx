import { Link } from 'react-router-dom';
import { SERVICES } from '@/data/services';
import { SITE } from '@/data/site';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui/Container';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} data-tone="darker">
      <Container>
        <div className={styles.grid}>
          <div>
            <Logo />
            <p className={styles.about}>
              Websites, search visibility, and digital marketing for businesses in Nepal and around
              the world.
            </p>
            <p className={styles.tagline}>{SITE.tagline}</p>
          </div>
          <nav aria-label="Company">
            <h3 className={styles.heading}>Company</h3>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/work">Our Work</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Services">
            <h3 className={styles.heading}>Services</h3>
            <ul>
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link to={`/services#${service.id}`}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className={styles.heading}>Get in touch</h3>
            <ul>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>{SITE.location}</li>
              <li>
                <Link to="/privacy">Privacy Notice</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span>Working remotely with clients worldwide.</span>
        </div>
      </Container>
    </footer>
  );
}
