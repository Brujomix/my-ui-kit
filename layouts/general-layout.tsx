import { ReactNode } from 'react'
import { AlertsProvider } from '../hooks/alerts/alerts-context'
import { ModalsRenderer } from '../hooks/modals/modals-renderer'
import { ToastContainer } from 'react-toastify'
import { Aside, Header, Main } from '../components/sections'

type GeneralLayoutProps = {
  children: ReactNode
  asideContent?: ReactNode
  footerContent?: ReactNode
  headerContent?: ReactNode
  headerHeight: number
}

export function GeneralLayout ({ children, asideContent, footerContent, headerContent, headerHeight }: GeneralLayoutProps) {
  return (
    <AlertsProvider>
      <ModalsRenderer />
      <ToastContainer />
      <Header headerContent={headerContent} headerHeight={headerHeight} />
      <Aside
        asideContent={asideContent}
        footerContent={footerContent}
      />
      <Main headerHeight={headerHeight}>
        {children}
      </Main>
    </AlertsProvider>
  )
}
