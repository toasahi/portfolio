import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const contentItems = sqliteTable('content_items', {
  id: text('id').primaryKey(),
  type: text('type', { enum: ['release', 'writing', 'misc'] }).notNull(),
  postType: text('post_type', {
    enum: ['tweet', 'link-card', 'release', 'event', 'github'],
  }).notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  url: text('url'),
  icon: text('icon').notNull(),
  authorName: text('author_name'),
  authorHandle: text('author_handle'),
  authorAvatar: text('author_avatar'),
  media: text('media'), // JSON string array
  year: text('year').notNull(),
  ogpData: text('ogp_data'), // JSON string
  preview: text('preview'), // JSON string
  metrics: text('metrics'), // JSON string for likes, views, etc.
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});
