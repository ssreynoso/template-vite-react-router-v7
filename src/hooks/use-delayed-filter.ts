import { useEffect, useState } from 'react'

type Params = {
    filter: string
    setFilter: (value: string) => void
    delay?: number
}

export const useDelayedFilter = (params: Params) => {
    const { filter, setFilter, delay = 1000 } = params

    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState(filter)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (!filter) {
            setValue('')
        }
    }, [filter])

    const clear = function () {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        setFilter('')
        setValue('')
    }

    const handleChange = function (newValue: string, options: { force?: boolean } = {}) {
        if (options.force) {
            setValue(newValue)
            setFilter(newValue)
            return
        }

        if (newValue === value) return
        if (newValue === '') return clear()

        setLoading(true)

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        const nuevoTimeoutId = setTimeout(() => {
            setLoading(false)
            setFilter(newValue)
        }, delay)

        setValue(newValue)
        setTimeoutId(nuevoTimeoutId)
    }

    return {
        value,
        handleChange,
        clear,
        loading
    }
}
