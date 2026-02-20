import type { Locale } from './config'
import type { Dictionary } from './dictionaries/en'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en').then((m) => m.default),
  sr: () => import('./dictionaries/sr').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
