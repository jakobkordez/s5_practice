import { Metadata } from 'next';
import { QuestionList } from './list';

export const metadata: Metadata = {
  title: 'Zbirka vprašanj',
  description: 'Zbirka vprašanj za izpit',
};

export default function QuestionPool() {
  return <QuestionList />;
}
