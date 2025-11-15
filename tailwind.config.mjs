import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem', // 24px mobile
        md: '2rem', // 32px tablet
        lg: '3rem', // 48px desktop
        xl: '4rem', // 64px large desktop
      },
      screens: {
        sm: '40rem', // 640px
        md: '48rem', // 768px
        lg: '64rem', // 1024px
        xl: '80rem', // 1280px - max content width per spec
        '2xl': '80rem', // cap at 1280px
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // Standard UI colors
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',

        // Saint Helen brand colors
        sh: {
          primary: 'hsl(var(--sh-color-primary))',
          'primary-soft': 'hsl(var(--sh-color-primary-soft))',
          bg: 'hsl(var(--sh-color-bg))',
          'bg-light': 'hsl(var(--sh-color-bg-light))',
          'bg-alt': 'hsl(var(--sh-color-bg-alt))',
          'bg-dark': 'hsl(var(--sh-color-bg-dark))',
          surface: 'hsl(var(--sh-color-surface))',
          text: 'hsl(var(--sh-color-text-main))',
          'text-muted': 'hsl(var(--sh-color-text-muted))',
          'text-on-primary': 'hsl(var(--sh-color-text-on-primary))',
          'text-on-dark': 'hsl(var(--sh-color-text-on-dark))',
          gold: 'hsl(var(--sh-color-accent-gold))',
          teal: 'hsl(var(--sh-color-accent-teal))',
          gray: {
            100: 'hsl(var(--sh-color-gray-100))',
            300: 'hsl(var(--sh-color-gray-300))',
            600: 'hsl(var(--sh-color-gray-600))',
            800: 'hsl(var(--sh-color-gray-800))',
          },
          'border-subtle': 'hsl(var(--sh-color-border-subtle))',
          'border-strong': 'hsl(var(--sh-color-border-strong))',
        },
      },
      fontFamily: {
        // Mono font for code
        mono: ['var(--font-mono)', 'monospace'],

        // Saint Helen brand fonts
        heading: ['var(--font-heading)', 'serif'], // Libre Baskerville
        body: ['var(--font-body)', 'sans-serif'], // Libre Franklin

        // Default sans (uses body font)
        sans: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        // Saint Helen type scale
        'hero': ['clamp(2.5rem, 4vw, 3.5rem)', { lineHeight: '1.1' }],
        'h1': ['clamp(2.1rem, 3.2vw, 2.75rem)', { lineHeight: '1.2' }],
        'h2': ['clamp(1.8rem, 2.7vw, 2.1rem)', { lineHeight: '1.25' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
        'h4': ['1.25rem', { lineHeight: '1.3' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        // Saint Helen vertical spacing tokens
        'section-mobile': '3rem',
        'section-desktop': '5rem',
        'block-gap': '1.5rem',
        'block-gap-lg': '2rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--sh-color-text-main))',
            '--tw-prose-headings': 'hsl(var(--sh-color-text-main))',
            '--tw-prose-links': 'hsl(var(--sh-color-primary))',
            '--tw-prose-bold': 'hsl(var(--sh-color-text-main))',
            '--tw-prose-quotes': 'hsl(var(--sh-color-text-muted))',
            color: 'hsl(var(--sh-color-text-main))',
            fontSize: '1rem',
            lineHeight: '1.6',
            maxWidth: 'none',
            h1: {
              fontFamily: 'var(--font-heading), serif',
              fontSize: 'clamp(2.1rem, 3.2vw, 2.75rem)',
              fontWeight: '700',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '1rem',
            },
            h2: {
              fontFamily: 'var(--font-heading), serif',
              fontSize: 'clamp(1.8rem, 2.7vw, 2.1rem)',
              fontWeight: '700',
              lineHeight: '1.25',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              fontFamily: 'var(--font-heading), serif',
              fontSize: '1.5rem',
              fontWeight: '700',
              lineHeight: '1.3',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            h4: {
              fontFamily: 'var(--font-heading), serif',
              fontSize: '1.25rem',
              fontWeight: '700',
              lineHeight: '1.3',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            p: {
              marginTop: '0',
              marginBottom: '1rem',
            },
            a: {
              color: 'hsl(var(--sh-color-primary))',
              textDecoration: 'underline',
              '&:hover': {
                color: 'hsl(var(--sh-color-primary-soft))',
              },
            },
            strong: {
              fontWeight: '600',
            },
            ul: {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            ol: {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--sh-color-primary))',
              borderLeftWidth: '4px',
              paddingLeft: '1.5rem',
              fontStyle: 'italic',
              color: 'hsl(var(--sh-color-text-muted))',
            },
          },
        },
      }),
    },
  },
}

export default config
