module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
    es6: true
  },
  extends: 'eslint:recommended',
  rules: {
    camelcase: [2, { properties: 'never' }],
    curly: [2, 'multi-line'],
    eqeqeq: 2,
    indent: [2, 2],
    quotes: [2, 'single'],
    semi: [2, 'always'],
    'array-bracket-spacing': [2, 'never'],
    'arrow-spacing': 2,
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'comma-spacing': 2,
    'dot-location': [2, 'property'],
    'dot-notation': 2,
    'generator-star-spacing': [2, 'after'],
    'keyword-spacing': [2, {
      overrides: {
        if: { after: false },
        for: { after: false },
        while: { after: false },
        catch: { after: false }
      }
    }],
    'no-multiple-empty-lines': [2, { max: 2, 'maxEOF': 1 }],
    'no-unused-vars': [2, { args: 'none' }],
    'object-curly-spacing': [2, 'always'],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-infix-ops': 2,
    'space-in-parens': [2, 'never']
  }
};
