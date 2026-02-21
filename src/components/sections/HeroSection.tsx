'use client'

import { useRef, useEffect, useState } from 'react'
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
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,170,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,170,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
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

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
      id="hero"
    >
      {/* Full-screen 3D canvas — absolute background */}
      <div className="absolute inset-0 z-0">
        {mounted && <HeroScene />}
        {!mounted && <HeroFallback />}
      </div>

      {/* Very subtle vignette — does NOT block the 3D from filling the screen */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,4,8,0.55) 100%)',
        }}
      />
      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '180px', background: 'linear-gradient(to bottom, transparent, #020408)' }}
      />

      {/* ── CORNER DECORATIONS (cosmix.ai style) ── */}
      {/* Top-left bracket */}
      <div className="absolute top-24 left-8 z-20 pointer-events-none opacity-40">
        <div className="w-8 h-8 border-l border-t" style={{ borderColor: '#00AAFF' }} />
      </div>
      {/* Top-right bracket */}
      <div className="absolute top-24 right-8 z-20 pointer-events-none opacity-40">
        <div className="w-8 h-8 border-r border-t" style={{ borderColor: '#00AAFF' }} />
      </div>
      {/* Bottom-left bracket */}
      <div className="absolute bottom-24 left-8 z-20 pointer-events-none opacity-40">
        <div className="w-8 h-8 border-l border-b" style={{ borderColor: '#00AAFF' }} />
      </div>
      {/* Bottom-right bracket */}
      <div className="absolute bottom-24 right-8 z-20 pointer-events-none opacity-40">
        <div className="w-8 h-8 border-r border-b" style={{ borderColor: '#00AAFF' }} />
      </div>

      {/* ── SIDE LABELS (cosmix.ai style vertical text) ── */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-3"
        style={{ opacity: 0.35 }}
      >
        <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, transparent, #00AAFF)' }} />
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: '#00AAFF', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {locale === 'sr' ? 'Kreativni Studio' : 'Creative Studio'}
        </span>
        <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, #00AAFF, transparent)' }} />
      </div>

      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-3"
        style={{ opacity: 0.35 }}
      >
        <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, transparent, #00AAFF)' }} />
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: '#00AAFF', writingMode: 'vertical-rl' }}
        >
          {locale === 'sr' ? 'Beograd · Srbija' : 'Belgrade · Serbia'}
        </span>
        <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, #00AAFF, transparent)' }} />
      </div>

      {/* ── MAIN CONTENT — perfectly centered ── */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">

        {/* Studio label */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #00AAFF)' }} />
          <span className="text-xs tracking-[0.3em] uppercase font-light" style={{ color: '#00AAFF' }}>
            {locale === 'sr' ? 'Kreativno-Tehnološki Studio' : 'Creative Technology Studio'}
          </span>
          <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #00AAFF)' }} />
        </div>

        {/* Main headline */}
        <h1
          className="font-black tracking-tight mb-6 leading-none"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s',
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #00AAFF 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {dict.hero.tagline}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-light"
          style={{
            color: 'rgba(180,200,220,0.85)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
          }}
        >
          {dict.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.9s ease 0.45s, transform 0.9s ease 0.45s',
          }}
        >
          <Link
            href={`/${locale}/portfolio`}
            className="group flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #00AAFF, #0077CC)',
              color: '#ffffff',
              borderRadius: '2px',
              boxShadow: '0 0 24px rgba(0,170,255,0.35)',
            }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            {dict.hero.cta_primary}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:border-brand-blue"
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
      </div>

      {/* ── STATS ROW — positioned in lower third, well above scroll indicator ── */}
      <div
        className="absolute left-0 right-0 z-20 flex items-center justify-center gap-8 sm:gap-16 px-6"
        style={{
          bottom: '110px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1.2s ease 0.8s',
        }}
      >
        {[
          { value: '50+', label: locale === 'sr' ? 'Projekata' : 'Projects' },
          { value: '10+', label: locale === 'sr' ? 'Godina' : 'Years' },
          { value: '30+', label: locale === 'sr' ? 'Klijenata' : 'Clients' },
          { value: '24', label: locale === 'sr' ? 'Stručnjaka' : 'Specialists' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div
              className="text-xl sm:text-2xl font-black"
              style={{ color: '#00AAFF', textShadow: '0 0 12px rgba(0,170,255,0.5)' }}
            >
              {stat.value}
            </div>
            <div className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(150,180,210,0.6)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── SCROLL INDICATOR — alone at very bottom, perfectly centered ── */}
      <div
        className="absolute left-0 right-0 z-20 flex flex-col items-center gap-1"
        style={{
          bottom: '18px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1.4s ease 1s',
        }}
      >
        <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(0,170,255,0.55)' }}>
          {dict.hero.scroll}
        </span>
        <div
          className="w-px"
          style={{
            height: '32px',
            background: 'linear-gradient(to bottom, rgba(0,170,255,0.7), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* Scroll pulse keyframe */}
      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  )
}
