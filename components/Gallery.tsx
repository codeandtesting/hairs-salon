"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from '@/app/page.module.css';
import { galleryImages as seedGallery } from '@/data/gallery';
import type { GalleryImage } from '@/data/types';

export default function Gallery({ images }: { images?: GalleryImage[] }) {
  const galleryImages: GalleryImage[] = images && images.length ? images : seedGallery;
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIdx(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  // Lock scrolling when Lightbox is open
  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeIdx]);

  // Filter images for the 3-column grid structure (we show the first 4 in the specific layout)
  const col1Items = galleryImages.filter(item => item.col === 1);
  const col2Items = galleryImages.filter(item => item.col === 2);
  const col3Items = galleryImages.filter(item => item.col === 3);

  // Map clicked grid item to its global index
  const handleItemClick = (imgSrc: string) => {
    const globalIdx = galleryImages.findIndex(item => item.img === imgSrc);
    if (globalIdx !== -1) {
      setActiveIdx(globalIdx);
    }
  };

  return (
    <>
      <section id="gallery" className={styles.gallery}>
        <div className={styles.galleryWrapper}>
          <div className={styles.galleryContainer}>
            <motion.h2 
              className={styles.galleryMainTitle}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              GALLERI
            </motion.h2>
            <div className={styles.galleryGrid}>
              
              {/* Column 1 */}
              <motion.div 
                className={styles.galleryCol}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {col1Items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={styles.galleryImgMedium}
                    onClick={() => handleItemClick(item.img)}
                    style={{ overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                  >
                    <motion.div
                      className={styles.galleryImgInner}
                      style={{ width: '100%', height: '100%', position: 'relative' }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image 
                        src={item.img} 
                        alt={item.label} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.imgCover} 
                        priority
                      />
                    </motion.div>
                    <span className={styles.galleryLabel}>{item.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Column 2 */}
              <motion.div 
                className={styles.galleryCol}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                {col2Items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={styles.galleryImgTall}
                    onClick={() => handleItemClick(item.img)}
                    style={{ overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                  >
                    <motion.div
                      className={styles.galleryImgInner}
                      style={{ width: '100%', height: '100%', position: 'relative' }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image 
                        src={item.img} 
                        alt={item.label} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.imgCover} 
                        priority
                      />
                    </motion.div>
                    <span className={styles.galleryLabel}>{item.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Column 3 */}
              <motion.div 
                className={styles.galleryCol}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                {col3Items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={styles.galleryImgSmall}
                    onClick={() => handleItemClick(item.img)}
                    style={{ overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                  >
                    <motion.div
                      className={styles.galleryImgInner}
                      style={{ width: '100%', height: '100%', position: 'relative' }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image 
                        src={item.img} 
                        alt={item.label} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.imgCover} 
                      />
                    </motion.div>
                    <span className={styles.galleryLabel}>{item.label}</span>
                  </div>
                ))}
              </motion.div>

            </div>

            <div className={styles.galleryFooter}>
              <p className={styles.galleryDesc}>
                I galleriet finner du fargerike og stilige bilder skapt av våre spesialister, samt resultatene av ulike behandlinger og kosmetiske pleier. Vi er stolte av det vi oppnår, og deler gjerne våre resultater med deg.
              </p>
              <motion.button 
                className={styles.viewProjectsBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                SE ALLE PROSJEKTER
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal (Full-screen Colorful View) */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div 
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Close Button */}
            <button 
              className={styles.lightboxClose}
              onClick={() => setActiveIdx(null)}
              aria-label="Close Lightbox"
            >
              ✕
            </button>

            {/* Left Nav Arrow */}
            <button 
              className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0));
              }}
              aria-label="Previous Image"
            >
              ←
            </button>

            {/* Main Lightbox Content */}
            <div className={styles.lightboxContent} onClick={() => setActiveIdx(null)}>
              <motion.div 
                className={styles.lightboxImageWrapper}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()} // Prevent click out closing
              >
                <Image 
                  src={galleryImages[activeIdx].img} 
                  alt={galleryImages[activeIdx].label}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className={styles.lightboxImage}
                  priority
                />
              </motion.div>
              <motion.span 
                className={styles.lightboxLabel}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {galleryImages[activeIdx].label}
              </motion.span>
            </div>

            {/* Right Nav Arrow */}
            <button 
              className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx((prev) => (prev !== null ? (prev + 1) % galleryImages.length : 0));
              }}
              aria-label="Next Image"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
