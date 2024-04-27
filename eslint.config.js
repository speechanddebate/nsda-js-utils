/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import eslint from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import tseslint from 'typescript-eslint';
import vitest from 'eslint-plugin-vitest';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import nsda from '@speechanddebate/eslint-config-nsda';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
});

export default tseslint.config(
    // Top level exclusions
    {
        ignores: ['**/dist/**', '**/coverage/**', '**/node_modules/**'],
    },

    // Airbnb config doesn't support flat config yet, use legacy configs
    // Includes react, jsx-a11y, and import plugins
    ...compat.config({
        extends: ['airbnb', 'airbnb/hooks'],
        overrides: [
            {
                files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
            },
        ],
    }),

    // Default configs for eslint and typescript-eslint
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json', './tsconfig.node.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },

    // Skip type checking for JS files
    {
        files: ['**/*.js', '**/*.jsx'],
        ...tseslint.configs.disableTypeChecked,
    },

    // Test files config
    {
        files: ['**/*.test.js', '**/*.test.ts'],
        plugins: { vitest },
        rules: {
            ...vitest.configs.recommended.rules,
        },
        languageOptions: {
            globals: {
                ...vitest.environments.env.globals,
            },
        },
    },

    // Import plugin for JS files
    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: { import: importPlugin },
        settings: {
            'import/parsers': {
                espree: ['.js', '.cjs', '.mjs', '.jsx'],
            },
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },
        rules: {
            ...importPlugin.configs.recommended.rules,
        },
    },

    // Import plugin for TypeScript
    ...compat.config({
        overrides: [
            {
                files: ['**/*.ts', '**/*.tsx'],
                plugins: ['import'],
                extends: ['plugin:import/typescript'],
                settings: {
                    'import/parsers': {
                        '@typescript-eslint/parser': ['.ts', '.tsx'],
                    },
                    'import/resolver': {
                        typescript: {},
                    },
                },
            },
        ],
    }),

    ...nsda,

    // Custom rules that override everything else
    {
        rules: {},
    },

    // Disable eslint stylistic rules that conflict with Prettier
    eslintConfigPrettier,
);
