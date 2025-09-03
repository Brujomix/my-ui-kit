export const convertMilisecondsToTime = ({ milliseconds }: { milliseconds: number }) => {
  if (isNaN(milliseconds)) {
    return ''
  }
  const totalSeconds = Math.floor(milliseconds / 1000)
  if (totalSeconds < 60) {
    return `${totalSeconds} segundos`
  }
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours === 0) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} hs`
}
