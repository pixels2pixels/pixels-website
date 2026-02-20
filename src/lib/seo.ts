import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixels2pixels.com'

export interface SEOProps {
  title: string
  description: string
  locale: Locale
  path: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
}

export function generateSEOMetadata({
  title,
  description,
  locale,
  path,
  image = '/images/og-default.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords,
}: SEOProps): Metadata {
  const url = `${siteUrl}/${locale}${path}`
  const alternateEn = `${siteUrl}/en${path}`
  const alternateSr = `${siteUrl}/sr${path}`
  const ogImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  return {
    title: `${title} | Pixels2Pixels Studio`,
    description,
    keywords: keywords?.join(', '),
    alternates: {
      canonical: url,
      languages: {
        'en': alternateEn,
        'sr': alternateSr,
        'x-default': alternateEn,
      },
    },
    openGraph: {
      title: `${title} | Pixels2Pixels Studio`,
      description,
      url,
      siteName: 'Pixels2Pixels Studio',
      locale: locale === 'sr' ? 'sr_RS' : 'en_US',
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Pixels2Pixels Studio`,
      description,
      images: [ogImage],
      site: '@pixels2pixels',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pixels2Pixels Studio',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: 'Creative technology studio specializing in XR, game development, web development, 3D design, and digital marketing.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Belgrade',
      addressCountry: 'RS',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@pixels2pixels.com',
      contactType: 'customer service',
    },
    sameAs: [
      'https://www.linkedin.com/company/pixels2pixels',
      'https://www.instagram.com/pixels2pixels',
    ],
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateArticleSchema({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author,
}: {
  title: string
  description: string
  url: string
  image: string
  publishedTime: string
  modifiedTime?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: author
      ? {
          '@type': 'Person',
          name: author,
        }
      : {
          '@type': 'Organization',
          name: 'Pixels2Pixels Studio',
        },
    publisher: {
      '@type': 'Organization',
      name: 'Pixels2Pixels Studio',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
  }
}
