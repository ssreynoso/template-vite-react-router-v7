import type { Route } from './+types/index'

import { App } from '@/app'
import { Providers } from '@/providers'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
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
