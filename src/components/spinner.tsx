import { cn } from '@/lib/utils'

type Props = {
    className?: string
    variant?: 'primary' | 'secondary'
}

export const Spinner = ({ className }: Props) => {
    return (
        <div
            className={cn(
                'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-background',
                className
            )}
        ></div>
    )
}
