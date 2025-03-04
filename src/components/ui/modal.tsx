import { CircleAlert } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'

import { cn } from '@/lib/utils'
import { CommonSizes } from '@/types/sizes'

type ModalProps = React.PropsWithChildren<{
    size?: CommonSizes
    className?: string
    title?: string | React.ReactNode
    description?: string
    isOpen: boolean
    onClose: () => void
    resetStyles?: boolean
    headerContent?: React.ReactNode
    variant?: 'destructive' | 'default'
    withoutHeader?: boolean
}>

export const Modal = (props: ModalProps) => {
    const {
        size,
        className,
        title,
        description,
        isOpen,
        onClose,
        children,
        resetStyles,
        headerContent,
        variant = 'default',
        withoutHeader = false
    } = props

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent
                className={cn(
                    'pretty-scrollbar-y flex max-h-[90vh] max-w-max flex-col',
                    size === 'full' && 'h-full w-full max-w-[95vw]',
                    size === '2xl' && 'h-[900px] w-[1300px] max-w-full',
                    size === 'xl' && 'h-[700px] w-[1100px] max-w-full',
                    size === 'lg' && 'h-[500px] w-[800px] max-w-full',
                    size === 'md' && 'h-[400px] w-[600px] max-w-full',
                    size === 'sm' && 'h-[300px] w-[400px] max-w-full',
                    resetStyles && 'top-0 left-0 max-h-max translate-x-0 translate-y-0',
                    className
                )}
            >
                {!withoutHeader && (
                    <DialogHeader className='flex w-full flex-row justify-between'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex items-center gap-2'>
                                {variant === 'destructive' && (
                                    <CircleAlert className='text-destructive-form' size={32} />
                                )}
                                <DialogTitle>{title}</DialogTitle>
                            </div>
                            <DialogDescription className='break-all'>{description}</DialogDescription>
                        </div>
                        {headerContent}
                    </DialogHeader>
                )}
                <div className='flex-1 overflow-y-auto'>{children}</div>
            </DialogContent>
        </Dialog>
    )
}
