module.exports = {
  root: true,
  extends: ['universe/native'],
  plugins: ['react', 'react-hooks'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'react-hooks/exhaustive-deps': 'warn',
    indent: ['error', 2],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'prettier/prettier': ['error', { singleQuote: true }],
  },
};
