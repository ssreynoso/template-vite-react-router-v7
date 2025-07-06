import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Button } from '@/components/ui/button'

describe('Button', () => {
    it('renders button with text', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('calls onClick handler when clicked', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<Button onClick={handleClick}>Click me</Button>)

        await user.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies variant classes correctly', () => {
        const { rerender } = render(<Button variant='secondary'>Secondary</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-secondary')

        rerender(<Button variant='destructive'>Destructive</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-destructive')
    })

    it('can be disabled', () => {
        render(<Button disabled>Disabled</Button>)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('renders as child component when asChild is true', () => {
        render(
            <Button asChild>
                <a href='#test'>Link Button</a>
            </Button>
        )
        expect(screen.getByRole('link')).toBeInTheDocument()
        expect(screen.getByRole('link')).toHaveAttribute('href', '#test')
    })
})
