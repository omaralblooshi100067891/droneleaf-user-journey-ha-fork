/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
       screens: {
        'short': { raw: '(max-height: 700px)' },
      },
    },
  },
  plugins: [],
}
