/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Custom brand colors
        'dark-gray': '#2F2F2F',
        'medium-gray': '#616161',
        'dark-blue': '#0E2D3B',
        'light-blue': '#50D0FF',
        'royal-blue': '#0830B1',
        charcoal: '#4D4D4D',
        'muted-purple': '#A8A4B8',
        // Gradient colors
        'cyan-bright': '#23B6D7',
        'blue-deep': '#1646AE',
        'teal-bright': '#078FAD',
        'purple-deep': '#5E1B99',
        'navy-dark': '#0C2E4E',
        'blue-medium': '#0E63A9',
      },
      backgroundImage: {
        // Custom gradients
        'gradient-cyan-blue':
          'linear-gradient(135deg, #23B6D7 0%, #1646AE 100%)',
        'gradient-teal-purple':
          'linear-gradient(135deg, #078FAD 0%, #5E1B99 100%)',
        'gradient-navy-blue':
          'linear-gradient(135deg, #0C2E4E 0%, #0E63A9 100%)',
        // Alternative gradient directions
        'gradient-cyan-blue-r':
          'linear-gradient(to right, #23B6D7 0%, #1646AE 100%)',
        'gradient-teal-purple-r':
          'linear-gradient(to right, #078FAD 0%, #5E1B99 100%)',
        'gradient-navy-blue-r':
          'linear-gradient(to right, #0C2E4E 0%, #0E63A9 100%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
