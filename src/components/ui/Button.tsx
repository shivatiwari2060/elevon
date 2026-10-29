import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Icon } from './Icon';
import styles from './Button.module.css';

interface BaseProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
  arrow?: boolean;
  fullWidthOnMobile?: boolean;
}

type LinkButtonProps = BaseProps & { to: string };
type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & { to?: undefined };

/** Renders a router link when given `to`, otherwise a native button. */
export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = 'primary', size = 'md', arrow = false, fullWidthOnMobile } = props;
  const className = cn(
    styles.button,
    styles[variant],
    size === 'sm' && styles.small,
    fullWidthOnMobile && styles.fullMobile,
  );
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" size={18} strokeWidth={2.2} />}
    </>
  );

  if (props.to !== undefined) {
    return (
      <Link to={props.to} className={className}>
        {content}
      </Link>
    );
  }

  const {
    children: _children,
    variant: _variant,
    size: _size,
    arrow: _arrow,
    fullWidthOnMobile: _full,
    to: _to,
    type = 'button',
    ...rest
  } = props;
  void [_children, _variant, _size, _arrow, _full, _to];
  return (
    <button type={type} className={className} {...rest}>
      {content}
    </button>
  );
}
