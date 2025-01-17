'use client';

import { Question } from '@/interfaces/question';
import { getExamQuestions } from '@/util/question-util';
import { create } from 'zustand';
import QuestionCard from '@/components/question_card';
import { scrollToTop } from '@/components/scroll-to-top-button';
import { useEffect, useState } from 'react';
import { umamiTrack } from '@/components/umami-analytics';

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
  endTime?: Date;

  load: () => Promise<void>;
  finish: () => Promise<void>;
  reset: () => Promise<void>;
}

const useStore = create<IzpitQuizStore>((set, get) => ({
  state: QuizState.Ready,

  questions: undefined,
  answers: undefined,
  correctCount: undefined,
  endTime: undefined,

  load: async () => {
    set({ state: QuizState.Loading });

    const questions = await getExamQuestions(new Date().valueOf());

    set({
      state: QuizState.InProgress,
      questions,
      answers: Array(questions.length).fill([-1]),
      endTime: new Date(Date.now() + 1000 * 60 * 90),
    });
  },

  finish: async () => {
    const { questions, answers } = get();

    const correctCount = questions!
      .map((q, qi) => q.correct === answers![qi][0])
      .reduce((acc, cur) => acc + (cur ? 1 : 0), 0);

    umamiTrack('quiz-finished', {
      correctPercent: Math.round((correctCount / questions!.length) * 10) * 10,
    });

    set({ state: QuizState.Finished, correctCount });
    scrollToTop();
  },

  reset: async () => {
    set({ state: QuizState.Ready });
  },
}));

export default function IzpitQuiz() {
  const {
    state,
    questions,
    answers,
    correctCount,
    endTime,
    load,
    finish,
    reset,
  } = useStore();

  return (
    <>
      {state === QuizState.Ready && (
        <div className="section">
          <button className="button mx-auto" onClick={load}>
            Začni
          </button>
        </div>
      )}

      {state === QuizState.Loading && <div>Pripravljanje ...</div>}

      {state === QuizState.InProgress && inProgress()}

      {state === QuizState.Finished && finished()}
    </>
  );

  function inProgress() {
    return (
      <div className="section container flex max-w-xl flex-col gap-12">
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

        <div className="sticky inset-0 top-auto mb-10 flex select-none p-5">
          <div className="mx-auto flex items-center gap-6 rounded-lg border bg-white px-6 py-4 shadow-lg">
            <div className="text-lg">
              {answers!.filter(([v]) => v >= 0).length} / {answers!.length}
            </div>
            <Countdown timeEnd={endTime!} />
            <button className="button text-sm" onClick={() => finish()}>
              Zaključi
            </button>
          </div>
        </div>
      </div>
    );
  }

  function finished() {
    return (
      <>
        <div className="bg-light">
          <div className="section container flex flex-col items-center">
            <h2 className="text-xl">Rezultat</h2>
            <p className="text-4xl">
              {correctCount} / {answers!.length} (
              {Math.round((correctCount! / answers!.length) * 1000) / 10} %)
            </p>
            <button className="button mt-6" onClick={reset}>
              Nazaj na začetek
            </button>
          </div>
        </div>

        <div className="section">
          <h1 className="mb-10 text-center text-2xl font-semibold">
            Napačni odgovori
          </h1>

          <div className="container flex max-w-xl flex-col gap-12">
            {questions?.map(
              (question, qi) =>
                question.correct !== answers![qi][0] && (
                  <QuestionCard
                    key={qi}
                    question={question}
                    reveal={true}
                    selected={[answers![qi][0], question.correct]}
                  />
                ),
            )}
          </div>
        </div>
      </>
    );
  }
}

export function Countdown({ timeEnd }: { timeEnd: Date }) {
  const finish = useStore((state) => state.finish);
  const [remaining, setRemaining] = useState(timeEnd.valueOf() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = Math.max(0, timeEnd.valueOf() - Date.now());
      setRemaining(newVal);
      if (newVal === 0) {
        clearInterval(interval);
        finish();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [timeEnd, finish]);

  return (
    <div className="text-lg">
      {Math.floor(remaining / 1000 / 60)}:
      {Math.floor((remaining / 1000) % 60)
        .toString()
        .padStart(2, '0')}
    </div>
  );
}
