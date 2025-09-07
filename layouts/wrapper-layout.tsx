import { SidebarProvider } from "../hooks/sidebar/sidebar-context";
import { GeneralLayout } from "./general-layout";

export function WrapperLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <GeneralLayout headerHeight={60}>
        {children}
      </GeneralLayout>
    </SidebarProvider>
  )
}