'use client';
import { useRef } from 'react';
import RevealText from '@/components/ui/RevealText';
import { gsap, useGSAP } from '@/animations/gsap';
import { PROCESS } from '@/content/site';
import styles from './Process.module.scss';

/** Desktop: pinned scroll sequence with a progress line. Mobile: simple stacked steps. */
export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const el = root.current!;
      el.classList.add(styles.pinned);
      const panels = gsap.utils.toArray<HTMLElement>('[data-step]', el);
      const nodes = gsap.utils.toArray<HTMLElement>('[data-node]', el);
      gsap.set(panels, { autoAlpha: 0 });
      gsap.set(panels[0], { autoAlpha: 1 });
      const setActive = (i: number) => nodes.forEach((n, k) => n.classList.toggle(styles.nodeOn, k <= i));
      setActive(0);
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el, start: 'top top', end: '+=260%', pin: true, scrub: 0.6, anticipatePin: 1,
          onUpdate: (self) => setActive(Math.min(PROCESS.length - 1, Math.floor(self.progress * PROCESS.length * 0.999))),
        },
      });
      tl.to('[data-line]', { scaleX: 1, duration: PROCESS.length }, 0);
      for (let i = 1; i < panels.length; i++) {
        tl.to(panels[i - 1], { autoAlpha: 0, y: -40, duration: 0.4, ease: 'power2.in' }, i - 0.45)
          .fromTo(panels[i], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, i - 0.05);
      }
      return () => { el.classList.remove(styles.pinned); };
    });
  }, { scope: root });

  return (
    <section ref={root} className={styles.process} id="process">
      <div className={`container ${styles.wrap}`}>
        <div className={styles.head}>
          <span className="eyebrow">How it works</span>
          <RevealText as="h2" className="h-lg">From first call to live site in four steps.</RevealText>
        </div>
        <div className={styles.steps}>
          {PROCESS.map((s, i) => (
            <article key={s.title} data-step className={styles.step}>
              <span className={styles.big} aria-hidden>{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h-md">{s.title}</h3>
              <p className="muted">{s.desc}</p>
            </article>
          ))}
        </div>
        <div className={styles.progress} aria-hidden>
          <div className={styles.bar}><div data-line className={styles.fill} /></div>
          <ol className={styles.nodes}>{PROCESS.map((s, i) => <li key={s.title} data-node className={i === 0 ? styles.nodeOn : ''}><i />{s.title}</li>)}</ol>
        </div>
      </div>
    </section>
  );
}
