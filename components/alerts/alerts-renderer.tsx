import { useLocation } from 'react-router-dom'
import { useAlerts } from '.'
import { useEffect } from 'react'
import { Alert } from './alert'

export function AlertsRenderer () {
  const { alerts, closeAll } = useAlerts()
  const { pathname } = useLocation()

  useEffect(() => {
    closeAll()
  }, [pathname, closeAll])

  return (
    <>
      {
        alerts?.map(({ alertKey, ...rest }) => (
          <Alert key={alertKey} {...rest} />
        ))
      }
    </>
  )
}
