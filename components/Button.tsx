import { ReactNode } from 'react';

interface buttonProps  {
    children : ReactNode,
    onclick : ()=>void,
    className ? : string
}

export function Button({children, onclick, className} : buttonProps) {
  return (
    <button onClick={onclick} className={`${className} bg-primary p-2 border rounded-md`}>{children}</button>
  )
}