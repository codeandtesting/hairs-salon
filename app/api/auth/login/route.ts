import { NextResponse } from 'next/server';
import { AUTH_COOKIE, expectedToken, passwordMatches } from '@/lib/auth';

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { code: 'missing_password', error: 'Serveren mangler ADMIN_PASSWORD. Sett den i miljøvariablene.' },
      { status: 500 },
    );
  }

  let password = '';
  try {
    const body = await req.json();
    password = typeof body?.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ code: 'invalid_request', error: 'Ugyldig forespørsel.' }, { status: 400 });
  }

  if (!passwordMatches(password)) {
    return NextResponse.json({ code: 'wrong_password', error: 'Feil passord.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
