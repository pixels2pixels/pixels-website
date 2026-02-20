'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'

interface ShowreelSectionProps {
  dict: Dictionary
  locale: Locale
}

export default function ShowreelSection({ dict, locale }: ShowreelSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="section-padding bg-brand-dark-2 relative overflow-hidden" id="showreel">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,170,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,170,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">
            {locale === 'sr' ? 'NAŠI RADOVI' : 'OUR WORK'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            {locale === 'sr' ? 'Pogledajte Naš Showreel' : 'Watch Our Showreel'}
          </h2>
          <p className="text-brand-gray max-w-xl mx-auto">
            {locale === 'sr'
              ? 'Pregled naših najimpresivnijih projekata — od XR iskustava do igara i web aplikacija.'
              : 'A glimpse of our most impressive projects — from XR experiences to games and web applications.'}
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative aspect-video rounded-2xl overflow-hidden glow-border cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail / Placeholder */}
            {!isPlaying ? (
              <div className="absolute inset-0 bg-brand-dark-3 flex items-center justify-center">
                {/* Animated background */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent" />
                  {/* Decorative elements */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-brand-blue/20"
                      style={{
                        width: `${(i + 1) * 200}px`,
                        height: `${(i + 1) * 200}px`,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: `glowPulse ${3 + i}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Play Button */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-brand-blue/20 border-2 border-brand-blue flex items-center justify-center group-hover:bg-brand-blue/40 group-hover:scale-110 transition-all duration-300 shadow-blue-glow">
                    <svg className="w-8 h-8 text-brand-blue ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-semibold tracking-wide">
                    {locale === 'sr' ? 'Pogledaj Showreel' : 'Watch Showreel'}
                  </span>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand-blue/40" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-brand-blue/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-brand-blue/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brand-blue/40" />

                {/* Duration badge */}
                <div className="absolute bottom-4 right-16 bg-brand-dark/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-brand-gray border border-brand-blue/20">
                  2:30
                </div>
              </div>
            ) : (
              // When playing, embed YouTube/Vimeo
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Pixels2Pixels Studio Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Note about video */}
          <p className="text-center text-brand-gray text-xs mt-4">
            {locale === 'sr'
              ? '* Zamenite YouTube URL sa pravim showreel linkom u ShowreelSection.tsx'
              : '* Replace the YouTube URL with your actual showreel link in ShowreelSection.tsx'}
          </p>
        </div>
      </div>
    </section>
  )
}
