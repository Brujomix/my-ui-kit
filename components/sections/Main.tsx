import { ReactNode } from 'react'
import { useSidebarContext } from '../../hooks/sidebar/sidebar-context'

type MainProps = {
  children?: ReactNode
  headerHeight: number
  footerHeight?: number
}

export function Main ({ children, headerHeight, footerHeight }: MainProps) {
  const { isOpen, openCloseSidebar } = useSidebarContext()

  return (
    <div
      onClick={() => isOpen && openCloseSidebar()}
      className='p-2 flex-1 text-black dark:text-gray-100'
      style={{
        marginTop: headerHeight && headerHeight,
        marginBottom: footerHeight,
      }}
    >
      {children}
    </div>
  )
}
