import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Pixels2Pixels brand colors
        brand: {
          blue: '#00AAFF',
          'blue-dark': '#0077CC',
          'blue-glow': '#00CCFF',
          dark: '#0A0A0F',
          'dark-2': '#111118',
          'dark-3': '#1A1A24',
          'dark-4': '#222230',
          gray: '#8888AA',
          'gray-light': '#AAAACC',
          white: '#F0F0FF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0A0A0F 0%, #111118 50%, #0A0A1A 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(0,170,255,0.05) 0%, rgba(0,0,0,0) 100%)',
        'blue-glow': 'radial-gradient(ellipse at center, rgba(0,170,255,0.15) 0%, transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan-line': 'scanLine 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,170,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,170,255,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'blue-glow': '0 0 20px rgba(0,170,255,0.4)',
        'blue-glow-lg': '0 0 40px rgba(0,170,255,0.5)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,170,255,0.2)',
      },
      borderColor: {
        'blue-glow': 'rgba(0,170,255,0.4)',
      },
    },
  },
  plugins: [],
}

export default config
