import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import ContactForm from '@/components/sections/ContactForm';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { SITE, whatsappLink } from '@/lib/constants';
import styles from './contact.module.scss';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with Nellify. Tell us what you need and we will reply within 24 hours.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your project." sub="Tell us what you need. We reply within 24 hours with next steps and a clear plan." />
      <section className="section container" style={{ paddingTop: 0 }}>
        <div className={styles.grid}>
          <Reveal><ContactForm /></Reveal>
          <Reveal className={styles.side} delay={0.1}>
            <div className={styles.box}>
              <h2 className="h-md">Prefer WhatsApp?</h2>
              <p className="muted">Send a quick message and we'll chat there. It's the fastest way to reach us.</p>
              <Button href={whatsappLink()} external>Chat on WhatsApp</Button>
            </div>
            <div className={styles.box}>
              <h2 className="h-md">Email</h2>
              <a href={`mailto:${SITE.email}`} className={styles.mail}>{SITE.email}</a>
              <p className="muted">We reply within 24 hours.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
