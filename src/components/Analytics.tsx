/**
 * Analytics Component
 *
 * Supports:
 * - Google Analytics 4 (GA4)
 * - Plausible Analytics (privacy-friendly alternative)
 *
 * Configuration:
 * - Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local for Google Analytics
 * - Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in .env.local for Plausible
 *
 * Usage: Add <Analytics /> to your root layout.tsx
 */

import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export default function Analytics() {
  return (
    <>
      {/* ─── Google Analytics 4 ─────────────────────────────────────────── */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure',
              });
            `}
          </Script>
        </>
      )}

      {/* ─── Plausible Analytics (privacy-friendly) ──────────────────────── */}
      {PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  )
}

/**
 * Track custom events (use in client components)
 *
 * @example
 * import { trackEvent } from '@/components/Analytics'
 * trackEvent('contact_form_submit', { locale: 'en' })
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return

  // Google Analytics
  if (GA_MEASUREMENT_ID && typeof (window as any).gtag === 'function') {
    ;(window as any).gtag('event', eventName, params)
  }

  // Plausible
  if (PLAUSIBLE_DOMAIN && typeof (window as any).plausible === 'function') {
    ;(window as any).plausible(eventName, { props: params })
  }
}
