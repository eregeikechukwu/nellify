// SWAP: replace these concept projects with real ones as they ship.
export type Project = {
  slug: string; title: string; category: string; year: string; blurb: string;
  art: 'estate' | 'dining' | 'portal'; tags: string[]; stack: string[];
  challenge: string; approach: string; results: { label: string; value: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'property-showcase', title: 'Property Showcase', category: 'Real estate', year: '2026', art: 'estate',
    blurb: 'A scroll-driven property site where listings reveal like a walkthrough.',
    tags: ['Concept project', 'Real estate', 'WebGL'], stack: ['Next.js', 'Three.js', 'GSAP', 'TypeScript'],
    challenge: 'Most property sites are slow grids of photos that look identical to every competitor. Buyers bounce before they reach the listing that would have sold.',
    approach: 'A cinematic, scroll-led layout that moves the visitor through each property, with fast image loading and a one-tap enquiry button on every listing.',
    // SWAP: replace with real measured results. These are placeholders.
    results: [{ label: 'Load time on 4G', value: '[00s]' }, { label: 'Enquiry rate', value: '[00%]' }, { label: 'Lighthouse (mobile)', value: '[00]' }],
  },
  {
    slug: 'restaurant-landing', title: 'Ember & Oak', category: 'Hospitality', year: '2026', art: 'dining',
    blurb: 'An atmospheric restaurant site with menu reveals and instant table booking.',
    tags: ['Concept project', 'Hospitality', 'Booking'], stack: ['Next.js', 'GSAP', 'Tailwind', 'Nodemailer'],
    challenge: 'Diners decide in seconds. A heavy, template-looking site loses them before they see the menu or find the booking button.',
    approach: 'Warm, motion-led storytelling, a menu that is easy to scan on a phone, and a booking flow that sends the request straight to WhatsApp or email.',
    results: [{ label: 'Load time on 4G', value: '[00s]' }, { label: 'Booking requests', value: '[00]' }, { label: 'Lighthouse (mobile)', value: '[00]' }],
  },
  {
    slug: 'client-portal', title: 'Clientline Portal', category: 'Web portal', year: '2026', art: 'portal',
    blurb: 'A secure, role-based dashboard for teams that outgrew spreadsheets.',
    tags: ['Concept project', 'Portal', 'Auth'], stack: ['Next.js', 'Supabase', 'PostgreSQL', 'TypeScript'],
    challenge: 'Teams track clients, files and approvals across chats and spreadsheets, so data goes missing and nobody is sure what is current.',
    approach: 'One secure dashboard with role-based access, row-level security on the database, clear tables and uploads, and email notifications.',
    results: [{ label: 'Manual steps removed', value: '[00]' }, { label: 'Time saved per week', value: '[00h]' }, { label: 'Lighthouse (mobile)', value: '[00]' }],
  },
];
