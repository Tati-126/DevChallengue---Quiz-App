import { Link } from 'react-router-dom'
import { useQuizContext } from '../context/QuizContext'

/** Pantalla de inicio: presentación y botón para comenzar. */
export function Home() {
  const { highScore, restart } = useQuizContext()

  return (
    <div className="mt-12 text-center">
      <h1 className="mb-4 text-4xl font-extrabold">
        Pon a prueba tus conocimientos 🌎
      </h1>
      <p className="mx-auto mb-8 max-w-md text-slate-600 dark:text-slate-300">
        Responde 10 preguntas sobre capitales y banderas del mundo.
        ¡Tienes solo 15 segundos por pregunta!
      </p>

      <p className="mb-8 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
        🏆 Mejor puntaje: {highScore}
      </p>

      <Link
        to="/quiz"
        onClick={() => restart()}
        className="inline-block rounded-xl bg-indigo-600 px-10 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-indigo-700"
      >
        Comenzar
      </Link>
    </div>
  )
}
