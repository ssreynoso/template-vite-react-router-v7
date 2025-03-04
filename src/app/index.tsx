import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useInfoModal } from '@/hooks/modals/use-info-modal'

export const App = () => {
    const openInfoModal = useInfoModal(state => state.onOpen)

    const handleModal = () => {
        openInfoModal({
            title: 'Info Modal'
        })
    }

    const handleToast = () => {
        toast('Toast')
    }

    return (
        <div className='flex h-screen w-full items-center justify-center bg-gray-700'>
            <div className='flex gap-4'>
                <Button onClick={handleToast} className='cursor-pointer'>
                    Toast
                </Button>
                <Button variant='secondary' onClick={handleModal} className='cursor-pointer'>
                    Modal
                </Button>
            </div>
        </div>
    )
}
