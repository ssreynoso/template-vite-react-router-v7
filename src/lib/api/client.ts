import { parseApiError } from './error'

import { tokenStorage } from '@/lib/auth/token-storage'
import { publicEnv } from '@/lib/public-env'

type QueryValue = string | number | boolean | null | undefined

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
    body?: unknown
    query?: Record<string, QueryValue>
    // Por defecto manda el header Authorization si hay token guardado.
    auth?: boolean
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
    const url = new URL(path, publicEnv.VITE_API_URL)
    if (query) {
        for (const [key, value] of Object.entries(query)) {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value))
            }
        }
    }
    return url.toString()
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, query, auth = true } = options

    const headers: Record<string, string> = {}
    if (body !== undefined) {
        headers['Content-Type'] = 'application/json'
    }
    if (auth) {
        const token = tokenStorage.get()
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }
    }

    const response = await fetch(buildUrl(path, query), {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined
    })

    if (!response.ok) {
        // Token expirado/revocado: limpiamos para que el guard mande al login.
        if (response.status === 401) {
            tokenStorage.clear()
        }
        const errorBody = await response.json().catch(() => null)
        throw parseApiError(response.status, errorBody)
    }

    // 204 No Content (delete, etc.).
    if (response.status === 204) {
        return undefined as T
    }

    return (await response.json()) as T
}
