import type { MetadataRoute } from 'next'
import { i18nConfig } from '@/i18n/config'
import { getPortfolioProjects, getNewsPosts } from '@/lib/content'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixels2pixels.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/news',
    '/contact',
  ]

  const serviceSlugsByLocale: Record<string, string[]> = {
    en: [
      'xr-development', 'game-development', 'web-development', 'blockchain',
      '2d-design', '3d-design', 'video-production', 'digital-marketing',
    ],
    sr: [
      'xr-razvoj', 'razvoj-igara', 'web-razvoj', 'blockchain',
      '2d-dizajn', '3d-dizajn', 'video-produkcija', 'digitalni-marketing',
    ],
  }

  const urls: MetadataRoute.Sitemap = []

  // Static pages
  for (const locale of i18nConfig.locales) {
    for (const page of staticPages) {
      urls.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/portfolio' ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            i18nConfig.locales.map((l: string) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      })
    }

    // Service pages
    for (const slug of serviceSlugsByLocale[locale] || []) {
      urls.push({
        url: `${BASE_URL}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }

    // Portfolio pages
    const projects = getPortfolioProjects(locale)
    for (const project of projects) {
      urls.push({
        url: `${BASE_URL}/${locale}/portfolio/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }

    // News pages
    const posts = getNewsPosts(locale)
    for (const post of posts) {
      urls.push({
        url: `${BASE_URL}/${locale}/news/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'never',
        priority: 0.6,
      })
    }
  }

  return urls
}
