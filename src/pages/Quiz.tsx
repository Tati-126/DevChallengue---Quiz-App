import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizContext } from '../context/QuizContext'
import { useTimer } from '../hooks/useTimer'
import { playError, playSuccess } from '../lib/sound'
import { QuestionCard } from '../components/QuestionCard'
import { ProgressBar } from '../components/ProgressBar'
import { Timer } from '../components/Timer'

const QUESTION_TIME = 15

/** Página del juego: orquesta preguntas, temporizador, sonidos y avance. */
export function Quiz() {
  const navigate = useNavigate()
  const {
    status,
    currentQuestion,
    currentIndex,
    total,
    selectedAnswer,
    answer,
    next,
    restart,
  } = useQuizContext()

  const revealed = selectedAnswer !== null

  // Cuando el quiz termina, navegamos a la pantalla de resultados.
  useEffect(() => {
    if (status === 'finished') navigate('/results')
  }, [status, navigate])

  /** Procesa la respuesta (o el agotamiento del tiempo si option = null). */
  const handleAnswer = (option: string | null) => {
    if (revealed) return
    answer(option)
    if (option !== null && option === currentQuestion?.correctAnswer) {
      playSuccess()
    } else {
      playError()
    }
  }

  // Temporizador: corre solo mientras la pregunta está activa y sin responder.
  const timeLeft = useTimer(
    QUESTION_TIME,
    () => handleAnswer(null),
    status === 'ready' && !revealed,
    currentIndex,
  )

  if (status === 'loading') {
    return (
      <p
        role="status"
        className="mt-16 animate-pulse text-center text-lg text-slate-600 dark:text-slate-300"
      >
        Cargando preguntas… ⏳
      </p>
    )
  }

  if (status === 'error') {
    return (
      <div role="alert" className="mt-16 text-center">
        <p className="mb-4 text-lg text-red-600 dark:text-red-400">
          😕 Ocurrió un error al cargar las preguntas.
        </p>
        <button
          type="button"
          onClick={() => restart()}
          className="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition hover:bg-indigo-700"
        >
          Reintentar
        </button>
      </div>
    )
  }

  if (!currentQuestion) return null

  const isLast = currentIndex + 1 >= total

  return (
    <div className="mt-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <ProgressBar current={currentIndex} total={total} />
        <Timer timeLeft={timeLeft} />
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
      />

      {revealed && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={next}
            className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white shadow transition hover:bg-indigo-700"
          >
            {isLast ? 'Ver resultados' : 'Siguiente'}
          </button>
        </div>
      )}
    </div>
  )
}
