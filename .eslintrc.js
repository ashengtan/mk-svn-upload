module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    amd: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['eslint:recommended'],
  overrides: [
    // disable ESLint check this directory
    {
      files: [
        'test/unit/**.spec.{j,t}s'
      ],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    'for-direction': ['off'],
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none' }],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', { 'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always' }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error'],
    'spaced-comment': ['error', 'always'],
    'no-trailing-spaces': ['error'],
    'no-whitespace-before-property': ['error'],
    'array-bracket-spacing': ['error', 'never'],
    'computed-property-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always']
  }
}
