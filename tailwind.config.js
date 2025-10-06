/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,mdx}',
    './components/**/*.{js,jsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0d0d0d',
          accent: '#5b8def'
        }
      }
    }
  },
  plugins: [import('@tailwindcss/typography').then(m => m.default())]
};
