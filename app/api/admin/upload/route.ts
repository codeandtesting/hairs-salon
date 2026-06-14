import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { isAuthed } from '@/lib/auth';

// Receives an image file and stores it:
//   - On Vercel (BLOB_READ_WRITE_TOKEN set): uploads to Vercel Blob, returns CDN URL.
//   - Locally: writes to public/images/gallery/uploads/, returns a /images/... path.

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ code: 'unauthorized', error: 'Ikke autorisert.' }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ code: 'expected_form', error: 'Forventet skjemadata.' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ code: 'no_file', error: 'Ingen fil ble lastet opp.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ code: 'file_too_large', error: 'Filen er for stor (maks 8 MB).' }, { status: 400 });
  }

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  if (!ALLOWED.includes(ext)) {
    return NextResponse.json({ code: 'invalid_file_type', error: 'Ugyldig filtype.' }, { status: 400 });
  }

  const filename = `${Date.now()}-${randomId()}.${ext}`;

  try {
    // Vercel Blob path
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob');
      const blob = await put(`gallery/${filename}`, file, { access: 'public' });
      return NextResponse.json({ url: blob.url });
    }

    // Safeguard for Vercel deployment without the token configured
    if (process.env.VERCEL) {
      return NextResponse.json(
        { code: 'missing_blob_token', error: 'BLOB_READ_WRITE_TOKEN is not configured on Vercel.' },
        { status: 500 }
      );
    }

    // Local dev path
    const buffer = Buffer.from(await file.arrayBuffer());
    const dir = path.join(process.cwd(), 'public', 'images', 'gallery', 'uploads');
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, filename), buffer);
    return NextResponse.json({ url: `/images/gallery/uploads/${filename}` });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { code: 'upload_failed', error: err.message || 'Opplasting mislyktes.' },
      { status: 500 }
    );
  }
}
