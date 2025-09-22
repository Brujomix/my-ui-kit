import { SidebarProvider } from '../hooks/sidebar/sidebar-context'
import { GeneralLayout } from './general-layout'

type WrapperLayoutProps = {
  asideContent?: React.ReactNode
  headerContent?: React.ReactNode
  footerContent?: React.ReactNode
  children: React.ReactNode
}

export function WrapperLayout ({ asideContent, headerContent, footerContent, children }: WrapperLayoutProps) {
  return (
    <SidebarProvider>
      <GeneralLayout
        headerHeight={60}
        asideContent={asideContent}
        headerContent={headerContent}
        footerContent={footerContent}
      >
        {children}
      </GeneralLayout>
    </SidebarProvider>
  )
}
