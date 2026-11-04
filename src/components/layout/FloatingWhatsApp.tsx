'use client';
import { whatsappLink } from '@/lib/constants';
import styles from './FloatingWhatsApp.module.scss';

/** Floating WhatsApp button shown on every page. */
export default function FloatingWhatsApp() {
  return (
    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.fab} aria-label="Chat on WhatsApp" data-cursor="hover">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.82.83-3.02-.2-.31a8.2 8.2 0 1 1 6.95 3.83Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.71-1.32.08-.16.04-.3-.02-.42l-.75-1.8c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31c-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.65 4.2 3.72 1.57.68 2.18.74 2.97.62.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" /></svg>
    </a>
  );
}
