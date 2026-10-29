import { Icon, type IconName } from './Icon';
import styles from './IconBadge.module.css';

export function IconBadge({ name }: { name: IconName }) {
  return (
    <span className={styles.badge}>
      <Icon name={name} size={22} />
    </span>
  );
}
