import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata } from '@/lib/seo'
import ContactForm from '@/components/ui/ContactForm'

interface ContactPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return generateSEOMetadata({
    title: dict.contact.metaTitle.replace(' | Pixels2Pixels Studio', ''),
    description: dict.contact.metaDescription,
    locale,
    path: '/contact',
    keywords: ['contact pixels2pixels', 'hire XR studio', 'game development quote', 'creative tech agency contact'],
  })
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-glow opacity-10 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,170,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,170,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">{dict.contact.headline}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              {dict.contact.title}
            </h1>
            <p className="text-brand-gray text-xl leading-relaxed">
              {dict.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-brand-dark-2">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-white font-bold text-xl mb-8">
                {dict.contact.info.title}
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-brand-gray/60 text-xs uppercase tracking-wider mb-1">Email</p>
                    <a
                      href={`mailto:${dict.contact.info.email}`}
                      className="text-white hover:text-brand-blue transition-colors font-medium"
                    >
                      {dict.contact.info.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-brand-gray/60 text-xs uppercase tracking-wider mb-1">
                      {locale === 'sr' ? 'Lokacija' : 'Location'}
                    </p>
                    <p className="text-white font-medium">{dict.contact.info.location}</p>
                  </div>
                </div>

                {/* Response time */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-brand-gray/60 text-xs uppercase tracking-wider mb-1">
                      {locale === 'sr' ? 'Vreme Odgovora' : 'Response Time'}
                    </p>
                    <p className="text-white font-medium">
                      {locale === 'sr' ? 'Unutar 24 sata' : 'Within 24 hours'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-10">
                <p className="text-brand-gray/60 text-xs uppercase tracking-wider mb-4">
                  {dict.contact.info.social}
                </p>
                <div className="flex gap-3">
                  {[
                    { href: 'https://linkedin.com/company/pixels2pixels', label: 'LinkedIn' },
                    { href: 'https://instagram.com/pixels2pixels', label: 'Instagram' },
                    { href: 'https://twitter.com/pixels2pixels', label: 'Twitter' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-medium text-brand-gray hover:text-brand-blue border border-brand-blue/20 hover:border-brand-blue/50 rounded-lg transition-all duration-200"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm dict={dict} locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
