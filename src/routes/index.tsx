import type { Route } from './+types/index'

import { App } from '@/app'
import { env } from '@/lib/env'
import { Providers } from '@/providers'

export function meta({}: Route.MetaArgs) {
    return [{ title: env.VITE_APP_NAME }, { name: 'description', content: 'Welcome to React Router!' }]
}

export function loader() {
    return {
        message: new Promise<string>(resolve => {
            setTimeout(() => {
                resolve('Hello, world!')
            }, 3000)
        })
    }
}

export default function Index({ loaderData }: Route.ComponentProps) {
    return (
        <Providers>
            <App message={loaderData.message} />
        </Providers>
    )
}
