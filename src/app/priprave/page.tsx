import { Metadata } from 'next';
import VajaQuiz from './vaja-quiz';

export const metadata: Metadata = {
  title: 'Vaja',
  description:
    'Pripravite se na radioamaterski izpit z vajo reševanja vprašanj, ki se lahko pojavijo na izpitu',
  keywords: [
    'vaja za izpit',
    'radioamaterske naloge',
    'radioamaterske vaje',
    'priprava na izpit',
    'vprašanja za izpit',
    'izpitna vprašanja',
  ],
};

export default function Priprave() {
  return <VajaQuiz />;
}
