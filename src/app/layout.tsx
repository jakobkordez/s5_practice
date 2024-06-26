import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/header';
import { Metadata } from 'next';
import '@/styles/globals.scss';
import { inter, morse } from '@/fonts/fonts';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Viewport } from 'next/dist/lib/metadata/types/metadata-interface';

export const viewport: Viewport = {
  themeColor: '#00ADB5',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  applicationName: 'Radioamaterski izpit',
  title: {
    default: 'Radioamaterski izpit',
    template: '%s | Radioamaterski izpit',
  },
  description: 'Priprava na radioamaterski izpit',
  icons: {
    icon: '/logo/icon_512.png',
    shortcut: '/logo/icon_512.png',
  },
  creator: 'Jakob Kordež [S52KJ]',
  manifest: '/manifest.json',
  metadataBase: new URL('https://izpit.jkob.cc'),
  openGraph: {
    title: {
      default: 'Radioamaterski izpit',
      template: '%s | Radioamaterski izpit',
    },
    description: 'Priprava na radioamaterski izpit',
    url: 'https://izpit.jkob.cc/',
    locale: 'sl_SL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl">
      <head />
      <body className={`${inter.className} ${morse.variable}`}>
        <Header />

        <main>{children}</main>
        <ScrollToTopButton />

        <Analytics />
      </body>
    </html>
  );
}
