'use client'
import debounce from 'just-debounce-it'
import { useCallback, useEffect, useRef } from 'react'

import { useNearScreen } from '@/hooks/use-near-screen'

type ViewerProps = {
    distance: number
    once?: boolean
    callback: () => void
}

export const Viewer = ({ distance, once = false, callback }: ViewerProps) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const { isNearScreen } = useNearScreen({
        distance: `${distance}px`,
        externalRef: ref,
        once
    })

    const debounceHandleNextPage = useCallback(debounce(callback), [])

    useEffect(() => {
        if (isNearScreen) {
            debounceHandleNextPage()
        }
    }, [debounceHandleNextPage, isNearScreen])

    return <div ref={ref} className='h-3 w-full'></div>
}
