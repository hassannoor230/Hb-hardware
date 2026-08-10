/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#081726',
        'primary-light': '#122B42',
        'primary-dark': '#020B14',
        secondary: '#7B8FA6',
        accent: '#D7A42D',
        'accent-hover': '#B37A24',
        background: '#F7F9FB',
        surface: '#FFFFFF',
        'surface-muted': '#F4F7FA',
        alternate: '#E8EEF3',
        text: '#102A43',
        muted: '#617892',
        border: '#D7E2EC',
        success: '#16A34A',
        error: '#DC2626',
        warning: '#F59E0B',
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 30px rgba(2, 11, 20, 0.08)',
        'card-hover': '0 20px 40px rgba(2, 11, 20, 0.12)',
        'glow': '0 0 18px rgba(230, 180, 78, 0.24)',
        'glow-lg': '0 0 28px rgba(230, 180, 78, 0.28)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [],
}
