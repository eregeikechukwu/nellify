'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap';
import { setLenis } from '@/lib/lenis';

/** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    // Refresh once fonts and the window have settled (pin positions depend on layout).
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    const t = window.setTimeout(refresh, 800);

    if (prefersReducedMotion()) return () => { window.removeEventListener('load', refresh); window.clearTimeout(t); };

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
      window.removeEventListener('load', refresh);
      window.clearTimeout(t);
    };
  }, []);
  return null;
}
