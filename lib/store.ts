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

export async function saveContent(content: SiteContent): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(CONTENT_KEY, content);
    return;
  }
  await writeLocal(content);
}

function migrateContent(stored: SiteContent): SiteContent {
  let changed = false;

  // 1. Fix old extensions to .png (case-insensitive: .jpg, .jpeg, .JPG, .JPEG)
  const updatedGallery = stored.gallery.map(img => {
    if (typeof img.img === 'string' && /\.(jpg|jpeg)$/i.test(img.img)) {
      const replaced = img.img.replace(/\.(jpg|jpeg)$/i, '.png');
      changed = true;
      return { ...img, img: replaced };
    }
    return img;
  });

  // 2. De-duplicate the gallery items by their `img` path
  const uniqueGalleryMap = new Map<string, typeof updatedGallery[0]>();
  for (const img of updatedGallery) {
    const existing = uniqueGalleryMap.get(img.img);
    if (!existing) {
      uniqueGalleryMap.set(img.img, img);
    } else {
      // Prioritize the visible/configured version of the image
      if (existing.size === 'hidden' && img.size !== 'hidden') {
        uniqueGalleryMap.set(img.img, img);
        changed = true;
      } else {
        changed = true; // Duplicate discarded
      }
    }
  }

  let finalGallery = Array.from(uniqueGalleryMap.values());

  // 3. Sync any new images from seedContent.gallery (like gallery sub/) that aren't in stored database
  const storedPaths = new Set(finalGallery.map(img => img.img));
  const newImagesFromSeed = seedContent.gallery.filter(img => !storedPaths.has(img.img));
  
  if (newImagesFromSeed.length > 0) {
    finalGallery.push(...newImagesFromSeed);
    changed = true;
  }

  const migrated = {
    ...stored,
    gallery: finalGallery
  };

  if (changed) {
    saveContent(migrated).catch(err => console.error('Failed to save migrated content:', err));
  }

  return migrated;
}

export async function getContent(): Promise<SiteContent> {
  const redis = getRedis();
  if (redis) {
    const stored = await redis.get<SiteContent>(CONTENT_KEY);
    if (stored && Array.isArray(stored.services) && Array.isArray(stored.gallery)) {
      return migrateContent(stored);
    }
    return seedContent;
  }
  const local = await readLocal();
  return local ? migrateContent(local) : seedContent;
}
