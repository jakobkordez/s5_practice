import { Metadata } from 'next';
import VajaQuiz from './vaja-quiz';

export const metadata: Metadata = {
  title: 'Priprave na izpit',
};

export default function Priprave() {
  return <VajaQuiz />;
}
