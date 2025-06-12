import { ReactNode } from "react"

type MainProps = {
    children ? : ReactNode
    headerHeight ? : number
    footerHeight ? : number
}

export function Main({children, headerHeight, footerHeight}: MainProps) {
  return (
    <div 
    style={{ paddingTop: headerHeight, paddingBottom : footerHeight}} 
    className="w-full p-2">
        {children}
    </div>
  )
}