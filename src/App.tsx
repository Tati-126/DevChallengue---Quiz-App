import { Link, Route, Routes } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext'
import { ThemeToggle } from './components/ThemeToggle'
import { Home } from './pages/Home'
import { Quiz } from './pages/Quiz'
import { Results } from './pages/Results'

/** Layout principal + definición de rutas con React Router. */
export default function App() {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 text-slate-900 transition-colors dark:from-slate-900 dark:to-slate-800 dark:text-slate-100">
        <header className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold">
            🌍 Country Quiz
          </Link>
          <ThemeToggle />
        </header>

        <main className="mx-auto max-w-2xl px-4 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </QuizProvider>
  )
}
