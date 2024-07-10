import { generateTailwindColors } from '../../vendor/laravel/nova/generators'
// import NovaConfig from '../../vendor/laravel/nova/tailwind.config'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{js,vue}'],
  darkMode: 'class',
  prefix: 'ln-',
  theme: {
    colors: generateTailwindColors(),
    extend: {},
  },
  plugins: [],
}
