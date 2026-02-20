import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateOrganizationSchema } from '@/lib/seo'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'sr' }]
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixels2pixels.com'
  
  return {
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        'en': `${siteUrl}/en`,
        'sr': `${siteUrl}/sr`,
        'x-default': `${siteUrl}/en`,
      },
    },
  }
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params

  if (!isValidLocale(lang)) {
    notFound()
  }

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const orgSchema = generateOrganizationSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Navigation dict={dict} locale={locale} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
