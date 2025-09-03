import { ReactNode } from 'react'
import clsx from 'clsx'
import { Colors } from '../tools/colors'

interface PropsAlertContainer {
  children: ReactNode
  border?: keyof typeof Colors
  onClickOutside?: () => void
}

export function AlertContainer ({ children, border, onClickOutside }: PropsAlertContainer) {
  return (
    <div
      tabIndex={-1}
      onMouseDown={onClickOutside}
      aria-hidden='true'
      className='fixed inset-0 z-50 w-full h-full p-4 grid place-content-center bg-gray-950/90 print:hidden'
      style={{ pointerEvents: 'auto' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={clsx(
          'relative border p-4 bg-gray-900 dark:bg-gray-900 rounded-lg shadow-zinc-950 shadow-lg',
          {
            'border border-gray-200/50 dark:border-gray-700/50': border == null,
            'border-4 border-red-600': border === Colors.danger,
            'border-4 border-green-600': border === Colors.success,
            'border-4 border-primary-600': border === Colors.primary,
            'border-4 border-yellow-600': border === Colors.warning,
            'border-4 border-gray-200/50 dark:border-gray-700/50': border === Colors.secondary
          }
        )}
      >
        {children}
      </div>
    </div>
  )
}
