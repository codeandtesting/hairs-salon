"use client";

import { useState } from 'react';
import styles from './admin.module.css';
import LangToggle from './LangToggle';
import { translations, persistLang, type Lang } from './i18n';

export default function LoginForm({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const t = translations[lang];

  function changeLang(next: Lang) {
    setLang(next);
    persistLang(next);
    setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(t.errors[data.code] || t.errors.generic);
        setLoading(false);
      }
    } catch {
      setError(t.errors.generic);
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginCard} onSubmit={handleSubmit}>
        <div className={styles.loginToggleRow}>
          <LangToggle lang={lang} onChange={changeLang} />
        </div>
        <h1 className={styles.loginBrand}>BENNU STUDIO</h1>
        <p className={styles.loginSub}>{t.loginSubtitle}</p>
        <input
          type="password"
          className={styles.input}
          placeholder={t.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.primaryBtn} disabled={loading}>
          {loading ? t.loggingIn : t.login}
        </button>
      </form>
    </div>
  );
}
