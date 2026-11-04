'use client';
import { useId, useState } from 'react';
import styles from './Accordion.module.scss';

/** Accessible accordion: buttons with aria-expanded/controls, one open at a time. */
export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className={styles.list}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={styles.item}>
            <h3>
              <button id={`${id}-b${i}`} className={styles.q} aria-expanded={isOpen} aria-controls={`${id}-p${i}`} onClick={() => setOpen(isOpen ? null : i)} data-cursor="hover">
                <span>{it.q}</span><i className={styles.icon} aria-hidden />
              </button>
            </h3>
            <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`} className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
              <div><p className="muted">{it.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
