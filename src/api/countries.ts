import type { Country } from '../types'

const API_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,flags,region'

/** Forma cruda de un país tal como lo devuelve la API REST Countries. */
interface RawCountry {
  name: { common: string }
  capital?: string[]
  flags: { png: string; svg: string; alt?: string }
  region: string
}

/**
 * Descarga la lista de países y la normaliza a nuestro tipo `Country`.
 * Filtra los países sin capital (p. ej. la Antártida) para que todas las
 * preguntas tengan una respuesta válida.
 *
 * @throws Error si la respuesta de la API no es satisfactoria.
 */
export async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Error al cargar países: ${response.status}`)
  }

  const data: RawCountry[] = await response.json()

  return data
    .filter((c) => c.capital && c.capital.length > 0)
    .map((c) => ({
      name: c.name.common,
      capital: c.capital![0],
      flag: c.flags.svg,
      region: c.region,
    }))
}
