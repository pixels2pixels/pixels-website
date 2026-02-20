import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata } from '@/lib/seo'
import { getPortfolioProject, getPortfolioProjects } from '@/lib/content'
import CTASection from '@/components/sections/CTASection'

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isValidLocale(lang)) return {}
  const locale = lang as Locale

  const project = getPortfolioProject(locale, slug)
  if (!project) return {}

  return generateSEOMetadata({
    title: project.title,
    description: project.shortDescription,
    locale,
    path: `/portfolio/${slug}`,
    image: project.thumbnail,
    type: 'article',
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const project = getPortfolioProject(locale, slug)
  if (!project) notFound()

  const relatedProjects = getPortfolioProjects(locale)
    .filter((p) => p.slug !== slug && p.services.some((s) => project.services.includes(s)))
    .slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-glow opacity-10 pointer-events-none" />
        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-brand-gray mb-8">
            <Link href={`/${locale}`} className="hover:text-brand-blue transition-colors">
              {dict.nav.home}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/portfolio`} className="hover:text-brand-blue transition-colors">
              {dict.nav.portfolio}
            </Link>
            <span>/</span>
            <span className="text-white">{project.title}</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.services.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {project.title}
          </h1>
          <p className="text-brand-gray text-xl max-w-2xl leading-relaxed mb-8">
            {project.shortDescription}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 text-sm">
            {project.client && (
              <div>
                <span className="text-brand-gray/60 text-xs uppercase tracking-wider block mb-1">
                  {locale === 'sr' ? 'Klijent' : 'Client'}
                </span>
                <span className="text-white font-medium">{project.client}</span>
              </div>
            )}
            <div>
              <span className="text-brand-gray/60 text-xs uppercase tracking-wider block mb-1">
                {locale === 'sr' ? 'Godina' : 'Year'}
              </span>
              <span className="text-white font-medium">{project.year}</span>
            </div>
            {project.location && (
              <div>
                <span className="text-brand-gray/60 text-xs uppercase tracking-wider block mb-1">
                  {locale === 'sr' ? 'Lokacija' : 'Location'}
                </span>
                <span className="text-white font-medium">{project.location}</span>
              </div>
            )}
            {project.industries.length > 0 && (
              <div>
                <span className="text-brand-gray/60 text-xs uppercase tracking-wider block mb-1">
                  {locale === 'sr' ? 'Industrija' : 'Industry'}
                </span>
                <span className="text-white font-medium">{project.industries.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Thumbnail */}
      <section className="bg-brand-dark-2">
        <div className="section-container py-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden glow-border bg-brand-dark-3">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,170,255,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,170,255,0.5) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-brand-gray/30 text-sm">
                {locale === 'sr' ? 'Thumbnail slika projekta' : 'Project thumbnail image'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-brand-dark">
        <div className="section-container">
          <div className="max-w-3xl">
            <div
              className="prose-dark"
              dangerouslySetInnerHTML={{ __html: project.longDescription }}
            />
          </div>
        </div>
      </section>

      {/* Video embeds */}
      {project.videos && project.videos.length > 0 && (
        <section className="section-padding bg-brand-dark-2">
          <div className="section-container">
            <h2 className="text-2xl font-black text-white mb-8">
              {locale === 'sr' ? 'Video' : 'Videos'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.videos.map((videoUrl, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden glow-border">
                  <iframe
                    src={videoUrl}
                    className="absolute inset-0 w-full h-full"
                    title={`${project.title} video ${i + 1}`}
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-brand-dark-2">
          <div className="section-container">
            <h2 className="text-2xl font-black text-white mb-8">
              {dict.portfolio.relatedProjects}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${locale}/portfolio/${p.slug}`}
                  className="card-base group overflow-hidden"
                >
                  <div className="aspect-video bg-brand-dark-3 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold text-sm mb-1 group-hover:text-brand-blue transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-brand-gray text-xs line-clamp-2">{p.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="bg-brand-dark py-8">
        <div className="section-container">
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-glow transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {dict.portfolio.backToPortfolio}
          </Link>
        </div>
      </div>

      <CTASection dict={dict} locale={locale} />
    </>
  )
}
