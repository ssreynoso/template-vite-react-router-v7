export const formatDateInput = (value: string) => {
    const cleanValue = value.replace(/\D/g, '')

    if (cleanValue.length <= 2) {
        return cleanValue
    } else if (cleanValue.length <= 4) {
        return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`
    } else {
        return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}/${cleanValue.slice(4, 8)}`
    }
}
