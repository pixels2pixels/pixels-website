export interface PortfolioProject {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  services: string[]
  industries: string[]
  client?: string
  year: number
  location?: string
  thumbnail: string
  gallery: string[]
  videos?: string[]
  caseStudyLink?: string
  featured?: boolean
}

export interface NewsPost {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage: string
  category: 'News' | 'Case Study'
  author?: string
  content: string
}

export interface ServiceItem {
  slug: string
  title: string
  shortDescription: string
  description: string
  icon: string
  features: string[]
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image?: string
  linkedin?: string
}

export interface Testimonial {
  name: string
  role: string
  text: string
  avatar?: string
}
