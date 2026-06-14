import { promises as fs } from 'fs';
import path from 'path';
import type { SiteContent } from '@/data/types';
import { seedContent } from '@/data/seed';

// Storage abstraction.
//   - On Vercel: reads/writes Upstash Redis (Vercel "KV" / Redis integration).
//   - Locally (no Redis env vars): reads/writes a JSON file under .data/.
// Either way the public site and admin panel use the same getContent/saveContent.

const CONTENT_KEY = 'bennu:content';
const LOCAL_PATH = path.join(process.cwd(), '.data', 'content.json');

function getRedis() {
  // Support both Vercel KV naming and native Upstash naming.
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  // Imported lazily so local dev never needs the package configured.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Redis } = require('@upstash/redis') as typeof import('@upstash/redis');
  return new Redis({ url, token });
}

async function readLocal(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(LOCAL_PATH, 'utf8');
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

async function writeLocal(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, JSON.stringify(content, null, 2), 'utf8');
}

export async function getContent(): Promise<SiteContent> {
  const redis = getRedis();
  if (redis) {
    const stored = await redis.get<SiteContent>(CONTENT_KEY);
    if (stored && Array.isArray(stored.services) && Array.isArray(stored.gallery)) {
      return stored;
    }
    return seedContent;
  }
  const local = await readLocal();
  return local ?? seedContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(CONTENT_KEY, content);
    return;
  }
  await writeLocal(content);
}
