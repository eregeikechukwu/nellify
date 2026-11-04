import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import AppShell from '@/components/layout/AppShell';
import { SITE } from '@/lib/constants';
import '@/styles/globals.scss';

// Self-hosted, preloaded variable fonts (swap files in src/fonts to change typefaces).
const heading = localFont({ src: '../fonts/heading.woff2', variable: '--font-heading', display: 'swap', weight: '200 800' });
const body = localFont({ src: '../fonts/body.woff2', variable: '--font-body', display: 'swap', weight: '200 800' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Nellify | Custom websites that build credibility', template: '%s | Nellify' },
  description: 'Nellify is a web development studio building fast, secure, custom-coded websites, portals and landing pages for businesses.',
  openGraph: { type: 'website', siteName: 'Nellify', title: 'Nellify | Custom websites that build credibility', description: 'Fast, secure, custom-coded websites and portals for businesses.', url: '/' },
  twitter: { card: 'summary_large_image' },
};
export const viewport: Viewport = { themeColor: '#070b14', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <noscript><style>{'.preloader{display:none!important}.rt-pending,.rv-pending{opacity:1!important}'}</style></noscript>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
