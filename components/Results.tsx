"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/app/page.module.css';

export default function Results() {
  const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } };
  
  // Double repeating list of brands to guarantee a seamless, infinite loop cycle
  const brands = [
    "Noir Stockholm", "Harah", "Miriam Quevedo", "Wella Professionals",
    "Noir Stockholm", "Harah", "Miriam Quevedo", "Wella Professionals",
    "Noir Stockholm", "Harah", "Miriam Quevedo", "Wella Professionals"
  ];

  return (
    <>
      <section id="results" className={styles.results}>
        <div className="container">
          <motion.h2 
            className={styles.resultsTitle}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            PRISVINNENDE MESTERE <br />
            NASJONAL & EUROPEISK ELITE <br />
            HÅNDVERK UTEN KOMPROMISS
          </motion.h2>
          
          <div className={styles.stylistDivider}></div>

          <div className={styles.resultsContent}>
            {/* Left Column: Achievements & Copy */}
            <div className={styles.resultsTextCol}>
              <motion.p 
                className={styles.resultsIntro}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Hos Bennu Studio møter du kun frisører og stylister med brennende lidenskap og meritter på det absolutt høyeste faglige nivået. Vi strekker oss lenger for at du skal få et kompromissløst og skreddersydd resultat.
              </motion.p>

              <div className={styles.achievementsList}>
                <motion.div 
                  className={styles.achievementCard}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  <span className={styles.achievementSubtitle}>VERDENSMESTERSKAPET / BRANSJENS OL (PARIS, 2025)</span>
                  <h4 className={styles.achievementTitle}>OMC Hairworld Paris</h4>
                  <p className={styles.achievementText}>
                    Deltakerdiplom som representant for det norske landslaget (OMC Team Norway). Dette er frisørbransjens offisielle verdensmesterskap og den største globale scenen man kan konkurrere på.
                  </p>
                </motion.div>

                <motion.div 
                  className={styles.achievementCard}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  <span className={styles.achievementSubtitle}>EUROPEISK MESTERSKAP / SØLVMEDALJE (MOSKVA, 2013)</span>
                  <h4 className={styles.achievementTitle}>OMC Europe Championship</h4>
                  <p className={styles.achievementText}>
                    Sølvmedalje i kategorien Senior Gents Full Fashion Look. Å oppnå pallplassering i Europamesterskapet bekrefter teknisk presisjon og styling i europeisk toppklasse.
                  </p>
                </motion.div>

                <motion.div 
                  className={styles.achievementCard}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                >
                  <span className={styles.achievementSubtitle}>GLOBAL BRAND AWARD / GULLVINNER</span>
                  <h4 className={styles.achievementTitle}>Wella TrendVision Award</h4>
                  <p className={styles.achievementText}>
                    Gullvinner i den nasjonale fargekategorien Color Visionary. Dette beviser spisskompetanse innen fargeteknikker og kreativitet på høyt nivå.
                  </p>
                </motion.div>

                <motion.div 
                  className={styles.achievementCard}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                >
                  <span className={styles.achievementSubtitle}>NORGESMESTERSKAPET / PODIUMSBRAGD (OSLO, 2013)</span>
                  <h4 className={styles.achievementTitle}>Norgesmesterskapet</h4>
                  <p className={styles.achievementText}>
                    Diplom og pallplassering i kategorien Herre Senior Full Fashion Look. Konkurranse på nasjonalt elitenivå anerkjent av Norske Frisør- og Velværebedrifter (NFVB).
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Premium High-Fashion Image */}
            <motion.div 
              className={styles.resultsImageCol}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image 
                src="/images/medals.JPG" 
                alt="Bennu Studio Championship Medals" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.resultsMainImg}
              />
            </motion.div>
          </div>

          {/* Brands Ticker Section */}
          <div className={styles.brandsWrapper}>
            <motion.p 
              className={styles.brandIntroText}
              {...fadeInUp}
            >
              Vi bruker kun merkevarer av ypperste kvalitet
            </motion.p>
            <motion.div 
              className={styles.brandMarqueeContainer}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className={styles.brandMarqueeTrack}>
                {brands.map((brand, i) => (
                  <div key={i} className={styles.brandMarqueeItem}>
                    {brand}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
