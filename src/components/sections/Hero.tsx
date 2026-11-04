'use client';
import { useRef } from 'react';
import RevealText from '@/components/ui/RevealText';
import Button from '@/components/ui/Button';
import { gsap, useGSAP, prefersReducedMotion } from '@/animations/gsap';
import { onReady } from '@/lib/ready';
import { HERO } from '@/content/site';
import styles from './Hero.module.scss';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    // Use element refs, not a selector: onReady fires inside the Preloader's GSAP context,
    // which would scope a string selector to the Preloader and find nothing.
    const els = gsap.utils.toArray<HTMLElement>('[data-hero-fade]', root.current);
    gsap.set(els, { opacity: 0, y: 24 });
    const off = onReady(() => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.5 }));
    return off;
  }, { scope: root });

  return (
    <section ref={root} className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <span className="eyebrow" data-hero-fade>{HERO.eyebrow}</span>
        <RevealText as="h1" className={`h-xl ${styles.title}`} trigger="load">{HERO.headline}</RevealText>
        <p className={`muted ${styles.sub}`} data-hero-fade>{HERO.sub}</p>
        <div className={styles.actions} data-hero-fade>
          <Button href="/contact" size="lg">Start a project</Button>
          <Button href="/work" variant="ghost" size="lg">See our work</Button>
        </div>
      </div>
      <div className={styles.cue} aria-hidden data-hero-fade><span>Scroll</span><i /></div>
    </section>
  );
}
