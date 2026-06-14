"use client";

import { useState, useRef } from 'react';
import styles from './admin.module.css';
import LangToggle from './LangToggle';
import { translations, persistLang, type Lang } from './i18n';
import type { SiteContent, GalleryImage, GallerySize } from '@/data/types';

const SIZE_OPTIONS: GallerySize[] = ['medium', 'tall', 'small', 'hidden'];

export default function AdminClient({
  initial,
  initialLang,
}: {
  initial: SiteContent;
  initialLang: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [content, setContent] = useState<SiteContent>(initial);
  const [tab, setTab] = useState<'services' | 'gallery'>('services');
  const [activeCat, setActiveCat] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const t = translations[lang];

  function changeLang(next: Lang) {
    setLang(next);
    persistLang(next);
    setMessage(null);
  }

  // ---- helpers: services ----
  function patchTreatment(catIdx: number, trIdx: number, field: 'title' | 'price' | 'desc' | 'sub', value: string) {
    setContent((prev) => {
      const services = prev.services.map((s, i) => {
        if (i !== catIdx) return s;
        const treatments = s.treatments.map((t2, j) => (j === trIdx ? { ...t2, [field]: value } : t2));
        return { ...s, treatments };
      });
      return { ...prev, services };
    });
  }

  function addTreatment(catIdx: number) {
    setContent((prev) => {
      const services = prev.services.map((s, i) => {
        if (i !== catIdx) return s;
        const sub = s.subServices[0] || '';
        return { ...s, treatments: [...s.treatments, { title: '', price: '0kr', desc: '', sub }] };
      });
      return { ...prev, services };
    });
  }

  function removeTreatment(catIdx: number, trIdx: number) {
    setContent((prev) => {
      const services = prev.services.map((s, i) => {
        if (i !== catIdx) return s;
        return { ...s, treatments: s.treatments.filter((_, j) => j !== trIdx) };
      });
      return { ...prev, services };
    });
  }

  // ---- helpers: gallery ----
  function patchImage(idx: number, field: keyof GalleryImage, value: string | number) {
    setContent((prev) => {
      const gallery = prev.gallery.map((g, i) => (i === idx ? { ...g, [field]: value } : g));
      return { ...prev, gallery };
    });
  }

  function removeImage(idx: number) {
    setContent((prev) => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== idx) }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        setContent((prev) => ({
          ...prev,
          gallery: [...prev.gallery, { img: data.url, label: '', size: 'small', col: 3 }],
        }));
        setMessage({ kind: 'ok', text: t.uploadedRemember });
      } else {
        setMessage({ kind: 'err', text: t.errors[data.code] || t.errors.upload_failed });
      }
    } catch {
      setMessage({ kind: 'err', text: t.errors.upload_failed });
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  }

  // ---- save / logout ----
  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage({ kind: 'ok', text: t.saved });
      } else {
        const data = await res.json().catch(() => ({}));
        setMessage({ kind: 'err', text: t.errors[data.code] || t.errors.save_failed });
      }
    } catch {
      setMessage({ kind: 'err', text: t.errors.save_failed });
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.reload();
  }

  const cat = content.services[activeCat];

  return (
    <div className={styles.adminWrap}>
      {/* Top bar */}
      <header className={styles.topbar}>
        <div className={styles.brandRow}>
          <span className={styles.brand}>BENNU STUDIO</span>
          <span className={styles.brandTag}>{t.adminTag}</span>
        </div>
        <div className={styles.topActions}>
          {message && (
            <span className={message.kind === 'ok' ? styles.msgOk : styles.msgErr}>{message.text}</span>
          )}
          <LangToggle lang={lang} onChange={changeLang} />
          <a href="/" target="_blank" className={styles.ghostBtn}>{t.viewSite}</a>
          <button className={styles.primaryBtn} onClick={save} disabled={saving}>
            {saving ? t.saving : t.save}
          </button>
          <button className={styles.ghostBtn} onClick={logout}>{t.logout}</button>
        </div>
      </header>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={tab === 'services' ? styles.tabActive : styles.tab}
          onClick={() => setTab('services')}
        >
          {t.tabServices}
        </button>
        <button
          className={tab === 'gallery' ? styles.tabActive : styles.tab}
          onClick={() => setTab('gallery')}
        >
          {t.tabGallery}
        </button>
      </div>

      {/* SERVICES */}
      {tab === 'services' && (
        <div className={styles.servicesLayout}>
          <aside className={styles.catList}>
            {content.services.map((s, i) => (
              <button
                key={i}
                className={i === activeCat ? styles.catItemActive : styles.catItem}
                onClick={() => setActiveCat(i)}
              >
                {s.name}
                <span className={styles.catCount}>{s.treatments.length}</span>
              </button>
            ))}
          </aside>

          <section className={styles.editPane}>
            {cat && (
              <>
                <div className={styles.paneHead}>
                  <h2 className={styles.paneTitle}>{cat.name}</h2>
                  <button className={styles.addBtn} onClick={() => addTreatment(activeCat)}>
                    {t.addTreatment}
                  </button>
                </div>

                <div className={styles.treatments}>
                  {cat.treatments.map((tr, j) => (
                    <div key={j} className={styles.treatmentCard}>
                      <div className={styles.row}>
                        <div className={styles.field} style={{ flex: 2 }}>
                          <label className={styles.label}>{t.fieldName}</label>
                          <input
                            className={styles.input}
                            value={tr.title}
                            onChange={(e) => patchTreatment(activeCat, j, 'title', e.target.value)}
                          />
                        </div>
                        <div className={styles.field} style={{ flex: 1 }}>
                          <label className={styles.label}>{t.fieldPrice}</label>
                          <input
                            className={styles.input}
                            value={tr.price}
                            onChange={(e) => patchTreatment(activeCat, j, 'price', e.target.value)}
                          />
                        </div>
                        {cat.subServices.length > 1 && (
                          <div className={styles.field} style={{ flex: 1.5 }}>
                            <label className={styles.label}>{t.fieldSub}</label>
                            <select
                              className={styles.input}
                              value={tr.sub}
                              onChange={(e) => patchTreatment(activeCat, j, 'sub', e.target.value)}
                            >
                              {cat.subServices.map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>{t.fieldDesc}</label>
                        <textarea
                          className={styles.textarea}
                          rows={2}
                          value={tr.desc}
                          onChange={(e) => patchTreatment(activeCat, j, 'desc', e.target.value)}
                        />
                      </div>
                      <button className={styles.removeBtn} onClick={() => removeTreatment(activeCat, j)}>
                        {t.deleteTreatment}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {/* GALLERY */}
      {tab === 'gallery' && (
        <div className={styles.galleryPane}>
          <div className={styles.paneHead}>
            <h2 className={styles.paneTitle}>{t.galleryTitle}</h2>
            <label className={styles.addBtn}>
              {uploading ? t.uploading : t.upload}
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <p className={styles.hint}>{t.galleryHint}</p>

          <div className={styles.galleryGrid}>
            {content.gallery.map((g, i) => (
              <div key={i} className={styles.imageCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.img} alt={g.label} className={styles.thumb} />
                <div className={styles.field}>
                  <label className={styles.label}>{t.fieldLabel}</label>
                  <input
                    className={styles.input}
                    value={g.label}
                    onChange={(e) => patchImage(i, 'label', e.target.value)}
                  />
                </div>
                <div className={styles.row}>
                  <div className={styles.field} style={{ flex: 1 }}>
                    <label className={styles.label}>{t.fieldSize}</label>
                    <select
                      className={styles.input}
                      value={g.size}
                      onChange={(e) => patchImage(i, 'size', e.target.value as GallerySize)}
                    >
                      {SIZE_OPTIONS.map((s) => (
                        <option key={s} value={s}>{t.sizes[s]}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field} style={{ flex: 1 }}>
                    <label className={styles.label}>{t.fieldColumn}</label>
                    <input
                      type="number"
                      min={0}
                      max={3}
                      className={styles.input}
                      value={g.col}
                      onChange={(e) => patchImage(i, 'col', Number(e.target.value))}
                    />
                  </div>
                </div>
                <button className={styles.removeBtn} onClick={() => removeImage(i)}>
                  {t.deleteImage}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
