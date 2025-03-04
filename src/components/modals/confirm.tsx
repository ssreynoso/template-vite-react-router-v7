import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useConfirmModal } from '@/hooks/modals/use-confirm-modal'
import { cn } from '@/lib/utils'

export const ConfirmModal = () => {
    const isOpen = useConfirmModal(state => state.isOpen)
    const onClose = useConfirmModal(state => state.onClose)
    const onConfirm = useConfirmModal(state => state.onConfirm)
    const onDecline = useConfirmModal(state => state.onDecline)
    const onExit = useConfirmModal(state => state.onExit)
    const title = useConfirmModal(state => state.title)
    const description = useConfirmModal(state => state.description)
    const variant = useConfirmModal(state => state.variant)
    const setDefaultData = useConfirmModal(state => state.setDefaultData)

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setDefaultData()
            }, 200)
        }
    }, [isOpen])

    const handleConfirm = () => {
        onClose()
        if (onConfirm) onConfirm()
    }

    const handleDecline = () => {
        if (onDecline) onDecline()
        onClose()
    }

    const handleClose = () => {
        if (onExit) onExit()
        onClose()
    }

    return (
        <Modal title={title} description={description} isOpen={isOpen} onClose={handleClose} variant={variant}>
            <div className='flex h-[50px] items-end justify-between gap-2 pb-1 md:min-w-[500px] md:justify-end'>
                <Button
                    className={cn(
                        'w-20',
                        variant === 'destructive' && 'bg-destructive-form hover:bg-destructive-form/80'
                    )}
                    onClick={handleConfirm}
                >
                    Si
                </Button>
                <Button className='w-20' variant='outline' onClick={handleDecline}>
                    No
                </Button>
            </div>
        </Modal>
    )
}
