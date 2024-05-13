module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:styled-components-a11y/recommended',
  ],
  ignorePatterns: ['dist'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ['import', 'jsx-a11y', 'react', 'react-hooks', 'sort-destructure-keys', 'styled-components-a11y'],
  root: true,
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    'import/extensions': [
      'warn',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    indent: 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'no-nested-ternary': 'error',
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-sort-props': [
      'warn',
      {
        ignoreCase: true,
        shorthandFirst: true,
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/sort-default-props': ['warn', { ignoreCase: true }],
    semi: [1, 'always'],
    'sort-destructure-keys/sort-destructure-keys': ['warn', { caseSensitive: false }],
    'sort-imports': [
      'warn',
      {
        allowSeparatedGroups: true,
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    'sort-keys': ['warn', 'asc', { caseSensitive: false }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
