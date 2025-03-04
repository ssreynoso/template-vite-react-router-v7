import { ModalProvider } from './modal-provider'

import { Toaster } from '@/components/ui/sonner'

export const Providers = ({ children }: React.PropsWithChildren) => {
    return (
        // <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <>
            {children}
            <ModalProvider />
            <Toaster />
        </>
        // </ThemeProvider>
    )
}
