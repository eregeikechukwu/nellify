import RevealText from '@/components/ui/RevealText';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { whatsappLink } from '@/lib/constants';
import styles from './CTABand.module.scss';

/** Final conversion band. Reused at the bottom of most pages. */
export default function CTABand({ title = 'Have a project in mind?' }: { title?: string }) {
  return (
    <section className={styles.band}>
      <div className="container">
        <RevealText as="h2" className={`h-xl ${styles.title}`}>{title}</RevealText>
        <Reveal className={styles.actions}>
          <Button href="/contact" size="lg">Start a project</Button>
          <Button href={whatsappLink()} variant="ghost" size="lg" external>Chat on WhatsApp</Button>
        </Reveal>
        <Reveal><p className="muted">We reply within 24 hours.</p></Reveal>
      </div>
    </section>
  );
}
