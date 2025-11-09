import type { Route } from './+types/index'

import { publicEnv } from '@/lib/public-env'
import { MainPage } from '@/modules/main/components/main-page'

export function meta({}: Route.MetaArgs) {
    return [{ title: publicEnv.VITE_APP_NAME }, { name: 'description', content: 'Welcome to React Router!' }]
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
    return <MainPage message={loaderData.message} />
}
