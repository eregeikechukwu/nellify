import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import RevealText from '@/components/ui/RevealText';
import ProjectArt from '@/components/ui/ProjectArt';
import TransitionLink from '@/components/ui/TransitionLink';
import CTABand from '@/components/sections/CTABand';
import { PROJECTS } from '@/content/projects';
import styles from './case.module.scss';

type Params = { slug: string };
export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: { params: Params }): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: `${p.title} case study`, description: p.blurb, alternates: { canonical: `/work/${p.slug}` } };
}

export default function CaseStudy({ params }: { params: Params }) {
  const i = PROJECTS.findIndex((x) => x.slug === params.slug);
  if (i < 0) notFound();
  const p = PROJECTS[i];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <>
      <PageHero eyebrow={`${p.category} · ${p.year}`} title={p.title} sub={p.blurb} />
      <section className="container">
        <Reveal className={styles.cover}><ProjectArt kind={p.art} /></Reveal>
        <ul className={styles.tags}>{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>

      <section className="section">
        <div className={`container ${styles.cols}`}>
          <div><span className="eyebrow">The challenge</span><RevealText as="h2" className="h-md">What was getting in the way.</RevealText></div>
          <Reveal><p className={styles.copy}>{p.challenge}</p></Reveal>
        </div>
        <div className={`container ${styles.cols}`}>
          <div><span className="eyebrow">The approach</span><RevealText as="h2" className="h-md">How we solved it.</RevealText></div>
          <Reveal><p className={styles.copy}>{p.approach}</p></Reveal>
        </div>
        <div className={`container ${styles.cols}`}>
          <div><span className="eyebrow">Built with</span><RevealText as="h2" className="h-md">The stack.</RevealText></div>
          <Reveal><ul className={styles.stack}>{p.stack.map((s) => <li key={s}>{s}</li>)}</ul></Reveal>
        </div>
      </section>

      <section className="container">
        <span className="eyebrow">Results</span>
        {/* SWAP: results are placeholders until this becomes a real, measured client project. */}
        <div className={styles.results}>
          {p.results.map((r) => <Reveal key={r.label} className={styles.result}><strong>{r.value}</strong><span className="muted">{r.label}</span></Reveal>)}
        </div>
        <p className={`muted ${styles.note}`}>This is a concept project. Metrics will be added once it is live with a real client.</p>
      </section>

      <section className="section container">
        <TransitionLink href={`/work/${next.slug}`} className={styles.next} data-cursor="hover">
          <span className="eyebrow">Next project</span>
          <span className="h-lg">{next.title} ↗</span>
        </TransitionLink>
      </section>
      <CTABand title="Want a site like this?" />
    </>
  );
}
