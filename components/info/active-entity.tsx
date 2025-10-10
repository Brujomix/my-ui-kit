import clsx from 'clsx'
import React from 'react'
import { Sizes } from '../tools'

type ActiveEntityProps = {
  isActive: boolean
  size?: keyof typeof Sizes
}

export function ActiveEntity ({ isActive, size = Sizes.md }: ActiveEntityProps) {
  return (

    <div className={clsx(
      'rounded-full border',
      { 'w-4 h-4': Sizes.sm === size },
      { 'w-6 h-6': Sizes.md === size },
      { 'w-8 h-8': Sizes.lg === size },
      { 'w-10 h-8': Sizes.xl === size },
      { 'w-12 h-8': Sizes.xxl === size },
      { 'w-14 h-8': Sizes.xxxl === size },
      {
        'border-green-800 bg-green-600': isActive,
        'border-red-800 bg-red-600': !isActive
      }
    )}
    />
  )
}
