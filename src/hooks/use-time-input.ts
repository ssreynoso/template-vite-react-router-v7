import { useEffect, useState } from 'react'

import { useDelayedFilter } from '@/hooks/use-delayed-filter'
import { isValidTime } from '@/lib/time'

interface Props {
    horario: string
    setHorario: (value: string) => void
}

export const useTimeInput = (props: Props) => {
    const { horario, setHorario } = props

    const [isValid, setIsValid] = useState<boolean>(true)
    const [internalValue, setInternalValue] = useState<string>(horario)

    const { value, handleChange, loading } = useDelayedFilter({
        filter: internalValue,
        setFilter: setInternalValue,
        delay: 1000
    })

    useEffect(() => {
        const valid = isValidTime(internalValue)
        if (valid) {
            setIsValid(true)
            setHorario(internalValue)
        } else {
            setIsValid(false)
        }
    }, [internalValue])

    return { value, isValid, handleChange, loading }
}
