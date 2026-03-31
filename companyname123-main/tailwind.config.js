/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#005E96',
        secondary: '#44C8F5',
        accent: '#7CCCBF',
        cta: '#A6CE39',
        background: '#002C3D',
      },
      animation: {
        'scroll': 'scroll 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'orbital-float': 'orbital-float 5s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'marquee': 'marquee 50s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'orbital-float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-8px) translateX(4px)' },
          '66%': { transform: 'translateY(-4px) translateX(-2px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Rubik', 'system-ui', 'sans-serif'],
        quote: ['Playfair Display', 'serif'],
      },
      fontSize: {
        // Display typography
        'display': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['clamp(2rem, 4vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        
        // Heading typography
        'h1': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2': ['clamp(1.75rem, 4vw, 2.25rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['clamp(1.5rem, 3vw, 1.875rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '1.4', fontWeight: '500' }],
        'h5': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.4', fontWeight: '500' }],
        'h6': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.4', fontWeight: '500' }],
        
        // Body typography
        'body-lg': ['clamp(1rem, 2vw, 1.125rem)', { lineHeight: '1.6' }],
        'body': ['clamp(0.875rem, 1.5vw, 1rem)', { lineHeight: '1.6' }],
        'body-sm': ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1.5' }],
        
        // UI elements
        'ui': ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1.4', fontWeight: '500' }],
        'ui-sm': ['clamp(0.675rem, 0.875vw, 0.75rem)', { lineHeight: '1.4', fontWeight: '500' }],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
};