import { ReactNode } from 'react'
import { DotsIcon } from '../icons'
import { Brand, Button } from '../tags'
import { ToggleMode } from '../toggles'
import { useSidebarContext } from '../../hooks/sidebar'

type HeaderProps = {
  headerContent?: ReactNode
  headerHeight?: number
}

export function Header ({ headerContent, headerHeight }: HeaderProps) {
  const { openCloseSidebar } = useSidebarContext()

  const onToggleAside = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    openCloseSidebar()
  }

  return (
    <header
      style={{ height: headerHeight }}
      className='z-50 border-b border-gray-200 fixed top-0 w-full px-4 flex justify-between items-center bg-gray-600'
    >
      <>
        <Brand />
      </>
      <div className='w-full flex-1 mx-4'>
        {headerContent}
      </div>
      <div className='flex gap-4 items-center'>
        <ToggleMode />
        <Button onClick={onToggleAside}>
          <DotsIcon className='w-4 text-black' />
        </Button>
      </div>
    </header>
  )
}
