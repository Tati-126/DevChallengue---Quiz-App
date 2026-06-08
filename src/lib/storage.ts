const HIGH_SCORE_KEY = 'country-quiz-highscore'

/** Lee el puntaje máximo guardado en localStorage (0 si no existe). */
export function getHighScore(): number {
  const raw = localStorage.getItem(HIGH_SCORE_KEY)
  const value = raw ? Number(raw) : 0
  return Number.isFinite(value) ? value : 0
}

/**
 * Guarda el puntaje si supera al máximo previo.
 * Devuelve el high score resultante (el nuevo o el que ya existía).
 */
export function saveHighScore(score: number): number {
  const current = getHighScore()
  if (score > current) {
    localStorage.setItem(HIGH_SCORE_KEY, String(score))
    return score
  }
  return current
}
