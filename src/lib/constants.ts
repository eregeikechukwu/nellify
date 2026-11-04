// ===== Site-wide constants. Search for "SWAP" to find things to replace. =====
export const SITE = {
  name: 'Nellify',
  tagline: 'Web development studio',
  // SWAP: your real production domain (also set NEXT_PUBLIC_SITE_URL in .env.local)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nellify.com',
  email: 'eregeikechukwu@gmail.com',
  // SWAP: WhatsApp number in international format, digits only (e.g. 2348012345678)
  whatsappNumber: '2340000000000',
  // SWAP: shown in the footer / contact page
  whatsappDisplay: '+234 XXX XXX XXXX',
  whatsappMessage: "Hi Nellify, I'd like to talk about a website project.",
} as const;

export const whatsappLink = (message: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

// SWAP: add real profile URLs. Empty ones are hidden automatically.
export const SOCIALS: { label: string; url: string }[] = [
  { label: 'LinkedIn', url: '' },
  { label: 'X / Twitter', url: '' },
  { label: 'Instagram', url: '' },
];

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;
