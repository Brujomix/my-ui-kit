import clsx from 'clsx'
import { InputProps } from '.'

export interface SelectOption {
  value: string | number
  label: string
}

interface SelectProps extends InputProps {
  options: SelectOption[]
  defaultValue?: SelectOption
  onChange?: (value: SelectOption) => void
}

export function InputSelect ({ label, options, name, placeholder, defaultValue, required = false, disabled, noWidthFull, size = 'md', onChange }: SelectProps) {
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
      <select
        defaultValue={defaultValue?.value}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange != null && onChange({ value: e.target.value, label: e.target.options[e.target.selectedIndex].text })}
        name={name}
        className={clsx(
          'bg-white border border-gray-200 text-gray-900 rounded-lg whitespace-nowrap focus:ring-primary-600 focus:border-primary-600 block w-full  dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500',
          {
            'text-sm p-2.5': size === 'md',
            'text-xs p-1': size === 'sm',
            'text-base p-3': size === 'lg'
          }
        )}
      >
        {placeholder != null && <option value=''>{placeholder}</option>}
        {
          options.map((o, i) => (
            <option key={i} value={o.value}>{o.label}</option>
          ))
        }
      </select>
    </label>
  )
}
