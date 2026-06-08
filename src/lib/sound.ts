/**
 * Efectos de sonido generados con la Web Audio API (sin archivos externos).
 * Un sonido ascendente y alegre para los aciertos, y uno grave para los
 * errores.
 */

let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioContext) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!Ctor) return null
    audioContext = new Ctor()
  }
  return audioContext
}

/** Reproduce un tono sinusoidal breve con una envolvente suave. */
export function playTone(frequency: number, duration = 0.15): void {
  const ctx = getContext()
  if (!ctx) return

  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.value = frequency

  // Envolvente: sube rápido y decae para evitar clics audibles.
  gain.gain.setValueAtTime(0.0001, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

  oscillator.connect(gain)
  gain.connect(ctx.destination)
  oscillator.start()
  oscillator.stop(ctx.currentTime + duration)
}

/** Sonido de acierto: dos notas ascendentes. */
export function playSuccess(): void {
  playTone(880, 0.15)
  setTimeout(() => playTone(1175, 0.18), 120)
}

/** Sonido de error: una nota grave y un poco más larga. */
export function playError(): void {
  playTone(196, 0.3)
}
