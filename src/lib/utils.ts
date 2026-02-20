import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Locale } from '@/i18n/config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale === 'sr' ? 'sr-RS' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getLocalePath(locale: Locale, path: string): string {
  return `/${locale}${path}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}
