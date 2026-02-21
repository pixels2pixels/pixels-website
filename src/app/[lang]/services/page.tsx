import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata } from '@/lib/seo'
import CTASection from '@/components/sections/CTASection'

interface ServicesPageProps {
  params: { lang: string }
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { lang } = params
  if (!isValidLocale(lang)) return {}
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return generateSEOMetadata({
    title: dict.services.metaTitle.replace(' | Pixels2Pixels Studio', ''),
    description: dict.services.metaDescription,
    locale,
    path: '/services',
    keywords: [
      'XR development services',
      'game development studio',
      'web development agency',
      '3D animation studio',
      'VR AR development company',
      'blockchain web3 development',
      'creative technology studio',
      'immersive experience development',
    ],
  })
}

const serviceIcons: Record<string, string> = {
  vr: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  game: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
  web: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  blockchain: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  '2d': 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  '3d': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  video: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  marketing: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
}

const serviceDescriptions: Record<string, { en: string; sr: string }> = {
  'xr-development': {
    en: 'Pixels2Pixels Studio is at the forefront of the immersive technology revolution. We specialize in creating high-impact Extended Reality (XR) applications — from sophisticated enterprise VR training simulators that improve safety and efficiency, to captivating AR marketing campaigns that engage customers like never before. Our team handles the entire XR pipeline, from concept and 3D asset creation to deployment on Meta Quest, HTC Vive, and mobile AR platforms.',
    sr: 'Pixels2Pixels Studio je na čelu revolucije imerzivnih tehnologija. Specijalizovani smo za kreiranje XR aplikacija visokog uticaja — od sofisticiranih VR simulatora za obuku preduzeća koji poboljšavaju bezbednost i efikasnost, do privlačnih AR marketinških kampanja. Naš tim rukuje celim XR procesom, od koncepta i izrade 3D sredstava do implementacije na Meta Quest, HTC Vive i mobilnim AR platformama.',
  },
  'game-development': {
    en: 'At Pixels2Pixels Studio, game development is in our DNA. We are a team of passionate gamers, artists, and engineers dedicated to creating unforgettable interactive experiences. Leveraging industry-leading engines like Unreal Engine and Unity, we build high-performance, visually rich games for mobile, PC, and console — from fast-paced action games to expansive RPGs. We handle every stage of the development lifecycle with precision and creativity.',
    sr: 'U Pixels2Pixels Studiju, razvoj igara je u našoj DNK. Mi smo tim strastvenih igrača, umetnika i inženjera posvećenih stvaranju nezaboravnih interaktivnih iskustava. Koristeći vodeće industrijske engine kao što su Unreal Engine i Unity, gradimo visokoučinkovite igre za mobilne uređaje, PC i konzole — od akcijskih igara do prostranih RPG-ova.',
  },
  'web-development': {
    en: 'Pixels2Pixels Studio creates bespoke websites and web applications that are visually stunning, engineered for performance, and built to scale. Our team specializes in modern web technologies including Next.js, React, and Node.js. We follow a user-centric design process, ensuring every interaction is seamless. Whether you need a marketing site, an e-commerce platform, or a custom SaaS product, we deliver solutions that align with your business goals.',
    sr: 'Pixels2Pixels Studio kreira prilagođene web sajtove i aplikacije koje su vizualno impresivne, optimizovane za performanse i izgrađene za skaliranje. Naš tim se specijalizuje za moderne web tehnologije uključujući Next.js, React i Node.js. Sledimo korisnički orijentisan proces dizajna, osiguravajući da je svaka interakcija besprekorna.',
  },
  'blockchain': {
    en: 'Web3 represents a paradigm shift in how we interact with the internet, and Pixels2Pixels Studio is your trusted guide in this new decentralized landscape. Our team has deep expertise in smart contract development on Ethereum and Solana, as well as the creation of custom decentralized applications (dApps). Whether you are launching an NFT marketplace, creating a tokenized community, or integrating blockchain into your existing infrastructure, we provide the strategic and technical expertise to make it happen.',
    sr: 'Web3 predstavlja paradigmatsku promenu u načinu na koji komuniciramo sa internetom, a Pixels2Pixels Studio je vaš pouzdani vodič u ovom novom decentralizovanom pejzažu. Naš tim ima duboku stručnost u razvoju pametnih ugovora na Ethereum-u i Solana-i, kao i u kreiranju prilagođenih decentralizovanih aplikacija (dApps).',
  },
  '3d-design': {
    en: 'At Pixels2Pixels Studio, exceptional 3D art is the cornerstone of every immersive digital experience. Our world-class artists combine technical mastery with creative passion to produce stunning 3D models, characters, environments, and animations. Using industry-standard tools like Blender, Maya, and ZBrush, we create optimized, game-ready assets that are as performant as they are beautiful — from a single hero character to an entire virtual world.',
    sr: 'U Pixels2Pixels Studiju, izuzetna 3D umetnost je kamen temeljac svakog imerzivnog digitalnog iskustva. Naši umetnici svetske klase kombinuju tehničko majstorstvo sa kreativnom strašću kako bi proizveli zapanjujuće 3D modele, likove, okruženja i animacije. Koristeći industrijske alate kao što su Blender, Maya i ZBrush, kreiramo optimizovana sredstva spremna za igru.',
  },
  'video-production': {
    en: 'High-quality video is the most powerful way to capture attention and tell a compelling story. Pixels2Pixels Studio offers end-to-end video production services, combining cinematic storytelling with stunning visuals. We handle every aspect of production — from scriptwriting and storyboarding to filming, editing, and post-production — creating promotional videos, product showreels, animated explainer videos, and customer testimonials that serve a strategic purpose.',
    sr: 'Visokokvalitetni video je najmoćniji način da privučete pažnju i ispričate ubedljivu priču. Pixels2Pixels Studio nudi end-to-end usluge video produkcije, kombinujući kinematografsko pripovedanje sa zapanjujućim vizualima. Bavimo se svakim aspektom produkcije — od pisanja scenarija i storyboard-a do snimanja, montaže i post-produkcije.',
  },
  'digital-marketing': {
    en: 'Creating an amazing product is only half the battle; reaching the right audience is what truly drives success. Pixels2Pixels Studio offers a full suite of digital marketing services — from SEO and content marketing to social media management and paid advertising. Our approach is data-driven and results-oriented, combining creative content strategies with analytical rigor to deliver measurable return on investment for your business.',
    sr: 'Kreiranje odličnog proizvoda je samo pola bitke; dosezanje prave publike je ono što zaista pokreće uspeh. Pixels2Pixels Studio nudi kompletan paket usluga digitalnog marketinga — od SEO-a i content marketinga do upravljanja društvenim mrežama i plaćenog oglašavanja. Naš pristup je zasnovan na podacima i orijentisan na rezultate.',
  },
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const introText = locale === 'en'
    ? 'At Pixels2Pixels Studio, we are more than just developers; we are architects of digital innovation. Our services are designed to provide end-to-end solutions, transforming your ambitious ideas into powerful, market-ready realities. We combine deep technical expertise with a passion for creative storytelling to build experiences that not only captivate but also deliver tangible results. Whether you are looking to build an immersive VR training platform, launch a groundbreaking mobile game, or develop a scalable web application, our team has the skills and experience to guide you from concept to launch and beyond.'
    : 'U Pixels2Pixels Studiju, mi smo više od programera; mi smo arhitekte digitalnih inovacija. Naše usluge su dizajnirane da pruže end-to-end rešenja, pretvarajući vaše ambiciozne ideje u moćne, tržišno spremne stvarnosti. Kombinujemo duboku tehničku stručnost sa strašću za kreativnim pripovedanjem kako bismo izgradili iskustva koja ne samo da očaravaju, već i donose opipljive rezultate.'

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-glow opacity-10 pointer-events-none" />
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">{dict.services.headline}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              {dict.services.title}
            </h1>
            <p className="text-brand-gray text-xl leading-relaxed mb-4">
              {dict.services.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* SEO Intro Text */}
      <section className="py-12 bg-brand-dark border-b border-brand-blue/10">
        <div className="section-container">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              {locale === 'en' ? 'A Full-Spectrum Creative Technology Partner' : 'Kreativni Tehnološki Partner Poseduje Ceo Spektar Rešenja'}
            </h2>
            <p className="text-brand-gray text-lg leading-relaxed">
              {introText}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-brand-dark-2">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dict.services.items.map((service) => {
              const desc = serviceDescriptions[service.slug]
              const longDesc = desc ? (locale === 'en' ? desc.en : desc.sr) : service.shortDescription
              return (
                <Link
                  key={service.slug}
                  href={`/${locale}/services/${service.slug}`}
                  className="card-base group p-8 flex flex-col gap-4"
                >
                  {/* Icon + Title */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue flex-shrink-0 group-hover:bg-brand-blue/20 group-hover:border-brand-blue/40 transition-all duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={serviceIcons[service.icon] || serviceIcons.web} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-white font-bold text-lg mb-1 group-hover:text-brand-blue transition-colors duration-200">
                        {service.title}
                      </h2>
                      <p className="text-brand-gray text-xs leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <svg className="w-5 h-5 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Long Description */}
                  <p className="text-brand-gray/80 text-sm leading-relaxed border-t border-brand-blue/10 pt-4">
                    {longDesc}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.slice(0, 4).map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-0.5 rounded-full bg-brand-blue/5 text-brand-gray border border-brand-blue/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-brand-dark">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="section-label">{locale === 'en' ? 'Why Pixels2Pixels' : 'Zašto Pixels2Pixels'}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {locale === 'en' ? 'Built for Results, Driven by Innovation' : 'Izgrađeno za Rezultate, Pokrenuto Inovacijom'}
            </h2>
            <p className="text-brand-gray text-lg leading-relaxed">
              {locale === 'en'
                ? 'With over a decade of experience and 50+ successful projects delivered, we bring a proven track record of excellence to every engagement. Our multidisciplinary team of developers, artists, and strategists works as an extension of your own team, ensuring that your vision is realized with precision and passion.'
                : 'Sa više od jedne decenije iskustva i 50+ uspešno isporučenih projekata, donosimo dokazano iskustvo izvrsnosti svakom angažmanu. Naš multidisciplinarni tim programera, umetnika i stratega radi kao produžetak vašeg sopstvenog tima, osiguravajući da se vaša vizija ostvari sa preciznošću i strašću.'}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50+', label: locale === 'en' ? 'Projects Delivered' : 'Isporučenih Projekata' },
              { value: '10+', label: locale === 'en' ? 'Years of Experience' : 'Godina Iskustva' },
              { value: '30+', label: locale === 'en' ? 'Happy Clients' : 'Zadovoljnih Klijenata' },
              { value: '8', label: locale === 'en' ? 'Core Services' : 'Osnovnih Usluga' },
            ].map((stat) => (
              <div key={stat.label} className="card-base p-6 text-center">
                <div className="text-3xl font-black text-brand-blue mb-1">{stat.value}</div>
                <div className="text-brand-gray text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  )
}
