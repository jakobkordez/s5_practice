import { Metadata } from 'next';
import IzpitQuiz from './izpit-quiz';
import { SubHeader } from '@/components/sub_header';

export const metadata: Metadata = {
  title: 'Preizkusni izpit',
  description:
    'Rešite preizkusni radioamaterski izpit in preverite svoje znanje iz radioamaterstva',
  keywords: [
    'izpit',
    'preizkus',
    'preverjanje znanje',
    'preizkusni izpit',
    'radioamaterski izpit',
  ],
};

export default function Priprave() {
  return (
    <>
      <SubHeader>
        <h1>Preizkusni izpit</h1>
        <p>
          Izpit je sestavljen iz <strong>60 različnih vprašanj</strong>. Vsako
          vprašanje ima 3 možne odgovore, od katerih je samo en pravilen.
          Kandidat ima na voljo 90 minut za reševanje izpitne pole. Kandidat
          mora <strong>pravilno odgovoriti vsaj na 36 vprašanj</strong> (60 %).
        </p>
      </SubHeader>

      <IzpitQuiz />
    </>
  );
}
