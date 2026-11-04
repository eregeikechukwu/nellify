import Image from 'next/image';
import TransitionLink from '@/components/ui/TransitionLink';
import { NAV_LINKS, SITE, SOCIALS, whatsappLink } from '@/lib/constants';
import styles from './Footer.module.scss';

export default function Footer() {
  const socials = SOCIALS.filter((s) => s.url);
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.about}>
            <div className={styles.brand}><Image src="/logo.png" alt="" width={40} height={35} /><span>Nellify</span></div>
            <p className="muted">Custom websites, portals and digital products for businesses that want to look as good as they are.</p>
          </div>
          <nav aria-label="Footer" className={styles.col}>
            <h3>Explore</h3>
            <TransitionLink href="/">Home</TransitionLink>
            {NAV_LINKS.map((l) => <TransitionLink key={l.href} href={l.href}>{l.label}</TransitionLink>)}
          </nav>
          <div className={styles.col}>
            <h3>Contact</h3>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp: {SITE.whatsappDisplay}</a>
            {socials.map((s) => <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Nellify. All rights reserved.</span>
          <span>Built with care in Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
