import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata } from '@/lib/seo'
import { getPortfolioProjects, getPortfolioTags } from '@/lib/content'
import PortfolioGrid from '@/components/ui/PortfolioGrid'
import CTASection from '@/components/sections/CTASection'

interface PortfolioPageProps {
  params: { lang: string }
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { lang } = params
  if (!isValidLocale(lang)) return {}
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return generateSEOMetadata({
    title: dict.portfolio.metaTitle.replace(' | Pixels2Pixels Studio', ''),
    description: dict.portfolio.metaDescription,
    locale,
    path: '/portfolio',
    keywords: ['XR portfolio', 'VR AR projects', 'game development portfolio', 'creative tech projects'],
  })
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { lang } = params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const projects = getPortfolioProjects(locale)
  const tags = getPortfolioTags(locale)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-glow opacity-10 pointer-events-none" />
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">{dict.portfolio.headline}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              {dict.portfolio.title}
            </h1>
            <p className="text-brand-gray text-xl leading-relaxed">
              {dict.portfolio.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid with Filtering */}
      <section className="section-padding bg-brand-dark-2">
        <div className="section-container">
          <PortfolioGrid
            projects={projects}
            tags={tags}
            dict={dict}
            locale={locale}
          />
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  )
}
