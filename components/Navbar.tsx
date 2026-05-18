"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/app/page.module.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <motion.nav 
        className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.navContainer}>
          <motion.div 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            BENNU STUDIO
          </motion.div>
          <div className={styles.navLinks}>
            <motion.a href="#about" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>OM OSS</motion.a>
            <motion.a href="#services" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>BEHANDLINGER</motion.a>
            <motion.a href="#booking" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>KONTAKT</motion.a>
          </div>
          <motion.button 
            className={styles.getInTouchBtn}
            whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://timma.no/salon/bennustudio', '_blank')}
          >
            BESTILL
          </motion.button>
          <div 
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.mobileMenuLinks}>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>OM OSS</a>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>BEHANDLINGER</a>
              <a href="#booking" onClick={() => setIsMobileMenuOpen(false)}>KONTAKT</a>
            </div>
            <button 
              className={styles.mobileGetInTouchBtn} 
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.open('https://timma.no/salon/bennustudio', '_blank');
              }}
            >
              BESTILL
            </button>
            <div className={styles.mobileMenuSocials}>
              <a href="https://www.facebook.com/p/Bennu-Studio-100086563312587/" target="_blank" rel="noopener noreferrer">FACEBOOK</a>
              <a href="https://instagram.com/Bennu.studio.oslo" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
