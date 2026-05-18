"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/app/page.module.css';
import { servicesList } from '@/data/services';

export default function Services({ 
  selectedGender, 
  onSelectGender 
}: { 
  selectedGender?: 'DAME' | 'HERRE' | null;
  onSelectGender?: (gender: 'DAME' | 'HERRE' | null) => void;
}) {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeSubService, setActiveSubService] = useState<string | null>(null);

  useEffect(() => {
    if (selectedGender) {
      setActiveServiceIndex(0); // Reset to KLIPP & KONSULTASJON where Dameklipp / Herreklipp are located
      setActiveSubService(null);
    }
  }, [selectedGender]);

  const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } };
  const listVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
  return (
    <>
      <section id="services" className={styles.services}>
        <div className="container">
          <div className={styles.servicesHeader}>
            <motion.span 
              className={styles.servicesSubtitle}
              {...fadeInUp}
            >
              FREMHEV DIN NATURLIGE SKJØNNHET
            </motion.span>
            <motion.h2 
              className={styles.servicesTitle}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              BEHANDLINGER
            </motion.h2>
          </div>
          <div className={styles.servicesContainer}>
            <div className={styles.servicesLeft}>
              <motion.ul 
                className={styles.servicesList}
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {servicesList.map((service, index) => {
                  const isActive = activeServiceIndex === index;
                  return (
                    <li key={index} className={styles.serviceItemWrapper}>
                      <motion.div 
                        className={`${styles.serviceHeaderLink} ${isActive ? styles.activeService : ''}`}
                        onClick={() => {
                          setActiveServiceIndex(index);
                          setActiveSubService(null); // Reset subservice filter to show all
                          onSelectGender?.(null); // Clear selected gender when category is clicked manually
                        }}
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {service.name}
                      </motion.div>
                      <AnimatePresence>
                        {isActive && service.subServices && service.subServices.length > 1 && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={styles.subServicesList}
                          >
                            {service.subServices.map((sub, sIdx) => {
                              const isSubActive = activeSubService === sub;
                              return (
                                <li 
                                  key={sIdx} 
                                  className={`${styles.subServiceItem} ${isSubActive ? styles.activeSubServiceItem : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent category click trigger
                                    setActiveSubService(isSubActive ? null : sub);
                                  }}
                                >
                                  {sub}
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </motion.ul>
            </div>
            {/* Middle Column - Scrollable treatment price list */}
            <div className={styles.servicesMiddle}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeServiceIndex}-${activeSubService}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className={styles.treatmentsListContainer}
                >
                  <h3 className={styles.categoryTreatmentsTitle}>
                    {servicesList[activeServiceIndex].name} {activeSubService && `— ${activeSubService}`}
                  </h3>
                  <div className={styles.treatmentsScroll}>
                    {servicesList[activeServiceIndex].treatments
                      ?.filter(treatment => !activeSubService || treatment.sub === activeSubService)
                      .map((treatment, tIdx) => {
                        const isHighlighted = 
                          (selectedGender === 'DAME' && treatment.title.toLowerCase().includes('dameklipp')) ||
                          (selectedGender === 'HERRE' && treatment.title.toLowerCase().includes('herreklipp'));

                        return (
                          <div 
                            key={tIdx} 
                            className={`${styles.treatmentItem} ${isHighlighted ? styles.highlightedTreatment : ''}`}
                          >
                            <div className={styles.treatmentHeader}>
                              <span className={styles.treatmentTitle}>{treatment.title}</span>
                              <span className={styles.treatmentDots}></span>
                              <span className={styles.treatmentPrice}>{treatment.price}</span>
                            </div>
                            {treatment.desc && (
                              <p className={styles.treatmentDescription}>{treatment.desc}</p>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>


          </div>
          <motion.div 
            className={styles.servicesFooter}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button 
              className={styles.bookAppointmentBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open('https://timma.no/salon/bennustudio', '_blank')}
            >
              BESTILL TIME
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
