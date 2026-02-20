'use client'

import { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'

// Lazy load 3D scene to avoid SSR issues and improve performance
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <HeroFallback />,
})

function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-hero-gradient">
      <div className="absolute inset-0 bg-blue-glow opacity-30" />
      {/* Static grid lines as fallback */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,170,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,170,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

interface HeroSectionProps {
  dict: Dictionary
  locale: Locale
}

export default function HeroSection({ dict, locale }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-dark/20 via-transparent to-brand-dark pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-dark/60 via-transparent to-brand-dark/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 section-container text-center">
        <div className="max-w-4xl mx-auto">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
            <div className="w-8 h-px bg-brand-blue" />
            <span className="section-label text-xs">
              {locale === 'sr' ? 'KREATIVNO-TEHNOLOŠKI STUDIO' : 'CREATIVE TECHNOLOGY STUDIO'}
            </span>
            <div className="w-8 h-px bg-brand-blue" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6 animate-fade-up">
            <span className="gradient-text">{dict.hero.tagline}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-brand-gray max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animation-delay-200">
            {dict.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
            <Link href={`/${locale}/portfolio`} className="btn-primary text-sm px-8 py-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              {dict.hero.cta_primary}
            </Link>
            <Link href={`/${locale}/contact`} className="btn-secondary text-sm px-8 py-4">
              {dict.hero.cta_secondary}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-fade-up animation-delay-500">
            {[
              { value: '50+', label: locale === 'sr' ? 'Projekata' : 'Projects' },
              { value: '10+', label: locale === 'sr' ? 'Godina Iskustva' : 'Years Experience' },
              { value: '30+', label: locale === 'sr' ? 'Klijenata' : 'Clients' },
              { value: '8', label: locale === 'sr' ? 'Usluga' : 'Services' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-brand-blue">{stat.value}</div>
                <div className="text-xs text-brand-gray mt-1 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-float">
        <span className="text-brand-gray text-xs tracking-widest uppercase">{dict.hero.scroll}</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-blue to-transparent" />
      </div>
    </section>
  )
}
