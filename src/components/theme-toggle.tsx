import { Monitor, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/use-theme'

// El ícono se controla por la clase `dark` en <html> (CSS), no por estado de React,
// así que no hay mismatch de hidratación.
export const ThemeToggle = () => {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='relative'>
                    <Sun className='h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                    <Moon className='absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                    <span className='sr-only'>Cambiar tema</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className='mr-2 h-4 w-4' />
                    Claro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className='mr-2 h-4 w-4' />
                    Oscuro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Monitor className='mr-2 h-4 w-4' />
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
