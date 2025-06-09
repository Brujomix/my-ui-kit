import { FC } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Modal<T = any> = {
  modalId: string
  component: FC<T>
  props?: T
}

type ModalState = {
  modals: Modal[]
  open: <T>(modal: Modal<T>) => void
  close: (modalId: string) => void
  closeAll: () => void
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
}

export const useModalStore = create<ModalState>()((set) => ({
  modals: [],
  open: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
  close: (modalId) => set((state) => ({
    modals: state.modals.filter((m) => m.modalId !== modalId),
  })),
  closeAll: () => set({ modals: [] }),
  hasHydrated: true,
  setHasHydrated: () => {},
}));