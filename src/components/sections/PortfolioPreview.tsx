import Link from 'next/link'
import { getPortfolioProjects } from '@/lib/content'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'

interface PortfolioPreviewProps {
  dict: Dictionary
  locale: Locale
}

export default async function PortfolioPreview({ dict, locale }: PortfolioPreviewProps) {
  const projects = getPortfolioProjects(locale).slice(0, 3)

  return (
    <section className="section-padding bg-brand-dark relative overflow-hidden" id="portfolio-preview">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-label">{dict.portfolio.headline}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {dict.portfolio.title}
            </h2>
          </div>
          <Link href={`/${locale}/portfolio`} className="btn-secondary text-sm flex-shrink-0">
            {dict.common.viewAll}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/${locale}/portfolio/${project.slug}`}
                className="card-base group overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-brand-dark-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent" />
                  {/* Placeholder pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,170,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,170,255,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  {/* Year badge */}
                  <div className="absolute top-3 right-3 bg-brand-dark/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-brand-blue border border-brand-blue/20">
                    {project.year}
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold bg-brand-dark/80 px-4 py-2 rounded-lg border border-brand-blue/30">
                      {dict.portfolio.viewProject}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.services.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-white font-bold mb-2 group-hover:text-brand-blue transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-brand-gray text-sm leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Placeholder when no content yet */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-base overflow-hidden">
                <div className="aspect-video bg-brand-dark-3 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent" />
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-brand-gray/40 text-sm">
                      {locale === 'sr' ? 'Projekat' : 'Project'} {i}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex gap-2 mb-3">
                    <div className="h-5 w-16 bg-brand-blue/10 rounded-full" />
                    <div className="h-5 w-20 bg-brand-blue/10 rounded-full" />
                  </div>
                  <div className="h-5 w-3/4 bg-brand-dark-4 rounded mb-2" />
                  <div className="h-4 w-full bg-brand-dark-4 rounded mb-1" />
                  <div className="h-4 w-2/3 bg-brand-dark-4 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
