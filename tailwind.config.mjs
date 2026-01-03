/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Inter', 'Segoe UI', 'Roboto', 'Arial'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono']
      },
      colors: {
        space: {
          950: '#050615',
          900: '#07081c',
          800: '#0b0e2a',
          700: '#10163a'
        }
      },
      boxShadow: {
        glow: '0 0 40px rgba(124, 58, 237, 0.25)',
        glass: '0 20px 60px rgba(0,0,0,0.35)'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        },
        twinkle: {
          '0%,100%': { opacity: '0.7' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 9s ease-in-out infinite',
        twinkle: 'twinkle 3.5s ease-in-out infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
