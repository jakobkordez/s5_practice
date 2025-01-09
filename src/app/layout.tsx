import { Analytics } from '@vercel/analytics/react';
import { Header } from '@/components/header';
import { Metadata } from 'next';
import '@/styles/globals.scss';
import { inter, morse } from '@/fonts/fonts';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Viewport } from 'next/dist/lib/metadata/types/metadata-interface';
import { UmamiAnalytics } from '@/components/umami-analytics';

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
  description:
    'Vse o radioamaterskem izpitu, pripravi na izpit in pridobitev radioamaterskega dovoljenja in klicnega znaka',
  keywords: [
    'radioamater',
    'izpit',
    'radio',
    'KV',
    'HF',
    'VHF',
    'UKV',
    'dovoljenje',
    'licenca',
    'CEPT',
    'AKOS',
    'ZRS',
    'Zveza radioamaterjev Slovenije',
    'radiotehnika',
    'radioamaterstvo',
    'Morzejeva abeceda',
    'Morse kod',
  ],
  icons: {
    icon: '/logo/icon_512.png',
    shortcut: '/logo/icon_512.png',
  },
  creator: 'Jakob Kordež [S52KJ]',
  manifest: '/manifest.json',
  metadataBase: new URL('https://izpit.jkob.cc'),
  openGraph: {
    locale: 'sl',
    type: 'website',
    siteName: 'Radioamaterski tečaj',
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
        <UmamiAnalytics />
      </body>
    </html>
  );
}
