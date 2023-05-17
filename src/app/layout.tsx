import { AnalyticsWrapper } from '@/components/analytics';
import Header from '@/components/header';
import { Metadata } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
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
  themeColor: '#2196f3',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Radioamaterski izpit',
    description: 'Priprava na radioamaterski izpit',
    url: 'http://izpit.jkob.cc/',
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
      <body>
        <Header />

        <main className="container">{children}</main>

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
