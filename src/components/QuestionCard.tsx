import type { Question } from '../types'
import { AnswerButton } from './AnswerButton'

interface QuestionCardProps {
  question: Question
  selectedAnswer: string | null
  onAnswer: (option: string) => void
}

/** Tarjeta con el enunciado (bandera o texto) y las 4 opciones. */
export function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
}: QuestionCardProps) {
  const revealed = selectedAnswer !== null

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
      {question.type === 'flag' && (
        <img
          src={question.country.flag}
          alt="Bandera del país"
          className="mx-auto mb-5 h-28 w-auto rounded border border-slate-200 shadow dark:border-slate-600"
        />
      )}

      <h2 className="mb-5 text-center text-xl font-bold">{question.prompt}</h2>

      <div className="grid gap-3">
        {question.options.map((option) => (
          <AnswerButton
            key={option}
            option={option}
            onSelect={onAnswer}
            disabled={revealed}
            revealed={revealed}
            isCorrect={option === question.correctAnswer}
            isSelected={option === selectedAnswer}
          />
        ))}
      </div>
    </div>
  )
}
