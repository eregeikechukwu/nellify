import RevealText from '@/components/ui/RevealText';
import Reveal from '@/components/ui/Reveal';
import TransitionLink from '@/components/ui/TransitionLink';
import { SERVICES } from '@/content/site';
import styles from './Services.module.scss';

export default function Services() {
  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <span className="eyebrow">What we build</span>
        <RevealText as="h2" className="h-lg">Seven kinds of sites. One standard.</RevealText>
        <ul className={styles.list}>
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} className={styles.item} y={24}>
              <TransitionLink href="/services" className={styles.row} data-cursor="hover">
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={`muted ${styles.desc}`}>{s.desc}</p>
                <span className={styles.arrow} aria-hidden>↗</span>
              </TransitionLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
