import { ReactNode } from "react"

type ModalContainerProps = {
    children : ReactNode
}

export function Modal_Container({children}: ModalContainerProps) {
 
  return (
    <div className="inset-0 w-full h-full bg-darkGray/50 z-50">{children}</div>
  )
}