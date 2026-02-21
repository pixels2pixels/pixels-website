import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'

interface FooterProps {
  dict: Dictionary
  locale: Locale
}

export default function Footer({ dict, locale }: FooterProps) {
  const services = [
    { slug: 'xr-development', label: 'XR Development' },
    { slug: 'game-development', label: 'Game Development' },
    { slug: 'web-development', label: 'Web Development' },
    { slug: 'blockchain', label: 'Blockchain & Web3' },
    { slug: '3d-design', label: '3D Design & Animation' },
    { slug: 'video-production', label: 'Video Production' },
    { slug: 'digital-marketing', label: 'Digital Marketing' },
  ]

  const company = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ]

  return (
    <footer className="bg-brand-dark-2 border-t border-brand-blue/10">
      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-4 group">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Pixels2Pixels Studio Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <span className="font-bold text-sm tracking-widest">
                <span className="text-white">PIXELS</span>
                <span className="text-brand-blue">2</span>
                <span className="text-white">PIXELS</span>
              </span>
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed mb-6">
              {dict.footer.tagline}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/pixels2pixels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-brand-blue/20 text-brand-gray hover:text-brand-blue hover:border-brand-blue/50 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/pixels2pixels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-brand-blue/20 text-brand-gray hover:text-brand-blue hover:border-brand-blue/50 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/pixels2pixels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-brand-blue/20 text-brand-gray hover:text-brand-blue hover:border-brand-blue/50 transition-all duration-200"
                aria-label="Twitter/X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide mb-4">
              {dict.footer.services}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="text-brand-gray text-sm hover:text-brand-blue transition-colors duration-200"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide mb-4">
              {dict.footer.company}
            </h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-brand-gray text-sm hover:text-brand-blue transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide mb-4">
              {dict.contact.info.title}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${dict.contact.info.email}`}
                  className="text-brand-gray text-sm hover:text-brand-blue transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-brand-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {dict.contact.info.email}
                </a>
              </li>
              <li>
                <span className="text-brand-gray text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {dict.contact.info.location}
                </span>
              </li>
            </ul>

            {/* Language Toggle */}
            <div className="mt-6">
              <p className="text-brand-gray text-xs font-semibold tracking-wider uppercase mb-2">Language</p>
              <div className="flex gap-2">
                <Link
                  href="/en"
                  className={`px-3 py-1.5 text-xs font-bold rounded border transition-all duration-200 ${
                    locale === 'en'
                      ? 'border-brand-blue text-brand-blue bg-brand-blue/10'
                      : 'border-brand-blue/20 text-brand-gray hover:border-brand-blue/50 hover:text-brand-blue'
                  }`}
                >
                  EN
                </Link>
                <Link
                  href="/sr"
                  className={`px-3 py-1.5 text-xs font-bold rounded border transition-all duration-200 ${
                    locale === 'sr'
                      ? 'border-brand-blue text-brand-blue bg-brand-blue/10'
                      : 'border-brand-blue/20 text-brand-gray hover:border-brand-blue/50 hover:text-brand-blue'
                  }`}
                >
                  SR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-blue/10">
        <div className="section-container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-brand-gray text-xs">
              {dict.footer.copyright}
            </p>
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/privacy`} className="text-brand-gray text-xs hover:text-brand-blue transition-colors">
                {dict.footer.privacy}
              </Link>
              <Link href={`/${locale}/terms`} className="text-brand-gray text-xs hover:text-brand-blue transition-colors">
                {dict.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
