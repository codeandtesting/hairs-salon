"use client";

import { useState } from 'react';
import styles from '@/app/page.module.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Stylists from '@/components/Stylists';
import Gallery from '@/components/Gallery';
import Results from '@/components/Results';
import Faq from '@/components/Faq';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';
import type { Service, GalleryImage } from '@/data/types';

export default function HomeClient({
  services,
  gallery,
}: {
  services: Service[];
  gallery: GalleryImage[];
}) {
  const [selectedGender, setSelectedGender] = useState<'DAME' | 'HERRE' | null>(null);

  return (
    <main className={styles.main}>
      <Navbar />
      <Hero onSelectGender={setSelectedGender} />
      <About />
      <Services
        services={services}
        selectedGender={selectedGender}
        onSelectGender={setSelectedGender}
      />
      <Stylists />
      <Gallery images={gallery} />
      <Results />
      <Faq />
      <Booking />
      <Footer />
    </main>
  );
}
