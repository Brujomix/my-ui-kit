import clsx from 'clsx'
import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { Link, NavigateOptions, To } from 'react-router-dom'
import { Sizes } from '../tools'
import { IconProps } from '../icons'
import { DotsIcon } from '../icons/dots-icon'

interface PropsDropdown {
  size?: Sizes
  Icon?: FC<IconProps>
  children: ReactNode
  disabled?: boolean
}

export function Dropdown ({ size = Sizes.md, children, Icon = DotsIcon, disabled }: PropsDropdown) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef?.current != null && !buttonRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [open])

  return (
    <div
      className='relative flex items-center'
    >
      <button
        type='button'
        ref={buttonRef}
        disabled={disabled}
        onClick={handleClickButton}
      >
        <Icon
          className={
            clsx('', {
              'w-6 h-6': size === Sizes.md,
              'w-5 h-5': size === Sizes.sm,
              'h-7 w-7': size === Sizes.lg
            })
          }
        />
      </button>
      {
        open && (
          <DropdownContainer
            buttonRef={buttonRef}
          >
            {children}
          </DropdownContainer>
        )
      }
    </div>
  )
}

interface DropdownContainerProps {
  children: ReactNode
  buttonRef: RefObject<HTMLButtonElement | null>
}

interface Position {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export function DropdownContainer ({ children, buttonRef }: DropdownContainerProps) {
  const [position, setPosition] = useState<Position>()

  useEffect(() => {
    const calculatePosition = () => {
      const rect = buttonRef?.current?.getBoundingClientRect()
      if (rect == null) return

      const newPosition: Position = {}

      // calcular si abrir para arriba o para abajo
      const { clientHeight } = document.body

      if ((rect.bottom + 200) > clientHeight) {
        // abrir para arriba
        newPosition.bottom = clientHeight - rect.top - 4
      } else {
        // abrir para abajo
        newPosition.top = rect.bottom + 4
      }

      // calcular si abrir a la izquierda o a la derecha
      const { clientWidth } = document.body

      if ((rect.right + 100) > clientWidth) {
        // abrir a la izquierda
        newPosition.right = clientWidth - rect.left + 4
      } else {
        // abrir a la derecha
        newPosition.left = rect.right + 4
      }

      setPosition(newPosition)
    }

    calculatePosition()

    window.addEventListener('resize', calculatePosition)
    window.addEventListener('scroll', calculatePosition)

    return () => {
      window.removeEventListener('resize', calculatePosition)
      window.removeEventListener('scroll', calculatePosition)
    }
  }, [buttonRef.current])

  return (
    <>
      {
        position && (
          <div
            style={{ ...position }}
            className='fixed border z-30 border-gray-200 bg-white rounded-lg shadow-gray-950/60 shadow-xl dark:bg-gray-800 dark:border-gray-700 px-4 py-2'
          >
            {children}
          </div>
        )
      }
    </>
  )
}

export function ListForDropdown ({ children }: { children: ReactNode }) {
  return (
    <ul className='-mx-4 -my-2 rounded-lg overflow-hidden flex flex-col text-nowrap text-white/60'>
      {children}
    </ul>
  )
}

export function ListItemForDropdown ({ children }: { children: ReactNode }) {
  return (
    <li
      className='hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-nowrap'
    >
      {children}
    </li>
  )
}

export function ListItemButtonForDropdown ({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <li
      className={clsx(
        'flex hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
        {
          'opacity-50': disabled
        }
      )}
    >
      <button
        type='button'
        disabled={disabled ?? false}
        onClick={onClick}
        className='px-4 py-2 flex-1 flex items-start'
      >
        {children}
      </button>
    </li>
  )
}

export function ListItemLinkForDropdown ({ children, to, options }: { children: ReactNode; to: To; options?: NavigateOptions }) {
  return (
    <li
      className='hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex'
    >
      <Link
        to={to}
        {...options}
        className='px-4 py-2 flex-1 flex items-start'
      >
        {children}
      </Link>
    </li>
  )
}

export function ListSeparatorForDropdown () {
  return (
    <div className='border-b border-gray-100 dark:border-gray-600' />
  )
}
