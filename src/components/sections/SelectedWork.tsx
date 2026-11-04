'use client';
import { useRef } from 'react';
import RevealText from '@/components/ui/RevealText';
import Reveal from '@/components/ui/Reveal';
import TransitionLink from '@/components/ui/TransitionLink';
import ProjectArt from '@/components/ui/ProjectArt';
import Button from '@/components/ui/Button';
import { gsap, useGSAP } from '@/animations/gsap';
import { PROJECTS, type Project } from '@/content/projects';
import styles from './SelectedWork.module.scss';

/** Liquid distortion on hover using the shared SVG filter (#distort). */
function distort(el: HTMLElement, on: boolean) {
  const map = document.getElementById('distort-map');
  const noise = document.getElementById('distort-noise');
  if (!map || !noise) return;
  gsap.killTweensOf(map);
  if (on) {
    el.style.filter = 'url(#distort)';
    gsap.fromTo(map, { attr: { scale: 0 } }, { attr: { scale: 55 }, duration: 0.5, ease: 'power2.out' });
    gsap.to(map, { attr: { scale: 0 }, duration: 0.7, ease: 'power2.inOut', delay: 0.5, onComplete: () => { el.style.filter = ''; } });
  } else {
    gsap.to(map, { attr: { scale: 0 }, duration: 0.3, onComplete: () => { el.style.filter = ''; } });
  }
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <TransitionLink href={`/work/${project.slug}`} className={styles.card} data-cursor="hover"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') distort(e.currentTarget.querySelector('[data-art]') as HTMLElement, true); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') distort(e.currentTarget.querySelector('[data-art]') as HTMLElement, false); }}>
      <div className={styles.media}>
        <div className={styles.art} data-art><ProjectArt kind={project.art} /></div>
        <span className={styles.view}>View case study ↗</span>
      </div>
      <div className={styles.meta}>
        <span className={styles.idx}>0{index + 1}</span>
        <div>
          <h3>{project.title}</h3>
          <p className="muted">{project.blurb}</p>
          <ul className={styles.tags}>{project.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>
    </TransitionLink>
  );
}

export default function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Desktop: pin the section and scrub the track sideways. Mobile/reduced motion: plain vertical stack.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const t = track.current!;
      const distance = () => Math.max(0, t.scrollWidth - window.innerWidth + 64);
      gsap.to(t, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    });
  }, { scope: root });

  return (
    <section ref={root} className={styles.work} id="work">
      <div className={`container ${styles.head}`}>
        <div>
          <span className="eyebrow">Selected work</span>
          <RevealText as="h2" className="h-lg">Sites that look sharp and load fast.</RevealText>
        </div>
        <Reveal className={styles.note}><p className="muted">Concept builds that show the standard we work to. Real client projects will replace these as they ship.</p></Reveal>
      </div>
      <div className={styles.viewport}>
        <div ref={track} className={styles.track}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
          <div className={styles.end}>
            <h3 className="h-md">Your project could be next.</h3>
            <Button href="/work" variant="ghost">All work</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
