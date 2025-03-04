import { cn } from '@/lib/utils'

type Props = React.PropsWithChildren<{
    className?: string
    label: string
    isError?: boolean
    errorMessage?: string
    textSize?: 'sm' | 'md' | 'lg'
}>

const CardText = ({ children, className, isError }: Pick<Props, 'children' | 'className' | 'isError'>) => (
    <p
        className={cn(
            'bg-background px-2 text-[13px] font-bold transition-colors',
            isError ? 'text-destructive-form' : 'text-primary',
            className
        )}
    >
        {children}
    </p>
)

export const CardWithLabel = (props: Props) => {
    const { children, className, label, isError = false, errorMessage = '', textSize = 'md' } = props
    return (
        <div
            className={cn(
                'relative mt-4 rounded-sm border p-4 transition-colors',
                isError && 'border-destructive-form border-2',
                className
            )}
        >
            <CardText
                isError={isError}
                className={cn(
                    'absolute left-2 flex items-center gap-2 rounded',
                    textSize === 'sm' && 'top-[-10px] text-[11px]',
                    textSize === 'md' && 'top-[-12px]',
                    textSize === 'lg' && 'top-[-14px] text-[15px]'
                )}
            >
                <span>
                    {label}
                    {isError && ':'}
                </span>
                {isError && <span>{errorMessage}</span>}
            </CardText>
            {children}
        </div>
    )
}
