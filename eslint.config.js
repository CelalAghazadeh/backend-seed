import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**'] }, // ignore build output
  eslint.configs.recommended, // base JS rules
  ...tseslint.configs.recommended, // TS rules (no type-checking)
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
);
