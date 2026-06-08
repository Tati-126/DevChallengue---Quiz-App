import { Link } from 'react-router-dom'
import { useQuizContext } from '../context/QuizContext'

/** Pantalla final: puntaje, mensaje, récord y opciones para repetir. */
export function Results() {
  const { score, total, highScore, restart } = useQuizContext()

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0
  const message =
    percentage >= 70
      ? '¡Excelente! 🎉'
      : percentage >= 40
        ? '¡Bien hecho! 👍'
        : '¡Sigue practicando! 💪'

  return (
    <div className="mt-12 text-center">
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <h1 className="mb-2 text-3xl font-extrabold">{message}</h1>
        <p className="mb-6 text-slate-600 dark:text-slate-300">
          Tu resultado final
        </p>

        <div className="mb-6 text-5xl font-black text-indigo-600 dark:text-indigo-400">
          {score}
          <span className="text-2xl text-slate-400"> / {total}</span>
        </div>

        <p className="mb-8 text-sm font-semibold text-amber-600 dark:text-amber-400">
          🏆 Mejor puntaje: {highScore}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/quiz"
            onClick={() => restart()}
            className="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            Jugar de nuevo
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-slate-300 px-6 py-2 font-semibold transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          >
            Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
