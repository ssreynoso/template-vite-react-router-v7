import type { Route } from './+types/index'

import { Providers } from '@/providers'
import { App } from '@/app/'
import { Await } from 'react-router'
import { Suspense } from 'react'

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
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={loaderData.message}>{message => <h1>{message}</h1>}</Await>
            </Suspense>
            <App />
        </Providers>
    )
}
