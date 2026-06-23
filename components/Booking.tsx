"use client";

import { motion } from 'framer-motion';
import styles from '@/app/page.module.css';
import { TIMMA_REVIEWS, TIMMA_URL } from '@/lib/seo';

export default function Booking() {
  const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } };

  return (
    <>
      <section id="booking" className={styles.bookingNew}>
        <div className="container">
          <div className={styles.bookingGridNew}>
            <div className={styles.bookingTitleCol}>
              <motion.span 
                className={styles.bookingSubtitle}
                {...fadeInUp}
              >
                VI VENTER PÅ DEG
              </motion.span>
              <motion.h2 
                className={styles.bookingMainTitle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              >
                BESTILL EN <br /> TIME
              </motion.h2>
              
              <motion.button 
                className={styles.bookingMapButton}
                whileHover={{ scale: 1.05, backgroundColor: '#1a1715', color: '#fff', borderColor: '#1a1715' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://timma.no/salon/bennustudio', '_blank')}
                {...fadeInUp}
              >
                BESTILL TIME NÅ
              </motion.button>

              {TIMMA_REVIEWS.reviewCount > 0 && (
                <motion.a
                  href={TIMMA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.reviewBadge}
                  {...fadeInUp}
                >
                  <span className={styles.reviewStars} aria-hidden="true">★★★★★</span>
                  <span className={styles.reviewScore}>
                    {TIMMA_REVIEWS.ratingValue.toFixed(1)} / 5
                  </span>
                  <span className={styles.reviewCount}>
                    {TIMMA_REVIEWS.reviewCount} verifiserte anmeldelser på Timma →
                  </span>
                </motion.a>
              )}
            </div>

            <motion.div 
              className={styles.bookingMapCol}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className={styles.mapContainer}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?q=Rosenlundgata%209,%200474%20Oslo&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  style={{ filter: "grayscale(1) invert(0.9) contrast(1.2)", border: 0 }}
                  title="Bennu Studio Location Map"
                ></iframe>
              </div>
              <div className={styles.addressInfo}>
                <div className={styles.addressTextWrapper}>
                  <span className={styles.addressLabel}>VÅR ADRESSE</span>
                  <span className={styles.addressStreet}>Rosenlundgata 9, 0474 Oslo</span>
                </div>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Rosenlundgata%209,%200474%20Oslo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.getDirectionsLink}
                >
                  FÅ VEIBESKRIVELSE →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
