import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata } from '@/lib/seo'
import { getPortfolioProject, getPortfolioProjects } from '@/lib/content'
import CTASection from '@/components/sections/CTASection'

interface ProjectPageProps {
  params: { lang: string; slug: string }
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = params
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
  const { lang, slug } = params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const project = getPortfolioProject(locale, slug)
  if (!project) notFound()

  const relatedProjects = getPortfolioProjects(locale)
    .filter((p) => p.slug !== slug && p.services.some((s) => project.services.includes(s)))
    .slice(0, 3)

  // Split long description into paragraphs for readable display
  const paragraphs = project.longDescription
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && !p.startsWith('#'))

  // Extract any headings from the content
  const sections = project.longDescription
    .split('\n')
    .reduce<{ heading: string; body: string[] }[]>((acc, line) => {
      const trimmed = line.trim()
      if (trimmed.startsWith('## ')) {
        acc.push({ heading: trimmed.replace('## ', ''), body: [] })
      } else if (trimmed.length > 0 && acc.length > 0) {
        acc[acc.length - 1].body.push(trimmed)
      }
      return acc
    }, [])

  const hasSections = sections.length > 0

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-0 bg-brand-dark overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-brand-gray/60 mb-8 uppercase tracking-wider">
            <Link href={`/${locale}`} className="hover:text-brand-blue transition-colors">
              {dict.nav.home}
            </Link>
            <span className="text-brand-gray/30">/</span>
            <Link href={`/${locale}/portfolio`} className="hover:text-brand-blue transition-colors">
              {dict.nav.portfolio}
            </Link>
            <span className="text-brand-gray/30">/</span>
            <span className="text-brand-gray/80">{project.title}</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.services.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-5 leading-tight">
            {project.title}
          </h1>

          {/* Short description — one clear sentence */}
          <p className="text-brand-gray text-xl max-w-2xl leading-relaxed mb-10">
            {project.shortDescription}
          </p>

          {/* Key info bar */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 pb-10 border-b border-white/5">
            {project.client && (
              <div>
                <p className="text-xs text-brand-gray/50 uppercase tracking-widest mb-1">
                  {locale === 'sr' ? 'Klijent' : 'Client'}
                </p>
                <p className="text-white font-semibold">{project.client}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-brand-gray/50 uppercase tracking-widest mb-1">
                {locale === 'sr' ? 'Godina' : 'Year'}
              </p>
              <p className="text-white font-semibold">{project.year}</p>
            </div>
            {project.location && (
              <div>
                <p className="text-xs text-brand-gray/50 uppercase tracking-widest mb-1">
                  {locale === 'sr' ? 'Lokacija' : 'Location'}
                </p>
                <p className="text-white font-semibold">{project.location}</p>
              </div>
            )}
            {project.industries && project.industries.length > 0 && (
              <div>
                <p className="text-xs text-brand-gray/50 uppercase tracking-widest mb-1">
                  {locale === 'sr' ? 'Industrija' : 'Industry'}
                </p>
                <p className="text-white font-semibold">{project.industries.join(', ')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Hero image — full width, cinematic */}
        <div className="relative w-full" style={{ aspectRatio: '21/9', minHeight: 320 }}>
          {project.thumbnail && !project.thumbnail.includes('placeholder') ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-brand-dark-2 flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,180,216,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.8) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />
              <span className="text-brand-gray/20 text-sm tracking-widest uppercase">
                {project.title}
              </span>
            </div>
          )}
          {/* Gradient overlay bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent" />
        </div>
      </section>

      {/* ── CONTENT BODY ─────────────────────────────────────── */}
      <section className="bg-brand-dark py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Main content — 2/3 width */}
            <div className="lg:col-span-2 space-y-12">

              {hasSections ? (
                /* Structured sections from markdown headings */
                sections.map((section, i) => (
                  <div key={i}>
                    <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                      <span className="w-8 h-0.5 bg-brand-blue inline-block flex-shrink-0" />
                      {section.heading}
                    </h2>
                    <div className="space-y-3 pl-11">
                      {section.body.map((para, j) => (
                        <p key={j} className="text-brand-gray leading-relaxed text-base">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                /* Fallback: split plain text into readable chunks */
                <>
                  {/* First paragraph — larger, intro style */}
                  {paragraphs[0] && (
                    <div>
                      <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                        <span className="w-8 h-0.5 bg-brand-blue inline-block flex-shrink-0" />
                        {locale === 'sr' ? 'O projektu' : 'About the Project'}
                      </h2>
                      <p className="text-brand-gray leading-relaxed text-lg pl-11">
                        {paragraphs[0]}
                      </p>
                    </div>
                  )}

                  {/* Remaining paragraphs split into two sections */}
                  {paragraphs.length > 1 && (
                    <div>
                      <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                        <span className="w-8 h-0.5 bg-brand-blue inline-block flex-shrink-0" />
                        {locale === 'sr' ? 'Naš pristup' : 'Our Approach'}
                      </h2>
                      <div className="space-y-3 pl-11">
                        {paragraphs.slice(1, 3).map((para, i) => (
                          <p key={i} className="text-brand-gray leading-relaxed text-base">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {paragraphs.length > 3 && (
                    <div>
                      <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                        <span className="w-8 h-0.5 bg-brand-blue inline-block flex-shrink-0" />
                        {locale === 'sr' ? 'Rezultati' : 'Results & Delivery'}
                      </h2>
                      <div className="space-y-3 pl-11">
                        {paragraphs.slice(3).map((para, i) => (
                          <p key={i} className="text-brand-gray leading-relaxed text-base">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar — 1/3 width */}
            <aside className="space-y-6">

              {/* Tech / Services card */}
              <div className="rounded-2xl border border-white/5 bg-brand-dark-2 p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-4">
                  {locale === 'sr' ? 'Tehnologije & Usluge' : 'Technologies & Services'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-brand-gray border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project details card */}
              <div className="rounded-2xl border border-white/5 bg-brand-dark-2 p-6 space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-2">
                  {locale === 'sr' ? 'Detalji projekta' : 'Project Details'}
                </h3>
                {project.client && (
                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <span className="text-brand-gray/50 text-sm">{locale === 'sr' ? 'Klijent' : 'Client'}</span>
                    <span className="text-white text-sm font-medium text-right">{project.client}</span>
                  </div>
                )}
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <span className="text-brand-gray/50 text-sm">{locale === 'sr' ? 'Godina' : 'Year'}</span>
                  <span className="text-white text-sm font-medium">{project.year}</span>
                </div>
                {project.location && (
                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <span className="text-brand-gray/50 text-sm">{locale === 'sr' ? 'Lokacija' : 'Location'}</span>
                    <span className="text-white text-sm font-medium text-right">{project.location}</span>
                  </div>
                )}
                {project.industries && project.industries.length > 0 && (
                  <div className="flex justify-between items-start">
                    <span className="text-brand-gray/50 text-sm">{locale === 'sr' ? 'Industrija' : 'Industry'}</span>
                    <span className="text-white text-sm font-medium text-right">{project.industries.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* CTA sidebar card */}
              <div className="rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-6">
                <h3 className="text-white font-bold mb-2">
                  {locale === 'sr' ? 'Slični projekat?' : 'Similar project in mind?'}
                </h3>
                <p className="text-brand-gray text-sm mb-4 leading-relaxed">
                  {locale === 'sr'
                    ? 'Razgovarajmo o vašoj viziji i kako je možemo ostvariti.'
                    : "Let's talk about your vision and how we can bring it to life."}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="block text-center py-2.5 px-4 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-glow transition-colors"
                >
                  {locale === 'sr' ? 'Kontaktirajte nas' : 'Get in Touch'}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── IMAGE GALLERY ─────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 ? (
        <section className="bg-brand-dark-2 py-20">
          <div className="section-container">
            <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-brand-blue inline-block" />
              {locale === 'sr' ? 'Galerija' : 'Gallery'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-xl overflow-hidden glow-border group"
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} — image ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Gallery placeholder — shows when no gallery images are set */
        <section className="bg-brand-dark-2 py-20">
          <div className="section-container">
            <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-brand-blue inline-block" />
              {locale === 'sr' ? 'Vizuali projekta' : 'Project Visuals'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-brand-dark-3 flex items-center justify-center group"
                >
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,180,216,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.8) 1px, transparent 1px)`,
                      backgroundSize: '30px 30px',
                    }}
                  />
                  <div className="relative z-10 text-center">
                    <svg className="w-8 h-8 text-brand-blue/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-brand-gray/20 text-xs tracking-widest uppercase">
                      {locale === 'sr' ? 'Slika projekta' : 'Project image'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-brand-gray/30 text-xs text-center mt-4 tracking-wider">
              {locale === 'sr'
                ? 'Dodajte slike u frontmatter: gallery: ["/images/..."]'
                : 'Add images in frontmatter: gallery: ["/images/..."]'}
            </p>
          </div>
        </section>
      )}

      {/* ── VIDEO SECTION ─────────────────────────────────────── */}
      {project.videos && project.videos.length > 0 ? (
        <section className="bg-brand-dark py-20">
          <div className="section-container">
            <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-brand-blue inline-block" />
              {locale === 'sr' ? 'Video' : 'Video'}
            </h2>
            <div className={`grid gap-6 ${project.videos.length === 1 ? 'grid-cols-1 max-w-3xl' : 'grid-cols-1 md:grid-cols-2'}`}>
              {project.videos.map((videoUrl, i) => (
                <div key={i} className="relative aspect-video rounded-2xl overflow-hidden glow-border">
                  <iframe
                    src={videoUrl}
                    className="absolute inset-0 w-full h-full"
                    title={`${project.title} video ${i + 1}`}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Video placeholder */
        <section className="bg-brand-dark py-20">
          <div className="section-container">
            <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-brand-blue inline-block" />
              {locale === 'sr' ? 'Video prezentacija' : 'Video Showcase'}
            </h2>
            <div className="max-w-3xl">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-brand-dark-2 flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,180,216,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.8) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-brand-blue/30 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-brand-blue/50 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-brand-gray/30 text-xs tracking-widest uppercase">
                    {locale === 'sr' ? 'Video uskoro' : 'Video coming soon'}
                  </p>
                  <p className="text-brand-gray/20 text-xs mt-1">
                    {locale === 'sr'
                      ? 'Dodajte YouTube/Vimeo URL u frontmatter: videos: ["..."]'
                      : 'Add YouTube/Vimeo URL in frontmatter: videos: ["..."]'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED PROJECTS ─────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="bg-brand-dark-2 py-20">
          <div className="section-container">
            <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-brand-blue inline-block" />
              {dict.portfolio.relatedProjects}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${locale}/portfolio/${p.slug}`}
                  className="card-base group overflow-hidden"
                >
                  <div className="aspect-video bg-brand-dark-3 relative overflow-hidden">
                    {p.thumbnail && !p.thumbnail.includes('placeholder') ? (
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {p.services.slice(0, 2).map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue/80">
                          {s}
                        </span>
                      ))}
                    </div>
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

      {/* ── BACK LINK ─────────────────────────────────────────── */}
      <div className="bg-brand-dark py-8 border-t border-white/5">
        <div className="section-container flex items-center justify-between">
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-glow transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {dict.portfolio.backToPortfolio}
          </Link>
          <span className="text-brand-gray/30 text-xs uppercase tracking-widest">
            {project.year} · {project.services[0]}
          </span>
        </div>
      </div>

      <CTASection dict={dict} locale={locale} />
    </>
  )
}
