"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Faq.module.css';
import { faqItems } from '@/data/faq';

export default function Faq() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>OFTE STILTE SPØRSMÅL</span>
          <h2 className={styles.title}>SPØRSMÅL &amp; SVAR</h2>
          <p className={styles.introText}>
            Oppgrader stilen din hos vår frisørsalong i hjertet av Oslo. Våre dyktige frisører spesialserer seg på de mest populære og moderne fargeteknikkene, inkludert Balayage, Airtouch og klassiske striper (highlighting). Enten du ønsker en subtil solkysset look, en total hårfarging, eller en skreddersydd hårklipp, gir vi deg et feilfritt resultat som fremhever din naturlige skjønnhet. Bestill din time i Oslo i dag for et fantastisk og sunt hår!
          </p>
        </div>
        <div className={styles.list}>
          {faqItems.map((item, i) => {
            const isOpen = openIndexes.includes(i);
            return (
              <div key={i} className={styles.item}>
                <button
                  className={styles.questionButton}
                  onClick={() => toggleIndex(i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <motion.span
                    className={styles.icon}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ 
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={styles.answer}>{item.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
