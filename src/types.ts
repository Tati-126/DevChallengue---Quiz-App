export interface Country {
  name: string
  capital: string
  flag: string
  region: string
}

export type QuestionType = 'capital' | 'flag'

export interface Question {
  type: QuestionType
  country: Country
  options: string[]
  correctAnswer: string
  prompt: string
}

export type QuizStatus = 'loading' | 'error' | 'ready' | 'finished'
