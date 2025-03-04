import { create } from 'zustand'

type Callback = () => void

type OnOpenProps = {
    title: string
    onConfirm: Callback | null
    onDecline?: Callback | null
    description?: string
    onExit?: Callback | null
    variant?: 'destructive' | 'default'
}

type useConfirmModal = {
    title: string
    description: string
    variant: 'destructive' | 'default'
    onConfirm: Callback | null
    onDecline: Callback | null
    isOpen: boolean
    onOpen: (params: OnOpenProps) => void
    onClose: Callback
    onExit: Callback | null
    setDefaultData: () => void
}

export const useConfirmModal = create<useConfirmModal>(set => ({
    title: '',
    description: '',
    variant: 'default',
    onConfirm: null,
    onDecline: null,
    isOpen: false,
    onOpen: (params: OnOpenProps) =>
        set({
            isOpen: true,
            ...params
        }),
    onClose: () => set({ isOpen: false }),
    setDefaultData: () =>
        set({
            title: '',
            description: '',
            variant: 'default',
            onConfirm: null,
            onDecline: null,
            onExit: null
        }),
    onExit: null
}))
