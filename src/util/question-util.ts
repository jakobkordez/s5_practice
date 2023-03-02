import { Category } from "@/interfaces/category";
import { Question } from "@/interfaces/question";

interface QuestionFile {
  questions: Question[];
  categories: Category[];
}

let json: QuestionFile | null = null;

const openFile = async (): Promise<QuestionFile> => {
  if (json) return json;

  json = JSON.parse(await fetch("/questions.json").then((res) => res.text()));

  return json!;
};

export const getQuestions = async (): Promise<Question[]> => {
  const file = await openFile();

  return file.questions.map((question: any) => ({
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

  return file.categories.map((category: any) => ({
    id: category.id,
    title: category.title,
    questions: category.questions,
  }));
};

export const getExamQuestions = async (
  count: number = 60
): Promise<Question[]> => {
  let questions = await getQuestions();

  // TODO Correct
  // Shuffle questions
  shuffle(questions);
  questions = questions.slice(0, count);
  questions.sort((a, b) => a.id - b.id);

  return questions;
};

// Fisher-Yates Shuffle
const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
