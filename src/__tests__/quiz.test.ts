import { describe, it, expect } from 'vitest'
import { generateQuestions, shuffle } from '../lib/quiz'
import type { Country } from '../types'

const countries: Country[] = Array.from({ length: 12 }, (_, i) => ({
  name: `País ${i}`,
  capital: `Capital ${i}`,
  flag: `flag-${i}.svg`,
  region: 'Test',
}))

describe('generateQuestions', () => {
  it('genera la cantidad pedida de preguntas', () => {
    expect(generateQuestions(countries, 8)).toHaveLength(8)
  })

  it('cada pregunta tiene 4 opciones e incluye la respuesta correcta', () => {
    for (const q of generateQuestions(countries, 10)) {
      expect(q.options).toHaveLength(4)
      expect(q.options).toContain(q.correctAnswer)
    }
  })
})

describe('shuffle', () => {
  it('no muta el arreglo original y conserva los mismos elementos', () => {
    const original = [1, 2, 3, 4, 5]
    const result = shuffle(original)
    expect(original).toEqual([1, 2, 3, 4, 5])
    expect([...result].sort()).toEqual(original)
  })
})
