import { ReactNode } from 'react'
import { clsx } from 'clsx'
import { Link } from 'react-router-dom'

type LinkRedirectProps<T> = {
  children: ReactNode
  url: string
  className?: string
  callback?: () => void
  stateProps?: T
}

export function RedirectLink<T> ({
  children,
  url,
  className,
  stateProps,
  callback,
}: LinkRedirectProps<T>) {
  return (
    <Link
      to={url}
      state={stateProps}
      onClick={() => callback?.()}
      className={clsx(
        'grid p-2 hover:opacity-70 transition-opacity duration-300 backdrop-blur-md',
        className
      )}
    >
      {children}
    </Link>
  )
}
