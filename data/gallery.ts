import type { GalleryImage } from './types';

// Seed gallery used the first time the site runs (before anything is saved
// in storage). After an admin saves changes, the stored version takes over.
export const galleryImages: GalleryImage[] = [
  { img: '/images/gallery/main/curly.JPG', label: 'LUKSUS KRØLLER', size: 'medium', col: 1 },
  { img: '/images/gallery/main/one.jpg', label: 'KLASSISK BALAYAGE', size: 'tall', col: 2 },
  { img: '/images/gallery/main/pink.jpg', label: 'PASTELL ROSA', size: 'small', col: 3 },
  { img: '/images/gallery/main/purple.jpg', label: 'DYP LILLA', size: 'small', col: 3 },
  { img: '/images/gallery/main/red.JPG', label: 'KIRSEBÆRRØD', size: 'hidden', col: 0 },
  { img: '/images/gallery/main/redmix.JPG', label: 'KOBBER MIX', size: 'hidden', col: 0 },
];
