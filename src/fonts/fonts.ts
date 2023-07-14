import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const morse = localFont({
  src: './morse.ttf',
  variable: '--font-morse',
});

export const robotoMono = Roboto_Mono({ subsets: ['latin'] });
