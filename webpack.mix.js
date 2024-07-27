let tailwindcss = require('tailwindcss')
let postcssImport = require('postcss-import')
let postcssRtlcss = require('postcss-rtlcss')
let mix = require('laravel-mix')

require('./nova.mix')

mix
  .setPublicPath('dist')
  .js('resources/js/field.js', 'js')
  .vue({ version: 3 })
  // .css("resources/css/field.css", "css")
  .postCss('./resources/css/field.css', 'css', [
    postcssImport(),
    tailwindcss(
      //   path.join(__dirname, '../../vendor/laravel/nova/tailwind.config.js')
      'tailwind.config.js'
    ),
    postcssRtlcss(),
  ])
  .nova('ferdiunal/nova-media')
