'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <HeroFallback />,
})

function HeroFallback() {
  return (
    <div className="absolute inset-0" style={{ background: '#020408' }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,170,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,170,255,0.15) 1px, transparent 1px)
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fadeIn = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  })

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '640px' }}
    >
      {/* ── FULL-SCREEN 3D CANVAS BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        {mounted ? <HeroScene /> : <HeroFallback />}
      </div>

      {/* Radial vignette — subtle, doesn't block 3D */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(2,4,8,0.6) 100%)',
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '160px', background: 'linear-gradient(to bottom, transparent, #020408)' }}
      />

      {/* ── CORNER BRACKETS ── */}
      <div className="absolute top-20 left-6 z-20 pointer-events-none opacity-35">
        <div className="w-7 h-7 border-l-2 border-t-2" style={{ borderColor: '#00AAFF' }} />
      </div>
      <div className="absolute top-20 right-6 z-20 pointer-events-none opacity-35">
        <div className="w-7 h-7 border-r-2 border-t-2" style={{ borderColor: '#00AAFF' }} />
      </div>
      <div className="absolute bottom-16 left-6 z-20 pointer-events-none opacity-35">
        <div className="w-7 h-7 border-l-2 border-b-2" style={{ borderColor: '#00AAFF' }} />
      </div>
      <div className="absolute bottom-16 right-6 z-20 pointer-events-none opacity-35">
        <div className="w-7 h-7 border-r-2 border-b-2" style={{ borderColor: '#00AAFF' }} />
      </div>

      {/* ── SIDE VERTICAL LABELS ── */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-3"
        style={{ opacity: 0.3 }}
      >
        <div className="w-px h-14" style={{ background: 'linear-gradient(to bottom, transparent, #00AAFF)' }} />
        <span className="text-xs tracking-widest uppercase" style={{ color: '#00AAFF', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {locale === 'sr' ? 'Kreativni Studio' : 'Creative Studio'}
        </span>
        <div className="w-px h-14" style={{ background: 'linear-gradient(to bottom, #00AAFF, transparent)' }} />
      </div>
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-3"
        style={{ opacity: 0.3 }}
      >
        <div className="w-px h-14" style={{ background: 'linear-gradient(to bottom, transparent, #00AAFF)' }} />
        <span className="text-xs tracking-widest uppercase" style={{ color: '#00AAFF', writingMode: 'vertical-rl' }}>
          {locale === 'sr' ? 'Beograd · Srbija' : 'Belgrade · Serbia'}
        </span>
        <div className="w-px h-14" style={{ background: 'linear-gradient(to bottom, #00AAFF, transparent)' }} />
      </div>

      {/* ── MAIN LAYOUT: flex column, perfectly centered, no absolute positioning ── */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">

        {/* Studio label */}
        <div className="flex items-center gap-3 mb-6" style={fadeIn(0)}>
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #00AAFF)' }} />
          <span className="text-xs tracking-[0.3em] uppercase font-light" style={{ color: '#00AAFF' }}>
            {locale === 'sr' ? 'Kreativno-Tehnološki Studio' : 'Creative Technology Studio'}
          </span>
          <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, #00AAFF)' }} />
        </div>

        {/* Main headline */}
        <h1
          className="font-black tracking-tight leading-none mb-5"
          style={{
            fontSize: 'clamp(2.2rem, 6.5vw, 5.5rem)',
            ...fadeIn(0.15),
          }}
        >
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #00AAFF 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {dict.hero.tagline}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg max-w-lg mx-auto mb-8 leading-relaxed font-light"
          style={{ color: 'rgba(180,200,220,0.8)', ...fadeIn(0.3) }}
        >
          {dict.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12" style={fadeIn(0.45)}>
          <Link
            href={`/${locale}/portfolio`}
            className="group flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #00AAFF, #0077CC)',
              color: '#ffffff',
              borderRadius: '2px',
              boxShadow: '0 0 24px rgba(0,170,255,0.3)',
            }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            {dict.hero.cta_primary}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
            style={{
              border: '1px solid rgba(0,170,255,0.4)',
              color: 'rgba(200,220,240,0.9)',
              borderRadius: '2px',
              background: 'rgba(0,170,255,0.05)',
            }}
          >
            {dict.hero.cta_secondary}
          </Link>
        </div>

        {/* Stats row — inside the flex column, below CTAs */}
        <div
          className="flex items-center justify-center gap-8 sm:gap-14"
          style={fadeIn(0.6)}
        >
          {/* Divider line left */}
          <div className="hidden sm:block h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(0,170,255,0.3))' }} />

          {[
            { value: '50+', label: locale === 'sr' ? 'Projekata' : 'Projects' },
            { value: '10+', label: locale === 'sr' ? 'Godina' : 'Years' },
            { value: '30+', label: locale === 'sr' ? 'Klijenata' : 'Clients' },
            { value: '24',  label: locale === 'sr' ? 'Stručnjaka' : 'Specialists' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-lg sm:text-xl font-black"
                style={{ color: '#00AAFF', textShadow: '0 0 10px rgba(0,170,255,0.5)' }}
              >
                {stat.value}
              </div>
              <div className="text-xs tracking-widest uppercase mt-0.5" style={{ color: 'rgba(130,160,190,0.6)' }}>
                {stat.label}
              </div>
            </div>
          ))}

          {/* Divider line right */}
          <div className="hidden sm:block h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(0,170,255,0.3))' }} />
        </div>
      </div>

      {/* ── SCROLL INDICATOR — absolute, at very bottom center ── */}
      <div
        className="absolute bottom-5 left-0 right-0 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
        style={{
          opacity: mounted ? 0.7 : 0,
          transition: 'opacity 1.4s ease 1.2s',
        }}
      >
        <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(0,170,255,0.7)' }}>
          {dict.hero.scroll}
        </span>
        <div
          className="w-px"
          style={{
            height: '28px',
            background: 'linear-gradient(to bottom, rgba(0,170,255,0.8), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.5; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
      `}</style>
    </section>
  )
}
