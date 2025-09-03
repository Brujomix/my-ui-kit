import { FC } from 'react'
import { create } from 'zustand'
import { ModalProps } from '.'

export type UseModalProps<T = unknown> = T extends unknown
  ? {
      Component: FC<ModalProps<T>>
      props?: T
    }
  : {
      Component: FC<ModalProps<T>>
      props: T
    }

interface UseModals {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modals: Array<UseModalProps<any> & { modalKey: string; close: () => void }>
  open: <T>(props: UseModalProps<T>) => string
  close: ({ modalKey }: { modalKey: string }) => void
  closeAll: () => void
}

export const useModals = create<UseModals>((set) => ({
  modals: [],
  open: <T>({ Component, props }: UseModalProps<T>) => {
    // Quitar el foco de cualquier elemento que lo tenga
    const elementoConFoco = document.activeElement
    if (elementoConFoco != null && elementoConFoco instanceof HTMLElement) {
      elementoConFoco.blur()
    }

    const newKey = Math.random().toString(36).substring(7)
    set((state) => ({
      modals: [...state.modals, { Component, props, modalKey: newKey, close: () => { state.close({ modalKey: newKey }) } }]
    }))
    return newKey
  },
  close: ({ modalKey }: { modalKey: string }) => {
    set((state) => ({ modals: state.modals.filter((item) => item.modalKey !== modalKey) }))
  },
  closeAll: () => {
    set({ modals: [] })
  }
}))
