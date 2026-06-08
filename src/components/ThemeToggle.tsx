import { useTheme } from '../hooks/useTheme'

/** Switch de modo claro/oscuro. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      title="Cambiar tema"
      className="rounded-full p-2 text-xl transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
