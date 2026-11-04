import type { ImageMetadata } from 'astro';
import { getCollection, getEntry } from 'astro:content';

/** Prefix an internal path with the deploy base (needed on username.github.io/repo). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

// Every uploaded photo, keyed by file name. Pages CMS writes "/projects/<file>",
// and the file itself sits in src/assets/projects, where Astro can optimize it.
const photoModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);
const photos = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(photoModules)) {
  photos.set(path.split('/').pop()!.toLowerCase(), mod.default);
}

/** Resolve a CMS image path to an optimizable image, or null if the file is missing. */
export function photo(path: string | undefined): ImageMetadata | null {
  if (!path) return null;
  const name = decodeURIComponent(path.split('/').pop() || '').toLowerCase();
  const found = photos.get(name);
  if (!found) console.warn(`[site] Photo not found in src/assets/projects: ${path}`);
  return found ?? null;
}

export async function getSettings() {
  const entry = await getEntry('settings', 'site');
  if (!entry) throw new Error('Missing src/content/settings.json');
  return entry.data;
}

/** Published projects, in the order the architect set (then newest first). */
export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => data.published);
  return all.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
}

/** Escape text, then turn *word* into <em>word</em> for the headline. */
export function emphasis(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function whatsappHref(number: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}`;
}

/** Remove quotation marks typed around a quote — the page adds its own. */
export function cleanQuote(text: string): string {
  return text.trim().replace(/^["'“‘«]+/, '').replace(/["'”’»]+$/, '').trim();
}
