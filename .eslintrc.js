module.exports = {
  ignorePatterns: ['dist'],
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'script',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
};
