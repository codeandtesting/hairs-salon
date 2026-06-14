import type { SiteContent } from './types';
import { servicesList } from './services';
import { galleryImages } from './gallery';

// The default content shipped with the code. Used as a fallback whenever
// storage is empty (fresh deploy, or local dev before the first save).
export const seedContent: SiteContent = {
  services: servicesList,
  gallery: galleryImages,
};
