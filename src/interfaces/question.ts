export interface Question {
  id: number;
  category: number;
  question: string;
  image?: string;
  answers: string[];
  correct: number;
}
