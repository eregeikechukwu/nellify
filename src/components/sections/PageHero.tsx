import RevealText from '@/components/ui/RevealText';
import Reveal from '@/components/ui/Reveal';
import styles from './PageHero.module.scss';

export default function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <RevealText as="h1" className={`h-xl ${styles.title}`} trigger="load">{title}</RevealText>
        {sub && <Reveal delay={0.3}><p className={`muted ${styles.sub}`}>{sub}</p></Reveal>}
      </div>
    </section>
  );
}
