import path from 'path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./test/unit/config/setup.ts'],
        css: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
