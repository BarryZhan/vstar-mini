// prettier.config.js
module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  plugins: [
    // comment for better diff
    'prettier-plugin-astro',
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss',
  ],
  // overrides: [
  //   {
  //     files: '*.astro',
  //     options: {
  //       parser: 'astro',
  //     },
  //   },
  // ],
}
