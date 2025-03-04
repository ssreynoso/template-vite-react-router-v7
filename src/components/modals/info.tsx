import { DialogTitle } from '../ui/dialog'

import { Modal } from '@/components/ui/modal'
import { useInfoModal } from '@/hooks/modals/use-info-modal'
import { cn } from '@/lib/utils'

export const InfoModal = () => {
    const isOpen = useInfoModal(state => state.isOpen)
    const onClose = useInfoModal(state => state.onClose)
    const title = useInfoModal(state => state.title)
    const description = useInfoModal(state => state.description)
    const Icon = useInfoModal(state => state.icon)
    const iconClassName = useInfoModal(state => state.iconClassName)

    return (
        <Modal withoutHeader isOpen={isOpen} onClose={onClose}>
            <div className='flex h-[300px] w-[400px] flex-col items-center justify-center'>
                {Icon && <Icon className={cn('h-20 w-20', iconClassName)} />}
                <div className='flex flex-col gap-2'>
                    <DialogTitle className='mt-[30px] text-center text-lg'>{title}</DialogTitle>
                    <p className='text-center font-semibold'>{description}</p>
                </div>
            </div>
        </Modal>
    )
}
