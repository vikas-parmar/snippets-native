module.exports = {
  env: {
    browser: true, // Enables browser global variables
    node: true, // Enables Node.js global variables
    es6: true, // Enables ES6+ features
  },
  extends: ['expo', 'prettier'],
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    '@typescript-eslint',
    'import',
    'prettier',
    'unused-imports',
  ],
  rules: {
    // TypeScript Rules
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    // JavaScript Rules
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    semi: ['error', 'always'],
    indent: ['error', 2],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'jsx-quotes': ['error', 'prefer-double'],
    'object-curly-spacing': ['error', 'always'],

    // React Rules
    'react/no-unescaped-entities': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    // React Native Specific Rules
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-unused-styles': 'error',
    'react-native/sort-styles': ['error', 'asc'],

    // Import Rules
    'import/first': 'error',
    'import/newline-after-import': ['error', { count: 1 }], // Reduced extra blank lines
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    'import/no-duplicates': 'error',

    // Unused Imports
    'unused-imports/no-unused-imports': 'warn',

    // Prettier
    'prettier/prettier': 'error',
  },
};
