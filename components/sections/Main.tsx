import { ReactNode } from "react"

type MainProps = {
    children ? : ReactNode
    headerHeight ? : number
    footerHeight ? : number
}

export function Main({children, headerHeight, footerHeight}: MainProps) {
  return (
    <div 
    style={{ paddingTop: headerHeight && headerHeight + 10 , paddingBottom : footerHeight}} 
    className="w-full p-2">
        {children}
    </div>
  )
}