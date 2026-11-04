'use client';
import { useEffect, useRef, type ElementType } from 'react';
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '@/animations/gsap';
import { onReady } from '@/lib/ready';
import { cn } from '@/lib/utils';

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  /** 'load' waits for the preloader; 'scroll' plays when the element enters the viewport. */
  trigger?: 'load' | 'scroll';
  delay?: number;
};

/** Headline reveal: split into lines, each masked and slid up. Re-splits on resize. */
export default function RevealText({ children, as: Tag = 'div', className, trigger = 'scroll', delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { el.classList.remove('rt-pending'); return; }

    let split: SplitText | null = null;
    let st: ScrollTrigger | null = null;
    let stopReady: () => void = () => {};
    let played = false;
    let dead = false;

    const play = (lines: Element[]) => {
      played = true;
      gsap.to(lines, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09, delay });
    };

    document.fonts.ready.then(() => {
      if (dead) return;
      split = SplitText.create(el, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit: (self) => {
          el.classList.remove('rt-pending');
          gsap.set(self.lines, { yPercent: played ? 0 : 110 });
          if (played) return;
          st?.kill(); stopReady();
          if (trigger === 'load') stopReady = onReady(() => play(self.lines));
          else st = ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => play(self.lines) });
        },
      });
    });

    return () => { dead = true; st?.kill(); stopReady(); split?.revert(); };
  }, [children, trigger, delay]);

  return <Tag ref={ref} className={cn('rt-pending', className)}>{children}</Tag>;
}
