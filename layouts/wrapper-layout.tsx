import { SidebarProvider } from "../hooks/sidebar/sidebar-context";
import { GeneralLayout } from "./general-layout";

type WrapperLayoutProps = {
  asideContent?: React.ReactNode
  headerContent?: React.ReactNode
  children: React.ReactNode
}

export function WrapperLayout({ asideContent, headerContent, children }: WrapperLayoutProps) {
  return (
    <SidebarProvider>
      <GeneralLayout 
        headerHeight={60}
        asideContent={asideContent}
        footerContent={headerContent}
      >
        {children}
      </GeneralLayout>
    </SidebarProvider>
  )
}