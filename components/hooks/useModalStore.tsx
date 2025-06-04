import { FC } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Modal = {
  modalId: string
  component: FC
  props?: Record<string, any>
}

type ModalState = {
  modals: Modal[]
  open: (modal: Modal) => void
  close: (modalId: string) => void
  closeAll: () => void
}

export const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      modals: [],
      open: (modal) =>
        set((state) => ({ modals: [...state.modals, modal] })),
      close: (modalId) =>
        set((state) => ({
          modals: state.modals.filter((m) => m.modalId !== modalId),
        })),
      closeAll: () => set({ modals: [] }),
    }),
    {
      name: 'modal-storage',
    }
  )
);