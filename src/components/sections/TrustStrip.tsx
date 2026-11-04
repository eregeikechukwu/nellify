import { MARQUEE } from '@/content/site';
import styles from './TrustStrip.module.scss';

/** Marquee of what we build (no fake client logos). Pure CSS, so it costs no JS. */
export default function TrustStrip() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <section className={styles.strip} aria-label="What we build">
      <div className={styles.track}>
        {[0, 1].map((n) => (
          <ul key={n} className={styles.list} aria-hidden={n === 1}>
            {items.map((t, i) => <li key={`${n}-${i}`}>{t}<span>✦</span></li>)}
          </ul>
        ))}
      </div>
    </section>
  );
}
