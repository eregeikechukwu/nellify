import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/contactSchema';

export const runtime = 'nodejs'; // Nodemailer needs Node APIs (not the Edge runtime)

// Basic in-memory rate limit (5 per hour per IP). On serverless this resets between cold starts,
// so swap for Upstash/Redis if you need strict limits.
const hits = new Map<string, number[]>();
const WINDOW = 60 * 60 * 1000, MAX = 5;
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now); hits.set(ip, recent);
  return recent.length > MAX;
}
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const d = parsed.data;
  if (d.company) return NextResponse.json({ ok: true }); // honeypot tripped: pretend success

  // ===== SWAP HERE: set these in .env.local (see .env.example). Never hardcode credentials. =====
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[contact] SMTP env vars missing, message not sent:', { name: d.name, email: d.email });
    return NextResponse.json({ error: 'Email not configured' }, { status: 503 }); // client shows mailto fallback
  }

  try {
    const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT ?? 465), secure: Number(SMTP_PORT ?? 465) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await transporter.sendMail({
      from: `"Nellify website" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL ?? SMTP_USER,
      replyTo: `${d.name} <${d.email}>`,
      subject: `New enquiry: ${d.projectType} (${d.name})`,
      text: `Name: ${d.name}\nEmail: ${d.email}\nProject: ${d.projectType}\nBudget: ${d.budget}\nTimeline: ${d.timeline}\n\n${d.message}`,
      html: `<h2>New enquiry</h2><p><b>Name:</b> ${esc(d.name)}<br><b>Email:</b> ${esc(d.email)}<br><b>Project:</b> ${esc(d.projectType)}<br><b>Budget:</b> ${esc(d.budget)}<br><b>Timeline:</b> ${esc(d.timeline)}</p><p>${esc(d.message).replace(/\n/g, '<br>')}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed', err);
    return NextResponse.json({ error: 'Send failed' }, { status: 500 });
  }
}
