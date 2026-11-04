'use client';
import type { ReactNode } from 'react';
import TransitionLink from './TransitionLink';
import Magnetic from './Magnetic';
import { cn } from '@/lib/utils';
import styles from './Button.module.scss';

type Props = {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'lg';
  external?: boolean;
  className?: string;
};

/** One button for the whole site. Internal links use the page transition. */
export default function Button({ children, href, variant = 'primary', size = 'md', external, className }: Props) {
  const cls = cn(styles.btn, styles[variant], styles[size], className);
  const inner = <span className={styles.label}>{children}<span className={styles.arrow} aria-hidden>↗</span></span>;
  return (
    <Magnetic>
      {external ? (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" data-cursor="hover">{inner}</a>
      ) : (
        <TransitionLink href={href} className={cls} data-cursor="hover">{inner}</TransitionLink>
      )}
    </Magnetic>
  );
}
