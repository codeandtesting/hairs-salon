"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/app/page.module.css';

export default function Hero({ onSelectGender }: { onSelectGender?: (gender: 'DAME' | 'HERRE') => void }) {

  return (
    <>
      <motion.section 
        className={styles.heroNew}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div 
          className={styles.heroHalf}
          whileHover="hover"
          initial="rest"
        >
          <motion.div 
            className={styles.heroImgWrapper}
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image 
              src="/images/female 1.png" 
              alt="Female Style" 
              fill 
              className={styles.heroImg}
              priority
            />
          </motion.div>
          <motion.a 
            href="#services" 
            className={styles.heroLink}
            variants={{
              rest: { y: 0, opacity: 1, scale: 1 },
              hover: { y: -8, opacity: 0.7, scale: 1.05 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e) => {
              e.preventDefault();
              onSelectGender?.('DAME');
              const target = document.getElementById('services');
              if (target) {
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const offsetPosition = (elementRect - bodyRect) - 90;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
          >
            DAME
          </motion.a>
        </motion.div>

        <motion.div 
          className={styles.heroHalf}
          whileHover="hover"
          initial="rest"
        >
          <motion.div 
            className={styles.heroImgWrapper}
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image 
              src="/images/male 1.png" 
              alt="Male Style" 
              fill 
              className={styles.heroImg}
              priority
            />
          </motion.div>
          <motion.a 
            href="#services" 
            className={styles.heroLink}
            variants={{
              rest: { y: 0, opacity: 1, scale: 1 },
              hover: { y: -8, opacity: 0.7, scale: 1.05 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e) => {
              e.preventDefault();
              onSelectGender?.('HERRE');
              const target = document.getElementById('services');
              if (target) {
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const offsetPosition = (elementRect - bodyRect) - 90;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
          >
            HERRE
          </motion.a>
        </motion.div>
      </motion.section>
    </>
  );
}
