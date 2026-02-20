import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateSEOMetadata } from '@/lib/seo'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PortfolioPreview from '@/components/sections/PortfolioPreview'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import ShowreelSection from '@/components/sections/ShowreelSection'

interface HomePageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return generateSEOMetadata({
    title: 'Creative Technology Studio',
    description: locale === 'sr'
      ? 'Pixels2Pixels Studio — kreativno-tehnološki studio specijalizovan za XR, razvoj igara, web razvoj, 3D dizajn i digitalni marketing. Transformišemo ideje u digitalne realnosti.'
      : 'Pixels2Pixels Studio — creative technology studio specializing in XR, game development, web development, 3D design, and digital marketing. We transform ideas into digital realities.',
    locale,
    path: '',
    keywords: ['XR development', 'VR AR studio', 'game development', 'web development', '3D animation', 'Belgrade Serbia'],
  })
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return (
    <>
      <HeroSection dict={dict} locale={locale} />
      <ServicesSection dict={dict} locale={locale} />
      <ShowreelSection dict={dict} locale={locale} />
      <PortfolioPreview dict={dict} locale={locale} />
      <TestimonialsSection dict={dict} locale={locale} />
      <CTASection dict={dict} locale={locale} />
    </>
  )
}
