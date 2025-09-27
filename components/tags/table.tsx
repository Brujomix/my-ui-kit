import { ChangeEvent, Fragment, ReactNode } from 'react'
import { Link, To } from 'react-router-dom'

interface TableCellProps {
  className?: string
  children: ReactNode
}

export function TableCell ({ className, children }: TableCellProps) {
  return (
    <td className={`px-2 py-2 whitespace-nowrap ${className}`}>
      {children}
    </td>
  )
}

interface TableCellLinkProps extends TableCellProps {
  to: To
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any
}

export function TableCellLink ({ className, children, to, state }: TableCellLinkProps) {
  return (
    <td className={className}>
      <Link
        to={to}
        state={state}
        className='px-4 py-2 whitespace-nowrap'
      >
        {children}
      </Link>
    </td>
  )
}

interface TableCellButtonProps extends TableCellProps {
  onClick: () => void
}

export function TableCellButton ({ className, children, onClick }: TableCellButtonProps) {
  return (
    <td className={className}>
      <button
        onClick={onClick}
        className='px-4 py-2 whitespace-nowrap'
      >
        {children}
      </button>
    </td>
  )
}

interface TableCellCheckboxProps {
  className?: string
  selected: boolean
  onChange: (checked: boolean) => void
}

export function TableCellCheckbox ({ className, selected, onChange }: TableCellCheckboxProps) {
  return (
    <td
      className={`max-w-8 w-8 pl-4 ${className}`}
    >
      <input
        type='checkbox'
        className='form-checkbox text-blue-500 h-4 w-4 mt-1'
        checked={selected}
        onChange={(event) => onChange(event.target.checked)}
      />
    </td>
  )
}

interface TableCellActionProps {
  children: ReactNode
}

export function TableCellActions ({ children }: TableCellActionProps) {
  return (
    <td className='px-4 py-2'>
      <div
        className='flex justify-end items-center gap-2 md:invisible group-hover:visible'
      >
        {children}
      </div>
    </td>
  )
}

interface TableItemProps {
  children: ReactNode
}

export function TableItem ({ children }: TableItemProps) {
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50/30 dark:hover:bg-gray-600/30 group'>
      {children}
    </tr>
  )
}

export interface SortStatus<T> {
  sortBy: T
  sortDirection: 'asc' | 'desc'
}

interface TableColumnWithSortedProps<T> {
  children: string
  sortKey: T
  currentSort: SortStatus<T>
  onChange: (sort: SortStatus<T>) => void
}

export function TableColumnWithSorted<T> ({ children, sortKey, currentSort, onChange }: TableColumnWithSortedProps<T>) {
  const handleClick = () => {
    if (sortKey === currentSort.sortBy) {
      onChange({
        sortBy: sortKey,
        sortDirection: currentSort.sortDirection === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onChange({
        sortBy: sortKey,
        sortDirection: currentSort.sortDirection
      })
    }
  }

  return (
    <th
      scope='col'
      className='px-4 py-3'
    >
      <button
        type='button'
        className='flex items-center gap-1 uppercase'
        onClick={handleClick}
      >
        {children}
        {
        sortKey === currentSort.sortBy && (
          <svg
            className={`w-3 h-3 ${currentSort.sortDirection === 'asc' ? 'transform rotate-180' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 15l7-7 7 7'
            />
          </svg>
        )
      }
      </button>
    </th>
  )
}

interface TableProps {
  children: ReactNode
  columns: ReactNode[]
  isSelectedAll?: boolean
  onSelectAll?: (checked: boolean) => void
}

export function Table ({ children, columns, onSelectAll, isSelectedAll }: TableProps) {
  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (onSelectAll != null) {
      onSelectAll(event.target.checked)
    }
  }

  return (
    <div className='overflow-x-auto w-full max-w-full max-h-full shadow-md rounded-lg custom-scrollbar h-full bg-gray-600/10'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className=' text-xs text-gray-700 uppercase bg-gray-50/90 dark:bg-gray-700/90 dark:text-gray-400'>
          <tr>
            <>
              {
                onSelectAll != null && (
                  <th className='max-w-8 w-8'>
                    <input
                      type='checkbox'
                      checked={isSelectedAll}
                      className='form-checkbox text-blue-500 h-2 w-4 mt-0.5'
                      onChange={handleSelectAll}
                    />
                  </th>
                )
              }
              {
                columns.map((column, index) => (
                  <Fragment key={index}>
                    {
                      typeof column === 'string'
                        ? (
                          <th key={index} scope='col' className='px-2 py-1'>
                            {column}
                          </th>
                          )
                        : column
                    }
                  </Fragment>
                ))
              }
            </>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )
}

export function TableSkeleton ({ columns, length = 5 }: { columns: string[]; length?: number }) {
  return (
    <div className='overflow-x-auto w-full max-w-full max-h-full shadow-md rounded-lg custom-scrollbar'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-y-auto'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50/90 dark:bg-gray-700/90 dark:text-gray-400'>
          <tr>
            {
              columns.map((column, index) => (
                <th key={index} scope='col' className='px-6 py-3'>
                  {column}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            Array.from({ length }).map((_, index) => (
              <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                {
                  columns.map((_, index) => (
                    <td key={index} className='px-6 py-4 whitespace-nowrap'>
                      <div className='animate-pulse bg-gray-200/80 dark:bg-gray-700/80 h-4 w-20 rounded-lg' />
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
