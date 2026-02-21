import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'
import CTASection from '@/components/sections/CTASection'

interface AboutPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return generateSEOMetadata({
    title: dict.about.metaTitle.replace(' | Pixels2Pixels Studio', ''),
    description: dict.about.metaDescription,
    locale,
    path: '/about',
    keywords: [
      'about pixels2pixels',
      'creative technology studio',
      'XR studio team',
      'game development studio',
      'VR AR company',
      'immersive experience studio',
      'digital innovation agency',
    ],
  })
}

const testimonials = [
  {
    quote: 'Working with Pixels2Pixels Studio has been an incredible experience. We had two projects with very tight deadlines, and while taking on such risks is never easy, Sasa and Djordje delivered beyond expectations. Their professionalism, creativity, and ability to work under pressure are unmatched. They\'ve proven that they can be trusted to meet deadlines and maintain the highest quality standards.',
    author: 'Sergey Martinov',
    role: 'CEO, Art Energy',
  },
  {
    quote: 'Pixels2Pixels Studio has been more than just a collaborator — they\'re a true partner and advisor for Cosmic Factions. Djordje and his team always deliver exceptional results, no matter the challenge or complexity of the project. Their ability to combine creativity, technical expertise, and a deep understanding of our vision has been pivotal to our success.',
    author: 'Vladan Falcic',
    role: 'CEO, Cosmic Factions',
  },
  {
    quote: 'Working with Pixels2Pixels Studio for the past 4-5 years has been an incredible journey. Their ability to consistently deliver high-quality creative solutions, even within tight deadlines, is unmatched. The team\'s expertise, dedication, and innovative approach have made every project we\'ve collaborated on a success.',
    author: 'David Granite',
    role: 'Creative Technologist, Dorier Group',
  },
]

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params
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
      name: 'Djordje',
      role: locale === 'sr' ? 'Osnivač & CEO' : 'Founder & CEO',
      bio: locale === 'sr'
        ? 'Vizionar i tehnički direktor studija sa više od 10 godina iskustva u kreativnoj tehnologiji. Djordje vodi svaki projekat sa dubokim tehničkim znanjem i strašću za inovacijom.'
        : 'Visionary and technical director of the studio with over 10 years of experience in creative technology. Djordje leads every project with deep technical knowledge and a passion for innovation.',
    },
    {
      name: 'Sasa',
      role: locale === 'sr' ? 'Kreativni Direktor' : 'Creative Director',
      bio: locale === 'sr'
        ? 'Kreativni um iza vizuelnog identiteta i dizajnerskih rešenja studija. Sasa kombinuje umetnički senzibilitet sa tehničkim razumevanjem da bi stvorio iskustva koja ostavljaju trajan utisak.'
        : 'The creative mind behind the studio\'s visual identity and design solutions. Sasa combines artistic sensibility with technical understanding to create experiences that leave a lasting impression.',
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

      {/* Our Story — SEO-rich text block */}
      <section className="section-padding bg-brand-dark-2">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-label">
                {locale === 'sr' ? 'Naša Priča' : 'Our Story'}
              </span>
              <h2 className="text-3xl font-black text-white mb-6">
                {locale === 'sr' ? 'Decenija Digitalnih Inovacija' : 'A Decade of Digital Innovation'}
              </h2>
              <div className="space-y-4 text-brand-gray text-base leading-relaxed">
                {locale === 'en' ? (
                  <>
                    <p>
                      Founded by a small group of passionate developers and artists, Pixels2Pixels Studio was born from a shared vision: to create digital experiences that were not only technically brilliant but also deeply human. We saw the potential for technology to connect worlds, tell stories, and solve complex problems in ways that were previously unimaginable.
                    </p>
                    <p>
                      From our humble beginnings as a boutique game development studio, we have grown into a full-spectrum creative technology partner. Our journey has been one of constant learning, adaptation, and a relentless pursuit of excellence. Today, we are proud to have partnered with a diverse range of clients — from ambitious startups to global enterprises — helping them navigate the ever-evolving digital landscape.
                    </p>
                    <p>
                      Pixels2Pixels Studio specializes in creating cutting-edge <strong className="text-white">VR and AR (XR) applications</strong> for businesses, education, entertainment, and beyond. Our passion lies in blending technology and creativity to push the boundaries of what&apos;s possible. Every project we take on is an opportunity to innovate, to challenge conventions, and to deliver something truly extraordinary.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Osnovan od strane male grupe strastvenih programera i umetnika, Pixels2Pixels Studio je rođen iz zajedničke vizije: stvaranje digitalnih iskustava koja su ne samo tehnički briljantna, već i duboko ljudska. Videli smo potencijal tehnologije da povezuje svetove, priča priče i rešava složene probleme.
                    </p>
                    <p>
                      Od naših skromnih početaka kao butik studija za razvoj igara, izrasli smo u kreativnog tehnološkog partnera sa punim spektrom usluga. Naše putovanje je bilo putovanje stalnog učenja, prilagođavanja i neumorne težnje ka izvrsnosti. Danas smo ponosni što smo sarađivali sa raznolikim klijentima — od ambicioznih startapa do globalnih preduzeća.
                    </p>
                    <p>
                      Pixels2Pixels Studio se specijalizuje za kreiranje naprednih <strong className="text-white">VR i AR (XR) aplikacija</strong> za preduzeća, obrazovanje, zabavu i šire. Naša strast leži u mešanju tehnologije i kreativnosti kako bismo pomerali granice mogućeg.
                    </p>
                  </>
                )}
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

              {/* Mission statement card */}
              <div className="col-span-2 card-base p-6">
                <h3 className="text-white font-bold mb-2 text-sm tracking-wider uppercase text-brand-blue">
                  {locale === 'sr' ? 'Naša Misija' : 'Our Mission'}
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed italic">
                  {locale === 'en'
                    ? '"Connecting worlds through innovation — transforming ideas into new realities that engage, inspire, and captivate."'
                    : '"Povezivanje svetova kroz inovacije — pretvaranje ideja u nove stvarnosti koje angažuju, inspirišu i očaravaju."'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-brand-dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="section-label">{dict.about.values}</span>
            <h2 className="text-3xl font-black text-white mb-4">
              {locale === 'sr' ? 'Principi Kojima Se Vodimo' : 'Principles We Live By'}
            </h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto">
              {locale === 'en'
                ? 'These are not just words on a wall — they are the guiding principles that shape every decision we make, every line of code we write, and every pixel we place.'
                : 'Ovo nisu samo reči na zidu — to su vodeći principi koji oblikuju svaku odluku koju donosimo, svaki red koda koji pišemo i svaki piksel koji postavljamo.'}
            </p>
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
            <h2 className="text-3xl font-black text-white mb-4">
              {locale === 'sr' ? 'Upoznajte Tim' : 'Meet the Team'}
            </h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Our team is our greatest asset — a diverse group of developers, artists, designers, and strategists united by a shared passion for creative technology.'
                : 'Naš tim je naša najveća vrednost — raznolika grupa programera, umetnika, dizajnera i stratega ujedinjenih zajedničkom strašću prema kreativnoj tehnologiji.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="card-base p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-brand-blue/10 border-2 border-brand-blue/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-blue font-black text-2xl">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                <div className="text-brand-blue text-sm font-medium mb-3">{member.role}</div>
                <p className="text-brand-gray text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-brand-dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="section-label">
              {locale === 'sr' ? 'Šta Klijenti Kažu' : 'What Clients Say'}
            </span>
            <h2 className="text-3xl font-black text-white">
              {locale === 'sr' ? 'Reči Naših Partnera' : 'Words from Our Partners'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="card-base p-8 flex flex-col gap-4">
                <svg className="w-8 h-8 text-brand-blue opacity-50 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-brand-gray text-sm leading-relaxed flex-1 italic">
                  {t.quote}
                </p>
                <div className="border-t border-brand-blue/10 pt-4">
                  <div className="text-white font-bold text-sm">{t.author}</div>
                  <div className="text-brand-blue text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  )
}
