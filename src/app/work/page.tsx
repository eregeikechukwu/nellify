import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import { ProjectCard } from '@/components/sections/SelectedWork';
import CTABand from '@/components/sections/CTABand';
import { PROJECTS } from '@/content/projects';
import styles from './work.module.scss';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected website and portal builds from Nellify: real estate, hospitality and secure dashboards.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Selected projects." sub="Concept builds that show the standard we work to. Real client case studies will be added as they launch." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className={`container ${styles.grid}`}>
          {PROJECTS.map((p, i) => <Reveal key={p.slug}><ProjectCard project={p} index={i} /></Reveal>)}
        </div>
      </section>
      <CTABand />
    </>
  );
}
