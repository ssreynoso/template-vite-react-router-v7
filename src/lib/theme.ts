export type Theme = 'light' | 'dark' | 'system'

export const THEME_KEY = 'theme'

// Script que corre en <head> antes del paint para evitar el flash de tema (FOUC).
// Debe quedar sincronizado con THEME_KEY y resolveTheme.
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`

export function getStoredTheme(): Theme {
    if (typeof window === 'undefined') return 'system'
    return (window.localStorage.getItem(THEME_KEY) as Theme | null) ?? 'system'
}

export function resolveTheme(theme: Theme): 'light' | 'dark' {
    if (theme === 'system') {
        if (typeof window === 'undefined') return 'light'
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
}

export function applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', resolveTheme(theme) === 'dark')
}
