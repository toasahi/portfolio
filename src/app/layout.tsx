import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation';
import StateProvider from '@/components/providers/state-provider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Toda Asahi - Portfolio',
  description:
    'SREエンジニアのポートフォリオサイト - Kubernetes、監視システム、DevOpsプラクティスが専門領域',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head></head>
      <body className={inter.className}>
        <StateProvider>
          {children}
          <Navigation />
        </StateProvider>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
