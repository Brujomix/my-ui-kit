import { create } from "zustand"
import { persist } from "zustand/middleware"

type UseSidebarProps = {
    isOpen: boolean,
    openCloseSidebar: () => void
}

export const useSidebarStorage = create<UseSidebarProps>()(
    persist(
        (set) => ({
            isOpen: false,
            openCloseSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
        }),
        {
            name: "sidebar-storage",
        }
    )
)