# Admin Panel — Setup Guide

The site has a built-in admin panel at **`/admin`** for editing prices and gallery
photos. It lives in the same Next.js app and deploys to the same Vercel project —
no second server.

---

## How it works

| What you edit | Where it's stored (production) | Where it's stored (local dev) |
|---|---|---|
| Prices / treatments | Vercel Redis (KV) | `.data/content.json` |
| Gallery photos | Vercel Blob | `public/images/gallery/uploads/` |
| Admin password | `ADMIN_PASSWORD` env var | `.env.local` |

The public homepage reads this content on every (revalidated) render. When you
click **Lagre endringer** in the admin, the homepage is refreshed automatically —
no redeploy needed.

---

## Local testing (already configured)

1. `npm run dev`
2. Open <http://localhost:3000/admin>
3. Log in with the password in `.env.local` (default: `bennu123`)
4. Edit prices / upload photos → **Lagre endringer**
5. Open <http://localhost:3000> to see changes

Locally, data is written to `.data/content.json` and uploads to
`public/images/gallery/uploads/` (both gitignored).

---

## Production setup on Vercel (one-time, ~10 min)

### 1. Set the admin password
Vercel dashboard → your project → **Settings → Environment Variables**:
- `ADMIN_PASSWORD` = a strong password
- `ADMIN_SECRET` = any long random string

### 2. Add Redis (for prices)
Dashboard → **Storage → Create Database → Redis** (Upstash via Marketplace).
Click **Connect to Project**. This auto-injects `KV_REST_API_URL` /
`KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`) —
the code reads either naming.

### 3. Add Blob (for photos)
Dashboard → **Storage → Create → Blob**. Click **Connect to Project**.
This auto-injects `BLOB_READ_WRITE_TOKEN`.

### 4. Redeploy
Trigger a redeploy so the new env vars take effect. Done.

> Until Redis/Blob are connected in production, the site still works and shows the
> default content from the code (`data/services.ts`, `data/gallery.ts`), but saving
> from `/admin` won't persist. Connect them to enable editing in production.

---

## Notes

- `/admin` is excluded from search engines (`robots: noindex`).
- The login cookie is httpOnly and contains only an HMAC of the password — never
  the password itself.
- Free tiers of Redis + Blob comfortably cover a salon landing page.
- A commercial site should use Vercel's **Pro** plan per Vercel's terms (unrelated
  to this admin panel).
