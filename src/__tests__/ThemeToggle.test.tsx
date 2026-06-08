import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '../components/ThemeToggle'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('ThemeToggle (interactividad / dark mode)', () => {
  it('alterna la clase `dark` en el documento al hacer click', async () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /cambiar tema/i })

    const before = document.documentElement.classList.contains('dark')
    await userEvent.click(button)
    const after = document.documentElement.classList.contains('dark')

    expect(after).toBe(!before)
  })

  it('persiste el tema elegido en localStorage', async () => {
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: /cambiar tema/i }))

    expect(localStorage.getItem('country-quiz-theme')).toMatch(/light|dark/)
  })
})
