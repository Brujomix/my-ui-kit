interface Props {
  date?: Date | string
  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  timeStyle?: 'full' | 'long' | 'medium' | 'short'
}

export const formatDateShort = ({ date: initialDate, dateStyle, timeStyle }: Props) => {
  if (!initialDate) return ''

  let date = initialDate
  if (typeof date === 'string') {
    if (!date.includes('T')) {
      // Cuando la fecha es un string y es solo fecha sin hora,
      // le agrego la hora 03:00:00 para que no se vea un dia menos al pasarlo a AR
      date = new Date(`${date}T03:00:00`)
    } else {
      date = new Date(date)
    }
  }

  return new Intl.DateTimeFormat('es-AR', {
    dateStyle,
    timeStyle,
    hour12: false
  }).format(date)
}
