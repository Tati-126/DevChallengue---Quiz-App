interface TimerProps {
  timeLeft: number
}

/** Muestra los segundos restantes; se pone en rojo en los últimos 5s. */
export function Timer({ timeLeft }: TimerProps) {
  const danger = timeLeft <= 5

  return (
    <div
      className={`flex shrink-0 items-center gap-1 font-mono text-lg font-bold ${
        danger ? 'animate-pulse text-red-500' : 'text-slate-600 dark:text-slate-300'
      }`}
      role="timer"
      aria-label={`${timeLeft} segundos restantes`}
    >
      <span aria-hidden>⏱️</span>
      {timeLeft}s
    </div>
  )
}
