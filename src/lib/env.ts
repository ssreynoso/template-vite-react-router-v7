import { z } from 'zod'

// Define environment schema
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    VITE_APP_NAME: z.string().default('My React Router App'),
    VITE_APP_URL: z.string().url().default('http://localhost:3000'),
    VITE_APP_DEBUG: z
        .string()
        .transform(val => val === 'true')
        .default('false')

    // Add your environment variables here
    // VITE_API_BASE_URL: z.string().url().optional(),
    // VITE_API_KEY: z.string().optional(),
})

// Parse and validate environment variables
function parseEnv() {
    try {
        return envSchema.parse({
            NODE_ENV: process.env.NODE_ENV,
            VITE_APP_NAME: process.env.VITE_APP_NAME,
            VITE_APP_URL: process.env.VITE_APP_URL,
            VITE_APP_DEBUG: process.env.VITE_APP_DEBUG

            // Add your environment variables here
            // VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
            // VITE_API_KEY: process.env.VITE_API_KEY,
        })
    } catch (error) {
        console.error('❌ Invalid environment variables:', error)
        throw new Error('Invalid environment variables')
    }
}

export const env = parseEnv()

// Type for environment variables
export type Env = z.infer<typeof envSchema>
