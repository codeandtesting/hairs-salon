"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/app/page.module.css';

export default function About() {

  return (
    <>
      <section id="about" className={styles.aboutNew}>
        <div className="container">
          <div className={styles.aboutContentNew}>
            <motion.h2 
              className={styles.aboutMainTitle}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              OM OSS
            </motion.h2>
            <motion.div 
              className={styles.aboutImageCol}
              initial={{ opacity: 0, scale: 0.93, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <Image 
                src="/images/salon_new.png" 
                alt="Salon Interior" 
                width={800} 
                height={500} 
                className={styles.salonImg}
              />
            </motion.div>
            <div className={styles.aboutTextCol}>
              <motion.p 
                className={styles.aboutPhilosophy}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                Frisører med over 15 års erfaring og internasjonal konkurransebakgrunn. Spesialister på blond, avansert farge, balayage, AirTouch, extensions og presisjonsklipp. Her kombinerer vi teknisk perfeksjon med estetisk forståelse for å skape hår som holder seg vakkert over tid.
                <br /><br />
                Vi arbeider med høykvalitets produkter og tilbyr skreddersydde behandlinger tilpasset hver kunde. Kvalitet. Eksklusiv opplevelse.
              </motion.p>
            </div>
          </div>
        </div>
        <div className={styles.sectionDivider}></div>
      </section>
    </>
  );
}
