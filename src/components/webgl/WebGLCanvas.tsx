'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { onReady } from '@/lib/ready';
import styles from './WebGLCanvas.module.scss';

// Three.js is a separate chunk, only fetched after the page is idle.
const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function WebGLCanvas() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Wait for the preloader to finish, then for an idle moment, so Three.js never competes with first paint.
    let cancel = () => {};
    const stopReady = onReady(() => { cancel = schedule(); });
    return () => { stopReady(); cancel(); };
  }, []);

  function schedule() {
    const go = () => setReady(true);
    // Defer the Three.js chunk until the browser is idle (Safari lacks requestIdleCallback).
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) { const id = w.requestIdleCallback(go, { timeout: 1500 }); return () => w.cancelIdleCallback?.(id); }
    const t = window.setTimeout(go, 400);
    return () => window.clearTimeout(t);
  }
  return (
    <div className={styles.bg} aria-hidden>
      {/* CSS fallback gradient: always rendered, also the no-WebGL experience */}
      <div className={styles.glow} />
      {ready && <Scene />}
    </div>
  );
}
