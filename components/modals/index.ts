import { Colors } from '../tools/colors'

export * from './modals-renderer'
export * from './use-modals'

export interface ModalProps<T = undefined> {
  props: T
  modalKey: string
  close: () => void
  setDisableOutsideClick: () => void
  setBorder: (color: keyof typeof Colors) => void
}
