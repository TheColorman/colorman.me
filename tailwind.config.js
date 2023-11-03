/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./app.vue",
    ],
    theme: {
      extend: {
        backgroundSize: {
            'size-200': '200% 200%',
        },
        backgroundPosition: {
            '-pos-100': '-100% -100%',
            '-pos-75': '-75% -75%',
            '-pos-50': '-50% -50%',
            'pos-0': '0% 0%',
            'pos-50': '50% 50%',
            'pos-75': '75% 75%',
            'pos-100': '100% 100%',
        },
      },
    },
    plugins: [
        require('@tailwindcss/typography'),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities({
                'bg-pos': (value) => {
                    return {
                        'background-position': `${value}% ${value}%`,
                    }
                }
            })
        })
    ],
  }