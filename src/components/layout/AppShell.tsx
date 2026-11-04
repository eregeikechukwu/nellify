'use client';
import type { ReactNode } from 'react';
import TransitionProvider from '@/components/ui/TransitionProvider';
import DistortFilter from '@/components/ui/DistortFilter';
import WebGLCanvas from '@/components/webgl/WebGLCanvas';
import SmoothScroll from './SmoothScroll';
import Preloader from './Preloader';
import Cursor from './Cursor';
import Nav from './Nav';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

/** Persistent chrome: lives in the root layout so the canvas and scroll survive navigation. */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <TransitionProvider>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <DistortFilter />
      <WebGLCanvas />
      <a href="#main" className="sr-only">Skip to content</a>
      <Nav />
      <main id="main" style={{ position: 'relative', zIndex: 1 }}>{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </TransitionProvider>
  );
}
