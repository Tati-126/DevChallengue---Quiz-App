interface ProgressBarProps {
  current: number
  total: number
}

/** Barra de progreso del quiz: "Pregunta X de N". */
export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="w-full">
      <div className="mb-1 text-sm text-slate-500 dark:text-slate-400">
        Pregunta {Math.min(current + 1, total)} de {total}
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-2 rounded-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
