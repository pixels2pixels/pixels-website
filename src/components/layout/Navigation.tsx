'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'
import { cn } from '@/lib/utils'

interface NavigationProps {
  dict: Dictionary
  locale: Locale
}

export default function Navigation({ dict, locale }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/news`, label: dict.nav.news },
  ]

  const altLocale = locale === 'en' ? 'sr' : 'en'
  const altLabel = locale === 'en' ? 'SR' : 'EN'

  // Build alternate locale path
  const altPath = pathname.replace(`/${locale}`, `/${altLocale}`)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-blue/10 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-brand-blue rounded opacity-20 group-hover:opacity-40 transition-opacity" />
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 relative z-10">
                <rect x="2" y="2" width="12" height="12" stroke="#00AAFF" strokeWidth="1.5" fill="none" />
                <rect x="18" y="2" width="12" height="12" stroke="#00AAFF" strokeWidth="1.5" fill="none" />
                <rect x="2" y="18" width="12" height="12" stroke="#00AAFF" strokeWidth="1.5" fill="none" />
                <rect x="18" y="18" width="12" height="12" stroke="#00CCFF" strokeWidth="1.5" fill="rgba(0,170,255,0.1)" />
              </svg>
            </div>
            <span className="font-bold text-sm tracking-wide hidden sm:block">
              <span className="text-white">PIXELS</span>
              <span className="text-brand-blue">2</span>
              <span className="text-white">PIXELS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== `/${locale}` && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'text-brand-blue bg-brand-blue/10'
                      : 'text-brand-gray hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side: Lang switcher + CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <Link
              href={altPath}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-bold tracking-wider text-brand-gray hover:text-brand-blue border border-brand-blue/20 hover:border-brand-blue/50 rounded-md transition-all duration-200"
            >
              {altLabel}
            </Link>

            {/* CTA Button */}
            <Link
              href={`/${locale}/contact`}
              className="btn-primary hidden sm:inline-flex text-xs px-4 py-2"
            >
              {dict.nav.getInTouch}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-brand-gray hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={cn('block h-0.5 bg-current transition-all duration-300', isMobileOpen && 'rotate-45 translate-y-1.5')} />
                <span className={cn('block h-0.5 bg-current transition-all duration-300', isMobileOpen && 'opacity-0')} />
                <span className={cn('block h-0.5 bg-current transition-all duration-300', isMobileOpen && '-rotate-45 -translate-y-1.5')} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="bg-brand-dark-2/95 backdrop-blur-md border-t border-brand-blue/10 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== `/${locale}` && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'text-brand-blue bg-brand-blue/10'
                      : 'text-brand-gray hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-brand-blue/10">
              <Link
                href={altPath}
                onClick={() => setIsMobileOpen(false)}
                className="px-3 py-1.5 text-xs font-bold text-brand-gray hover:text-brand-blue border border-brand-blue/20 rounded-md"
              >
                {altLabel}
              </Link>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsMobileOpen(false)}
                className="btn-primary text-xs px-4 py-2"
              >
                {dict.nav.getInTouch}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
