import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'plugin:@typescript-eslint/recommended'],
    rules: {
      // Desactivar todas las reglas de TypeScript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/prefer-as-const': 'off',

      // Desactivar reglas de React y Next.js
      'react-hooks/exhaustive-deps': 'off',
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',

      // Desactivar reglas generales
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-undef': 'off',
    },
  }),
];

export default eslintConfig;
