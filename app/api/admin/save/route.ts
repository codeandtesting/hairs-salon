import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthed } from '@/lib/auth';
import { saveContent } from '@/lib/store';
import type { SiteContent } from '@/data/types';

function isValidContent(body: unknown): body is SiteContent {
  if (!body || typeof body !== 'object') return false;
  const c = body as Record<string, unknown>;
  return Array.isArray(c.services) && Array.isArray(c.gallery);
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ code: 'unauthorized', error: 'Ikke autorisert.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: 'invalid_json', error: 'Ugyldig JSON.' }, { status: 400 });
  }

  if (!isValidContent(body)) {
    return NextResponse.json({ code: 'invalid_content', error: 'Ugyldig innhold.' }, { status: 400 });
  }

  await saveContent(body);

  // Refresh the public landing page so changes appear immediately.
  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
