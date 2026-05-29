import { ApiError } from './error'

// Traduce un error (de fetch/ApiError) a un mensaje mostrable al usuario.
export function getErrorMessage(error: unknown, fallback = 'Ocurrió un error inesperado'): string {
    if (error instanceof ApiError) {
        return error.message
    }
    if (error instanceof Error) {
        return error.message
    }
    return fallback
}
