export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'sr'],
} as const

export type Locale = (typeof i18nConfig)['locales'][number]

export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale)
}

// Slug mapping for Serbian routes
export const srSlugMap: Record<string, string> = {
  'o-nama': 'about',
  'kontakt': 'contact',
  'portfolio': 'portfolio',
  'vesti': 'news',
}

// Service slugs
export const serviceSlugMap: Record<string, string> = {
  'xr-development': 'xr-development',
  'game-development': 'game-development',
  'web-development': 'web-development',
  'blockchain': 'blockchain',
  '2d-design': '2d-design',
  '3d-design': '3d-design',
  'video-production': 'video-production',
  'digital-marketing': 'digital-marketing',
}
