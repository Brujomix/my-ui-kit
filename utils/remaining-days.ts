interface Props {
    currentAt: string | Date
}

export const remainingDays = ({ currentAt } : Props) : number => {
  const expiresToDate = typeof currentAt === 'string' ? new Date(currentAt).getTime() : currentAt.getTime()

  const now = new Date().getTime()

  const diffDays = (expiresToDate - now) / (1000 * 60 * 60 * 24)

  if (diffDays < 0 || isNaN(diffDays)) {
    return 0
  }

  return Math.ceil(diffDays)
}
