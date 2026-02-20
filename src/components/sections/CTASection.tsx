import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'

interface CTASectionProps {
  dict: Dictionary
  locale: Locale
}

export default function CTASection({ dict, locale }: CTASectionProps) {
  return (
    <section className="section-padding bg-brand-dark relative overflow-hidden" id="cta">
      {/* Background glow */}
      <div className="absolute inset-0 bg-blue-glow opacity-20 pointer-events-none" />

      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-brand-blue/50" />
            <div className="w-2 h-2 rounded-full bg-brand-blue animate-glow-pulse" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-brand-blue/50" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            {dict.cta.title}
          </h2>
          <p className="text-brand-gray text-lg mb-10 leading-relaxed">
            {dict.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/contact`} className="btn-primary text-base px-10 py-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {dict.cta.button}
            </Link>
            <Link href={`/${locale}/portfolio`} className="btn-secondary text-base px-10 py-4">
              {locale === 'sr' ? 'Pogledaj Portfolio' : 'View Portfolio'}
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-brand-gray text-xs">
            {[
              locale === 'sr' ? '✓ Brz odgovor' : '✓ Quick Response',
              locale === 'sr' ? '✓ Besplatna konsultacija' : '✓ Free Consultation',
              locale === 'sr' ? '✓ NDA dostupan' : '✓ NDA Available',
              locale === 'sr' ? '✓ Fleksibilni budžeti' : '✓ Flexible Budgets',
            ].map((item) => (
              <span key={item} className="text-brand-gray/70">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
