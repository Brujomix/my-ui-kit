import { FC, ReactNode } from 'react'
import { IconProps } from '../icons'
import clsx from 'clsx'

export interface HeaderInternalProps {
  title: string
  subtitle?: string
  searchContent?: ReactNode
  toolbarContent?: ReactNode
  Icon?: FC<IconProps>
}

interface HeaderProps extends HeaderInternalProps {
  size?: 'sm' | 'md' | 'lg'
}

export function Title ({ title, subtitle, searchContent, toolbarContent, Icon, size = 'lg' }: HeaderProps) {
  return (
    <header className='w-full flex flex-row justify-between items-center'>
      <div
        className='flex flex-row gap-2 items-center flex-1'
      >
        {
          Icon && (
            <Icon
              className={clsx({
                'w-8 h-8': size === 'lg',
                'w-7 h-7': size === 'md',
                'w-6 h-6': size === 'sm'
              })}
            />
          )
        }
        <div
          className='flex flex-col gap-0'
        >

          <h1
            className={clsx({
              'text-2xl': size === 'lg',
              'text-xl': size === 'md',
              'text-base': size === 'sm'
            })}
          >
            {title}
          </h1>

          {
          subtitle && (
            <h2
              className={
                clsx(
                  'font-light opacity-80',
                  {
                    'text-sm': size === 'lg',
                    'text-xs': size === 'md' || size === 'sm'
                  }
                )
              }
            >
              {subtitle}
            </h2>
          )
        }
        </div>
        {
          searchContent && (
            <div
              className='flex flex-row items-center justify-end gap-4 ml-4 flex-1'
            >
              {searchContent}
            </div>
          )
        }
      </div>
      {
        toolbarContent && (
          <div
            className='flex flex-row items-center gap-4'
          >
            {toolbarContent}
          </div>
        )
      }
    </header>
  )
}
