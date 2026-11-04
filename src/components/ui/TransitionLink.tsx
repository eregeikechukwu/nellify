'use client';
import Link from 'next/link';
import type { ComponentProps, MouseEvent } from 'react';
import { useTransition } from './TransitionProvider';

type Props = ComponentProps<typeof Link>;

/** next/link that plays the GSAP page transition before navigating. */
export default function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const { navigate } = useTransition();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const url = typeof href === 'string' ? href : href.pathname ?? '/';
    const external = /^(https?:|mailto:|tel:)/.test(url);
    if (e.defaultPrevented || external || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(url);
  };
  return <Link href={href} onClick={handle} {...rest}>{children}</Link>;
}
