import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'
import CTASection from '@/components/sections/CTASection'

interface AboutPageProps {
  params: { lang: string }
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = params
  if (!isValidLocale(lang)) return {}
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return generateSEOMetadata({
    title: dict.about.metaTitle.replace(' | Pixels2Pixels Studio', ''),
    description: dict.about.metaDescription,
    locale,
    path: '/about',
    keywords: ['about pixels2pixels', 'creative studio belgrade', 'XR studio team', 'game development studio'],
  })
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixels2pixels.com'
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteUrl}/${locale}` },
    { name: dict.nav.about, url: `${siteUrl}/${locale}/about` },
  ])

  const teamMembers = [
    {
      name: 'Djordje [Placeholder]',
      role: locale === 'sr' ? 'Osnivač & CEO' : 'Founder & CEO',
      bio: locale === 'sr'
        ? 'Vizionar i tehnički direktor studija sa više od 10 godina iskustva u kreativnoj tehnologiji.'
        : 'Visionary and technical director of the studio with over 10 years of experience in creative technology.',
    },
    {
      name: 'Sasa [Placeholder]',
      role: locale === 'sr' ? 'Kreativni Direktor' : 'Creative Director',
      bio: locale === 'sr'
        ? 'Kreativni um iza vizuelnog identiteta i dizajnerskih rešenja studija.'
        : 'The creative mind behind the studio\'s visual identity and design solutions.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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
            <span className="section-label">{dict.about.headline}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              {dict.about.title}
            </h1>
            <p className="text-brand-gray text-xl leading-relaxed">
              {dict.about.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-brand-dark-2">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">{dict.about.mission}</span>
              <h2 className="text-3xl font-black text-white mb-6">
                {locale === 'sr' ? 'Šta Nas Pokreće' : 'What Drives Us'}
              </h2>
              <p className="text-brand-gray text-lg leading-relaxed mb-8">
                {dict.about.missionText}
              </p>
              <div className="space-y-4">
                {[
                  { icon: '🎯', text: locale === 'sr' ? 'Fokusirani na rezultate koji se mere' : 'Focused on measurable results' },
                  { icon: '🤝', text: locale === 'sr' ? 'Partneri, ne samo izvođači' : 'Partners, not just contractors' },
                  { icon: '🚀', text: locale === 'sr' ? 'Uvek na ivici tehnologije' : 'Always at the edge of technology' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-brand-gray">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2014', label: locale === 'sr' ? 'Godina Osnivanja' : 'Founded' },
                { value: '50+', label: locale === 'sr' ? 'Projekata' : 'Projects Delivered' },
                { value: '30+', label: locale === 'sr' ? 'Zadovoljnih Klijenata' : 'Happy Clients' },
                { value: '8', label: locale === 'sr' ? 'Oblasti Ekspertize' : 'Areas of Expertise' },
              ].map((stat) => (
                <div key={stat.label} className="glow-border rounded-xl p-6 bg-brand-dark-3/50 text-center">
                  <div className="text-3xl font-black text-brand-blue mb-2">{stat.value}</div>
                  <div className="text-brand-gray text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-brand-dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="section-label">{dict.about.values}</span>
            <h2 className="text-3xl font-black text-white">
              {locale === 'sr' ? 'Principi Kojima Se Vodimo' : 'Principles We Live By'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.about.valuesItems.map((value, index) => (
              <div key={value.title} className="card-base p-6">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-4">
                  <span className="text-brand-blue font-black text-sm">0{index + 1}</span>
                </div>
                <h3 className="text-white font-bold mb-2">{value.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-brand-dark-2">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="section-label">{dict.about.team}</span>
            <h2 className="text-3xl font-black text-white">
              {locale === 'sr' ? 'Upoznajte Tim' : 'Meet the Team'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="card-base p-6 text-center">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-brand-blue/10 border-2 border-brand-blue/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-blue font-black text-2xl">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-white font-bold mb-1">{member.name}</h3>
                <div className="text-brand-blue text-sm mb-3">{member.role}</div>
                <p className="text-brand-gray text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-brand-gray/50 text-xs mt-6">
            {locale === 'sr'
              ? '* Zamenite placeholder imenima i fotografijama pravog tima'
              : '* Replace placeholder names and photos with actual team members'}
          </p>
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  )
}
