import type { ContentItem } from '@/types/content';
import { db } from './client';
import { contentItems } from './schema';

function safeJSONParse<T>(jsonString: string | null): T | undefined {
  if (!jsonString) return undefined;
  try {
    return JSON.parse(jsonString);
  } catch {
    return undefined;
  }
}

export async function getAllContentItems(): Promise<ContentItem[]> {
  const items = await db.select().from(contentItems);

  return items.map((item) => ({
    id: item.id,
    type: item.type,
    postType: item.postType,
    title: item.title,
    description: item.description,
    date: item.date,
    url: item.url || undefined,
    icon: item.icon,
    author: item.authorName
      ? {
          name: item.authorName,
          handle: item.authorHandle || '',
          avatar: item.authorAvatar || '',
        }
      : undefined,
    media: safeJSONParse(item.media),
    year: item.year,
    ogpData: safeJSONParse(item.ogpData),
    preview: safeJSONParse(item.preview),
    metrics: safeJSONParse(item.metrics),
  }));
}

export async function insertContentItem(item: ContentItem): Promise<void> {
  await db.insert(contentItems).values({
    id: item.id,
    type: item.type,
    postType: item.postType,
    title: item.title,
    description: item.description,
    date: item.date,
    url: item.url,
    icon: item.icon,
    authorName: item.author?.name,
    authorHandle: item.author?.handle,
    authorAvatar: item.author?.avatar,
    media: item.media ? JSON.stringify(item.media) : null,
    year: item.year,
    ogpData: item.ogpData ? JSON.stringify(item.ogpData) : null,
    preview: item.preview ? JSON.stringify(item.preview) : null,
    metrics: item.metrics ? JSON.stringify(item.metrics) : null,
  });
}

export async function insertMultipleContentItems(
  items: ContentItem[],
): Promise<void> {
  const values = items.map((item) => ({
    id: item.id,
    type: item.type,
    postType: item.postType,
    title: item.title,
    description: item.description,
    date: item.date,
    url: item.url,
    icon: item.icon,
    authorName: item.author?.name,
    authorHandle: item.author?.handle,
    authorAvatar: item.author?.avatar,
    media: item.media ? JSON.stringify(item.media) : null,
    year: item.year,
    ogpData: item.ogpData ? JSON.stringify(item.ogpData) : null,
    preview: item.preview ? JSON.stringify(item.preview) : null,
    metrics: item.metrics ? JSON.stringify(item.metrics) : null,
  }));

  await db.insert(contentItems).values(values);
}
