'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'
import { cn } from '@/lib/utils'

interface TestimonialsSectionProps {
  dict: Dictionary
  locale: Locale
}

export default function TestimonialsSection({ dict, locale }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const testimonials = dict.testimonials.items

  return (
    <section className="section-padding bg-brand-dark-2 relative overflow-hidden" id="testimonials">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">
            {locale === 'sr' ? 'REFERENCE' : 'TESTIMONIALS'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            {dict.testimonials.title}
          </h2>
          <p className="text-brand-gray max-w-xl mx-auto">
            {dict.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          {/* Active Testimonial */}
          <div className="relative glow-border rounded-2xl p-8 md:p-12 bg-brand-dark-3/50 backdrop-blur-sm mb-8">
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-brand-blue/20 text-8xl font-serif leading-none select-none">
              &ldquo;
            </div>

            <div className="relative z-10">
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 italic">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-blue font-bold text-lg">
                    {testimonials[activeIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-bold">{testimonials[activeIndex].name}</div>
                  <div className="text-brand-blue text-sm">{testimonials[activeIndex].role}</div>
                </div>

                {/* Stars */}
                <div className="ml-auto flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  index === activeIndex
                    ? 'w-8 h-2 bg-brand-blue'
                    : 'w-2 h-2 bg-brand-gray/40 hover:bg-brand-gray'
                )}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* All testimonials grid (desktop) */}
          <div className="hidden lg:grid grid-cols-3 gap-4 mt-12">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'text-left p-5 rounded-xl border transition-all duration-300',
                  index === activeIndex
                    ? 'border-brand-blue/50 bg-brand-blue/10'
                    : 'border-brand-blue/10 bg-brand-dark-3/30 hover:border-brand-blue/30'
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-blue font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-brand-blue text-xs">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-brand-gray text-xs leading-relaxed line-clamp-3">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
