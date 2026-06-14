import HomeClient from '@/components/HomeClient';
import { getContent } from '@/lib/store';
import { faqItems } from '@/data/faq';
import { offerCatalogLd, faqLd } from '@/lib/seo';

// Re-render at most once an hour as a safety net; admin saves call
// revalidatePath('/') so edits show up immediately regardless.
export const revalidate = 3600;

export default async function Home() {
  const { services, gallery } = await getContent();

  // Structured data built from the live content so prices in search/AI answers
  // always match what's on the page.
  const structuredData = [offerCatalogLd(services), faqLd(faqItems)];

  return (
    <>
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <HomeClient services={services} gallery={gallery} />
    </>
  );
}
