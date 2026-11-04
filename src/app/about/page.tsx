import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import RevealText from '@/components/ui/RevealText';
import CTABand from '@/components/sections/CTABand';
import { ABOUT_VALUES } from '@/content/site';
import styles from './about.module.scss';

export const metadata: Metadata = {
  title: 'About',
  description: 'Nellify is a web development studio. Built by hand, fast on mobile data, secure by design.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Built by a developer, for businesses." sub="Nellify is a web development studio. We write every line of code ourselves, so your site is fast, secure and built around how your business really works." />
      <section className="section container">
        <div className={styles.story}>
          <RevealText as="h2" className="h-md">Why Nellify exists.</RevealText>
          <Reveal>
            <p>Too many businesses end up with the same template site as their competitors: slow on a phone, hard to trust, and impossible to change. Others are sold bloated page builders they never asked for.</p>
            <p>Nellify exists to fix that. We build custom sites and web apps, from landing pages to secure portals, with the speed, security and polish a serious business needs, and we explain every decision in plain language.</p>
          </Reveal>
        </div>
      </section>
      <section className="container">
        <span className="eyebrow">How we work</span>
        <div className={styles.values}>
          {ABOUT_VALUES.map((v, i) => (
            <Reveal key={v.title} className={styles.value} delay={i * 0.06}>
              <h3>{v.title}</h3><p className="muted">{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section container">
        {/* SWAP: add your name, photo and short bio here when you are ready to put a face to the studio. */}
        <Reveal className={styles.founder}>
          <span className="eyebrow">Who you will work with</span>
          <p className="h-md">[Founder name] · Developer</p>
          <p className="muted">[One or two sentences about your background and what you love building.]</p>
        </Reveal>
      </section>
      <CTABand title="Let's build something together." />
    </>
  );
}
