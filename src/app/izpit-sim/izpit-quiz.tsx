'use client';

import { Question } from '@/interfaces/question';
import { getExamQuestions } from '@/util/question-util';
import { create } from 'zustand';
import QuestionCard from '@/components/question_card';
import { Button } from '@/components/button';

enum QuizState {
  Loading,
  Ready,
  InProgress,
  Finished,
}

interface IzpitQuizStore {
  state: QuizState;

  questions?: Question[];
  answers?: number[][];
  correctCount?: number;

  load: () => Promise<void>;
  finish: (correctCount: number) => Promise<void>;
  reset: () => Promise<void>;
}

const useStore = create<IzpitQuizStore>((set) => ({
  state: QuizState.Ready,

  questions: undefined,
  answers: undefined,
  correctCount: undefined,

  load: async () => {
    set({ state: QuizState.Loading });

    const questions = await getExamQuestions(new Date().valueOf());

    set({
      state: QuizState.InProgress,
      questions,
      answers: Array(questions.length).fill([-1]),
    });
  },

  finish: async (correctCount: number) => {
    set({ state: QuizState.Finished, correctCount });
    scrollToTop();
  },

  reset: async () => {
    set({ state: QuizState.Ready });
  },
}));

export default function IzpitQuiz() {
  const [state, questions, answers, correctCount, load, finish, reset] =
    useStore((state) => [
      state.state,
      state.questions,
      state.answers,
      state.correctCount,
      state.load,
      state.finish,
      state.reset,
    ]);

  return (
    <>
      {state === QuizState.Ready && (
        <Button className="mx-auto my-10" onClick={load}>
          Začni
        </Button>
      )}

      {state === QuizState.Loading && <div>Pripravljanje ...</div>}

      {state === QuizState.InProgress && inProgress()}

      {state === QuizState.Finished && finished()}
    </>
  );

  function inProgress() {
    return (
      <div className="mx-auto my-10 flex max-w-xl flex-col gap-12">
        {questions?.map((question, qi) => (
          <QuestionCard
            key={qi}
            question={question}
            reveal={false}
            selected={answers![qi]}
            onClick={(i) => {
              const newAnswers = [...answers!];
              newAnswers[qi] = [i];
              useStore.setState({ answers: newAnswers });
            }}
          />
        ))}

        <Button
          onClick={() =>
            finish(
              questions!
                .map((q, qi) => q.correct === answers![qi][0])
                .reduce((acc, cur) => acc + (cur ? 1 : 0), 0)
            )
          }
        >
          Zaključi
        </Button>
      </div>
    );
  }

  function finished() {
    return (
      <>
        <div className="bg-light">
          <div className="container flex flex-col items-center py-10">
            <h2 className="text-xl">Rezultat</h2>
            <p className="text-4xl">
              {correctCount} / {answers!.length} (
              {Math.round((correctCount! / answers!.length) * 1000) / 10} %)
            </p>
            <Button className="mt-6" onClick={reset}>
              Nazaj na začetek
            </Button>
          </div>
        </div>

        <div className="my-10">
          <h1 className="my-10 text-center text-2xl">Napačni odgovori</h1>

          <div className="mx-auto flex max-w-xl flex-col gap-12">
            {questions?.map(
              (question, qi) =>
                question.correct !== answers![qi][0] && (
                  <QuestionCard
                    key={qi}
                    question={question}
                    reveal={true}
                    selected={[answers![qi][0], question.correct]}
                  />
                )
            )}
          </div>
        </div>
      </>
    );
  }
}

const isBrowser = () => typeof window !== 'undefined';

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
