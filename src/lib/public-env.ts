import { z } from 'zod'

export const publicEnvSchema = z.object({
    VITE_APP_NAME: z.string().default('My React Router App'),
    VITE_APP_URL: z.string().url().default('http://localhost:3000'),
    VITE_API_URL: z.string().url().default('http://localhost:4000'),
    VITE_APP_DEBUG: z
        .string()
        .transform(val => val === 'true')
        .default('false')
})

function parsePublicEnv() {
    try {
        const publicEnv = publicEnvSchema.parse({
            VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
            VITE_APP_URL: import.meta.env.VITE_APP_URL,
            VITE_API_URL: import.meta.env.VITE_API_URL,
            VITE_APP_DEBUG: import.meta.env.VITE_APP_DEBUG
        })
        return publicEnv
    } catch (error) {
        console.error('❌ Invalid public environment variables:', error)
        throw new Error('Invalid public environment variables')
    }
}

export const publicEnv = parsePublicEnv()

export type PublicEnv = z.infer<typeof publicEnvSchema>
