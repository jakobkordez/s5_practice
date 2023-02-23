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

  return file.questions
    .map((question: any) => ({
      id: question.id,
      question: question.question,
      image: question.image,
      answers: question.answers,
      correct: question.correct,
      // TODO
      category: 0,
    }))
    .filter((question: Question) => question.correct != null);
};

export const getCategories = async (): Promise<Category[]> => {
  const file = await openFile();

  return file.categories.map((category: any) => ({
    id: category.id,
    title: category.title,
    questions: category.questions,
  }));
};
