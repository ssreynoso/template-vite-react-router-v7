import { LucideIcon } from 'lucide-react'
import { create } from 'zustand'

interface OnOpenProps {
    title: string
    description?: string
    icon?: LucideIcon
    iconClassName?: string
}

type InfoModalProps = {
    title: string
    description: string
    icon: LucideIcon | null
    iconClassName: string
    isOpen: boolean
    onOpen: (props: OnOpenProps) => void
    onClose: () => void
}

export const useInfoModal = create<InfoModalProps>(set => ({
    title: '',
    description: '',
    icon: null,
    iconClassName: '',
    isOpen: false,
    onOpen: (props: OnOpenProps) => set({ isOpen: true, ...props }),
    onClose: () => set({ isOpen: false })
}))
