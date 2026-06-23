"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/app/page.module.css';

export default function Stylists() {
  const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } };
  return (
    <>
      <section id="stylists" className={styles.stylists}>
        <div className="container">
          <div className={styles.stylistHeader}>
            <motion.h2 
              className={styles.stylistMainTitle}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              STYLISTER
            </motion.h2>
            <motion.p 
              className={styles.stylistSubTitle}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              VÅRT TEAM AV EKSPERTER ER DEDIKERT TIL <br /> DIN UNIKE STIL
            </motion.p>
          </div>
          <div className={styles.stylistDivider}></div>
          <div className={styles.stylistContent}>
            <div className={styles.stylistInfoCol}>
              <motion.span 
                className={styles.experienceLabel}
                {...fadeInUp}
              >
                20 ÅRS ERFARING
              </motion.span>
              <motion.h3 
                className={styles.stylistName}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                Agata <br /> Andresen
              </motion.h3>
              <motion.p 
                className={styles.stylistBio}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                Jeg er en eksperthårstylist som veileder kunder og skreddersyr klipp, farge og frisyrer tilpasset deres stil.
              </motion.p>
            </div>
            <motion.div 
              className={styles.stylistImageCol}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.mainStylistImgWrapper}>
                <Image 
                  src="/images/gallery/stylist/agata3.jpeg" 
                  alt="Agata Andresen" 
                  fill 
                  className={styles.stylistMainImg}
                />
              </div>
            </motion.div>
            <div className={styles.stylistRightCol}>
              <motion.div 
                className={styles.sideStylistImgWrapper}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                <Image 
                  src="/images/gallery/stylist/agata2.jpeg" 
                  alt="Styling Detail" 
                  fill 
                  className={styles.stylistSideImg}
                />
              </motion.div>
              <div className={styles.chooseSpecialistWrapper}>
                <motion.button 
                  className={styles.chooseSpecialistBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://timma.no/salon/bennustudio', '_blank')}
                >
                  VELG EN SPESIALIST
                </motion.button>
              </div>
            </div>
          </div>

          {/* Qualifications & Masterclasses Sub-section */}
          <div className={styles.qualificationsSection}>
            <div className={styles.qualificationsContent}>
              <motion.div 
                className={styles.qualificationsLeftCol}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.qualificationsSubtitle}>FAGLIG TYNGDE</span>
                <h4 className={styles.qualificationsHeader}>
                  SERTIFISERT EKSPERTISE & KONTINUERLIG UTVIKLING
                </h4>
                <p className={styles.qualificationsIntro}>
                  Hos Bennu Studio er vi lidenskapelig opptatt av faget vårt. Vi oppgraderer kompetansen vår kontinuerlig hvert eneste år med de nyeste globale teknikkene, moderne teknologiene og markedsledende materialene for å gi deg et feilfritt, skreddersydd og sunt resultat.
                </p>
              </motion.div>

              <motion.div 
                className={styles.qualificationsRightCol}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                <div className={styles.qualificationPillar}>
                  <h5 className={styles.qualificationCategory}>Offentlig Godkjenning & Trygghet</h5>
                  <p className={styles.qualificationText}>Innehar offisielt svennebrev i frisørfaget. Bennu Studio er en godkjent opplæringsbedrift i Oslo Kommune, noe som sikrer faglig tyngde og trygghet.</p>
                </div>
                
                <div className={styles.qualificationPillar}>
                  <h5 className={styles.qualificationCategory}>Avansert Fargeteknikk & Klipp</h5>
                  <p className={styles.qualificationText}>Spesialistutdanning og årlig kompetanseheving innen de mest populære og moderne fargeteknikkene (Wella Education, Rudenkov Blond Expert, Sebastian Professional, og Hollywood Waves).</p>
                </div>

                <div className={styles.qualificationPillar}>
                  <h5 className={styles.qualificationCategory}>Extensions av Ypperste Kvalitet</h5>
                  <p className={styles.qualificationText}>Sertifisert og godkjent partner for påsetting av luksuriøse hårextensions fra verdensledende aktører som Balmain Hair og Great Lengths.</p>
                </div>

                <div className={styles.qualificationPillar}>
                  <h5 className={styles.qualificationCategory}>Hodebunnspleie & Skjønnhet</h5>
                  <p className={styles.qualificationText}>Utdannet hodebunnspesialist fra Miriamquevedo (Hair & Scalp Longevity), samt sertifiseringer innen medisinsk piercing (Blomdahl) og biologisk hud- og skjønnhetspleie.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
