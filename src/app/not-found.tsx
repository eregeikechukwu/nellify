import PageHero from '@/components/sections/PageHero';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="This page took a wrong turn." sub="The page you're looking for doesn't exist or has moved." />
      <section className="container" style={{ paddingBottom: 140 }}>
        <Button href="/" size="lg">Back to home</Button>
      </section>
    </>
  );
}
