import { QueryClient } from '@tanstack/react-query'

import { ApiError } from '@/lib/api/error'

export function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30_000,
                retry: (failureCount, error) => {
                    // No reintentamos errores de auth/permiso/not-found: no van a mejorar.
                    if (error instanceof ApiError && [400, 401, 403, 404, 409].includes(error.status)) {
                        return false
                    }
                    return failureCount < 2
                }
            }
        }
    })
}
