import { useEffect } from 'react'
import { create } from 'zustand'

import { applyTheme, getStoredTheme, resolveTheme, THEME_KEY, type Theme } from '@/lib/theme'

interface ThemeStore {
    theme: Theme
    setTheme: (theme: Theme) => void
}

// El tema arranca desde localStorage (en SSR cae a 'system'); el flash inicial lo
// previene themeInitScript en <head>. Ver @/lib/theme.
const useThemeStore = create<ThemeStore>(set => ({
    theme: getStoredTheme(),
    setTheme: (theme: Theme) => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(THEME_KEY, theme)
        }
        applyTheme(theme)
        set({ theme })
    }
}))

export const useTheme = () => {
    const theme = useThemeStore(state => state.theme)
    const setTheme = useThemeStore(state => state.setTheme)

    // Si el usuario está en 'system', reaccionamos a cambios del SO.
    useEffect(() => {
        if (theme !== 'system') return
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        const onChange = () => applyTheme('system')
        media.addEventListener('change', onChange)
        return () => media.removeEventListener('change', onChange)
    }, [theme])

    return { theme, setTheme, resolvedTheme: resolveTheme(theme) }
}
