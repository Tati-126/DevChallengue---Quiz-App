import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const THEME_KEY = 'country-quiz-theme'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  // Respeta la preferencia del sistema operativo la primera vez.
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/**
 * Gestiona el tema claro/oscuro. Aplica/quita la clase `dark` en <html>
 * (necesaria para las utilidades `dark:` de Tailwind) y lo persiste en
 * localStorage.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
