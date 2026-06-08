import { useEffect, useRef, useState } from 'react'

/**
 * Temporizador regresivo de `seconds` segundos.
 * - `active`: el contador solo corre cuando es true.
 * - `resetKey`: cada vez que cambia, el contador vuelve a `seconds`
 *   (úsalo con el índice de la pregunta para reiniciar en cada una).
 * - `onExpire`: se llama una vez cuando el tiempo llega a 0.
 */
export function useTimer(
  seconds: number,
  onExpire: () => void,
  active: boolean,
  resetKey: unknown,
): number {
  const [timeLeft, setTimeLeft] = useState(seconds)

  // Guardamos el callback en una ref para no reiniciar el intervalo
  // cada vez que el padre vuelve a crear la función.
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  // Reinicia el contador al cambiar de pregunta.
  useEffect(() => {
    setTimeLeft(seconds)
  }, [resetKey, seconds])

  useEffect(() => {
    if (!active) return

    if (timeLeft <= 0) {
      onExpireRef.current()
      return
    }

    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, active])

  return timeLeft
}
