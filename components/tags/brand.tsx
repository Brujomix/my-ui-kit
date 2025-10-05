import { FC } from 'react'
import { RedirectLink } from './redirect-link'

type BrandProps = {
  className?: string
  icon?: FC
}

export function Brand ({ className, icon: Icon }: BrandProps) {
  return (
    <RedirectLink url='/' className={className}>
      {Icon && <Icon />} HOME
    </RedirectLink>
  )
}
