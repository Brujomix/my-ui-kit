import clsx from 'clsx'
import { Colors } from '../tools/colors'
import { FC } from 'react'
import { IconProps } from '../icons'

export interface BadgeProps {
  children: string | number | Array<string | number>
  color?: keyof typeof Colors
  Icon?: FC<IconProps>
}

export function Badge ({ children, Icon, color = Colors.secondary }: BadgeProps) {
  return (
    <span
      className={clsx(
        'text-xs font-medium px-2.5 py-0.5 rounded border inline-flex items-center whitespace-nowrap dark:bg-gray-700/25 w-min',
        {
          'bg-primary-100/50 text-primary-800 border-primary-600': color === Colors.primary,
          'bg-gray-100/50 text-gray-800 border-gray-600': color === Colors.secondary,
          'bg-red-100/50 text-red-800 border-red-600': color === Colors.danger,
          'bg-green-100/50 text-green-800 border-green-600': color === Colors.success,
          'bg-yellow-100/50 text-yellow-800 border-yellow-600': color === Colors.warning
        }
      )}
    >
      {Icon != null && <Icon className='w-2.5 h-2.5 me-1.5' />}
      {children}
    </span>
  )
}
