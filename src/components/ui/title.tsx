import { cn } from '@/lib/utils'

type Props = React.PropsWithChildren<{
    className?: string
}>

export const Title = ({ children, className }: Props) => {
    return <h1 className={cn('text-xl font-bold', className)}>{children}</h1>
}
