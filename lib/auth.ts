import { cookies } from 'next/headers';
import crypto from 'crypto';

// Simple single-password admin auth.
//   - ADMIN_PASSWORD: the password the owner types on /admin.
//   - ADMIN_SECRET (optional): extra salt for the session cookie. Falls back
//     to a derived default so things still work if it isn't set.
// The cookie never contains the password itself, only an HMAC of it, so it
// cannot be reversed and cannot be forged without the server-side secret.

export const AUTH_COOKIE = 'bennu_admin';

function sessionToken(): string {
  const password = process.env.ADMIN_PASSWORD || '';
  const secret = process.env.ADMIN_SECRET || `bennu::${password}::studio`;
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

export function expectedToken(): string {
  return sessionToken();
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return false;
  // Constant-time compare to avoid timing leaks.
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  const value = jar.get(AUTH_COOKIE)?.value;
  return !!value && value === sessionToken();
}
