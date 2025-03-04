import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { forwardRef, useId } from 'react'

import { Button } from '@/components/ui/button'
import { Input, InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDelayedFilter } from '@/hooks/use-delayed-filter'
import { cn } from '@/lib/utils'

type Props = {
    value: string
    setValue: (value: string) => void
    label?: string
    placeholder?: string
    delay?: number
    className?: string
    vertical?: boolean
} & InputProps

export const DelayedInput = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    const { value, setValue, delay, className, label, vertical = false, ...otherProps } = props

    const { value: delayedValue, handleChange, clear } = useDelayedFilter({ filter: value, setFilter: setValue, delay })
    const randomId = useId()

    return (
        <div className={cn('flex items-center gap-4', vertical && 'flex-col items-start gap-2')}>
            <Label htmlFor={randomId}>{label}</Label>
            <div className={cn('relative flex w-full items-center', className)}>
                <Input
                    id={randomId}
                    ref={ref}
                    className='w-full'
                    onChange={e => handleChange(e.target.value)}
                    value={delayedValue}
                    {...otherProps}
                />
                <div className={cn('absolute right-3 flex items-center bg-background', delayedValue && 'hidden')}>
                    <MagnifyingGlassIcon />
                </div>
                <Button
                    variant='secondary'
                    size='icon'
                    className={cn('hidden', delayedValue && 'absolute right-[1px] flex h-[90%] bg-background')}
                    onClick={clear}
                >
                    <Cross2Icon />
                </Button>
            </div>
        </div>
    )
})

DelayedInput.displayName = 'DelayedInput'
