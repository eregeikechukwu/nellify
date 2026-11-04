'use client';
import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/animations/gsap';
import { cn } from '@/lib/utils';

type Props = { children: ReactNode; as?: ElementType; className?: string; delay?: number; y?: number };

/** Fade + translate entrance when scrolled into view (0.8s, power3.out). */
export default function Reveal({ children, as: Tag = 'div', className, delay = 0, y = 36 }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { el.classList.remove('rv-pending'); return; }
    gsap.fromTo(el, { opacity: 0, y }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onStart: () => el.classList.remove('rv-pending'),
      clearProps: 'transform',
    });
  }, { scope: ref });
  return <Tag ref={ref} className={cn('rv-pending', className)}>{children}</Tag>;
}
