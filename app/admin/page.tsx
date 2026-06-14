import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { isAuthed } from '@/lib/auth';
import { getContent } from '@/lib/store';
import { LANG_COOKIE, type Lang } from './i18n';
import LoginForm from './LoginForm';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin | Bennu Studio',
  robots: { index: false, follow: false },
};

// Always render fresh so the editor shows the latest stored content.
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const jar = await cookies();
  // An explicit toggle choice (saved in the cookie) wins. Otherwise the login
  // screen defaults to Norwegian (it's a publicly reachable URL) while the
  // editor inside defaults to Russian.
  const cookieLang = jar.get(LANG_COOKIE)?.value;
  const explicitLang: Lang | null =
    cookieLang === 'no' || cookieLang === 'ru' ? cookieLang : null;

  if (!(await isAuthed())) {
    return <LoginForm initialLang={explicitLang ?? 'no'} />;
  }

  const content = await getContent();
  return <AdminClient initial={content} initialLang={explicitLang ?? 'ru'} />;
}
