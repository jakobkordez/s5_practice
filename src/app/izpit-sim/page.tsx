import { Metadata } from 'next';
import IzpitQuiz from './izpit-quiz';
import { SubHeader } from '@/components/sub_header';

export const metadata: Metadata = {
  title: 'Simulator izpita',
  description: 'Pripomoček za simuliranje izpita za radioamaterski izpit',
};

export default function Priprave() {
  return (
    <>
      <SubHeader>
        <h1>Simulator izpita</h1>
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
