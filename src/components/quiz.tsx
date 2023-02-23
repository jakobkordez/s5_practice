"use client";

import { Question } from "@/interfaces/question";
import { getCategories, getQuestions } from "@/util/question-util";
import { useEffect } from "react";
import { create } from "zustand";
import styles from "@/styles/Quiz.module.scss";
import { Category } from "@/interfaces/category";
import { InlineMath } from "react-katex";
import Image from "next/image";

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
  selectedCategory: "all",

  questions: [],
  answers: [],
  displayed: 0,
  loadMore: () => set((state) => ({ displayed: state.displayed + qPerPage })),
}));

async function load(selectedCategory: string) {
  useStore.setState({ isLoading: true });

  const categories = await getCategories();
  let questions = await getQuestions();
  if (selectedCategory !== "all") {
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

export default function Quiz() {
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
    <>
      <div className="field has-addons mb-5">
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              name="category"
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
          </div>
        </div>

        <div className="control">
          <button
            className={`button is-primary ${isLoading ? "is-loading" : ""}`}
            onClick={() => load(selectedCategory)}
          >
            Naloži
          </button>
        </div>
      </div>

      <div>
        {questions.slice(0, displayed).map((question, qi) => (
          <div key={qi} className="box">
            <p>{question.id}</p>

            <div className="title is-4">
              <h3>{question.question}</h3>
            </div>

            {question.image && (
              <figure className="image">
                <Image
                  className={styles.image}
                  src={`/question_images/${question.image}`}
                  alt={question.image}
                  height={500}
                  width={500}
                />
              </figure>
            )}

            <div className="buttons mt-5">
              {question.answers.map((answer, i) => {
                const revealed = answers[qi].includes(i);
                const isCorrect = question.correct === i;
                const isDone = answers[qi].includes(question.correct!);
                const onClick = () => {
                  if (answers[qi].includes(i)) return;

                  const answersNew = Array.from(answers);
                  answersNew[qi] = Array.from(answers[qi]);
                  answersNew[qi].push(i);
                  useStore.setState({ answers: answersNew });
                };

                return (
                  <button
                    key={i}
                    className={`button is-fullwidth ${styles.answer} ${
                      revealed
                        ? isCorrect
                          ? "is-success is-light is-static"
                          : "is-danger is-light is-static"
                        : isDone && "is-static"
                    }`}
                    onClick={onClick}
                  >
                    {String.fromCharCode(65 + i) + ". "}
                    {answer.startsWith("$") ? (
                      <span className="ml-2">
                        <InlineMath math={answer.slice(1, answer.length - 1)} />
                      </span>
                    ) : (
                      answer
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="buttons mt-5 is-justify-content-end">
        {questions.length > displayed && (
          <button className="button is-primary is-rounded" onClick={loadMore}>
            Naloži več
          </button>
        )}
        <button className="button is-primary is-rounded" onClick={scrollToTop}>
          Na vrh
        </button>
      </div>
    </>
  );
}

const isBrowser = () => typeof window !== "undefined";

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
