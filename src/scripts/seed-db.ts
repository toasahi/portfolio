import { insertMultipleContentItems } from '@/lib/db/repository';
import type { ContentItem } from '@/types/content';

const defaultContentItems: ContentItem[] = [
  {
    id: '1',
    type: 'release',
    postType: 'release',
    title: 'ほんやく先生',
    description:
      '「○○って英語で何て言うの？」に速攻で答えてくれるスマホアプリを作りました！',
    date: 'Feb 16',
    url: 'https://kiok.jp/translator',
    icon: '🎉',
    author: {
      name: 'asa',
      handle: '@asa99',
      avatar: '🐱',
    },
    year: '2025',
    preview: {
      type: 'features',
      features: [
        {
          id: '1',
          icon: '📱',
          title: '英語でなんていう？',
          description: '速攻回答',
        },
        {
          id: '2',
          icon: '🤖',
          title: 'AIの先生がいないAI回答',
          description: '的確な答え',
        },
        {
          id: '3',
          icon: '⚡',
          title: '1タップで発音も再生',
          description: '音声対応',
        },
      ],
    },
  },
  {
    id: '2',
    type: 'writing',
    postType: 'link-card',
    title: 'Webサービス公開前のチェックリスト',
    description: 'Webサービスをリリースする前に確認したい項目をまとめました。',
    date: 'Jul 4',
    url: 'https://zenn.dev/kazuwombat/articles/885794faa6b3c9',
    icon: '📝',
    year: '2024',
  },
  {
    id: '3',
    type: 'writing',
    postType: 'link-card',
    title: 'Hashnodeにセッションハイジャックの脆弱性を報告した',
    description: 'セッションハイジャックの脆弱性について解説します。',
    date: 'Feb 22',
    url: 'https://zenn.dev/asa99/articles/hashnode-vulnerability',
    icon: '📝',
    year: '2024',
  },
  {
    id: '4',
    type: 'misc',
    postType: 'github',
    title: '2,185 contributions in 2024',
    description: 'GitHub contributions',
    date: '2024',
    icon: '🐱',
    year: '2024',
  },
  {
    id: '5',
    type: 'misc',
    postType: 'event',
    title: 'Founded company "Kioku"',
    description: '会社設立',
    date: 'Aug 20',
    url: 'https://kiok.jp',
    icon: '✨',
    year: '2024',
  },
  {
    id: '6',
    type: 'release',
    postType: 'release',
    title: 'Kioku Card',
    description: 'メモリーカードアプリ',
    date: 'Aug 20',
    url: 'https://card.kiok.jp',
    icon: '🎉',
    year: '2024',
    preview: {
      type: 'ogp',
      ogp: {
        title: 'Kioku Card - メモリーカードアプリ',
        description: '効率的な記憶定着を実現するスマートなカードアプリ',
        image:
          'https://via.placeholder.com/400x200/3b82f6/ffffff?text=Kioku+Card',
        url: 'https://card.kiok.jp',
      },
    },
  },
  {
    id: '7',
    type: 'misc',
    postType: 'event',
    title: 'Presented at Classmethod Odyssey',
    description: 'クラスメソッドでの登壇',
    date: 'Jul 10',
    url: 'https://asa.me',
    icon: '✨',
    year: '2024',
  },
  {
    id: '8',
    type: 'release',
    postType: 'release',
    title: 'Zenn サービス',
    description:
      'プログラマーのための新しい情報共有サービス「Zenn」をリリースしました🎉',
    date: 'Sep 16',
    url: 'https://zenn.dev',
    icon: '🎉',
    author: {
      name: 'asa',
      handle: '@asa99',
      avatar: '🐱',
    },
    year: '2024',
    preview: {
      type: 'image',
      image:
        'https://via.placeholder.com/600x300/06b6d4/ffffff?text=Zenn+Platform',
    },
  },
  {
    id: '9',
    type: 'release',
    postType: 'release',
    title: 'RESUME',
    description:
      'だれでも簡単に美しいWebポートフォリオを作成できるサービス RESUME（レジュメ）をリリースしました🎉',
    date: 'Jan 30',
    url: 'https://resume.id',
    icon: '🎉',
    author: {
      name: 'asa',
      handle: '@asa99',
      avatar: '🐱',
    },
    year: '2024',
    preview: {
      type: 'portfolio',
      portfolio: {
        title: 'RESUME',
        subtitle: 'すべての人のためのポートフォリオ作成サービス',
        sections: [
          {
            id: '1',
            type: 'device',
            title: 'デスクトップ版',
            description: 'レスポンシブ対応',
            icon: '💻',
          },
          {
            id: '2',
            type: 'device',
            title: 'モバイル版',
            description: 'どこでも簡単編集',
            icon: '📱',
            gradient: 'from-pink-400 to-purple-500',
          },
          {
            id: '3',
            type: 'feature',
            title: 'スキルを視覚化',
            description: 'プロジェクトを魅力的に表現',
            icon: '💎',
          },
          {
            id: '4',
            type: 'description',
            title: 'ポートフォリオ作成',
            description:
              'あなたのスキルや経験をカバーページに美しくまとめよう。そのまま転職やバイトに使えるポートフォリオを作り上げるはずです。',
          },
        ],
      },
    },
  },
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    await insertMultipleContentItems(defaultContentItems);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
