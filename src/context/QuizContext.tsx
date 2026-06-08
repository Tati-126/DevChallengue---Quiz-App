import { createContext, useContext, type ReactNode } from 'react'
import { useQuiz } from '../hooks/useQuiz'

type QuizContextValue = ReturnType<typeof useQuiz>

const QuizContext = createContext<QuizContextValue | null>(null)

/**
 * Provee el estado del quiz a toda la app para que las rutas /quiz y
 * /results compartan el mismo juego (puntaje, preguntas, etc.).
 */
export function QuizProvider({ children }: { children: ReactNode }) {
  const quiz = useQuiz()
  return <QuizContext.Provider value={quiz}>{children}</QuizContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuizContext(): QuizContextValue {
  const ctx = useContext(QuizContext)
  if (!ctx) {
    throw new Error('useQuizContext debe usarse dentro de <QuizProvider>')
  }
  return ctx
}
