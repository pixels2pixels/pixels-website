import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { PortfolioProject, NewsPost } from '@/types/content'
import type { Locale } from '@/i18n/config'

const contentDirectory = path.join(process.cwd(), 'content')

// ─── Portfolio ────────────────────────────────────────────────────────────────

export function getPortfolioProjects(locale: Locale): PortfolioProject[] {
  const dir = path.join(contentDirectory, locale, 'portfolio')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const fullPath = path.join(dir, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Support both old (thumbnail/services) and new (image/tags/category) frontmatter
      const thumbnail = data.thumbnail || data.image || '/images/portfolio/placeholder.jpg'
      const services = data.services || data.tags || (data.category ? [data.category] : [])
      const shortDescription = data.shortDescription || data.excerpt || content.trim().split('\n')[0].substring(0, 160)

      return {
        slug,
        title: data.title || '',
        shortDescription,
        longDescription: content,
        services,
        industries: data.industries || [],
        client: data.client,
        year: parseInt(data.year) || new Date().getFullYear(),
        location: data.location,
        thumbnail,
        gallery: data.gallery || [],
        videos: data.videos || [],
        caseStudyLink: data.caseStudyLink,
        featured: data.featured || false,
      } as PortfolioProject
    })
    .sort((a, b) => b.year - a.year)
}

export function getPortfolioProject(locale: Locale, slug: string): PortfolioProject | null {
  const filePath = path.join(contentDirectory, locale, 'portfolio', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const thumbnail = data.thumbnail || data.image || '/images/portfolio/placeholder.jpg'
  const services = data.services || data.tags || (data.category ? [data.category] : [])
  const shortDescription = data.shortDescription || data.excerpt || content.trim().split('\n')[0].substring(0, 160)

  return {
    slug,
    title: data.title || '',
    shortDescription,
    longDescription: content,
    services,
    industries: data.industries || [],
    client: data.client,
    year: parseInt(data.year) || new Date().getFullYear(),
    location: data.location,
    thumbnail,
    gallery: data.gallery || [],
    videos: data.videos || [],
    caseStudyLink: data.caseStudyLink,
    featured: data.featured || false,
  }
}

// ─── News ─────────────────────────────────────────────────────────────────────

export function getNewsPosts(locale: Locale): NewsPost[] {
  const dir = path.join(contentDirectory, locale, 'news')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const fullPath = path.join(dir, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Support both coverImage and image frontmatter fields
      const coverImage = data.coverImage || data.image || '/images/news/placeholder.jpg'

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || content.trim().split('\n')[0].substring(0, 200),
        coverImage,
        category: data.category || 'News',
        author: data.author,
        content,
      } as NewsPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getNewsPost(locale: Locale, slug: string): NewsPost | null {
  const filePath = path.join(contentDirectory, locale, 'news', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const coverImage = data.coverImage || data.image || '/images/news/placeholder.jpg'

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || content.trim().split('\n')[0].substring(0, 200),
    coverImage,
    category: data.category || 'News',
    author: data.author,
    content,
  }
}

// ─── Unique service tags from portfolio ───────────────────────────────────────

export function getPortfolioTags(locale: Locale): string[] {
  const projects = getPortfolioProjects(locale)
  const tags = new Set<string>()
  projects.forEach((p) => p.services.forEach((s) => tags.add(s)))
  return Array.from(tags).sort()
}
