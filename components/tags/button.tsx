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
          '  bg-green-600 focus:bg-green-800': mode === 'text' && color === Colors.success,
          '  bg-gray-400 focus:ring-gray-800': mode === 'text' && color === Colors.secondary,
          '  bg-primary-600  focus:ring-primary-800': mode === 'text' && color === Colors.primary,
          '  bg-red-600 focus:bg-red-800': mode === 'text' && color === Colors.danger,
          '  bg-yellow-600 focus:bg-yellow-800': mode === 'text' && color === Colors.warning,
          'hover:bg-gray-300': mode === 'text' && color === Colors.secondary && !disabled,
          'hover:bg-primary-700': mode === 'text' && color === Colors.primary && !disabled
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
  maxHeight = false,
  maxWidth = false,
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
          'text-xl px-4 py-2': mode === 'text' && size === Sizes.xl,
          'text-2xl px-4 py-2 text-wrap': mode === 'text' && size === Sizes.xxl,
          'text-4xl px-4 py-2 text-wrap': mode === 'text' && size === Sizes.xxxl,
          'h-min': !maxHeight,
          'h-full': maxHeight,
          'w-full': maxWidth,
          '   bg-gray-400 focus:ring-gray-800': mode === 'text' && color === Colors.secondary,
          '  bg-primary-600  focus:ring-primary-800': mode === 'text' && color === Colors.primary,
          '   bg-red-600 focus:bg-red-800': mode === 'text' && color === Colors.danger
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
          'bg-gray-600/50': ((color) === 'secondary'),
          'bg-primary-600/50': color === 'primary'
        }
      )}
    >
      {children}
    </div>
  )
}

/* Button tipo toogle que pueda ejecutar funciones cuando se cambia de estado */
interface ToggleButtonProps {
  onClick: () => void
  size?: keyof typeof Sizes
  disabled?: boolean
  toggled?: boolean
}

export function ToggleButton ({
  size = 'md',
  disabled = false,
  toggled = false,
  onClick
}: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type='button'
      className={clsx('w-14 h-2 rounded-md flex items-center', {
        ' bg-green-300': toggled,
        ' bg-red-300': !toggled,
      })}
    >
      {/* Div como una bolita para que se pueda mover según el estado de toggle */}
      <div
        className={clsx(
          'rounded-full transition-transform duration-300 ease-in-out',
          {
            'bg-green-400': toggled,
            'bg-red-600': !toggled,
          },
          {
            'border border-green-900': toggled,
            'border border-red-900': !toggled,
          },
          {
            'w-3 h-3': size === 'sm',
            'w-5 h-5': size === 'md',
            'w-7 h-7': size === 'lg',
          }
        )}
        style={{
          transform: toggled ? 'translateX(150%)' : 'translateX(10%)',
        }}
      />
    </button>
  )
}
