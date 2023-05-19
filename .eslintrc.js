'use strict'
// @ts-check

/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  ignorePatterns: [
    '**/node_modules/',
    '/dist/',
    '/lib/',
  ],
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
  ],
  // Common rules for all files.
  rules: {
  },
  overrides: [
    {
      files: '*.ts',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [
          './tsconfig.json',
          './src/tsconfig.json',
        ],
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      // Rules for TypeScript files.
      rules: {
        // Changed options
        '@typescript-eslint/ban-types': ['error', {
          // Allow to use {} and object - they are actually useful.
          types: {
            '{}': false,
            'object': false,
          },
          extendDefaults: true,
        }],

        // Changed from error to warn
        '@typescript-eslint/no-namespace': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',

        // Disabled
        '@typescript-eslint/no-explicit-any': 'off',  // `any` is sometimes needed
        '@typescript-eslint/restrict-template-expressions': 'off',  // has false positives
        '@typescript-eslint/triple-slash-reference': 'off',  // used for njs
        '@typescript-eslint/unbound-method': 'off',  // has false positives

        // Added
        '@typescript-eslint/no-require-imports': 'error',
      },
    },
  ],
}
