'use client';
import { useState, type FormEvent } from 'react';
import { contactSchema, PROJECT_TYPES, BUDGETS, TIMELINES } from '@/lib/contactSchema';
import { SITE } from '@/lib/constants';
import styles from './ContactForm.module.scss';

type Errors = Partial<Record<string, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [draft, setDraft] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setDraft(`Name: ${data.name}%0D%0AProject: ${data.projectType}%0D%0ABudget: ${data.budget}%0D%0ATimeline: ${data.timeline}%0D%0A%0D%0A${encodeURIComponent(data.message ?? '')}`);

    // Inline validation (same schema the server uses)
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((i) => { next[String(i.path[0])] ??= i.message; });
      setErrors(next);
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setErrors({}); setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed.data) });
      if (!res.ok) throw new Error('failed');
      setStatus('success'); form.reset();
    } catch { setStatus('error'); }
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.tick} aria-hidden>✓</span>
        <h2 className="h-md">Message sent.</h2>
        <p className="muted">Thanks for reaching out. We'll reply within 24 hours.</p>
      </div>
    );
  }

  const field = (name: string) => ({ 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-err` : undefined });
  const Err = ({ name }: { name: string }) => (errors[name] ? <span id={`${name}-err`} className={styles.err} role="alert">{errors[name]}</span> : null);

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <label>Your name<input name="name" autoComplete="name" {...field('name')} /><Err name="name" /></label>
        <label>Email<input name="email" type="email" autoComplete="email" {...field('email')} /><Err name="email" /></label>
      </div>
      <label>Project type
        <select name="projectType" defaultValue="" {...field('projectType')}><option value="" disabled>Select…</option>{PROJECT_TYPES.map((o) => <option key={o}>{o}</option>)}</select><Err name="projectType" />
      </label>
      <div className={styles.row}>
        <label>Budget range<select name="budget" defaultValue="" {...field('budget')}><option value="" disabled>Select…</option>{BUDGETS.map((o) => <option key={o}>{o}</option>)}</select><Err name="budget" /></label>
        <label>Timeline<select name="timeline" defaultValue="" {...field('timeline')}><option value="" disabled>Select…</option>{TIMELINES.map((o) => <option key={o}>{o}</option>)}</select><Err name="timeline" /></label>
      </div>
      <label>Tell us about your project<textarea name="message" rows={5} {...field('message')} /><Err name="message" /></label>
      {/* Honeypot: hidden from people, bots fill it in */}
      <div className={styles.hp} aria-hidden><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
      <button type="submit" className={styles.submit} disabled={status === 'sending'} data-cursor="hover">{status === 'sending' ? 'Sending…' : 'Send message ↗'}</button>
      {status === 'error' && (
        <p className={styles.fail} role="alert">Something went wrong sending that. You can <a href={`mailto:${SITE.email}?subject=Project enquiry&body=${draft}`}>email us directly</a> or use WhatsApp.</p>
      )}
    </form>
  );
}
