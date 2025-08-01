/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
       screens: {
        'short': { raw: '(max-height: 700px)' },
      },
       colors: {
      primaryGreen: '#009169'
    }
    },
  },
  plugins: [],
}
