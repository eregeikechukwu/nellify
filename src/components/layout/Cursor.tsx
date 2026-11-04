'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/animations/gsap';
import styles from './Cursor.module.scss';

/** Custom cursor: dot + trailing ring. Desktop (fine pointer) only. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      document.body.classList.add('has-cursor');
      const dx = gsap.quickTo(dot.current, 'x', { duration: 0.1 }), dy = gsap.quickTo(dot.current, 'y', { duration: 0.1 });
      const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' }), ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });
      gsap.set([dot.current, ring.current], { opacity: 0 });
      let shown = false;
      const move = (e: PointerEvent) => {
        if (!shown) { shown = true; gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 }); }
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      };
      const over = (e: PointerEvent) => {
        const hot = (e.target as HTMLElement)?.closest('a, button, [data-cursor="hover"], input, select, textarea');
        gsap.to(ring.current, { scale: hot ? 1.9 : 1, backgroundColor: hot ? 'rgba(245,165,36,0.12)' : 'rgba(245,165,36,0)', duration: 0.3 });
        gsap.to(dot.current, { scale: hot ? 0.4 : 1, duration: 0.3 });
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerover', over);
      return () => {
        document.body.classList.remove('has-cursor');
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerover', over);
      };
    });
  });

  return (<><div ref={ring} className={styles.ring} aria-hidden /><div ref={dot} className={styles.dot} aria-hidden /></>);
}
