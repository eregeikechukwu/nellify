import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import styles from './InlineCTA.module.scss';

/** Short conversion nudge placed right after the work section. */
export default function InlineCTA() {
  return (
    <section className={styles.cta}>
      <Reveal className={`container ${styles.row}`}>
        <p className="h-md">Like what you see? Let's make something like it for your business.</p>
        <Button href="/contact" size="lg">Start a project</Button>
      </Reveal>
    </section>
  );
}
