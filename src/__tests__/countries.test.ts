import { describe, it, expect, vi, afterEach } from 'vitest'
import { fetchCountries } from '../api/countries'

const sample = [
  {
    name: { common: 'Francia' },
    capital: ['París'],
    flags: { png: 'fr.png', svg: 'fr.svg' },
    region: 'Europe',
  },
  {
    // Sin capital: debe filtrarse.
    name: { common: 'Antártida' },
    capital: [],
    flags: { png: 'aq.png', svg: 'aq.svg' },
    region: 'Antarctic',
  },
]

afterEach(() => {
  vi.restoreAllMocks()
})

describe('fetchCountries', () => {
  it('mapea los países y filtra los que no tienen capital (estado: datos cargados)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => sample,
      }),
    )

    const result = await fetchCountries()

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      name: 'Francia',
      capital: 'París',
      flag: 'fr.svg',
      region: 'Europe',
    })
  })

  it('lanza un error cuando la respuesta no es satisfactoria (estado: error)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    )

    await expect(fetchCountries()).rejects.toThrow('Error al cargar países')
  })
})
