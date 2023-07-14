'use client';

import { Question } from '@/interfaces/question';
import { getCategories, getQuestions } from '@/util/question-util';
import { useEffect } from 'react';
import { create } from 'zustand';
import { Category } from '@/interfaces/category';
import QuestionCard from '@/components/question_card';
import { SubHeader } from '@/components/sub_header';
import { Button } from '@/components/button';

const qPerPage = 5;

interface QuizStore {
  isLoading: boolean;

  categories: Category[];
  selectedCategory: string;

  questions: Question[];
  answers: number[][];
  displayed: number;
  loadMore: () => void;
}

const useStore = create<QuizStore>((set) => ({
  isLoading: false,

  categories: [],
  selectedCategory: 'all',

  questions: [],
  answers: [],
  displayed: 0,
  loadMore: () => set((state) => ({ displayed: state.displayed + qPerPage })),
}));

async function load(selectedCategory: string) {
  useStore.setState({ isLoading: true });

  const categories = await getCategories();
  let questions = await getQuestions();
  if (selectedCategory !== 'all') {
    const catId = parseInt(selectedCategory);
    const cat = categories.find((cat) => cat.id == catId);
    if (!cat) return;

    questions = questions.filter((q) => q.category == catId);
  }
  // Shuffle
  questions = questions.sort(() => Math.random() - 0.5);

  useStore.setState({
    isLoading: false,
    categories,
    questions,
    answers: Array(questions.length).fill([]),
    displayed: qPerPage,
  });
}

export default function VajaQuiz() {
  const [
    isLoading,
    categories,
    selectedCategory,
    questions,
    answers,
    displayed,
    loadMore,
  ] = useStore((state) => [
    state.isLoading,
    state.categories,
    state.selectedCategory,
    state.questions,
    state.answers,
    state.displayed,
    state.loadMore,
  ]);

  useEffect(() => {
    if (questions.length === 0) {
      load(selectedCategory);
    }
  }, [questions.length, selectedCategory]);

  return (
    <div className="mb-10 flex flex-col gap-10">
      <SubHeader title="Priprava na izpit">
        <div>
          <label htmlFor="category" className="mb-2 block font-medium">
            Izberi kategorijo
          </label>
          <div className="flex flex-row gap-3">
            <select
              id="category"
              name="category"
              className="w-full flex-1 rounded-lg border border-gray-400 bg-white p-2.5 text-darker placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => {
                const selectedCategory = e.target.value;
                useStore.setState({ selectedCategory });
                load(selectedCategory);
              }}
            >
              <option value="all">Vse kategorije</option>
              {categories.map((category, i) => (
                <option key={i} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>

            <Button
              disabled={isLoading}
              onClick={!isLoading ? () => load(selectedCategory) : undefined}
            >
              Naloži
            </Button>
          </div>
        </div>
      </SubHeader>

      <div className="container flex max-w-xl flex-col gap-12">
        {questions.slice(0, displayed).map((question, qi) => (
          <QuestionCard
            key={qi}
            question={question}
            reveal={true}
            selected={answers[qi]}
            onClick={
              answers[qi].includes(question.correct)
                ? undefined
                : (i) => {
                    const newAnswers = [...answers];
                    newAnswers[qi] = [...newAnswers[qi], i];
                    useStore.setState({ answers: newAnswers });
                  }
            }
          />
        ))}
      </div>

      <div className="container w-full max-w-xl">
        <div className="flex flex-row justify-end gap-3">
          {questions.length > displayed && (
            <Button onClick={loadMore}>Naloži več</Button>
          )}
          <Button onClick={scrollToTop}>Na vrh</Button>
        </div>
      </div>
    </div>
  );
}

const isBrowser = () => typeof window !== 'undefined';

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
