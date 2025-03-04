import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
    {
        ignores: [
            'dist/',
            'node_modules/',
            '.next/',
            'build',
            '.react-router/',
            'src/entry.client.tsx',
            'src/entry.server.tsx',
            'vite.config.ts',
            'jest.config.js',
            'postcss.config.js',
            'tailwind.config.ts'
        ]
    },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            eslintConfigPrettier,
            eslintPluginPrettierRecommended
        ],
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx']
                }
            }
        },
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            import: importPlugin
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'prettier/prettier': 'error', // Agregamos la regla de Prettier,
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true }
                }
            ],
            'import/no-duplicates': 'error',
            'import/newline-after-import': ['error', { count: 1 }],
            'react-hooks/exhaustive-deps': 'off',
            'react-refresh/only-export-components': 'off',
            'no-empty-pattern': 'warn'
        }
    }
)
