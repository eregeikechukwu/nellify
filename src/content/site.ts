// All page copy lives here so it is easy to edit without touching components.
export const HERO = {
  eyebrow: 'Web development studio',
  headline: 'We build websites that make your business look as credible as it is.',
  sub: 'Custom-coded, fast on mobile data, and secure by design. No templates. No page-builder bloat.',
};

export const MARQUEE = ['Landing pages', 'Web portals', 'Portfolios', 'Real estate sites', 'Restaurant sites', 'E-commerce', 'Dashboards'];

export type Service = { title: string; desc: string; items: string[] };
export const SERVICES: Service[] = [
  { title: 'Landing pages', desc: 'One focused page that turns visitors into enquiries.', items: ['Conversion-led copy structure', 'Mobile-first, fast loading', 'Analytics and enquiry tracking'] },
  { title: 'Business websites', desc: 'A credible multi-page site that does the explaining for you.', items: ['Home, services, about, contact', 'SEO-ready from day one', 'Easy updates after launch'] },
  { title: 'Web portals & dashboards', desc: 'Secure systems for logins, records, uploads and approvals.', items: ['Role-based access', 'Database design and security', 'Email notifications'] },
  { title: 'Portfolios', desc: 'Show your work with impact, for creatives and agencies.', items: ['Case study pages', 'Smooth motion and transitions', 'Built to be shared'] },
  { title: 'Real estate sites', desc: 'Listings and galleries that make buyers pick up the phone.', items: ['Property pages and galleries', 'Enquiry and viewing forms', 'WhatsApp click-to-chat'] },
  { title: 'Restaurant & hospitality', desc: 'Menus, ambience and bookings that fill tables.', items: ['Mobile-friendly menus', 'Booking requests', 'Gallery and location'] },
  { title: 'E-commerce', desc: 'Product catalogues and checkout that feel trustworthy.', items: ['Product and category pages', 'Payment integration', 'Order notifications'] },
];

export const PROCESS = [
  { title: 'Discover', desc: 'We learn your business, customers and goals, then agree on scope, timeline and what success looks like.' },
  { title: 'Design', desc: 'You see the look and structure before any code. We refine it with you until it feels right.' },
  { title: 'Build', desc: 'Every page is coded by hand for speed, security and smooth motion, tested on real phones.' },
  { title: 'Launch & support', desc: 'We deploy, connect your domain, and stay on hand for fixes and improvements after go-live.' },
];

export const WHY = [
  { title: 'Custom-coded, not templated', desc: "Your site is built around your business, so it does not look like everyone else's." },
  { title: 'Fast on mobile data', desc: 'Light pages, optimised images and lazy-loaded effects, because most visitors are on a phone.' },
  { title: 'Secure by design', desc: 'Proper authentication, validated forms and protected data, not an afterthought.' },
];

// Commitments, not metrics. SWAP with real numbers (projects delivered, load time, etc.) once you have them.
export const STATS = [
  { value: '100%', label: 'Custom-coded' },
  { value: '0', label: 'Templates used' },
  { value: '24h', label: 'Reply time' },
];

// SWAP: add real testimonials here. The section stays hidden while this array is empty.
export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [];

export const FAQ = [
  { q: 'How long does a website take?', a: 'A focused landing page is usually ready in 1 to 2 weeks. A multi-page business site takes 3 to 5 weeks, and portals or e-commerce take longer. You get a clear timeline before we start.' },
  { q: 'How do you price projects?', a: 'Fixed pricing per project, based on pages, features and complexity. You get a written quote after a short call, with no surprise add-ons.' },
  { q: 'Do you handle hosting and domains?', a: 'Yes. We set up fast hosting, connect your domain, configure email and SSL, and hand over everything so you stay in control of your accounts.' },
  { q: 'How many revisions do I get?', a: 'Each stage includes revision rounds, which are agreed up front, so the design is right before we build and the build is right before we launch.' },
  { q: 'How does payment work?', a: 'A deposit starts the project, with the balance split by milestones and the final payment due at launch. We agree the schedule in writing first.' },
  { q: 'Do you offer support after launch?', a: 'Yes. Fixes for launch issues are covered, and you can add a monthly plan for updates, monitoring and improvements.' },
];

export const ABOUT_VALUES = [
  { title: 'Built by hand', desc: 'The person you talk to is the person who writes your code. No hand-offs and no lost-in-translation.' },
  { title: 'Performance is a feature', desc: 'A beautiful site that takes 10 seconds to load on mobile data loses customers. We design for both.' },
  { title: 'Honest scope', desc: 'We tell you what you need and what you do not, and we say no to complexity that will not pay off.' },
  { title: 'Secure and maintainable', desc: 'Clean, documented code and sensible security, so your site stays reliable as your business grows.' },
];
