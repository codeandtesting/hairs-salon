import styles from './Faq.module.css';
import { faqItems } from '@/data/faq';

// Server component → fully crawlable HTML with no JS needed. Native <details>
// keeps every answer in the DOM (visible to users and AI crawlers) while still
// behaving like an accordion.
export default function Faq() {
  return (
    <section id="faq" className={styles.faq}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>OFTE STILTE SPØRSMÅL</span>
          <h2 className={styles.title}>SPØRSMÅL &amp; SVAR</h2>
        </div>
        <div className={styles.list}>
          {faqItems.map((item, i) => (
            <details key={i} className={styles.item} {...(i === 0 ? { open: true } : {})}>
              <summary className={styles.question}>
                <span>{item.q}</span>
                <span className={styles.icon} aria-hidden="true">+</span>
              </summary>
              <p className={styles.answer}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
