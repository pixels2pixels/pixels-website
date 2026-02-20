import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata } from '@/lib/seo'
import { getNewsPosts } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import CTASection from '@/components/sections/CTASection'

interface NewsPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return generateSEOMetadata({
    title: dict.news.metaTitle.replace(' | Pixels2Pixels Studio', ''),
    description: dict.news.metaDescription,
    locale,
    path: '/news',
    keywords: ['XR news', 'game development news', 'creative tech insights', 'studio updates'],
  })
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const posts = getNewsPosts(locale)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-glow opacity-10 pointer-events-none" />
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">{dict.news.headline}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              {dict.news.title}
            </h1>
            <p className="text-brand-gray text-xl leading-relaxed">
              {dict.news.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding bg-brand-dark-2">
        <div className="section-container">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/news/${post.slug}`}
                  className="card-base group overflow-hidden flex flex-col"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-video bg-brand-dark-3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent" />
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(0,170,255,0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,170,255,0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                      }}
                    />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        post.category === 'Case Study'
                          ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-brand-gray/60 text-xs mb-3">
                      {formatDate(post.date, locale)}
                    </div>
                    <h2 className="text-white font-bold mb-2 group-hover:text-brand-blue transition-colors duration-200 flex-1">
                      {post.title}
                    </h2>
                    <p className="text-brand-gray text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-brand-blue text-xs font-semibold">
                      {dict.news.readMore}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Placeholder when no posts */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-base overflow-hidden">
                  <div className="aspect-video bg-brand-dark-3 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                        {i % 2 === 0 ? 'Case Study' : 'News'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="h-3 w-24 bg-brand-dark-4 rounded mb-3" />
                    <div className="h-5 w-full bg-brand-dark-4 rounded mb-2" />
                    <div className="h-5 w-3/4 bg-brand-dark-4 rounded mb-4" />
                    <div className="h-4 w-full bg-brand-dark-4 rounded mb-1" />
                    <div className="h-4 w-full bg-brand-dark-4 rounded mb-1" />
                    <div className="h-4 w-2/3 bg-brand-dark-4 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  )
}
