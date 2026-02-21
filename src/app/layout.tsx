import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Pixels2Pixels Studio',
    template: '%s | Pixels2Pixels Studio',
  },
  description: 'Creative technology studio specializing in XR, game development, web development, 3D design, and digital marketing.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pixels2pixels.com'),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-brand-dark text-brand-white antialiased">
        {children}
      </body>
    </html>
  )
}
