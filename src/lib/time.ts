import { isValid, parse } from 'date-fns'

import { hourSchema } from '@/schemas/hour-schema'

export const isValidTime = (time: string) => {
    const validation = hourSchema().safeParse(time)
    const cumpleFormato = validation.success

    const parsedTime = parse(time, 'HH:mm', new Date())
    const esHoraValida = isValid(parsedTime)

    return cumpleFormato && esHoraValida
}
