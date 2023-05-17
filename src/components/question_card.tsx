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
    <div className="box">
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
  let className = `button is-fullwidth ${styles.answer}`;
  if (!onClick) className += ' is-static';
  if (isSelected) {
    if (reveal) {
      if (isCorrect) className += ' is-success is-light';
      else className += ' is-danger is-light';
    } else {
      className += ' is-info';
    }
  }

  return (
    <button className={className} onClick={onClick}>
      {String.fromCharCode(65 + index) + '. '}
      {answer.startsWith('$') ? (
        <span className="ml-2">
          <InlineMath math={answer.slice(1, answer.length - 1)} />
        </span>
      ) : (
        answer
      )}
    </button>
  );
}
