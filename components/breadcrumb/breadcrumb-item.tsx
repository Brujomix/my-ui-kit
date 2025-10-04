import { Link } from 'react-router-dom'
import { BreadcrumbItemProps } from './'

export function BreadcrumbItem ({ to, label, detail }: BreadcrumbItemProps) {
  return (
    <>
      {
        to == null && (
          <div
            className='flex flex-col'
          >
            <span className='whitespace-nowrap text-xs font-bold text-gray-700 dark:text-gray-400'>
              {label}
            </span>
            {
              detail != null && (
                <span className='whitespace-nowrap text-xs text-gray-700/50 dark:text-gray-400/50'>
                  {detail}
                </span>
              )
            }
          </div>
        )
      }
      {
        to != null && (
          <Link
            to={to}
            className='flex flex-col'
          >
            <span
              className='whitespace-nowrap text-xs font-bold text-gray-700 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white'
            >
              {label}
            </span>
            {
              detail != null && (
                <span className='whitespace-nowrap text-xs text-gray-700/50 dark:text-gray-400/50'>
                  {detail}
                </span>
              )
            }
          </Link>
        )
      }
    </>
  )
}

export function BreadcrumbItemSkeleton () {
  return (
    <div className='flex flex-col flex-nowrap w-max gap-1'>
      <div className='w-16 h-1 rounded bg-gray-200 dark:bg-gray-700 animate-pulse' />
      <div className='w-24 h-2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse' />
    </div>
  )
}
