import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
    ignores: [
      '*.js',
      'node_modules/',
      'dist/',
      '.devcontainer/',
      '.git/',
      '.github/',
      '.docker/dbdata/',
      '.docker/filebeatdata/',
      '.docker/elk/',
      '.docker/rabbitmq/',
      '.docker/.gitignore',
      '.history/',
      'coverage/',
      'envs/',
      '*.sqlite',
      'docker-compose*.yaml',
      'docker-compose*.yml',
      '*.md',
      'api.http',
      'create-rsa.js',
      'generate-token.js',
      'Dockerfile',
      'Dockerfile.prod',
    ],
  },
  tseslint.configs.recommended,
]);
