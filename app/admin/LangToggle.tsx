"use client";

import styles from './admin.module.css';
import type { Lang } from './i18n';

export default function LangToggle({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
}) {
  return (
    <div className={styles.langToggle} role="group" aria-label="Language">
      <button
        type="button"
        className={lang === 'ru' ? styles.langActive : styles.langBtn}
        onClick={() => onChange('ru')}
      >
        RU
      </button>
      <button
        type="button"
        className={lang === 'no' ? styles.langActive : styles.langBtn}
        onClick={() => onChange('no')}
      >
        NO
      </button>
    </div>
  );
}
