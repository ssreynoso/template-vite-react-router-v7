import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useDeleteModal } from '@/hooks/modals/use-delete-modal'

export const DeleteModal = () => {
    const isOpen = useDeleteModal(state => state.isOpen)
    const onClose = useDeleteModal(state => state.onClose)
    const callback = useDeleteModal(state => state.callback)

    const handleDelete = () => {
        if (callback) callback()
        onClose()
    }

    return (
        <Modal
            title='¿Está seguro que desea eliminar?'
            description='Esta acción no se puede deshacer.'
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='flex h-[50px] w-[500px] items-end justify-end gap-2'>
                <Button variant='outline' onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant='destructive' onClick={handleDelete}>
                    Eliminar
                </Button>
            </div>
        </Modal>
    )
}
