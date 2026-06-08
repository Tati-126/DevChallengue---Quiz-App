interface AnswerButtonProps {
  option: string
  onSelect: (option: string) => void
  disabled: boolean
  isCorrect: boolean
  isSelected: boolean
  revealed: boolean
}

/**
 * Botón de una opción de respuesta. Cuando `revealed` es true, colorea de
 * verde la correcta y de rojo la incorrecta seleccionada.
 */
export function AnswerButton({
  option,
  onSelect,
  disabled,
  isCorrect,
  isSelected,
  revealed,
}: AnswerButtonProps) {
  const base =
    'w-full text-left px-4 py-3 rounded-lg border-2 font-medium transition-colors ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-default'

  let state =
    'border-slate-200 bg-white text-slate-800 hover:bg-indigo-50 ' +
    'dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600'

  if (revealed) {
    if (isCorrect) {
      state =
        'border-green-500 bg-green-100 text-green-800 ' +
        'dark:border-green-500 dark:bg-green-900/40 dark:text-green-200'
    } else if (isSelected) {
      state =
        'border-red-500 bg-red-100 text-red-800 ' +
        'dark:border-red-500 dark:bg-red-900/40 dark:text-red-200'
    } else {
      state =
        'border-slate-200 bg-white text-slate-400 ' +
        'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500'
    }
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(option)}
      className={`${base} ${state}`}
    >
      {option}
    </button>
  )
}
