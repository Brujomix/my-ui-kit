import { Colors } from '../../components/tools'

export * from './use-modals'
export * from './modals-renderer'

export interface ModalProps<T = undefined> {
  props: T
  modalKey: string
  close: () => void
  setDisableOutsideClick: () => void
  setBorder: (color: keyof typeof Colors) => void
}
