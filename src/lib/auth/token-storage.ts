// Renombrá esta key por proyecto (ej: 'miapp.token').
const TOKEN_KEY = 'app.token'

// El token solo vive en el cliente (localStorage). En SSR no hay window,
// así que devolvemos null y dejamos que el guard espere a la hidratación.
export const tokenStorage = {
    get(): string | null {
        if (typeof window === 'undefined') return null
        return window.localStorage.getItem(TOKEN_KEY)
    },
    set(token: string): void {
        if (typeof window === 'undefined') return
        window.localStorage.setItem(TOKEN_KEY, token)
    },
    clear(): void {
        if (typeof window === 'undefined') return
        window.localStorage.removeItem(TOKEN_KEY)
    }
}
