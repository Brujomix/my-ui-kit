import { ReactNode } from 'react'
import { ModalsRenderer } from '../hooks/modals/modals-renderer'
import { ToastContainer } from 'react-toastify'
import { Header } from '../components/sections/Header'
import { Aside } from '../components/sections/Aside'
import { Main } from '../components/sections/Main'
import { AlertsRenderer } from '../hooks/alerts'

type GeneralLayoutProps = {
  children: ReactNode
  asideContent?: ReactNode
  footerContent?: ReactNode
  headerContent?: ReactNode
  headerHeight: number
}

export function GeneralLayout ({ children, asideContent, footerContent, headerContent, headerHeight }: GeneralLayoutProps) {
  return (
    <>
      <ModalsRenderer />
      <ToastContainer />
      <AlertsRenderer />
      <Header headerContent={headerContent} headerHeight={headerHeight} />
      <Aside
        asideContent={asideContent}
        footerContent={footerContent}
      />
      <Main headerHeight={headerHeight}>
        {children}
      </Main>
    </>

  )
}
