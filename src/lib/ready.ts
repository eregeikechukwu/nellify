// Tiny pub/sub so hero animations wait for the preloader to finish.
declare global { interface Window { __nellifyReady?: boolean } }
export const READY_EVENT = 'nellify:ready';

export function markReady() {
  window.__nellifyReady = true;
  window.dispatchEvent(new Event(READY_EVENT));
}

/** Runs cb once the preloader is done (immediately if it already is). Returns cleanup. */
export function onReady(cb: () => void): () => void {
  if (window.__nellifyReady) { cb(); return () => {}; }
  const handler = () => cb();
  window.addEventListener(READY_EVENT, handler, { once: true });
  return () => window.removeEventListener(READY_EVENT, handler);
}
