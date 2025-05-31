/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - Pink/Rose Theme
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        // Secondary Colors - Elegant Neutrals
        secondary: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Accent Colors
        accent: {
          gold: '#d4af37',
          'gold-light': '#f7e98e',
          'gold-dark': '#b8941f',
          coral: '#ff6b9d',
          mint: '#95e1d3',
          lavender: '#c3aed6',
        },
        // Status Colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.06)',
        'pink': '0 4px 14px 0 rgba(236, 72, 153, 0.15)',
        'pink-lg': '0 10px 40px -10px rgba(236, 72, 153, 0.25)',
        'glow': '0 0 20px rgba(236, 72, 153, 0.3)',
      },
      backgroundImage: {
        // Primary Gradients
        'gradient-primary': 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
        'gradient-primary-soft': 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)',
        'gradient-primary-dark': 'linear-gradient(135deg, #be185d 0%, #831843 100%)',
        
        // Hero Gradients
        'gradient-hero': 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 50%, #f9a8d4 100%)',
        'gradient-hero-dark': 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)',
        
        // Card Gradients
        'gradient-card': 'linear-gradient(145deg, #ffffff 0%, #fdf2f8 100%)',
        'gradient-card-hover': 'linear-gradient(145deg, #fdf2f8 0%, #fce7f3 100%)',
        
        // Button Gradients
        'gradient-btn': 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
        'gradient-btn-hover': 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
        
        // Special Effects
        'gradient-rainbow': 'linear-gradient(135deg, #ec4899 0%, #d4af37 25%, #95e1d3 50%, #c3aed6 75%, #ff6b9d 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(236, 72, 153, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(236, 72, 153, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    // Custom plugin for additional utilities
    function({ addUtilities, addComponents, theme }: { addUtilities: any; addComponents: any; theme: any }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.10)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)',
        },
        '.glass': {
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
      }

      const newComponents = {
        '.btn-primary': {
          background: theme('backgroundImage.gradient-btn'),
          color: theme('colors.white'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.lg'),
          fontWeight: theme('fontWeight.semibold'),
          boxShadow: theme('boxShadow.pink'),
          transition: 'all 0.3s ease',
          '&:hover': {
            background: theme('backgroundImage.gradient-btn-hover'),
            boxShadow: theme('boxShadow.pink-lg'),
            transform: 'translateY(-2px)',
          },
        },
        '.card-elegant': {
          background: theme('backgroundImage.gradient-card'),
          borderRadius: theme('borderRadius.2xl'),
          boxShadow: theme('boxShadow.soft'),
          border: `1px solid ${theme('colors.primary.100')}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            background: theme('backgroundImage.gradient-card-hover'),
            boxShadow: theme('boxShadow.medium'),
            transform: 'translateY(-4px)',
          },
        },
      }

      addUtilities(newUtilities)
      addComponents(newComponents)
    },
  ],
}