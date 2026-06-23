import type { GalleryImage } from './types';

// Seed gallery used the first time the site runs (before anything is saved
// in storage). After an admin saves changes, the stored version takes over.
export const galleryImages: GalleryImage[] = [
  { img: '/images/gallery/main/curly.png', label: 'LUKSUS KRØLLER', size: 'medium', col: 1 },
  { img: '/images/gallery/main/one.png', label: 'KLASSISK BALAYAGE', size: 'tall', col: 2 },
  { img: '/images/gallery/main/pink.png', label: 'PASTELL ROSA', size: 'small', col: 3 },
  { img: '/images/gallery/main/purple.png', label: 'DYP LILLA', size: 'small', col: 3 },
  { img: '/images/gallery/main/red.png', label: 'KIRSEBÆRRØD', size: 'hidden', col: 0 },
  { img: '/images/gallery/main/redmix.png', label: 'KOBBER MIX', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/DSC00845 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/DSC00879 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/DSC00901 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/DSC00926 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/DSC06339 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/DSC07330 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/DSC07459 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/DSC07481 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/New in BW-2 (1) 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/New in BW-3 (1) 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
  { img: '/images/gallery/gallery sub/New in BW-7 1.png', label: 'Bennu Style', size: 'hidden', col: 0 },
];
