import { Sizes } from '../../components/tools'

export * from './use-alerts'
export * from './alerts-renderer'

export type AlertType = 'success' | 'warning' | 'danger' | 'info' | 'loading'

export interface AlertProps {
  title?: string
  type: AlertType
  subtitle?: string
  showIcon?: boolean
  direction?: 'column' | 'row'
  showCross?: boolean
  textSize?: keyof typeof Sizes
  timeAutoClose?: number
  callback?: () => void
}

export interface OpenAlertProps {
  type: AlertType
  title?: string
  subtitle?: string
  showIcon?: boolean
  direction?: 'column' | 'row'
  showCross?: boolean
  textSize?: keyof typeof Sizes
  timeAutoClose?: number
  callback?: () => void
}

export interface OpenAlertAsyncProps {
  title: string
  subtitle?: string
  showIcon?: boolean
  direction?: 'column' | 'row'
  showCross?: boolean
  textSize?: keyof typeof Sizes
  callback?: () => void
}

export interface UpdateAlertAsyncProps {
  title: string
  subtitle: string
  callback?: () => void
}
