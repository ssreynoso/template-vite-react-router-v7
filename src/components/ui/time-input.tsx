import { useEffect } from 'react'

import { Spinner } from '../spinner'

import { Input } from './input'

import { useTimeInput } from '@/hooks/use-time-input'
import { formatTimeInput } from '@/lib/time-input'
import { cn } from '@/lib/utils'

type Props = {
    horario: string
    setHorario: (value: string) => void
    modificador?: string
    className?: string
    inputClassName?: string
}

export function TimeInput(props: Props) {
    const { horario, setHorario, modificador, className, inputClassName } = props

    const { value, handleChange, loading, isValid } = useTimeInput({ horario, setHorario })

    const handleChangeWithFormat = (value: string) => {
        const formattedInput = formatTimeInput(value)

        handleChange(formattedInput)
    }

    useEffect(() => {
        if (modificador) {
            handleChangeWithFormat(modificador)
        }
    }, [modificador])

    return (
        <div className={cn('relative flex items-center gap-4 rounded-md', className)}>
            <Input
                className={cn('w-20', !loading && !isValid && 'border-destructive-form border-2', inputClassName)}
                value={value}
                onChange={e => handleChangeWithFormat(e.target.value)}
                maxLength={5}
            />
            {/* {loading && <Spinner />} */}
            {loading && <Spinner className='absolute right-2 h-4 w-4' />}
        </div>
    )
}
