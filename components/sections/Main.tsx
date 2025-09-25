import { ReactNode } from 'react'

type MainProps = {
  children?: ReactNode
  headerHeight: number
  footerHeight?: number
}

export function Main ({ children, headerHeight, footerHeight }: MainProps) {
  return (
    <div
      className='p-2 flex-1 text-black'
      style={{
        marginTop: headerHeight && headerHeight,
        marginBottom: footerHeight,
      }}
    >
      {children}
    </div>
  )
}
