export interface FaqItem {
  q: string;
  a: string;
}

// Answer-first FAQ content. Every answer leads with the direct response and uses
// only verified facts (address, hours, phone, real prices). This both helps
// visitors and feeds the FAQPage schema that AI search reads.
export const faqItems: FaqItem[] = [
  {
    q: 'Hvor ligger Bennu Studio?',
    a: 'Bennu Studio ligger i Rosenlundgata 9, 0474 Oslo, på Torshov – kort vei fra Oslo sentrum.',
  },
  {
    q: 'Hvordan bestiller jeg time?',
    a: 'Du bestiller enkelt time online via timma.no/salon/bennustudio, eller ved å ringe oss på +47 915 52 878.',
  },
  {
    q: 'Hva er åpningstidene?',
    a: 'Vi har åpent mandag til lørdag kl. 09:00–23:00 og søndag kl. 09:00–12:00.',
  },
  {
    q: 'Hvilke behandlinger tilbyr dere?',
    a: 'Vi tilbyr dame- og herreklipp, farge, balayage, AirTouch, striper, blekning, hårkur og keratinbehandling, extensions, permanent, vipper og bryn, oppsett og makeup, samt skjegg, hårfjerning og piercing.',
  },
  {
    q: 'Hva koster en dameklipp og herreklipp?',
    a: 'Dameklipp koster fra 1092 kr og inkluderer vask og føning. Herreklipp koster 873 kr inkludert vask og styling. Barneklipp for barn under 10 år koster 693 kr.',
  },
  {
    q: 'Tilbyr dere balayage og AirTouch?',
    a: 'Ja. Vi er spesialister på lysningsteknikker som balayage (fra 2988 kr) og AirTouch (fra 4170 kr), med myke, naturlige overganger og lang holdbarhet.',
  },
  {
    q: 'Gjør dere håranalyse før behandling?',
    a: 'Ja, vi tilbyr mikrokamera-konsultasjon for en detaljert analyse av hår og hodebunn, slik at behandling og farge tilpasses akkurat ditt hår.',
  },
  {
    q: 'Hvor erfarne er frisørene?',
    a: 'Teamet vårt har over 15 års erfaring og internasjonal konkurransebakgrunn, med spesialisering på blond, avansert farge, extensions og presisjonsklipp.',
  },
];
