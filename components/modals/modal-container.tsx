import { MouseEvent, ReactNode } from 'react'
import clsx from 'clsx'
import { Colors } from '../tools/colors'
import { CrossIcon } from '../icons'

interface PropsModalContainer {
  onClickOutside?: (event: MouseEvent<HTMLDivElement>) => void
  onClickCross?: (event: MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  border?: keyof typeof Colors
}

export function ModalContainer ({ children, onClickOutside, onClickCross, border }: PropsModalContainer) {
  const handleOnClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      event.preventDefault()
      event.stopPropagation()

      if (onClickOutside == null) return

      onClickOutside(event)
    }
  }

  const handleOnClickCross = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (onClickCross == null) return
    onClickCross(event)
  }

  const handleOnCLickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div
      onMouseDown={handleOnClickOutside}
      tabIndex={-1}
      aria-hidden='true'
      className='fixed top-0 left-0 right-0 bottom-0 z-40 w-full h-full p-4 grid place-content-center bg-gray-950/90 print:hidden'
    >
      <div
        onClick={handleOnCLickInside}
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
        {
          onClickCross != null &&
            <button
              type='button'
              onClick={handleOnClickCross}
              className='absolute top-2 right-2 text-gray-400 bg-transparent bg-white dark:bg-gray-800 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
            >
              <CrossIcon className='w-5 h-5 text-white' />
              <span className='sr-only'>Close modal</span>
            </button>
        }
        {children}
      </div>
    </div>
  )
}
