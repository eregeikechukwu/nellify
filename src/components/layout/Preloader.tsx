'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, prefersReducedMotion } from '@/animations/gsap';
import { markReady } from '@/lib/ready';
import { getLenis } from '@/lib/lenis';
import styles from './Preloader.module.scss';

/** Logo reveal + counter, ~1.3s. Skipped on repeat visits in the same session. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(() => {
    const finish = () => { setGone(true); getLenis()?.start(); try { sessionStorage.setItem('nellify-seen', '1'); } catch {} };
    let seen = false;
    try { seen = sessionStorage.getItem('nellify-seen') === '1'; } catch {}
    if (seen || prefersReducedMotion()) { markReady(); finish(); return; }

    getLenis()?.stop();
    const n = { v: 0 };
    gsap.timeline({ onComplete: finish })
      .from('[data-pl-logo]', { scale: 0.6, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .to(n, { v: 100, duration: 1, ease: 'power2.inOut', onUpdate: () => { if (counter.current) counter.current.textContent = String(Math.round(n.v)).padStart(3, '0'); } }, 0)
      .to('[data-pl-bar]', { scaleX: 1, duration: 1, ease: 'power2.inOut' }, 0)
      .add(() => markReady(), '>-0.05')
      .to(root.current, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '>0.1');
  }, { scope: root });

  if (gone) return null;
  return (
    <div ref={root} className={`${styles.root} preloader`} aria-hidden>
      <div className={styles.inner}>
        <Image data-pl-logo src="/logo.png" alt="" width={72} height={63} className={styles.logo} />
        <span ref={counter} className={styles.count}>000</span>
        <div className={styles.track}><div data-pl-bar className={styles.bar} /></div>
      </div>
    </div>
  );
}
