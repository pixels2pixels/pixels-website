import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata, generateArticleSchema } from '@/lib/seo'
import { getNewsPost, getNewsPosts } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import CTASection from '@/components/sections/CTASection'

interface NewsPostPageProps {
  params: { lang: string; slug: string }
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const { lang, slug } = params
  if (!isValidLocale(lang)) return {}
  const locale = lang as Locale

  const post = getNewsPost(locale, slug)
  if (!post) return {}

  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    locale,
    path: `/news/${slug}`,
    image: post.coverImage,
    type: 'article',
    publishedTime: post.date,
  })
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { lang, slug } = params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const post = getNewsPost(locale, slug)
  if (!post) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixels2pixels.com'
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: `${siteUrl}/${locale}/news/${slug}`,
    image: post.coverImage,
    publishedTime: post.date,
    author: post.author,
  })

  const recentPosts = getNewsPosts(locale)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-glow opacity-10 pointer-events-none" />
        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-brand-gray mb-8">
            <Link href={`/${locale}`} className="hover:text-brand-blue transition-colors">
              {dict.nav.home}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/news`} className="hover:text-brand-blue transition-colors">
              {dict.nav.news}
            </Link>
            <span>/</span>
            <span className="text-white truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Category + Date */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              post.category === 'Case Study'
                ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30'
                : 'bg-white/10 text-white border border-white/20'
            }`}>
              {post.category}
            </span>
            <span className="text-brand-gray text-sm">{formatDate(post.date, locale)}</span>
            {post.author && (
              <>
                <span className="text-brand-gray/40">•</span>
                <span className="text-brand-gray text-sm">{post.author}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 max-w-3xl">
            {post.title}
          </h1>
          <p className="text-brand-gray text-xl max-w-2xl leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Cover Image */}
      <section className="bg-brand-dark-2">
        <div className="section-container py-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden glow-border bg-brand-dark-3 max-w-4xl">
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
                {locale === 'sr' ? 'Cover slika članka' : 'Article cover image'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-brand-dark">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div
                className="prose-dark"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Back link */}
              <div className="mt-12 pt-8 border-t border-brand-blue/10">
                <Link
                  href={`/${locale}/news`}
                  className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-glow transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {dict.news.backToNews}
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {recentPosts.length > 0 && (
                <div className="sticky top-24">
                  <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                    {locale === 'sr' ? 'Nedavni Članci' : 'Recent Posts'}
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/${locale}/news/${p.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="w-16 h-12 rounded-lg bg-brand-dark-3 flex-shrink-0 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-brand-blue/10 to-transparent" />
                          </div>
                          <div>
                            <p className="text-white text-xs font-medium group-hover:text-brand-blue transition-colors line-clamp-2">
                              {p.title}
                            </p>
                            <p className="text-brand-gray/60 text-xs mt-1">
                              {formatDate(p.date, locale)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  )
}
