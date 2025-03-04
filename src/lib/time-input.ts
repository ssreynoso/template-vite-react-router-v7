export const formatTimeInput = (value: string) => {
    const cleanValue = value.replace(/\D/g, '')

    return cleanValue.length <= 2 ? cleanValue : `${cleanValue.slice(0, 2)}:${cleanValue.slice(2, 4)}`
}
