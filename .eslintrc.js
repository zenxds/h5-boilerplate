module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  extends: ['eslint:recommended', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['import'],
  globals: {
    jQuery: true,
    $: true
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    'no-unused-vars': ['warn'],
    'no-console': [
      'error',
      {
        allow: ['log', 'warn', 'error']
      }
    ],
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ],
    semi: ['error', 'never'],
    'eol-last': ['warn'],
    'comma-dangle': ['error', 'always-multiline']
  }
}
