import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Colors, Sizes } from '../tools'

interface LoadingDotsProps {
  size?: keyof typeof Sizes
  color?: keyof typeof Colors
  speed?: number
  className?: string
  dotSize?: number
}

export const LoadingDots = ({
  size = 'md',
  color = 'primary',
  speed = 500,
  className = '',
  dotSize
}: LoadingDotsProps) => {
  const [opacities, setOpacities] = useState([1, 0.3, 0.6])

  const getRandomOpacity = () => Math.random() * 0.8 + 0.2

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacities([
        getRandomOpacity(),
        getRandomOpacity(),
        getRandomOpacity()
      ])
    }, speed)

    return () => clearInterval(interval)
  }, [speed])

  return (
    <div className={clsx(
      'flex items-center justify-center mt-10',
      {
        'gap-1': size === 'sm',
        'gap-1.5': size === 'md',
        'gap-2': size === 'lg' || size === 'xl',
        'gap-3': size === 'xxl',
        'gap-4': size === 'xxxl'
      },
      className
    )}
    >
      {opacities.map((opacity, index) => (
        <div
          key={index}
          className={clsx(
            'rounded-full transition-opacity duration-150 ease-in-out',
            {
              // Colors
              'bg-primary-600/80': color === 'primary',
              'bg-gray-600/80': color === 'secondary',
              'bg-red-600/80': color === 'danger',
              'bg-yellow-600/80': color === 'success',
              'bg-amber-600/80': color === 'warning',
              // Sizes
              'w-1.5 h-1.5': !dotSize && size === 'sm',
              'w-2.5 h-2.5': !dotSize && size === 'md',
              'w-4 h-4': !dotSize && size === 'lg',
              'w-5 h-5': !dotSize && size === 'xl',
              'w-6 h-6': !dotSize && size === 'xxl',
              'w-8 h-8': !dotSize && size === 'xxxl'
            }
          )}
          style={{
            ...(dotSize && {
              width: `${dotSize}px`,
              height: `${dotSize}px`
            }),
            opacity
          }}
        />
      ))}
    </div>
  )
}
