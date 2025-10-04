import { ReactNode } from 'react'

type NavBarProps = {
  children: ReactNode
}

export function NavBar ({ children }: NavBarProps) {
  return <nav>{children}</nav>
}
