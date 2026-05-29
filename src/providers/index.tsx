import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import { ModalProvider } from './modal-provider'

import { Toaster } from '@/components/ui/sonner'
import { createQueryClient } from '@/lib/query-client'

export const Providers = ({ children }: React.PropsWithChildren) => {
    // Un QueryClient por instancia de app (evita compartir cache entre requests en SSR).
    const [queryClient] = useState(createQueryClient)

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ModalProvider />
            <Toaster />
        </QueryClientProvider>
    )
}
