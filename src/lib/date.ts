import { addMinutes, format, isValid, parse } from 'date-fns'
import { es } from 'date-fns/locale'

// const zonaHoraria = 'America/Buenos_Aires'
export const formatZone = (date: Date) => {
    const pattern = 'dd/MM/yyyy'
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`
    const formattedData = `${format(date, pattern)} ${hoursString}:${minutesString}`
    // const dateAsUtc = zonedTimeToUtc(date, 'UTC')
    // return format(utcToZonedTime(dateAsUtc, zonaHoraria), pattern)
    return formattedData
}

export const getZonedTime = (date: Date) => {
    const offset = date.getTimezoneOffset()
    const zonedDate = addMinutes(date, offset)

    return zonedDate
}

export const formatTime = (date: Date) => {
    const zonedDate = getZonedTime(date)
    const formattedData = format(zonedDate, 'HH:mm')

    return formattedData
}

export const formatDate = (date: Date, pattern = 'dd/MM/yyyy', zoned = true) => {
    const zonedDate = getZonedTime(date)
    const result = format(zoned ? zonedDate : date, pattern)

    return result
}

export const createDate = (date: string, pattern = 'yyyy-MM-dd') => {
    const result = parse(date, pattern, new Date())
    if (!isValid(result)) {
        throw new Error(`Invalid date: ${date}`)
    }

    return result
}

export const isValidStringDate = (date: string) => {
    const parsedDate = parse(date, 'P', new Date(), { locale: es })
    const isValidDate = isValid(parsedDate)

    return { parsedDate, isValidDate }
}

export const addMinutesToTime = (time: string, minutes: number): string => {
    const parsedTime = parse(time, 'HH:mm', new Date())
    const newTime = addMinutes(parsedTime, minutes)
    return format(newTime, 'HH:mm')
}
