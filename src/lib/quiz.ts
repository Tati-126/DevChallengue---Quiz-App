import type { Country, Question } from '../types'

/** Mezcla aleatoria (Fisher-Yates) sin mutar el arreglo original. */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Genera una lista de preguntas a partir de los países disponibles.
 * Alterna entre preguntas de capital y de bandera. Cada pregunta tiene
 * 4 opciones: la correcta más 3 distractores aleatorios.
 */
export function generateQuestions(
  countries: Country[],
  amount = 10,
): Question[] {
  const usable = countries.filter((c) => c.capital && c.name)
  const pool = shuffle(usable).slice(0, amount)

  return pool.map((country, index) => {
    const type: Question['type'] = index % 2 === 0 ? 'capital' : 'flag'
    const distractors = shuffle(usable.filter((c) => c.name !== country.name))

    if (type === 'capital') {
      return {
        type,
        country,
        correctAnswer: country.capital,
        options: shuffle([
          country.capital,
          ...distractors.slice(0, 3).map((c) => c.capital),
        ]),
        prompt: `¿Cuál es la capital de ${country.name}?`,
      }
    }

    return {
      type,
      country,
      correctAnswer: country.name,
      options: shuffle([
        country.name,
        ...distractors.slice(0, 3).map((c) => c.name),
      ]),
      prompt: '¿A qué país pertenece esta bandera?',
    }
  })
}
