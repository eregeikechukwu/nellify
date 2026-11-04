import RevealText from '@/components/ui/RevealText';
import Reveal from '@/components/ui/Reveal';
import { WHY, STATS } from '@/content/site';
import styles from './Why.module.scss';

export default function Why() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Why Nellify</span>
        <RevealText as="h2" className="h-lg">A developer, not a template.</RevealText>
        <div className={styles.grid}>
          {WHY.map((w, i) => (
            <Reveal key={w.title} className={styles.card} delay={i * 0.08}>
              <span className={styles.n}>0{i + 1}</span>
              <h3>{w.title}</h3>
              <p className="muted">{w.desc}</p>
            </Reveal>
          ))}
        </div>
        {/* SWAP: STATS in src/content/site.ts are commitments, not metrics. Replace with real numbers when you have them. */}
        <div className={styles.stats}>
          {STATS.map((s, i) => (
            <Reveal key={s.label} className={styles.stat} delay={i * 0.08}>
              <strong>{s.value}</strong><span className="muted">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
