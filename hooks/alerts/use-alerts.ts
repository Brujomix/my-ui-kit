import { create } from 'zustand'
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

export const useAlerts = create<UseAlert>((set, get) => ({
  alerts: [],

  open: (props) => {
    const newKey = Math.random().toString(36).substring(7)
    const close = () => get().close({ alertKey: newKey })

    const alertProps = {
      timeAutoClose: props.timeAutoClose ?? 4,
      ...props
    }

    set((state) => ({
      alerts: [
        ...state.alerts,
        { alertKey: newKey, close, props: alertProps }
      ]
    }))

    return newKey
  },

  openAlertAsync: (props: Omit<AlertProps, 'type' | 'timeAutoClose'> = {}) => {
    const key = get().open({
      type: 'loading',
      title: 'Cargando...',
      subtitle: 'Por favor, espere un momento.',
      ...props
    })

    const updateAlert = (
      newProps: UpdateAlertAsyncProps,
      type: AlertType
    ) => {
      set((state) => ({
        alerts: state.alerts.map((alert) => {
          if (alert.alertKey === key) {
            return {
              ...alert,
              props: {
                ...alert.props,
                ...newProps,
                type
              }
            }
          }

          return alert
        })
      }))
    }

    const close = () => {
      get().close({ alertKey: key })
    }

    return {
      onSuccess: (props: UpdateAlertAsyncProps) =>
        updateAlert(props, 'success'),
      onError: (props: UpdateAlertAsyncProps) =>
        updateAlert(props, 'danger'),
      onInfo: (props: UpdateAlertAsyncProps) =>
        updateAlert(props, 'info'),
      onWarning: (props: UpdateAlertAsyncProps) =>
        updateAlert(props, 'warning'),
      close
    }
  },

  close: ({ alertKey }) => {
    set((state) => ({
      alerts: state.alerts.filter((item) => item.alertKey !== alertKey)
    }))
  },

  closeAll: () => {
    set({ alerts: [] })
  }
}))
