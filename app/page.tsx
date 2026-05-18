"use client";

import { useState } from 'react';
import styles from './page.module.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Stylists from '@/components/Stylists';
import Gallery from '@/components/Gallery';
import Results from '@/components/Results';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedGender, setSelectedGender] = useState<'DAME' | 'HERRE' | null>(null);

  return (
    <main className={styles.main}>
      <Navbar />
      <Hero onSelectGender={setSelectedGender} />
      <About />
      <Services selectedGender={selectedGender} onSelectGender={setSelectedGender} />
      <Stylists />
      <Gallery />
      <Results />
      <Booking />
      <Footer />
    </main>
  );
}
