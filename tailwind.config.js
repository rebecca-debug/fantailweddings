/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  future: {
    // Gate `hover:` variants behind @media (hover: hover) so they don't
    // fire on touch taps (no more accidental image-zoom on tap).
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.23, 1, 0.32, 1)'
      }
    }
  },
  plugins: []
};
