/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Manrope first: it has no CJK glyphs, so the browser falls through
        // to the system stack per-character for Chinese text automatically —
        // Latin text and numerals (headings, %, scores) get Manrope's more
        // distinctive geometric shapes, Chinese text is unaffected.
        sans: ['Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      colors: {
        battery: {
          green: '#10B981',
          yellow: '#F59E0B',
          red: '#EF4444',
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155'
        }
      },
      animation: {
        'pulse-fast': 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-short': 'bounce 0.5s ease-in-out 2',
      }
    },
  },
  plugins: [],
}
