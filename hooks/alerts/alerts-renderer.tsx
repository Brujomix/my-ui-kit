import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Alert } from './alert'
import { useAlerts } from './use-alerts'

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
