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
                  <span className={styles.achievementSubtitle}>NORGESMESTERSKAPET / PODIUMSBRAGD</span>
                  <h4 className={styles.achievementTitle}>Norgesmesterskapet</h4>
                  <p className={styles.achievementText}>
                    En tøff nasjonal arena der kun de aller skarpeste lykkes. Våre stylister har konkurrert direkte mot de absolutt beste frisørene og stylistene i hele Norge, og klatret opp på pallen. Et solid bevis på uovertruffen presisjon.
                  </p>
                </motion.div>

                <motion.div 
                  className={styles.achievementCard}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  <span className={styles.achievementSubtitle}>EUROPEISK MESTERSKAP / INTERNASJONALT GULL & HEDER</span>
                  <h4 className={styles.achievementTitle}>OMC Europe Championship</h4>
                  <p className={styles.achievementText}>
                    Et gigantisk steg opp på den internasjonale scenen. Å hente hjem mesterskaps-medalje her betyr at våre fagfolk har konkurrert på absolutt øverste verdensnivå mot de fremste talentene fra hele Europa.
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
