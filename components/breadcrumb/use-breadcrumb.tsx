import { create } from 'zustand'
import { BreadcrumbItemProps } from '.'

interface BreadcrumbState {
  items?: BreadcrumbItemProps[]
  setItems: (items?: BreadcrumbItemProps[]) => void
}

export const useBreadcrumb = create<BreadcrumbState>((set) => ({
  items: undefined,
  setItems: (items?: BreadcrumbItemProps[]) => set({ items })
}))
