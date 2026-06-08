import { useCallback, useEffect, useState } from 'react'
import { fetchCountries } from '../api/countries'
import { generateQuestions } from '../lib/quiz'
import { getHighScore, saveHighScore } from '../lib/storage'
import type { Question, QuizStatus } from '../types'

const QUESTION_COUNT = 10
const TIMEOUT_MARKER = '__timeout__'

/**
 * Hook central del quiz: carga los datos, mantiene el estado del juego
 * (índice actual, puntaje, respuesta seleccionada) y persiste el high score.
 */
export function useQuiz() {
  const [status, setStatus] = useState<QuizStatus>('loading')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const loadQuiz = useCallback(async () => {
    setStatus('loading')
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    try {
      const countries = await fetchCountries()
      setQuestions(generateQuestions(countries, QUESTION_COUNT))
      setStatus('ready')
    } catch {
      setStatus('error')
    }
  }, [])

  // Carga inicial + lectura del high score guardado.
  useEffect(() => {
    loadQuiz()
    setHighScore(getHighScore())
  }, [loadQuiz])

  const currentQuestion = questions[currentIndex]

  /** Registra la respuesta. `option` null = se acabó el tiempo (error). */
  const answer = useCallback(
    (option: string | null) => {
      if (selectedAnswer !== null) return // ya respondió esta pregunta
      const choice = option ?? TIMEOUT_MARKER
      setSelectedAnswer(choice)
      if (option !== null && option === currentQuestion?.correctAnswer) {
        setScore((s) => s + 1)
      }
    },
    [selectedAnswer, currentQuestion],
  )

  /** Avanza a la siguiente pregunta o finaliza el quiz. */
  const next = useCallback(() => {
    setSelectedAnswer(null)
    setCurrentIndex((i) => {
      if (i + 1 >= questions.length) {
        setStatus('finished')
        return i
      }
      return i + 1
    })
  }, [questions.length])

  // Al finalizar, persiste el puntaje si es récord.
  useEffect(() => {
    if (status === 'finished') {
      setHighScore(saveHighScore(score))
    }
  }, [status, score])

  return {
    status,
    currentQuestion,
    currentIndex,
    total: questions.length,
    score,
    highScore,
    selectedAnswer,
    answer,
    next,
    restart: loadQuiz,
  }
}
