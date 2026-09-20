import js from '@eslint/js'
import globals from 'globals'
import json from '@eslint/json'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: {
                ...globals.browser,
                game: 'readonly',
                foundry: 'readonly',
                Hooks: 'readonly',
                fromUuidSync: 'readonly',
                fromUuid: 'readonly',
                ui: 'readonly',
                canvas: 'readonly',
                CONST: 'readonly',
                PIXI: 'readonly',
            },
        },
    },
    { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
    { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
    {
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
            'no-console': 'error',
            curly: ['warn', 'multi-line'],
        },
    },
])
