import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { AlertProps } from '.'
import { Colors, Sizes } from '../../components/tools'
import { AlertContainer } from './alert-container'
import { CrossIcon } from '../../components/icons/cross-icon'
import { SuccessIcon } from '../../components/icons/success-icon'
import { InfoIcon } from '../../components/icons/info-icon'
import { ErrorIcon } from '../../components/icons/error-icon'
import { LoadingIcon } from '../../components/icons/loading-icon'

interface AlertAsyncProps {
  close: () => void
  props: AlertProps
}

export function Alert ({
  close,
  props: {
    title,
    subtitle,
    type,
    timeAutoClose,
    direction = 'column',
    showIcon = true,
    showCross = true,
    callback,
    textSize = 'md'
  }
}: AlertAsyncProps) {
  const [counter, setCounter] = useState(() => timeAutoClose ?? 4)
  const [border, setBorder] = useState<keyof typeof Colors | undefined>(undefined)

  const handleClickOutside = () => {
    if (type === 'loading') return
    close()
    callback?.()
  }

  useEffect(() => {
    setCounter(timeAutoClose ?? 4)
  }, [timeAutoClose])

  useEffect(() => {
    switch (type) {
      case 'danger':
        setBorder(Colors.danger)
        break
      case 'success':
        setBorder(Colors.success)
        break
      case 'info':
        setBorder(Colors.primary)
        break
      case 'warning':
        setBorder(Colors.warning)
        break
      default:
        setBorder(undefined)
        break
    }
  }, [type])

  useEffect(() => {
    if (type === 'loading' || !timeAutoClose || timeAutoClose <= 0) return

    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev <= 1) {
          clearInterval(interval)

          setTimeout(() => {
            close()
            callback?.()
          }, 0)

          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [type, timeAutoClose, close, callback])

  return (
    <AlertContainer border={border} onClickOutside={handleClickOutside}>
      <div
        onMouseDown={(e) => e.stopPropagation()} className='z-50 relative flex flex-col justify-center items-center p-10'
      >

        {
          showCross && type !== 'loading' &&
            <button onClick={() => { close(); callback?.() }} className='w-8 h-8 opacity-50 absolute -right-2 -top-2'>
              <CrossIcon />
            </button>
        }

        {type !== 'loading' && counter !== 0 && (
          <p className={clsx('absolute -right-1 -bottom-2 text-xs text-white opacity-50')}>
            Cerrado automático {counter}
          </p>
        )}

        {/* Icon And Title Modal Alert */}
        <div className={clsx(
          {
            'flex flex-col gap-2 items-center': direction === 'column',
            'grid grid-cols-2 justify-center': direction === 'row',
          },
          {
            'text-green-600': type === 'success',
            'text-yellow-600': type === 'warning',
            'text-red-600': type === 'danger',
            'text-blue-600': type === 'info'
          }
        )}
        >
          {showIcon && (
            <div className={clsx(
              'mb-4 [&>svg]:w-full [&>svg]:h-full',
              {
                'w-10 h-10': textSize === 'sm',
                'w-12 h-12': textSize === 'md',
                'w-14 h-14': textSize === 'lg',
                'w-16 h-16': ['xl', 'xxl', 'xxxl'].includes(textSize),
              }
            )}
            >
              {type === 'success' && <SuccessIcon />}
              {type === 'warning' && <InfoIcon />}
              {type === 'danger' && <ErrorIcon />}
              {type === 'info' && <InfoIcon />}
              {type === 'loading' && <LoadingIcon />}
            </div>
          )}

          <p className={clsx({
            'text-sm': textSize === Sizes.sm,
            'text-base': textSize === Sizes.md,
            'text-lg': textSize === Sizes.lg,
            'text-xl text-wrap': textSize === Sizes.xl,
            'text-2xl text-wrap': textSize === Sizes.xxl,
            'text-4xl text-wrap': textSize === Sizes.xxxl,
          }, 'font-bold max-w-120 text-wrap text-center')}
          >
            {title}
          </p>
        </div>

        <p className={clsx({
          'text-xs': textSize === Sizes.sm,
          'text-sm': textSize === Sizes.md,
          'text-base': textSize === Sizes.lg,
          'text-lg': textSize === Sizes.xl,
          'text-xl': textSize === Sizes.xxl,
          'text-2xl': textSize === Sizes.xxxl,
        }, 'opacity-50 max-w-120 text-wrap text-center')}
        >
          {subtitle}
        </p>
      </div>
    </AlertContainer>
  )
}
