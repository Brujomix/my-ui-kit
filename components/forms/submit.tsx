import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { FC } from 'react'
import { IconProps, LoadingIcon } from '../icons'
import { Colors, Sizes } from '../tools'

interface SubmitProps {
  label: string
  Icon?: FC<IconProps>
  size?: Sizes
  color?: Colors
}

export function Submit ({ label, Icon, size = Sizes.md, color = Colors.primary }: SubmitProps) {
  const { formState: { isSubmitting } } = useFormContext()

  return (
    <button
      type='submit'
      disabled={isSubmitting}
      className={clsx(
        'focus:outline-none font-medium rounded-lg text-center h-min flex items-center justify-center gap-1 print:hidden',
        {
          'opacity-80': isSubmitting,
          'text-sm px-3 py-2': size === Sizes.md,
          'text-xs px-2 py-1.5': size === Sizes.sm,
          'text-md px-4 py-2': size === Sizes.lg,

          'text-black dark:text-white bg-gray-300 focus:ring-gray-300  dark:bg-gray-700 dark:focus:ring-gray-800': color === Colors.secondary,
          'text-white bg-primary-600  focus:ring-primary-300 dark:bg-primary-700  dark:focus:ring-primary-800': color === Colors.primary,
          'text-white bg-red-600/80 focus:bg-red-300/80 dark:bg-red-700/80 dark:focus:bg-red-800/80': color === Colors.danger,
          'hover:bg-gray-400 dark:hover:bg-gray-600': color === Colors.secondary && !isSubmitting,
          'hover:bg-primary-700 dark:hover:bg-primary-600': color === Colors.primary && !isSubmitting,
          'hover:bg-red-700/80 dark:hover:bg-red-800/80': color === Colors.danger && !isSubmitting
        }
      )}
    >
      {
        Icon != null && (
          <>
            {
              isSubmitting && (
                <LoadingIcon
                  className={clsx(
                    '',
                    {
                      'w-4 h-4': size === Sizes.md,
                      'w-3 h-3': size === Sizes.sm,
                      'w-5 h-5': size === Sizes.lg
                    }
                  )}
                />
              )
            }
            {
              !isSubmitting && (
                <Icon
                  className={clsx(
                    '',
                    {
                      'w-3 h-3': size === Sizes.md,
                      'w-2.5 h-2.5': size === Sizes.sm,
                      'w-4 h-4': size === Sizes.lg
                    }
                  )}
                />
              )
            }
          </>
        )
      }
      {label}
    </button>
  )
}

interface CancleProps {
  children: string
  onClick: () => void
  size?: Sizes
  color?: Colors
}

export function Cancel ({ children, onClick, size = Sizes.md, color = Colors.secondary }: CancleProps) {
  const { formState: { isSubmitting } } = useFormContext()

  return (
    <button
      type='button'
      disabled={isSubmitting}
      onClick={onClick}
      className={clsx(
        'focus:outline-none font-medium rounded-lg text-center h-min flex items-center justify-center gap-1 print:hidden',
        {
          'opacity-60': isSubmitting,
          'text-sm px-3 py-2': size === Sizes.md,
          'text-xs px-2 py-1.5': size === Sizes.sm,
          'text-md px-4 py-2': size === Sizes.lg,

          'text-black dark:text-white bg-gray-300 focus:ring-gray-300  dark:bg-gray-700 dark:focus:ring-gray-800': color === Colors.secondary,
          'text-white bg-primary-600  focus:ring-primary-300 dark:bg-primary-700  dark:focus:ring-primary-800': color === Colors.primary,
          'text-white bg-red-600/80 focus:bg-red-300/80 dark:bg-red-700/80 dark:focus:bg-red-800/80': color === Colors.danger,
          'hover:bg-gray-400 dark:hover:bg-gray-600': color === Colors.secondary && !isSubmitting,
          'hover:bg-primary-700 dark:hover:bg-primary-600': color === Colors.primary && !isSubmitting,
          'hover:bg-red-700/80 dark:hover:bg-red-800/80': color === Colors.danger && !isSubmitting
        }
      )}
    >
      {children}
    </button>
  )
}
