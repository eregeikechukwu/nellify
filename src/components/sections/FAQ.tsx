import RevealText from '@/components/ui/RevealText';
import Accordion from '@/components/ui/Accordion';
import { FAQ as FAQ_ITEMS } from '@/content/site';
import styles from './FAQ.module.scss';

export default function FAQ() {
  return (
    <section className={`section ${styles.faq}`} id="faq">
      <div className={`container ${styles.grid}`}>
        <div>
          <span className="eyebrow">FAQ</span>
          <RevealText as="h2" className="h-lg">Questions, answered.</RevealText>
        </div>
        <Accordion items={FAQ_ITEMS} />
      </div>
      {/* FAQ structured data helps search results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }) }} />
    </section>
  );
}
