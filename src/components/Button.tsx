import React, { ReactNode } from 'react';

interface buttonProps  {
    children : ReactNode
}

export function Button({children} : buttonProps) {
  return (
    <div>{children}</div>
  )
}