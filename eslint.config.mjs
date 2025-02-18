import eslint from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import typescriptConfig from 'typescript-eslint';

/**
 * @type {import('eslint').Linter.Config[]}
 **/
export default [
  eslint.configs.recommended,
  ...typescriptConfig.configs.recommended,
  prettierConfig,
  // custom config
  {
    files: ['**/*.{cjs,js,mjs,ts}'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
    },
  },
  {
    ignores: ['**/dist/', '**/.docusaurus/', '**/node_modules/'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-expressions': 'warn',
      'prefer-const': 'off',
    },
  },
];
