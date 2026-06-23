import type { Metadata } from "next";
import Script from "next/script";
import { aggregateRatingLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bennu Studio | Eksklusiv Frisørsalong på Torshov, Oslo",
  description: "Bennu Studio er en prisvinnende frisørsalong på Torshov i Oslo. Våre eksperter tilbyr klipp, avansert farge, balayage, AirTouch og extensions av ypperste kvalitet. Bestill time enkelt i dag!",
  metadataBase: new URL("https://bennustudio.no"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "frisør Oslo",
    "frisør Torshov",
    "Bennu Studio",
    "prisvinnende frisør",
    "balayage Oslo",
    "AirTouch Oslo",
    "hårklipp",
    "hårfarge",
    "extensions Oslo",
    "hårstyling",
    "salong Rosenlundgata"
  ],
  openGraph: {
    title: "Bennu Studio | Eksklusiv Frisørsalong på Torshov, Oslo",
    description: "Prisvinnende frisør og hårstylister på Torshov i Oslo. Hårklipp, avansert farging, balayage, AirTouch og extensions. Velkommen til en eksklusiv opplevelse.",
    url: "https://bennustudio.no",
    siteName: "Bennu Studio",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: "/images/bennu_studio_banner.png",
        width: 1200,
        height: 630,
        alt: "Bennu Studio Eksklusiv Frisørsalong",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bennu Studio | Eksklusiv Frisørsalong på Torshov, Oslo",
    description: "Prisvinnende frisør og hårstylister på Torshov i Oslo. Klipp, avansert farge, balayage, AirTouch og extensions.",
    images: ["/images/bennu_studio_banner.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["HairSalon", "BeautySalon"],
  "name": "Bennu Studio",
  "description": "Eksklusiv, prisvinnende frisørsalong på Torshov i Oslo. Spesialister på avansert farge, balayage, AirTouch, extensions og presisjonsklipp.",
  "image": "https://bennustudio.no/images/bennu_studio_banner.png",
  "@id": "https://bennustudio.no/#salon",
  "url": "https://bennustudio.no",
  "telephone": "+4791552878",
  "priceRange": "$$",
  "currenciesAccepted": "NOK",
  "areaServed": { "@type": "City", "name": "Oslo" },
  "knowsAbout": [
    "Hårklipp",
    "Hårfarge",
    "Balayage",
    "AirTouch",
    "Striper",
    "Hair extensions",
    "Keratinbehandling",
    "Vipper og bryn",
    "Bryllupsoppsett"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rosenlundgata 9",
    "addressLocality": "Oslo",
    "postalCode": "0474",
    "addressCountry": "NO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 59.9329,
    "longitude": 10.7712
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "09:00",
      "closes": "12:00"
    }
  ],
  "sameAs": [
    "https://timma.no/salon/bennustudio",
    "https://www.facebook.com/p/Bennu-Studio-100086563312587/",
    "https://instagram.com/Bennu.studio.oslo"
  ],
  // Verified Timma reviews; omitted automatically until real numbers are set.
  ...(aggregateRatingLd() ? { "aggregateRating": aggregateRatingLd() } : {})
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-149LDP1SSG"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-149LDP1SSG');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
