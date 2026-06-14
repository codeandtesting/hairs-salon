import type { Service } from '@/data/types';
import type { FaqItem } from '@/data/faq';

export const SITE_URL = 'https://bennustudio.no';
export const SALON_ID = `${SITE_URL}/#salon`;

// Pull the first number out of a price string: "fra 2633kr" -> "2633", "873kr" -> "873".
function parsePrice(raw: string): string {
  const match = raw.replace(/\s/g, '').match(/\d+/);
  return match ? match[0] : '0';
}

// Machine-readable price list. Lets AI answer "how much is X at Bennu Studio?"
// and links every offer back to the salon entity defined in layout.tsx.
export function offerCatalogLd(services: Service[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Behandlinger og priser – Bennu Studio',
    url: `${SITE_URL}/#services`,
    provider: { '@id': SALON_ID },
    itemListElement: services.map((cat) => ({
      '@type': 'OfferCatalog',
      name: cat.name,
      itemListElement: cat.treatments.map((t) => ({
        '@type': 'Offer',
        price: parsePrice(t.price),
        priceCurrency: 'NOK',
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: t.title,
          ...(t.desc ? { description: t.desc } : {}),
          provider: { '@id': SALON_ID },
        },
      })),
    })),
  };
}

// FAQPage schema, generated from the same data the visible FAQ renders,
// so the markup always matches what's on the page (a Google requirement).
export function faqLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
