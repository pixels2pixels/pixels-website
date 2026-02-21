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
    keywords: [
      service.title,
      'Pixels2Pixels Studio',
      'creative technology',
      'digital innovation',
      ...service.features.slice(0, 3),
    ],
  })
}

// Long-form SEO content per service
const serviceContent: Record<string, { en: { headline: string; body: string[] }; sr: { headline: string; body: string[] } }> = {
  'xr-development': {
    en: {
      headline: 'Pioneering Immersive Experiences with XR',
      body: [
        'Pixels2Pixels Studio is at the forefront of the immersive technology revolution. We specialize in creating high-impact Extended Reality (XR) applications that merge the physical and digital worlds. Our expertise spans Virtual Reality (VR), Augmented Reality (AR), and Mixed Reality (MR), allowing us to deliver tailored solutions that meet the unique demands of your business.',
        'From sophisticated enterprise training simulators that improve safety and efficiency, to captivating AR marketing campaigns that engage customers like never before, we build experiences that are not only visually stunning but also deeply functional. Our team handles the entire XR development pipeline, from initial concept and 3D asset creation to final deployment on leading platforms like Meta Quest, HTC Vive, and mobile AR.',
        'The XR market is growing at an unprecedented rate, and businesses that invest in immersive technology today are positioning themselves as leaders in their industries tomorrow. Whether you are in healthcare, manufacturing, retail, education, or entertainment, we can help you leverage XR to create meaningful, measurable impact.',
      ],
    },
    sr: {
      headline: 'Pionirska Imerzivna Iskustva sa XR Tehnologijom',
      body: [
        'Pixels2Pixels Studio je na čelu revolucije imerzivnih tehnologija. Specijalizovani smo za kreiranje XR aplikacija visokog uticaja koje spajaju fizički i digitalni svet. Naša stručnost obuhvata Virtuelnu Realnost (VR), Augmentovanu Realnost (AR) i Mešovitu Realnost (MR).',
        'Od sofisticiranih simulatora za obuku preduzeća koji poboljšavaju bezbednost i efikasnost, do privlačnih AR marketinških kampanja koje angažuju kupce kao nikad pre, gradimo iskustva koja su ne samo vizualno zapanjujuća, već i duboko funkcionalna.',
        'XR tržište raste neverovatnom brzinom, a preduzeća koja danas ulažu u imerzivnu tehnologiju pozicioniraju se kao lideri u svojim industrijama sutra. Bez obzira da li ste u zdravstvenim uslugama, proizvodnji, maloprodaji, obrazovanju ili zabavi, možemo vam pomoći da iskoristite XR za stvaranje merljivog uticaja.',
      ],
    },
  },
  'game-development': {
    en: {
      headline: 'Crafting Worlds, One Game at a Time',
      body: [
        'At Pixels2Pixels Studio, game development is in our DNA. We are a team of passionate gamers, artists, and engineers dedicated to creating unforgettable interactive experiences. We partner with both indie studios and established publishers to bring their creative visions to life, handling every stage of the development lifecycle with precision and creativity.',
        'Our expertise covers a wide range of genres and platforms, from fast-paced mobile action games to expansive PC and console RPGs. We leverage industry-leading engines like Unreal Engine and Unity to build high-performance, visually rich games that stand out in a crowded market. We believe that a great game is a blend of compelling mechanics, stunning art, and a captivating narrative.',
        'Beyond the technical execution, we bring a player-first mindset to every project. We prototype rapidly, iterate based on feedback, and are relentless in our pursuit of the perfect player experience. Our games are built to be played, shared, and remembered.',
      ],
    },
    sr: {
      headline: 'Kreiranje Svetova, Jedna Igra Odjednom',
      body: [
        'U Pixels2Pixels Studiju, razvoj igara je u našoj DNK. Mi smo tim strastvenih igrača, umetnika i inženjera posvećenih stvaranju nezaboravnih interaktivnih iskustava. Sarađujemo sa indie studijima i etabliranim izdavačima kako bismo oživeli njihove kreativne vizije.',
        'Naša stručnost pokriva širok spektar žanrova i platformi, od brzih mobilnih akcijskih igara do prostranih PC i konzolnih RPG-ova. Koristimo vodeće industrijske engine kao što su Unreal Engine i Unity za izgradnju visokoučinkovitih, vizualno bogatih igara.',
        'Pored tehničke realizacije, donosimo mentalitet koji stavlja igrača na prvo mesto svakom projektu. Brzo prototipišemo, iteriramo na osnovu povratnih informacija i neumorno težimo savršenom iskustvu igrača.',
      ],
    },
  },
  'web-development': {
    en: {
      headline: 'Building the Future of the Web',
      body: [
        'In today\'s digital-first world, a powerful web presence is non-negotiable. Pixels2Pixels Studio creates bespoke websites and web applications that are not only visually stunning but also engineered for performance, scalability, and security. We believe in building digital experiences that are intuitive, accessible, and aligned with your business goals.',
        'Our team specializes in modern web technologies, including Next.js, React, and Node.js, allowing us to build everything from lightning-fast marketing sites to complex, data-driven web applications. We follow a user-centric design process, ensuring that every interaction is seamless and every feature serves a purpose.',
        'We don\'t just build websites; we build digital assets that work for your business around the clock. From SEO-optimized architecture to blazing-fast load times and mobile-first design, every decision we make is guided by the goal of maximizing your online impact.',
      ],
    },
    sr: {
      headline: 'Izgradnja Budućnosti Veba',
      body: [
        'U današnjem svetu koji stavlja digitalno na prvo mesto, moćno web prisustvo je neophodno. Pixels2Pixels Studio kreira prilagođene web sajtove i aplikacije koje su ne samo vizualno impresivne, već i optimizovane za performanse, skalabilnost i bezbednost.',
        'Naš tim se specijalizuje za moderne web tehnologije, uključujući Next.js, React i Node.js, što nam omogućava da izgradimo sve od brzih marketing sajtova do složenih, podacima vođenih web aplikacija.',
        'Mi ne gradimo samo web sajtove; gradimo digitalna sredstva koja rade za vaše poslovanje non-stop. Od SEO-optimizovane arhitekture do brzog učitavanja i dizajna koji stavlja mobilne uređaje na prvo mesto, svaka odluka koju donosimo vođena je ciljem maksimizacije vašeg online uticaja.',
      ],
    },
  },
  'blockchain': {
    en: {
      headline: 'Navigating the Decentralized Frontier',
      body: [
        'Web3 represents a paradigm shift in how we interact with the internet, and Pixels2Pixels Studio is your trusted guide in this new decentralized landscape. We help businesses and creators harness the power of blockchain technology to build transparent, secure, and user-owned applications.',
        'Our team has deep expertise in smart contract development on platforms like Ethereum and Solana, as well as the creation of custom decentralized applications (dApps). Whether you are looking to launch an NFT marketplace, create a tokenized community, or integrate blockchain into your existing infrastructure, we provide the strategic and technical expertise to make it happen.',
        'We understand that the Web3 space can be complex and rapidly evolving. That\'s why we offer not just development services, but also strategic consulting to help you navigate the landscape, identify the right opportunities, and build solutions that are sustainable and future-proof.',
      ],
    },
    sr: {
      headline: 'Navigacija Decentralizovanom Granicom',
      body: [
        'Web3 predstavlja paradigmatsku promenu u načinu na koji komuniciramo sa internetom, a Pixels2Pixels Studio je vaš pouzdani vodič u ovom novom decentralizovanom pejzažu. Pomažemo preduzećima i kreatorima da iskoriste moć blockchain tehnologije.',
        'Naš tim ima duboku stručnost u razvoju pametnih ugovora na platformama kao što su Ethereum i Solana, kao i u kreiranju prilagođenih decentralizovanih aplikacija (dApps). Bez obzira da li želite da lansirate NFT tržište, kreirate tokenizovanu zajednicu ili integrišete blockchain u svoju postojeću infrastrukturu, mi pružamo stručnost da se to ostvari.',
        'Razumemo da Web3 prostor može biti složen i brzo promenljiv. Zato nudimo ne samo razvojne usluge, već i strateško savetovanje koje vam pomaže da se snađete u pejzažu i izgradite rešenja koja su održiva i otporna na budućnost.',
      ],
    },
  },
  '3d-design': {
    en: {
      headline: 'Sculpting Digital Worlds with Artistry and Precision',
      body: [
        'At Pixels2Pixels Studio, we believe that exceptional 3D art is the cornerstone of any immersive digital experience. Our team of world-class artists combines technical mastery with creative passion to produce stunning 3D models, characters, environments, and animations that captivate and inspire.',
        'We work with a wide range of styles, from hyper-realistic to stylized, ensuring that the final assets perfectly match your creative vision. Using industry-standard tools like Blender, Maya, and ZBrush, we create optimized, game-ready assets that are as performant as they are beautiful.',
        'Our 3D pipeline is designed for efficiency and quality. We work closely with you throughout the process, from initial concept sketches and mood boards to final delivery, ensuring that every asset meets your specifications and exceeds your expectations.',
      ],
    },
    sr: {
      headline: 'Vajanje Digitalnih Svetova sa Umetnošću i Preciznošću',
      body: [
        'U Pixels2Pixels Studiju, verujemo da je izuzetna 3D umetnost kamen temeljac svakog imerzivnog digitalnog iskustva. Naš tim umetnika svetske klase kombinuje tehničko majstorstvo sa kreativnom strašću za produkciju zapanjujućih 3D modela, likova, okruženja i animacija.',
        'Radimo sa širokim spektrom stilova, od hiper-realističnih do stilizovanih, osiguravajući da finalna sredstva savršeno odgovaraju vašoj kreativnoj viziji. Koristeći industrijske alate kao što su Blender, Maya i ZBrush, kreiramo optimizovana, igri-sprema sredstva.',
        'Naš 3D pipeline je dizajniran za efikasnost i kvalitet. Blisko sarađujemo sa vama tokom celog procesa, od početnih skica koncepta i mood board-a do finalne isporuke.',
      ],
    },
  },
  'video-production': {
    en: {
      headline: 'Telling Your Story Through the Power of Motion',
      body: [
        'In a world saturated with content, high-quality video is the most powerful way to capture attention and tell a compelling story. Pixels2Pixels Studio offers end-to-end video production services, combining cinematic storytelling with stunning visuals to create content that resonates with your audience.',
        'Our team handles every aspect of the production process, from scriptwriting and storyboarding to filming, editing, and post-production. We specialize in creating a wide range of video content, including promotional videos, product showreels, animated explainer videos, and customer testimonials.',
        'We believe that every video should not only look beautiful but also serve a strategic purpose, whether it\'s building brand awareness, driving sales, or educating your audience. Our approach is always goal-oriented, ensuring that every frame contributes to your overall marketing and communication strategy.',
      ],
    },
    sr: {
      headline: 'Pričanje Vaše Priče Kroz Moć Pokreta',
      body: [
        'U svetu zasićenom sadržajem, visokokvalitetni video je najmoćniji način da privučete pažnju i ispričate ubedljivu priču. Pixels2Pixels Studio nudi end-to-end usluge video produkcije, kombinujući kinematografsko pripovedanje sa zapanjujućim vizualima.',
        'Naš tim rukuje svakim aspektom procesa produkcije, od pisanja scenarija i storyboard-a do snimanja, montaže i post-produkcije. Specijalizovani smo za kreiranje raznovrsnog video sadržaja, uključujući promotivne video zapise, showreel-ove proizvoda, animirane objasnidbene video zapise i svedočanstva klijenata.',
        'Verujemo da svaki video treba ne samo da izgleda lepo, već i da služi strateškoj svrsi, bilo da je to izgradnja svesti o brendu, pokretanje prodaje ili edukacija vaše publike.',
      ],
    },
  },
  'digital-marketing': {
    en: {
      headline: 'Amplifying Your Brand in the Digital Age',
      body: [
        'Creating an amazing product is only half the battle; reaching the right audience is what truly drives success. Pixels2Pixels Studio offers a full suite of digital marketing services designed to help you connect with your customers, build a loyal community, and achieve your business goals.',
        'Our approach is data-driven and results-oriented. We combine creative content strategies with analytical rigor to create campaigns that not only capture attention but also deliver a measurable return on investment. From search engine optimization (SEO) to social media management, we provide the expertise you need to navigate the complexities of the digital marketing landscape.',
        'We understand that every business is unique, which is why we don\'t believe in one-size-fits-all solutions. We take the time to understand your brand, your audience, and your goals, and we build customized marketing strategies that are designed to deliver real, sustainable growth.',
      ],
    },
    sr: {
      headline: 'Pojačavanje Vašeg Brenda u Digitalnom Dobu',
      body: [
        'Kreiranje odličnog proizvoda je samo pola bitke; dosezanje prave publike je ono što zaista pokreće uspeh. Pixels2Pixels Studio nudi kompletan paket usluga digitalnog marketinga dizajniranih da vam pomognu da se povežete sa klijentima i postignete poslovne ciljeve.',
        'Naš pristup je zasnovan na podacima i orijentisan na rezultate. Kombinujemo kreativne strategije sadržaja sa analitičkom strogošću kako bismo kreirali kampanje koje ne samo da privlače pažnju, već i donose merljiv povrat investicije.',
        'Razumemo da je svako preduzeće jedinstveno, zbog čega ne verujemo u jednoveličinska rešenja. Uzimamo vreme da razumemo vaš brend, vašu publiku i vaše ciljeve, i gradimo prilagođene marketinške strategije dizajnirane za pravi, održivi rast.',
      ],
    },
  },
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { lang, slug } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const service = dict.services.items.find((s) => s.slug === slug)
  if (!service) notFound()

  const otherServices = dict.services.items.filter((s) => s.slug !== slug).slice(0, 3)
  const content = serviceContent[slug]

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

      {/* Long-form SEO Content */}
      {content && (
        <section className="section-padding bg-brand-dark border-b border-brand-blue/10">
          <div className="section-container">
            <div className="max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">
                {locale === 'en' ? content.en.headline : content.sr.headline}
              </h2>
              <div className="space-y-5">
                {(locale === 'en' ? content.en.body : content.sr.body).map((paragraph, i) => (
                  <p key={i} className="text-brand-gray text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features + Process */}
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
                    desc: locale === 'sr' ? 'Razumemo vaše ciljeve, publiku i poslovne zahteve kroz dubinsku konsultaciju.' : 'We understand your goals, audience, and business requirements through in-depth consultation.',
                  },
                  {
                    step: '02',
                    title: locale === 'sr' ? 'Planiranje' : 'Planning',
                    desc: locale === 'sr' ? 'Definišemo opseg, rokove, isporuke i tehničku arhitekturu.' : 'We define scope, timeline, deliverables, and technical architecture.',
                  },
                  {
                    step: '03',
                    title: locale === 'sr' ? 'Izvršenje' : 'Execution',
                    desc: locale === 'sr' ? 'Gradimo sa transparentnošću, redovnim ažuriranjima i iterativnim poboljšanjima.' : 'We build with transparency, regular updates, and iterative improvements.',
                  },
                  {
                    step: '04',
                    title: locale === 'sr' ? 'Isporuka & Podrška' : 'Delivery & Support',
                    desc: locale === 'sr' ? 'Isporučujemo, temeljno testiramo i pružamo kontinuiranu podršku nakon lansiranja.' : 'We deliver, thoroughly test, and provide ongoing post-launch support.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="text-brand-blue font-black text-sm w-8 flex-shrink-0 pt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{item.title}</h3>
                      <p className="text-brand-gray text-sm leading-relaxed">{item.desc}</p>
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
