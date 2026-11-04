import RevealText from '@/components/ui/RevealText';
import Reveal from '@/components/ui/Reveal';
import { TESTIMONIALS } from '@/content/site';
import styles from './Testimonials.module.scss';

/** Hidden until real testimonials are added in src/content/site.ts (never fake social proof). */
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Kind words</span>
        <RevealText as="h2" className="h-lg">What clients say.</RevealText>
        <div className={styles.grid}>
          {TESTIMONIALS.map((t) => (
            <Reveal as="figure" key={t.name} className={styles.card}>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption><strong>{t.name}</strong><span className="muted">{t.role}</span></figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
