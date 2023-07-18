'use client';

import QuestionCard from '@/components/question_card';
import { Question } from '@/interfaces/question';
import { getQuestions } from '@/util/question-util';
import { useEffect } from 'react';
import { create } from 'zustand';

interface Questions {
  questions: Question[];
}

const useStore = create<Questions>(() => ({
  questions: [],
}));

async function load() {
  const questions = await getQuestions();
  useStore.setState({ questions });
}

export function QuestionList() {
  const questions = useStore((state) => state.questions);

  useEffect(() => {
    if (questions.length === 0) load();
  }, [questions.length]);

  return (
    <div className="section container flex max-w-xl flex-col gap-12">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          reveal={true}
          selected={[question.correct]}
        />
      ))}
    </div>
  );
}
