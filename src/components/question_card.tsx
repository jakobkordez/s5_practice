import { Question } from '@/interfaces/question';
import { MaybeTeX } from './lazy-tex';
import Image from 'next/image';

interface QuestionCardProps {
  question: Question;
  reveal: boolean;
  selected: number[] | number;
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
        <span className="font-medium text-primary">
          <span className="text-sm">#</span>
          {question.id.toString().padStart(3, '0')}:{' '}
        </span>
        <MaybeTeX text={question.question} />
      </div>

      {question.image && (
        <Image
          className="max-h-80 max-w-full object-contain"
          src={`/question_images/${question.image}`}
          alt={question.image}
          height={500}
          width={500}
          style={{ width: '100%', height: 'auto' }}
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
            isSelected={
              selected instanceof Array ? selected.includes(i) : selected === i
            }
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
      className={`flex h-auto flex-nowrap items-center justify-start gap-6 rounded-lg px-6 py-1 font-normal normal-case ${
        !isSelected
          ? 'bg-light'
          : !reveal
            ? 'bg-primary/30'
            : isCorrect
              ? 'bg-green-200 text-green-950'
              : 'bg-red-200 text-red-950'
      } ${!onClick || isSelected ? 'cursor-default' : 'hover:bg-primary/10'}`}
      onClick={onClick}
    >
      <div className="text-sm font-bold">{String.fromCharCode(65 + index)}</div>
      <div className="py-2 text-left text-base">
        <MaybeTeX text={answer} />
      </div>
    </button>
  );
}
