import { Question } from '@/interfaces/question';
import { InlineMath } from 'react-katex';
import styles from '@/styles/Quiz.module.scss';
import Image from 'next/image';

interface QuestionCardProps {
  question: Question;
  reveal: boolean;
  selected: number[];
  onClick?: (answer: number) => void;
}

export default function QuestionCard({
  question,
  reveal,
  selected,
  onClick,
}: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl text-gray-700">
        <span className="font-bold text-primary">
          A{question.id.toString().padStart(3, '0')}:{' '}
        </span>
        <MaybeTeX text={question.question} />
      </div>

      {question.image && (
        <Image
          className={styles.image}
          src={`/question_images/${question.image}`}
          alt={question.image}
          height={500}
          width={500}
        />
      )}

      <div className="flex flex-col gap-2">
        {question.answers.map((answer, i) => (
          <Answer
            key={i}
            index={i}
            answer={answer}
            reveal={reveal}
            isCorrect={question.correct === i}
            isSelected={selected.includes(i)}
            onClick={!onClick ? undefined : () => onClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

interface AnswerProps {
  index: number;
  answer: string;
  reveal: boolean;
  isCorrect: boolean;
  isSelected: boolean;
  onClick?: () => void;
}

function Answer({
  index,
  answer,
  reveal,
  isCorrect,
  isSelected,
  onClick,
}: AnswerProps) {
  return (
    <button
      className={`flex w-full flex-row items-center gap-5 rounded border px-6 py-2 ${
        !isSelected
          ? 'border-gray-300'
          : !reveal
            ? 'border-sky-500 bg-sky-100'
            : isCorrect
              ? 'border-green-500 bg-green-100'
              : 'border-red-600 bg-red-100'
      }`}
      disabled={!onClick}
      onClick={onClick}
    >
      {!reveal && <input type="radio" checked={isSelected} readOnly />}
      <div
        className={`border-r py-2 pr-5 text-sm font-bold ${
          !isSelected ? 'border-gray-200' : 'border-inherit'
        }`}
      >
        {String.fromCharCode(65 + index)}
      </div>
      <div className="text-left text-lg text-gray-600">
        <MaybeTeX text={answer} />
      </div>
    </button>
  );
}

function MaybeTeX({ text }: { text: string }) {
  const parts = text.split(/(?<!\\)\$+/);

  return parts.map((part, i) =>
    i % 2 === 0 ? (
      <span key={i}>{part}</span>
    ) : (
      <InlineMath key={i} math={part} />
    ),
  );
}
