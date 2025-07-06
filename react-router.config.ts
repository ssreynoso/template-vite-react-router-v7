import type { Config } from '@react-router/dev/config'
import { vercelPreset } from '@vercel/react-router/vite'

export default {
    // Config options...
    // Server-side render by default, to enable SPA mode set this to `false`
    appDirectory: 'src',
    ssr: false,
    presets: [vercelPreset()]
} satisfies Config

// PRESETS:
// Los presets optimizan la aplicación para plataformas específicas de despliegue,
// configurando automáticamente bundling, funciones serverless, routing y caching.
//
// vercelPreset(): Optimiza para Vercel
// - Divide bundles en funciones serverless
// - Configura edge caching y optimización de cold start
// - Maneja rutas y funciones de Vercel automáticamente
//
// cloudflarePreset(): Optimiza para Cloudflare Pages/Workers
// - Configura para Workers y Pages Functions
// - Optimiza para el runtime de Cloudflare
// - Maneja edge computing y distribución global
