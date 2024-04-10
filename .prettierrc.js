module.exports = {
  importOrder: ['<THIRD_PARTY_MODULES>', '^react', '^@/'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
