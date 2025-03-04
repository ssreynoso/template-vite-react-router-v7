import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

import { cn } from '@/lib/utils'

type Props = React.PropsWithChildren<{
    text: string
    side?: 'top' | 'right' | 'bottom' | 'left'
    delay?: number
    className?: string
    asChild?: boolean
}>

export const SimpleTooltip = (props: Props) => {
    const { text, side = 'top', children, delay = 500, className, asChild = false } = props

    return (
        <TooltipProvider>
            <Tooltip delayDuration={delay}>
                <div className={cn(className)}>
                    <TooltipTrigger asChild={asChild} className={cn(!asChild && 'cursor-default truncate')}>
                        {children}
                    </TooltipTrigger>
                </div>
                <TooltipContent side={side} align='start'>
                    <p className='break-keep'>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
