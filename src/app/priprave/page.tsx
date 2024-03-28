import { Metadata } from 'next';
import VajaQuiz from './vaja-quiz';

export const metadata: Metadata = {
  title: 'Priprave na izpit',
  description: 'Naloge za pripravo na izpit',
  openGraph: {
    title: 'Priprave na izpit',
    description: 'Naloge za pripravo na izpit',
  },
};

export default function Priprave() {
  return <VajaQuiz />;
}
