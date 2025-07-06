import { describe, it, expect } from 'vitest'

import { cn } from '@/lib/utils'

describe('cn utility', () => {
    it('merges class names correctly', () => {
        expect(cn('px-2 py-1', 'px-3')).toBe('py-1 px-3')
    })

    it('handles conditional classes', () => {
        // eslint-disable-next-line no-constant-binary-expression
        expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional')
    })

    it('handles undefined and null values', () => {
        expect(cn('base', undefined, null, 'valid')).toBe('base valid')
    })

    it('handles empty input', () => {
        expect(cn()).toBe('')
    })

    it('handles array inputs', () => {
        expect(cn(['base', 'extra'], 'additional')).toBe('base extra additional')
    })
})
