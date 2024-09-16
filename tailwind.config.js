import { generateTailwindColors } from '../../vendor/laravel/nova/generators'
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
