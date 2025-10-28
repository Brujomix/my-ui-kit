import clsx from 'clsx'
import { ReactNode } from 'react'
import { Sizes } from '../tools'

interface Props {
  label?: string
  subLabel?: string
  children: ReactNode
  error?: string
  direction?: 'row' | 'column'
  size?: keyof typeof Sizes
  maxHeight?: boolean
  maxWidth?: boolean
}

export function FormField ({ label, subLabel, children, error, direction = 'column', size, maxHeight, maxWidth }: Props) {
  return (
    <label
      className={clsx(
        'flex relative',
        {
          'flex-col gap-1': direction === 'column',
          'flex-row items-center gap-3': direction === 'row',
          'h-full': maxHeight,
          'w-full': maxWidth,
          'w-fit': !maxWidth

        }
      )}
    >
      <div className={clsx(
        'flex gap-2 relative',
        {
          'flex-col items-center': direction === 'row',
          'flex-row items-center': direction === 'column'
        }
      )}
      >
        {label != null && (
          <span className={clsx(
            {
              'text-base': size === undefined,
              'text-sm': size === 'sm',
              'text-md': size === 'md',
              'text-lg': size === 'lg',
              'text-xl': size === 'xl',
              'text-2xl': size === 'xxl',
              'text-4xl': size === 'xxxl'
            }
          )}
          >{label}
          </span>)}
        {subLabel != null && (
          <span className={clsx({
            'text-xs': size === undefined || size === 'sm',
            'text-sm': size === 'lg',
            'text-lg': size === 'xl',
            'text-xl': size === 'xxl',
            'text-2xl': size === 'xxxl'
          }, 'italic opacity-50')}
          >{subLabel}
          </span>)}
      </div>

      {children}

      {
        error && (
          <span
            className={clsx({
              'text-xs': size === 'sm' || size === undefined,
              'text-sm': size === 'md' || size === 'lg',
              'text-md': size === 'lg' || size === 'xl' || size === 'xxl' || size === 'xxxl'
            }, 'text-red-600 absolute -bottom-2 px-1 left-3 bg-gray-800 rounded whitespace-nowrap')}
          >
            {error}
          </span>
        )
      }
    </label>
  )
}
