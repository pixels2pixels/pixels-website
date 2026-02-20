import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata } from '@/lib/seo'
import CTASection from '@/components/sections/CTASection'

interface ServicePageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = [
    'xr-development', 'game-development', 'web-development', 'blockchain',
    '2d-design', '3d-design', 'video-production', 'digital-marketing',
    // Serbian slugs
    'xr-razvoj', 'razvoj-igara', 'web-razvoj', '2d-dizajn', '3d-dizajn',
    'video-produkcija', 'digitalni-marketing',
  ]
  const langs = ['en', 'sr']
  return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isValidLocale(lang)) return {}
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const service = dict.services.items.find((s) => s.slug === slug)
  if (!service) return {}

  return generateSEOMetadata({
    title: service.title,
    description: service.description,
    locale,
    path: `/services/${slug}`,
  })
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { lang, slug } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const service = dict.services.items.find((s) => s.slug === slug)
  if (!service) notFound()

  const otherServices = dict.services.items.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-glow opacity-10 pointer-events-none" />
        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-brand-gray mb-8">
            <Link href={`/${locale}`} className="hover:text-brand-blue transition-colors">
              {dict.nav.home}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/services`} className="hover:text-brand-blue transition-colors">
              {dict.nav.services}
            </Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="section-label">{dict.services.headline}</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
              {service.title}
            </h1>
            <p className="text-brand-gray text-xl leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-brand-dark-2">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl font-black text-white mb-8">
                {locale === 'sr' ? 'Šta Uključuje' : 'What\'s Included'}
              </h2>
              <div className="space-y-4">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-brand-gray">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl font-black text-white mb-8">
                {locale === 'sr' ? 'Naš Proces' : 'Our Process'}
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: locale === 'sr' ? 'Otkrivanje' : 'Discovery',
                    desc: locale === 'sr' ? 'Razumemo vaše ciljeve i zahteve' : 'We understand your goals and requirements',
                  },
                  {
                    step: '02',
                    title: locale === 'sr' ? 'Planiranje' : 'Planning',
                    desc: locale === 'sr' ? 'Definišemo opseg, rokove i isporuke' : 'We define scope, timeline, and deliverables',
                  },
                  {
                    step: '03',
                    title: locale === 'sr' ? 'Izvršenje' : 'Execution',
                    desc: locale === 'sr' ? 'Gradimo sa transparentnošću i redovnim ažuriranjima' : 'We build with transparency and regular updates',
                  },
                  {
                    step: '04',
                    title: locale === 'sr' ? 'Isporuka' : 'Delivery',
                    desc: locale === 'sr' ? 'Isporučujemo, testiramo i podržavamo' : 'We deliver, test, and support',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="text-brand-blue font-black text-sm w-8 flex-shrink-0 pt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{item.title}</h3>
                      <p className="text-brand-gray text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding bg-brand-dark">
        <div className="section-container">
          <h2 className="text-2xl font-black text-white mb-8">
            {locale === 'sr' ? 'Ostale Usluge' : 'Other Services'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${locale}/services/${s.slug}`}
                className="card-base p-5 group"
              >
                <h3 className="text-white font-bold text-sm mb-2 group-hover:text-brand-blue transition-colors">
                  {s.title}
                </h3>
                <p className="text-brand-gray text-xs leading-relaxed line-clamp-2">
                  {s.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  )
}
