import type { OGPData } from '@/lib/ogp';

export interface ContentItem {
  id: string;
  type: 'release' | 'writing' | 'misc';
  postType: 'tweet' | 'link-card' | 'release' | 'event' | 'github';
  title: string;
  description: string;
  date: string;
  url?: string;
  icon: string;
  author?: {
    name: string;
    handle: string;
    avatar: string;
  };
  media?: string[];
  year: string;
  ogpData?: OGPData | null;
  preview?: {
    type: 'image' | 'ogp' | 'features' | 'portfolio';
    image?: string;
    ogp?: {
      title: string;
      description: string;
      image: string;
      url: string;
    };
    features?: Array<{
      id: string;
      icon: string;
      title: string;
      description: string;
    }>;
    portfolio?: {
      title: string;
      subtitle: string;
      sections: Array<{
        id: string;
        type: 'device' | 'feature' | 'description';
        title: string;
        description: string;
        icon?: string;
        gradient?: string;
      }>;
    };
  };
  metrics?: {
    likes?: number;
    views?: number;
    comments?: number;
    shares?: number;
  };
}

const category = ['all', 'release', 'writing', 'misc'] as const;
export type Category = (typeof category)[number];
