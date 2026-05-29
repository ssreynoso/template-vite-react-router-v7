type ZodIssue = { path: (string | number)[]; message: string; code: string }

// El backend responde { error: string } o { error: ZodIssue[] } en los 400.
export class ApiError extends Error {
    readonly status: number
    readonly issues?: ZodIssue[]

    constructor(status: number, message: string, issues?: ZodIssue[]) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.issues = issues
    }
}

export function parseApiError(status: number, body: unknown): ApiError {
    const error = (body as { error?: unknown } | null)?.error

    if (Array.isArray(error)) {
        const issues = error as ZodIssue[]
        const message = issues.map(i => i.message).join(' · ') || 'Datos inválidos'
        return new ApiError(status, message, issues)
    }

    if (typeof error === 'string') {
        return new ApiError(status, error)
    }

    return new ApiError(status, 'Ocurrió un error inesperado')
}
