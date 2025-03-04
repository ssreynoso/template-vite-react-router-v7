import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { Spinner } from '../spinner'

import { Input } from './input'

import { Button } from '@/components/ui/button'
import { Calendar, CalendarProps } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDateInput } from '@/hooks/use-date-input'
import { formatDate } from '@/lib/date'
import { formatDateInput } from '@/lib/date-input'
import { cn } from '@/lib/utils'

type Props = {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
    withoutSelect?: boolean
    inputDisabled?: boolean
    disabled?: CalendarProps['disabled']
    simplifiedSelect?: boolean
}

export function DateInput(props: Props) {
    const { date, setDate, withoutSelect = false, simplifiedSelect = false, disabled, inputDisabled } = props

    const { value, handleChange, loading, isValid } = useDateInput(date, setDate)

    const defaultDate = date ? new Date(date) : new Date()

    const handleChangeWithFormat = (value: string) => {
        const formattedInput = formatDateInput(value)

        handleChange(formattedInput)
    }

    return (
        <div className='flex items-center gap-2 rounded-md'>
            <div className='relative flex items-center'>
                <Input
                    readOnly={!!inputDisabled}
                    className={cn('w-36', !loading && !isValid && 'border-destructive-form border-2')}
                    value={value}
                    onChange={e => handleChangeWithFormat(e.target.value)}
                    maxLength={10}
                />
                {loading && <Spinner className='absolute right-2 h-6 w-6' />}
            </div>
            {!withoutSelect && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-[240px] justify-start text-left font-normal shadow-md',
                                !date && 'text-muted-foreground',
                                simplifiedSelect && 'w-max'
                            )}
                        >
                            <CalendarIcon className={cn('h-4 w-4', !simplifiedSelect && 'mr-2')} />
                            {!simplifiedSelect &&
                                (date ? format(date, 'PPP', { locale: es }) : <span>Seleccioná una fecha</span>)}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                            defaultMonth={defaultDate}
                            mode='single'
                            selected={date}
                            onSelect={day => {
                                if (day) {
                                    handleChange(formatDate(day), {
                                        force: true
                                    })
                                }
                            }}
                            initialFocus
                            locale={es}
                            disabled={inputDisabled || disabled}
                        />
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}
