// Shared content types used by the public site, the admin panel, and the API.

export interface Treatment {
  title: string;
  price: string;
  desc: string;
  sub: string;
}

export interface Service {
  name: string;
  subServices: string[];
  largeImg: string;
  smallImg: string;
  treatments: Treatment[];
}

export type GallerySize = 'medium' | 'tall' | 'small' | 'hidden';

export interface GalleryImage {
  img: string;
  label: string;
  size: GallerySize;
  col: number;
}

export interface SiteContent {
  services: Service[];
  gallery: GalleryImage[];
}
