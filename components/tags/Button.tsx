import { type ReactNode, MouseEventHandler, FC, forwardRef } from 'react'
import clsx from 'clsx'

import { IconProps } from '../icons'
import { Colors } from '../tools/colors'
import { Sizes } from '../tools/sizes'
import { Link, To } from 'react-router-dom'

export interface ButtonPropsStyle {
  type?: 'button' | 'submit'
  mode?: 'text' | 'icon'
  color?: keyof typeof Colors
  size?: keyof typeof Sizes
  children: ReactNode
  Icon?: FC<IconProps>
  IconLeft?: FC<IconProps>
  maxWidth?: boolean
  maxHeight?: boolean
}

type ButtonProps = ButtonPropsStyle & {
  disabled?: boolean
  stopPropagation?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  onClick,
  mode = 'text',
  type = 'button',
  color = (type === 'button' ? Colors.secondary : Colors.primary),
  size = Sizes.md,
  disabled,
  Icon,
  IconLeft,
  maxWidth = false,
  maxHeight = false,
  stopPropagation = false,
}, ref) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (stopPropagation) event.stopPropagation()
    onClick?.(event)
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={clsx(
        'focus:outline-none font-medium rounded-lg text-center flex items-center justify-center gap-2 print:hidden whitespace-nowrap',
        {
          'opacity-40': disabled,
          'text-sm px-3 py-2': mode === 'text' && size === Sizes.md,
          'text-xs px-2 py-1.5': mode === 'text' && size === Sizes.sm,
          'text-md px-4 py-2': mode === 'text' && size === Sizes.lg,
          'text-xl px-4 py-2': mode === 'text' && size === Sizes.xl,
          'text-2xl px-4 py-2 text-wrap': mode === 'text' && size === Sizes.xxl,
          'text-4xl px-4 py-2 text-wrap': mode === 'text' && size === Sizes.xxxl,

          'h-min': !maxHeight,
          'h-full': maxHeight,
          'w-full': maxWidth,
          'text-white bg-green-600/80 focus:bg-green-300/80 dark:bg-green-700/80 dark:focus:bg-green-800/80': mode === 'text' && color === Colors.success,
          'text-white dark:text-white bg-gray-300 focus:ring-gray-300  dark:bg-gray-700 dark:focus:ring-gray-800': mode === 'text' && color === Colors.secondary,
          'text-white bg-primary-600  focus:ring-primary-300 dark:bg-primary-700  dark:focus:ring-primary-800': mode === 'text' && color === Colors.primary,
          'text-white bg-red-600/80 focus:bg-red-300/80 dark:bg-red-700/80 dark:focus:bg-red-800/80': mode === 'text' && color === Colors.danger,
          'text-white bg-yellow-500/80 focus:bg-yellow-300/80 dark:bg-yellow-500/80 dark:focus:bg-yellow-600/80': mode === 'text' && color === Colors.warning,
          'hover:bg-gray-400 dark:hover:bg-gray-600': mode === 'text' && color === Colors.secondary && !disabled,
          'hover:bg-primary-700 dark:hover:bg-primary-600': mode === 'text' && color === Colors.primary && !disabled
        }
      )}
      onClick={handleClick}
    >
      {
        Icon != null && (
          <Icon
            className={clsx(
              '',
              {
                'w-2.5 h-2.5': size === Sizes.sm,
                'w-3 h-3': size === Sizes.md,
                'w-4 h-4': size === Sizes.lg,
                'w-7 h-7': [Sizes.xl, Sizes.xxl, Sizes.xxxl].includes(size as Sizes)
              }
            )}
          />
        )
      }
      {children}
      {
        IconLeft != null && (
          <IconLeft
            className={clsx(
              '',
              {
                'w-3 h-3': size === Sizes.md,
                'w-4 h-4': size === Sizes.sm,
                'w-5 h-5': size === Sizes.lg
              }
            )}
          />
        )
      }
    </button>
  )
})

type LinkProps = ButtonProps & {
  to: To
}

export function LinkButton ({
  children,
  to,
  mode = 'text',
  color = Colors.secondary,
  size = Sizes.md,
  Icon
}: LinkProps) {
  return (
    <Link
      className={clsx(
        'focus:outline-none font-medium rounded-lg text-center h-min flex items-center justify-center gap-1 print:hidden whitespace-nowrap',
        {
          'text-sm px-3 py-2': mode === 'text' && size === Sizes.md,
          'text-xs px-2 py-1.5': mode === 'text' && size === Sizes.sm,
          'text-md px-4 py-2': mode === 'text' && size === Sizes.lg,

          'text-black dark:text-white bg-gray-300 focus:ring-gray-300  dark:bg-gray-700 dark:focus:ring-gray-800': mode === 'text' && color === Colors.secondary,
          'text-white bg-primary-600  focus:ring-primary-300 dark:bg-primary-700  dark:focus:ring-primary-800': mode === 'text' && color === Colors.primary,
          'text-white bg-red-600/80 focus:bg-red-300/80 dark:bg-red-700/80 dark:focus:bg-red-800/80': mode === 'text' && color === Colors.danger
        }
      )}
      to={to}
    >
      {
        Icon != null && (
          <Icon
            className={clsx(
              '',
              {
                'w-2.5 h-2.5': size === Sizes.md,
                'w-3 h-3': size === Sizes.sm,
                'w-4 h-4': size === Sizes.lg
              }
            )}
          />
        )
      }
      {children}
    </Link>
  )
}

interface PropsSkeleton {
  type?: 'button' | 'submit'
  color?: 'primary' | 'secondary'
  size?: 'normal' | 'small'
  children: ReactNode
}

export function ButtonSkeleton ({ type = 'button', color = (type === 'button' ? 'secondary' : 'primary'), size = 'normal', children }: PropsSkeleton) {
  return (
    <div
      className={clsx(
        'focus:ring-4 focus:outline-none font-medium rounded-lg text-center text-transparent animate-pulse',
        {
          'text-sm px-3 py-2': size === 'normal',
          'text-2xs leading-2xs px-2 py-1': size === 'small',
          'bg-gray-600/50 dark:bg-gray-700/50': ((color) === 'secondary'),
          'bg-primary-600/50 dark:bg-primary-700/50': color === 'primary'
        }
      )}
    >
      {children}
    </div>
  )
}
