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
              rest: { y: 0, opacity: 1 },
              hover: { y: -8, opacity: 0.7 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => onSelectGender?.('DAME')}
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
              rest: { y: 0, opacity: 1 },
              hover: { y: -8, opacity: 0.7 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => onSelectGender?.('HERRE')}
          >
            HERRE
          </motion.a>
        </motion.div>
      </motion.section>
    </>
  );
}
