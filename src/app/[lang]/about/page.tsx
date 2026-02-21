import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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

const teamMembers = [
  { name: 'Djordje Djordjic',    role: 'CEO & Founder',                    photo: '/images/team/001_Djordje_Djordjic.png',    linkedin: 'https://www.linkedin.com/in/djordje-djordjic-a0a42994/' },
  { name: 'Sasa Trsic',          role: 'Head of 3D',                        photo: '/images/team/002_Sasa_Trsic.png',           linkedin: 'https://www.linkedin.com/in/sasatrsic/' },
  { name: 'Stefan Stankovic',    role: 'Lead Unreal Engine Developer',       photo: '/images/team/003_Stefan_Stankovic.png',     linkedin: 'https://www.linkedin.com/in/stefanstankovic98/' },
  { name: 'Ivan Kocic',          role: 'Lead Godot Developer',               photo: '/images/team/004_Ivan_Kocic.png',           linkedin: 'https://www.linkedin.com/in/ivan-kocic-140762244/' },
  { name: 'Angelina Djordjic',   role: 'HR Manager',                         photo: '/images/team/005_Angelina_Djordjic.png',    linkedin: 'https://www.linkedin.com/in/angelina-djordjic-136b47237/' },
  { name: 'Mirjana Markovic',    role: 'Project Manager',                    photo: '/images/team/006_Mirjana_Markovic.png',     linkedin: 'https://www.linkedin.com/in/mirjana-m-03a072224/' },
  { name: 'Kristina Markovic',   role: 'Marketing Manager',                  photo: '/images/team/007_Kristina_Markovic.png',    linkedin: 'https://www.linkedin.com/in/kristina-markovic-9064061bb/' },
  { name: 'Simone Vesic Majkic', role: 'Marketing Specialist',               photo: '/images/team/008_Simone_Vesic.png',         linkedin: 'https://www.linkedin.com/in/simonemajkic/' },
  { name: 'Lazar Lakusic',       role: 'Full Stack Web Developer',           photo: '/images/team/009_Lazar_Lakusic.png',        linkedin: 'https://www.linkedin.com/in/lazar-laku%C5%A1i%C4%87-a96048185/' },
  { name: 'Oleg Svynarchuk',     role: 'Front End Web Developer',            photo: '/images/team/010_Oleg_Svinarcuk.png',       linkedin: 'https://www.linkedin.com/in/olegsvynarchuk/' },
  { name: 'Andreas Mehner',      role: 'Front End Web Developer',            photo: '/images/team/011_Andreas_Mehner.png',       linkedin: 'https://www.linkedin.com/in/andreas-mehner/' },
  { name: 'Djordje Stojanovic',  role: 'Full Stack Web Developer',           photo: '/images/team/unknown.png',                  linkedin: null },
  { name: 'Bogdan Jocic',        role: 'Godot Developer',                    photo: '/images/team/013_Bogdan_Jocic.png',         linkedin: 'https://www.linkedin.com/in/bogdan-jocic/' },
  { name: 'Aleksa Stefanovic',   role: 'Godot Developer',                    photo: '/images/team/014_Aleksa_Stefanovic.png',    linkedin: 'https://www.linkedin.com/in/aleksa-stefanovic-/' },
  { name: 'Srdjan Krsman',       role: 'Unity Engine Developer',             photo: '/images/team/015_Srdjan_Krsman.png',        linkedin: 'https://www.linkedin.com/in/srdjan-krsman/' },
  { name: 'Marko-Marek Markovic',role: '3D Artist',                          photo: '/images/team/unknown.png',                  linkedin: 'https://www.linkedin.com/in/marko-marek-markovi%C4%87-50704819b/' },
  { name: 'Vladan Falcic',       role: 'Blockchain Advisor',                 photo: '/images/team/018_Vladan_Falcic.png',        linkedin: 'https://www.linkedin.com/in/vladan-falcic-sqcap/' },
  { name: 'Aleksandar Markovic', role: 'UX/UI Designer',                     photo: '/images/team/019_Aleksandar_Markovic.png',  linkedin: 'https://www.linkedin.com/in/aleksandar-markovic-graphic-designer/' },
  { name: 'Luka Smiljanic',      role: '3D Animator',                        photo: '/images/team/020_Luka_Smiljanic.png',       linkedin: 'https://www.linkedin.com/in/lukasmiljanic/' },
  { name: 'Teodora Stojanovic',  role: 'Graphic Designer',                   photo: '/images/team/teodora.png',                  linkedin: 'https://www.linkedin.com/in/teodora-stojanovi%C4%87-2658b51b6/' },
  { name: 'Nenad Josic',         role: 'Infrastructure Manager',             photo: '/images/team/022_Nenad_Josic.png',          linkedin: 'https://www.linkedin.com/in/nenad-josic-devops/' },
  { name: 'Vuk Dzakovic',        role: 'Unreal Engine Developer',            photo: '/images/team/unknown.png',                  linkedin: null },
  { name: 'Nemanja Stojanovic',  role: 'Unreal Engine Developer',            photo: '/images/team/unknown.png',                  linkedin: null },
  { name: 'Nemanja Simonovic',   role: 'Unreal Engine Network Specialist',   photo: '/images/team/unknown.png',                  linkedin: null },
]

const testimonials = [
  {
    quote: 'Working with Pixels2Pixels Studio has been an incredible experience. We had two projects with very tight deadlines, and while taking on such risks is never easy, Sasa and Djordje delivered beyond expectations. Their professionalism, creativity, and ability to work under pressure are unmatched.',
    author: 'Sergey Martinov',
    role: 'CEO, Art Energy',
  },
  {
    quote: 'Pixels2Pixels Studio has been more than just a collaborator — they\'re a true partner and advisor for Cosmic Factions. Djordje and his team always deliver exceptional results, no matter the challenge or complexity of the project.',
    author: 'Vladan Falcic',
    role: 'CEO, Cosmic Factions',
  },
  {
    quote: 'Working with Pixels2Pixels Studio for the past 4-5 years has been an incredible journey. Their ability to consistently deliver high-quality creative solutions, even within tight deadlines, is unmatched.',
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
              {locale === 'en'
                ? 'Pixels2Pixels Studio is a creative technology company at the intersection of art and innovation. We specialize in VR development, 3D animation, game development, and interactive digital experiences — crafting immersive worlds that push creative and technological boundaries.'
                : 'Pixels2Pixels Studio je kreativna tehnološka kompanija na preseku umetnosti i inovacije. Specijalizovani smo za VR razvoj, 3D animaciju, razvoj igara i interaktivna digitalna iskustva.'}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
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
                      Founded by Djordje Djordjic and Sasa Trsic, Pixels2Pixels Studio was born from a shared vision: to create digital experiences that were not only technically brilliant but also deeply human. From humble beginnings as a boutique game development studio, we have grown into a full-spectrum creative technology partner with a global client base in Switzerland, Germany, the US, and beyond.
                    </p>
                    <p>
                      With a team of highly skilled Unreal Engine and Godot developers, 3D artists, and digital strategists, we help businesses, brands, and innovators transform ideas into engaging, interactive solutions. Whether you need cutting-edge virtual reality experiences, high-quality 3D visualizations, or blockchain-integrated applications, we bring your vision to life with precision and creativity.
                    </p>
                    <p>
                      Today, our team of <strong className="text-white">24 specialists</strong> covers every discipline — from VR/AR development and game engineering to 3D art, web development, marketing, and infrastructure — making us one of the most versatile creative technology studios in the region.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Osnovan od strane Djordja Djordjica i Saše Tršića, Pixels2Pixels Studio je nastao iz zajedničke vizije: stvaranje digitalnih iskustva koja su ne samo tehnički briljantna, već i duboko ljudska. Od skromnih početaka kao boutique studio za razvoj igara, izrasli smo u kreativnog tehnološkog partnera sa globalnom bazom klijenata u Švajcarskoj, Nemačkoj, SAD-u i šire.
                    </p>
                    <p>
                      Sa timom od <strong className="text-white">24 specijaliste</strong> koji pokrivaju svaku disciplinu — od VR/AR razvoja i inženjeringa igara do 3D umetnosti, web razvoja, marketinga i infrastrukture — mi smo jedan od najsvestranijih kreativnih tehnoloških studija u regionu.
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
                { value: '24', label: locale === 'sr' ? 'Članova Tima' : 'Team Members' },
              ].map((stat) => (
                <div key={stat.label} className="glow-border rounded-xl p-6 bg-brand-dark-3/50 text-center">
                  <div className="text-3xl font-black text-brand-blue mb-2">{stat.value}</div>
                  <div className="text-brand-gray text-sm">{stat.label}</div>
                </div>
              ))}
              <div className="col-span-2 card-base p-6">
                <h3 className="text-brand-blue font-bold mb-2 text-sm tracking-wider uppercase">
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
                ? 'A dynamic group of creatives, technologists, and strategists dedicated to bringing bold ideas to life.'
                : 'Dinamična grupa kreativaca, tehnologa i stratega posvećenih oživljavanju smjelih ideja.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="card-base p-4 flex flex-col items-center text-center group">
                {/* Photo */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-blue/30 group-hover:border-brand-blue/70 transition-colors mb-3 flex-shrink-0">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                {/* Name */}
                <h3 className="text-white font-bold text-xs leading-tight mb-1">{member.name}</h3>
                {/* Role */}
                <p className="text-brand-blue text-xs leading-tight mb-2">{member.role}</p>
                {/* LinkedIn */}
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-40 hover:opacity-100 transition-opacity"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <svg className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Link>
                )}
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
                <p className="text-brand-gray text-sm leading-relaxed flex-1 italic">{t.quote}</p>
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
