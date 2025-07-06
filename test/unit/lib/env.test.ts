import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Environment Variables', () => {
    beforeEach(() => {
        vi.resetModules()
    })

    it('should parse valid environment variables', async () => {
        vi.stubEnv('NODE_ENV', 'development')
        vi.stubEnv('VITE_APP_NAME', 'Test App')
        vi.stubEnv('VITE_APP_URL', 'http://localhost:3000')
        vi.stubEnv('VITE_APP_DEBUG', 'true')

        const { env } = await import('@/lib/env')

        expect(env.NODE_ENV).toBe('development')
        expect(env.VITE_APP_NAME).toBe('Test App')
        expect(env.VITE_APP_URL).toBe('http://localhost:3000')
        expect(env.VITE_APP_DEBUG).toBe(true)
    })

    it('should use default values when env vars are not set', async () => {
        vi.stubEnv('NODE_ENV', undefined)
        vi.stubEnv('VITE_APP_NAME', undefined)
        vi.stubEnv('VITE_APP_URL', undefined)
        vi.stubEnv('VITE_APP_DEBUG', undefined)

        const { env } = await import('@/lib/env')

        expect(env.NODE_ENV).toBe('development')
        expect(env.VITE_APP_NAME).toBe('My React Router App')
        expect(env.VITE_APP_URL).toBe('http://localhost:3000')
        expect(env.VITE_APP_DEBUG).toBe(false)
    })

    it('should throw error for invalid URL', async () => {
        vi.stubEnv('VITE_APP_URL', 'not-a-url')

        await expect(async () => {
            await import('@/lib/env')
        }).rejects.toThrow('Invalid environment variables')
    })
})
