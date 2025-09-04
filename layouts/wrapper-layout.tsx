import { SidebarProvider } from "../hooks/modals/sidebar-context";
import { GeneralLayout } from "./general-layout";

export function WrapperLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <GeneralLayout>
        {children}
      </GeneralLayout>
    </SidebarProvider>
  )
}