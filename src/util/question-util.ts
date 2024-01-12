import { Category } from '@/interfaces/category';
import { Question } from '@/interfaces/question';
import Random from './random';

interface QuestionFile {
  questions: Question[];
  categories: Category[];
}

let json: QuestionFile | null = null;

const openFile = async (): Promise<QuestionFile> => {
  if (json) return json;

  json = JSON.parse(await fetch('/questions.json').then((res) => res.text()));

  return json!;
};

export const getQuestions = async (): Promise<Question[]> => {
  const file = await openFile();

  return file.questions.map((question) => ({
    id: question.id,
    question: question.question,
    image: question.image,
    answers: question.answers,
    correct: question.correct,
    category: question.category,
  }));
};

export const getCategories = async (): Promise<Category[]> => {
  const file = await openFile();

  return file.categories.map((category) => ({
    id: category.id,
    title: category.title,
    // questions: category.questions,
  }));
};

export const getExamQuestions = async (
  seed: number,
  count: number = 60,
  maxPerCategory: number = 2,
): Promise<Question[]> => {
  const rnd = new Random(seed);

  const questions = await getQuestions();

  // TODO Correct
  // Shuffle questions
  shuffle(questions, rnd);

  const selected: Question[] = [];
  const categoryCounter: Map<number, number> = new Map();

  for (let i = 0; i < questions.length && selected.length < count; i++) {
    const question = questions[i];
    const categoryCount = categoryCounter.get(question.category) ?? 0;

    if (categoryCount < maxPerCategory) {
      selected.push(question);
      categoryCounter.set(question.category, categoryCount + 1);
    }
  }

  selected.sort((a, b) => a.id - b.id);

  return selected;
};

/**
 * In-place Fisher-Yates shuffle
 *
 * @param array Array of items to shuffle
 * @param rnd Random number generator
 */
const shuffle = (array: unknown[], rnd: Random) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = rnd.nextInt() % (i + 1);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
