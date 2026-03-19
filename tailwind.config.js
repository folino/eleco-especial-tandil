/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF8',
        sierra: '#8B7355',
        'sierra-light': '#A8916F',
        'sierra-dark': '#6B5A43',
        dark: '#222222',
        'dark-surface': '#1a1a1a',
        'text-primary': '#2D2D2D',
        'text-secondary': '#6B7280',
        'accent-data': '#2563EB',
        'accent-alert': '#DC2626',
        'accent-warm': '#D97706',
        'section-light': '#F5F0EB',
        'section-warm': '#FDF8F0',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Sans 3', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'section-title': ['clamp(1.75rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'pull-quote': ['clamp(1.25rem, 2.5vw, 2rem)', { lineHeight: '1.4' }],
        'body-lg': ['clamp(1.05rem, 1.2vw, 1.25rem)', { lineHeight: '1.8' }],
        'data-big': ['clamp(2rem, 3.5vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 8rem)',
      },
      maxWidth: {
        'prose-wide': '42rem',
        'content': '72rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
