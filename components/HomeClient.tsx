"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
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
      </motion.div>
    </main>
  );
}
