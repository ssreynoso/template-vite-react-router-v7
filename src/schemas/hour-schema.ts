import { z } from 'zod'

import { ValidationMessage } from './types'

export const hourSchema = ({ message }: ValidationMessage = {}) =>
    z.string({ message }).regex(/^([01]?\d|2[0-3]):[0-5]\d$/, { message })
