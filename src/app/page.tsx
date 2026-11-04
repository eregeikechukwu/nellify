import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import SelectedWork from '@/components/sections/SelectedWork';
import InlineCTA from '@/components/sections/InlineCTA';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Why from '@/components/sections/Why';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTABand from '@/components/sections/CTABand';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <SelectedWork />
      <InlineCTA />
      <Services />
      <Process />
      <Why />
      <Testimonials />
      <FAQ />
      <CTABand />
    </>
  );
}
