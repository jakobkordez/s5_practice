import { Metadata } from 'next';
import { QuestionList } from './list';
import { SubHeader } from '@/components/sub_header';

export const metadata: Metadata = {
  title: 'Zbirka vprašanj',
  description:
    'Pregled cele zbirke vprašanj, ki se lahko pojavijo na radioamaterskem izpitu',
  keywords: [
    'vprašanja',
    'naloge',
    'radioamaterski izpit',
    'zbirka vprašanj',
    'zbirka nalog',
  ],
};

export default function QuestionPool() {
  return (
    <>
      <SubHeader>
        <h1>Zbirka vprašanj</h1>
        <p className="text-lg">
          Seznam vseh vprašanj, ki se lahko pojavijo na izpitu.
        </p>
      </SubHeader>
      <QuestionList />;
    </>
  );
}
