module.exports = {
  // So parent files don't get applied
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: [
    'babel',
    'mocha',
  ],
  rules: {
    'array-bracket-spacing': 'off', // use babel plugin rule
    'arrow-body-style': 'off',
    'arrow-parens': 'error',
    'consistent-this': ['error', 'self'],
    'func-names': 'off',
    'newline-per-chained-call': 'off',
    'no-console': 'error', // airbnb have on warning
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off', // wishlist, one day
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'object-curly-spacing': 'off', // use babel plugin rule
    'operator-linebreak': ['error', 'after'],
    'quotes': ['error', 'single', 'avoid-escape'],
    'babel/object-curly-spacing': ['error', 'always'],
    'babel/array-bracket-spacing': ['error', 'never'],
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'mocha/handle-done-callback': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-global-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-skipped-tests': 'error',
  },
};