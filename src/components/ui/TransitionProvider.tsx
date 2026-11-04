'use client';
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap';
import { getLenis } from '@/lib/lenis';
import styles from './TransitionProvider.module.scss';

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });
export const useTransition = () => useContext(TransitionContext);

/** Page transition: two panels wipe up, route changes underneath, panels wipe away. */
export default function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const accent = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const target = useRef<string | null>(null);

  const navigate = useCallback((href: string) => {
    if (busy.current) return;
    const url = new URL(href, window.location.href);
    if (url.pathname === window.location.pathname) {
      if (url.hash) document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' });
      else getLenis()?.scrollTo(0);
      return;
    }
    if (prefersReducedMotion()) { router.push(href); return; }
    busy.current = true;
    target.current = url.pathname;
    gsap.set([accent.current, ink.current], { yPercent: 100, display: 'block' });
    gsap.timeline({
      onComplete: () => router.push(href),
    })
      .to(accent.current, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' })
      .to(ink.current, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' }, '-=0.4');
    // Safety net: never leave the user stuck behind the panels.
    window.setTimeout(() => { if (busy.current) reveal(); }, 4000);
  }, [router]);

  const reveal = useCallback(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    gsap.timeline({
      onComplete: () => {
        gsap.set([accent.current, ink.current], { display: 'none', yPercent: 100 });
        busy.current = false; target.current = null;
      },
    })
      .to(ink.current, { yPercent: -100, duration: 0.6, ease: 'power3.inOut' })
      .to(accent.current, { yPercent: -100, duration: 0.6, ease: 'power3.inOut' }, '-=0.45');
  }, []);

  // When the new route has rendered, play the panels away.
  useEffect(() => {
    if (busy.current && target.current === pathname) reveal();
    else if (!busy.current) { getLenis()?.scrollTo(0, { immediate: true }); ScrollTrigger.refresh(); }
  }, [pathname, reveal]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={accent} className={styles.accent} aria-hidden />
      <div ref={ink} className={styles.ink} aria-hidden />
    </TransitionContext.Provider>
  );
}
