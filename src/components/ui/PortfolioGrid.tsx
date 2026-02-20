'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PortfolioProject } from '@/types/content'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'
import { cn } from '@/lib/utils'

interface PortfolioGridProps {
  projects: PortfolioProject[]
  tags: string[]
  dict: Dictionary
  locale: Locale
}

export default function PortfolioGrid({ projects, tags, dict, locale }: PortfolioGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredProjects = activeTag
    ? projects.filter((p) => p.services.includes(activeTag))
    : projects

  return (
    <div>
      {/* Filter Bar */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTag === null
                ? 'bg-brand-blue text-white'
                : 'bg-brand-dark-3 text-brand-gray hover:text-white border border-brand-blue/20 hover:border-brand-blue/40'
            )}
          >
            {dict.portfolio.filterAll}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                activeTag === tag
                  ? 'bg-brand-blue text-white'
                  : 'bg-brand-dark-3 text-brand-gray hover:text-white border border-brand-blue/20 hover:border-brand-blue/40'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/${locale}/portfolio/${project.slug}`}
              className="card-base group overflow-hidden"
            >
              {/* Thumbnail */}
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
                {/* Year badge */}
                <div className="absolute top-3 right-3 bg-brand-dark/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-brand-blue border border-brand-blue/20">
                  {project.year}
                </div>
                {/* Client badge */}
                {project.client && (
                  <div className="absolute bottom-3 left-3 bg-brand-dark/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-brand-gray border border-brand-blue/10">
                    {project.client}
                  </div>
                )}
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
                  {project.services.length > 2 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-brand-dark-4 text-brand-gray">
                      +{project.services.length - 2}
                    </span>
                  )}
                </div>

                <h3 className="text-white font-bold mb-2 group-hover:text-brand-blue transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* Location */}
                {project.location && (
                  <div className="flex items-center gap-1 mt-3 text-brand-gray/60 text-xs">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {project.location}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-brand-gray text-lg">
            {locale === 'sr' ? 'Nema projekata za ovaj filter.' : 'No projects found for this filter.'}
          </p>
          <button
            onClick={() => setActiveTag(null)}
            className="btn-secondary mt-4"
          >
            {dict.portfolio.filterAll}
          </button>
        </div>
      )}
    </div>
  )
}
