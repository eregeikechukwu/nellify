import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import FAQ from '@/components/sections/FAQ';
import CTABand from '@/components/sections/CTABand';
import { SERVICES, PROCESS } from '@/content/site';
import styles from './services.module.scss';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Landing pages, business websites, portals, portfolios, real estate, restaurant and e-commerce sites. Custom-coded, fast and secure.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="What we build." sub="Seven kinds of sites, each custom-coded for speed, security and a smooth experience on mobile data." />
      <section className="container">
        <div className={styles.list}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} className={styles.item}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="h-md">{s.title}</h2>
                <p className="muted">{s.desc}</p>
              </div>
              <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container">
        <span className="eyebrow">Our process</span>
        <div className={styles.process}>
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} className={styles.step} delay={i * 0.06}>
              <strong>{String(i + 1).padStart(2, '0')}</strong>
              <h3>{p.title}</h3>
              <p className="muted">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <FAQ />
      <CTABand />
    </>
  );
}
