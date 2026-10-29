import { Link } from 'react-router-dom';
import { Mark } from './Mark';
import styles from './Logo.module.css';

export function Logo() {
  return (
    <Link to="/" className={styles.logo} aria-label="Elevon home">
      <Mark />
      <span className={styles.word}>ELEVON</span>
    </Link>
  );
}
