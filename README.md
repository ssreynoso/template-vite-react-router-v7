# Template · Vite + React Router v7

Template base para apps full-stack con React Router v7 (SSR), TypeScript, TailwindCSS y un stack
de data-fetching ya armado. Pensado para arrancar proyectos rápido con una arquitectura consistente.

## Stack

- **React Router v7** (framework mode, SSR + code-splitting por ruta)
- **Vite** + **TypeScript** (strict)
- **TailwindCSS v4** + componentes UI estilo shadcn sobre **Radix**
- **TanStack Query** para estado de servidor (data-fetching client-side)
- **react-hook-form** + **Zod** para formularios y validación
- **Zustand** para estado global liviano (modales, tema)
- **Vitest** + Testing Library
- **ESLint** + **Prettier**

## Getting Started

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

Copiá `.env.example` a `.env` y ajustá las variables (todas las públicas van con prefijo `VITE_`):

```bash
cp .env.example .env
```

| Variable        | Descripción                                  |
| --------------- | -------------------------------------------- |
| `VITE_APP_NAME` | Nombre de la app                             |
| `VITE_APP_URL`  | URL pública del frontend                     |
| `VITE_API_URL`  | URL base del backend (la usa `lib/api`)      |
| `VITE_APP_DEBUG`| Flag de debug                                |

## Scripts

| Script             | Qué hace                                    |
| ------------------ | ------------------------------------------- |
| `pnpm dev`         | Servidor de desarrollo con HMR              |
| `pnpm build`       | Build de producción (cliente + servidor)    |
| `pnpm start`       | Sirve el build de producción                |
| `pnpm typecheck`   | `react-router typegen && tsc`               |
| `pnpm lint`        | ESLint                                      |
| `pnpm test`        | Tests con Vitest                            |

## Arquitectura

### Estructura

```
src/
  modules/<modulo>/      # módulos autocontenidos por feature/entidad
    components/ hooks/ schemas/ services/
  components/            # UI compartida (ui/, modals/, theme-toggle)
  hooks/                 # hooks genéricos + modals/
  lib/                   # infra compartida
    api/                 # apiFetch, ApiError, getErrorMessage
    auth/token-storage   # JWT en localStorage (SSR-safe)
    query-client.ts query-keys.ts theme.ts
  providers/ routes/ schemas/ styles/ types/
```

### Convención de módulos

Cada módulo bajo `src/modules/<modulo>/` es **autocontenido** (`components/`, `hooks/`, `schemas/`,
`services/`). Bajo `src/` queda solo lo **genérico/compartido** o lo que no pertenece a un módulo;
no hay carpeta `shared`. `src/routes/` es una capa fina del framework (wrappers referenciados por
`routes.ts`). Los tipos de dominio compartidos entre módulos van en `src/schemas/`.

### Data fetching

Las funciones HTTP crudas viven en `services/` y usan `apiFetch` (`@/lib/api/client`). Se envuelven
en custom hooks con TanStack Query:

```ts
export const useThings = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.things,
        queryFn: getThings
    })
    return { things: data ?? [], isLoading, isError }
}
```

Registrá las query keys en `@/lib/query-keys`. Los formularios usan `react-hook-form` + `zod`.

### Tema (dark / light / system)

El tema se aplica vía la clase `dark` en `<html>`. Un script inline en `root.tsx`
(`themeInitScript`) lo setea antes del paint para evitar el flash. Usá el hook `useTheme()` para
leer/cambiar el tema y `<ThemeToggle />` para el selector.

## Deploy

Preconfigurado para **Vercel** (`vercelPreset` en `react-router.config.ts`).
