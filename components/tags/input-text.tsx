import clsx from 'clsx'
import { InputProps } from '.'

type InputTextProps = {
  onChange: (value: string) => void
  value: string
} & InputProps

export function InputText ({ onChange, value, label, size, noWidthFull, placeholder }: InputTextProps) {
  return (
    <label
      className={clsx(
        'flex flex-col gap-1 whitespace-nowrap',
        {
          'w-full': !noWidthFull,
          'max-w-fit': noWidthFull
        }
      )}
    >
      <span
        className={clsx(
          'text-sm font-medium text-gray-400 whitespace-nowrap',
          {
            'text-xs': size === 'sm'
          }
        )}
      >
        {label}
      </span>
      <input
        type='text'
        className={clsx(
          'bg-white border px-3 py-1 border-gray-200 text-gray-900 rounded-lg whitespace-nowrap focus:ring-primary-600 focus:border-primary-600 block w-full  dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500',
          {
            'text-sm ': size === 'md',
            'text-xs ': size === 'sm',
            'text-base': size === 'lg'
          }
        )}
        placeholder={placeholder ?? 'Buscar'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
