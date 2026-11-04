'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import TransitionLink from '@/components/ui/TransitionLink';
import Button from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/constants';
import { getLenis } from '@/lib/lenis';
import { cn } from '@/lib/utils';
import styles from './Nav.module.scss';

/** Sticky nav: blurs after scroll, hides on scroll down, shows on scroll up. */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last.current && y > 240 && !open);
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (open) getLenis()?.stop(); else getLenis()?.start();
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <header className={cn(styles.nav, scrolled && styles.scrolled, hidden && styles.hidden)}>
      <div className={cn('container', styles.row)}>
        <TransitionLink href="/" className={styles.brand} aria-label="Nellify home">
          <Image src="/logo.png" alt="" width={34} height={30} />
          <span>Nellify</span>
        </TransitionLink>

        <nav aria-label="Primary" className={styles.links}>
          {NAV_LINKS.map((l) => (
            <TransitionLink key={l.href} href={l.href} className={cn(styles.link, pathname.startsWith(l.href) && styles.active)}>{l.label}</TransitionLink>
          ))}
        </nav>

        <div className={styles.cta}><Button href="/contact">Start a project</Button></div>

        <button className={styles.burger} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </div>

      <div id="mobile-menu" className={cn(styles.sheet, open && styles.sheetOpen)} aria-hidden={!open}>
        {NAV_LINKS.map((l, i) => (
          <TransitionLink key={l.href} href={l.href} className={styles.sheetLink} style={{ transitionDelay: `${i * 60}ms` }} tabIndex={open ? 0 : -1}>{l.label}</TransitionLink>
        ))}
        <Button href="/contact" size="lg">Start a project</Button>
      </div>
    </header>
  );
}
