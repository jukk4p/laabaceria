import type { Config } from 'tailwindcss'

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

const config: any = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': withOpacity('--bg-base-rgb'),
        'bg-dark': withOpacity('--bg-dark-rgb'),
        'bg-card': withOpacity('--bg-card-rgb'),
        'bg-section': withOpacity('--bg-section-rgb'),
        'bg-ticker': 'var(--bg-ticker)',
        'bg-product': withOpacity('--bg-product-rgb'),
        'bg-cta': withOpacity('--bg-cta-rgb'),
        'gold': {
          DEFAULT: withOpacity('--gold-rgb'),
          light: withOpacity('--gold-light-rgb'),
          muted: 'var(--gold-55)',
          faint: 'var(--gold-12)',
        },
        'text-primary': withOpacity('--text-primary-rgb'),
        'text-secondary': withOpacity('--text-muted-rgb'),
        'text-muted': withOpacity('--text-muted-rgb'),
        'text-faint': withOpacity('--text-faint-rgb'),
        'border-strong': 'var(--border-strong)',
        'green-wa': withOpacity('--green-wa-rgb'),
        'red-closed': withOpacity('--red-closed-rgb'),
        'teal-custom': withOpacity('--teal-custom-rgb'),
        'amber-premium': withOpacity('--amber-premium-rgb'),
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      letterSpacing: {
        'widest-xl': '0.2em',
        'ticker': '0.18em',
      },
      animation: {
        'ticker': 'ticker 40s linear infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'bounce': 'bounce 2s infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
