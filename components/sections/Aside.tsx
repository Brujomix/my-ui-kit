import clsx from 'clsx'
import { ReactNode, useRef } from 'react'
import { useSidebarContext } from '../../hooks/sidebar/sidebar-context'
import { Footer } from './footer'

type AsideProps = {
  asideContent?: ReactNode
  footerContent?: ReactNode
  possition?: 'left' | 'right'
}

export function Aside ({ asideContent, possition = 'left', footerContent }: AsideProps) {
  const { isOpen } = useSidebarContext()
  const asideRef = useRef<HTMLDivElement>(null)

  return (
    <aside
      ref={asideRef}
      className={clsx(
        !isOpen && 'hidden',
        possition === 'left' ? 'left-0' : 'right-0',
        'pt-2 z-40 px-2 fixed min-w-52 h-screen bg-gray-400 text-gray-900 flex flex-col dark:bg-gray-900 dark:text-gray-100'
      )}
    >
      {asideContent}
      <Footer footerContent={footerContent} />
    </aside>
  )
}
