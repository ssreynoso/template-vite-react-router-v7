import { PropsWithChildren, Suspense } from 'react'
import { Await } from 'react-router'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useInfoModal } from '@/hooks/modals/use-info-modal'

interface Props {
    message: Promise<string>
}

export const App = ({ message }: Props) => {
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
        <div className='flex h-screen w-full flex-col items-center justify-center gap-10 bg-gray-700'>
            <Suspense fallback={<Title>Loading...</Title>}>
                <Await resolve={message}>{m => <Title>{m}</Title>}</Await>
            </Suspense>
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

const Title = ({ children }: PropsWithChildren) => {
    return <h1 className='text-xl font-bold text-white'>{children}</h1>
}
