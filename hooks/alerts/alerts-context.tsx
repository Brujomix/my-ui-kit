import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { AlertProps, AlertType, OpenAlertAsyncProps, OpenAlertProps, UpdateAlertAsyncProps } from '.'

export interface AlertStore {
  alertKey: string
  close: () => void
  props: AlertProps
}

interface UseAlert {
  alerts: AlertStore[]
  open: (props: OpenAlertProps) => string
  openAlertAsync: (props: OpenAlertAsyncProps) => {
    onSuccess: (props: UpdateAlertAsyncProps) => void
    onError: (props: UpdateAlertAsyncProps) => void
    onInfo: (props: UpdateAlertAsyncProps) => void
    onWarning: (props: UpdateAlertAsyncProps) => void
    close: () => void
  }
  close: ({ alertKey }: { alertKey: string }) => void
  closeAll: () => void
}

const AlertsContext = createContext<UseAlert | undefined>(undefined)

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertStore[]>([])
  console.log(alerts, 'alerts')

  const open = useCallback((props: OpenAlertProps) => {
    const newKey = Math.random().toString(36).substring(7)
    const close = () => closeAlert({ alertKey: newKey })
    const alertProps = {
      timeAutoClose: props.timeAutoClose ?? 4,
      ...props,
    }
    setAlerts((state) => [
      ...state,
      { alertKey: newKey, close, props: alertProps },
    ])
    return newKey
  }, [])

  const closeAlert = useCallback(({ alertKey }: { alertKey: string }) => {
    setAlerts((state) => state.filter((item) => item.alertKey !== alertKey))
  }, [])

  const closeAll = useCallback(() => {
    setAlerts([])
  }, [])

  const openAlertAsync = useCallback((props: Omit<AlertProps, 'type' | 'timeAutoClose'> = {}) => {
    const key = open({
      type: 'loading',
      title: 'Cargando...',
      subtitle: 'Por favor, espere un momento.',
      ...props,
    })

    const updateAlert = (
      newProps: UpdateAlertAsyncProps,
      type: AlertType
    ) => {
      setAlerts((state) =>
        state.map((alert) =>
          alert.alertKey === key
            ? {
                ...alert,
                props: {
                  ...alert.props,
                  ...newProps,
                  type,
                },
              }
            : alert
        )
      )
    }

    const close = () => {
      closeAlert({ alertKey: key })
    }

    return {
      onSuccess: (props: UpdateAlertAsyncProps) => updateAlert(props, 'success'),
      onError: (props: UpdateAlertAsyncProps) => updateAlert(props, 'danger'),
      onInfo: (props: UpdateAlertAsyncProps) => updateAlert(props, 'info'),
      onWarning: (props: UpdateAlertAsyncProps) => updateAlert(props, 'warning'),
      close,
    }
  }, [open])

  return (
    <AlertsContext.Provider value={{ alerts, open, openAlertAsync, close: closeAlert, closeAll }}>
      {children}
    </AlertsContext.Provider>
  )
}

export function useAlerts () {
  const ctx = useContext(AlertsContext)
  if (!ctx) throw new Error('useAlerts must be used within an AlertsProvider')
  return ctx
}
