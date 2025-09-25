import { ReactNode } from 'react'
import { DotsIcon } from '../icons'
import { Button } from '../tags'
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
      className='z-50 border-b border-gray-200 fixed top-0 w-full px-4 flex justify-center items-center bg-gray-600'
    >
      <div className='flex gap-4  items-center absolute right-4'>
        <ToggleMode />
        <Button onClick={onToggleAside}>
          <DotsIcon className='w-4' />
        </Button>
      </div>
      {headerContent}
    </header>
  )
}
