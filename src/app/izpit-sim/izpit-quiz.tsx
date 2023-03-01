"use client";

import { Question } from "@/interfaces/question";
import { getExamQuestions } from "@/util/question-util";
import { create } from "zustand";
import QuestionCard from "@/components/question_card";

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

    const questions = await getExamQuestions();

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
        <div className="is-flex">
          <button className="button is-primary mx-auto" onClick={load}>
            Začni
          </button>
        </div>
      )}

      {state === QuizState.Loading && <div>Pripravljanje ...</div>}

      {state === QuizState.InProgress && (
        <>
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

          <button
            className="button is-primary"
            onClick={() =>
              finish(
                questions!
                  .map((q, qi) => q.correct === answers![qi][0])
                  .reduce((acc, cur) => acc + (cur ? 1 : 0), 0)
              )
            }
          >
            Zaključi
          </button>
        </>
      )}

      {state === QuizState.Finished && (
        <>
          <div className="box notification is-info is-light is-flex is-flex-direction-column is-align-items-center">
            <h2 className="is-size-4">Rezultat</h2>
            <p className="is-size-2">
              {correctCount} / {answers!.length} (
              {Math.round((correctCount! / answers!.length) * 1000) / 10} %)
            </p>
            <button className="button is-primary mt-3" onClick={reset}>
              Nazaj na začetek
            </button>
          </div>

          <h1 className="is-size-3 my-3 has-text-centered">Napačni odgovori</h1>

          {questions
            ?.filter((q, qi) => q.correct !== answers![qi][0])
            .map((question, qi) => (
              <QuestionCard
                key={qi}
                question={question}
                reveal={true}
                selected={[answers![qi][0], question.correct]}
              />
            ))}
        </>
      )}
    </>
  );
}

const isBrowser = () => typeof window !== "undefined";

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
