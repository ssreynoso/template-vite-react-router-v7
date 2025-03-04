import { ConfirmModal } from '@/components/modals/confirm'
import { DeleteModal } from '@/components/modals/delete'
import { InfoModal } from '@/components/modals/info'
import { useIsMounted } from '@/hooks/use-is-mounted'

export const ModalProvider = () => {
    const isMounted = useIsMounted()

    if (!isMounted) {
        return null
    }

    return (
        <>
            <DeleteModal />
            <ConfirmModal />
            <InfoModal />
        </>
    )
}
