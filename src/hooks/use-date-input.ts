import { useEffect, useState } from 'react'

import { useDelayedFilter } from './use-delayed-filter'

import { formatDate, isValidStringDate } from '@/lib/date'

export const useDateInput = (date: Date | undefined, setDate: (date: Date | undefined) => void) => {
    const [isValid, setIsValid] = useState<boolean>(true)
    const [dateString, setDateString] = useState<string>(formatDate(date || new Date(), 'dd/MM/yyyy', false))

    const { value, handleChange, loading } = useDelayedFilter({
        filter: dateString,
        setFilter: setDateString,
        delay: 1000
    })

    useEffect(() => {
        const { parsedDate, isValidDate } = isValidStringDate(dateString)
        if (isValidDate) {
            setIsValid(true)
            setDate(parsedDate)
        } else {
            setIsValid(false)
            // toast({ title: 'Fecha inválida', variant: 'destructive' })
        }
    }, [dateString])

    return { value, isValid, handleChange, loading }
}
