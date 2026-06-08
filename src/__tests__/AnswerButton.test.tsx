import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AnswerButton } from '../components/AnswerButton'

describe('AnswerButton (interactividad)', () => {
  it('llama a onSelect con la opción al hacer click', async () => {
    const onSelect = vi.fn()
    render(
      <AnswerButton
        option="París"
        onSelect={onSelect}
        disabled={false}
        isCorrect
        isSelected={false}
        revealed={false}
      />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'París' }))

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith('París')
  })

  it('no responde a clicks cuando está deshabilitado', async () => {
    const onSelect = vi.fn()
    render(
      <AnswerButton
        option="Madrid"
        onSelect={onSelect}
        disabled
        isCorrect={false}
        isSelected={false}
        revealed
      />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Madrid' }))

    expect(onSelect).not.toHaveBeenCalled()
  })
})
