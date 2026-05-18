"use client";

import Image from 'next/image';
import styles from '@/app/page.module.css';

export default function Footer() {

  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <Image 
                src="/images/bennu-studio.png" 
                alt="Bennu Studio Logo" 
                width={80} 
                height={80} 
                className={styles.footerLogoImg}
              />
              <div className={styles.footerLogo}>BENNU <br /> STUDIO</div>
            </div>

            <div className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>FØLG OSS</h4>
              <ul className={styles.footerList}>
                <li><a href="https://www.facebook.com/p/Bennu-Studio-100086563312587/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://instagram.com/Bennu.studio.oslo" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>KONTAKTINFORMASJON</h4>
              <a href="tel:+4791552878" className={styles.footerContact}>+47 91 55 28 78</a>
              <a href="mailto:bennu.studio.oslo@gmail.com" className={styles.footerContact}>bennu.studio.oslo@gmail.com</a>
              <p className={styles.footerAddress}>
                Rosenlundgata 9, <br />
                0474 Oslo, NO
              </p>
            </div>

            <div className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>ÅPNINGSTIDER</h4>
              <div className={styles.openingHours}>
                <div className={styles.hoursRow}>
                  <span className={styles.hoursDay}>MAN - LØR</span>
                  <span className={styles.hoursTime}>09:00 - 23:00</span>
                </div>
                <div className={styles.hoursRow}>
                  <span className={styles.hoursDay}>SØNDAG</span>
                  <span className={styles.hoursTime}>09:00 - 12:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span>© {new Date().getFullYear()} BENNU STUDIO. MED ENERETT.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
