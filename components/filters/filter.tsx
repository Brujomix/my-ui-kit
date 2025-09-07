
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { SearchIcon } from '../icons'

type FilterTermConfigSelect<O extends string[] = string[]> = {
  label: string
  type: 'select'
  options: O
  default: O[number]     // ← “uno de los elementos de options”
}

type FilterTermConfigCheckbox = {
  label: string
  type?: 'checkbox'      // ← Por defecto es checkbox
  default: boolean
}

export type TermConfigBase = Record<string, (FilterTermConfigSelect | FilterTermConfigCheckbox)>

type TermValue<T extends FilterTermConfigCheckbox | FilterTermConfigSelect> =
  T['type'] extends 'checkbox'
    ? boolean
    : T['type'] extends 'select'
      ? string
      : never

type TermsFromConfig<T extends TermConfigBase> = {
  [K in keyof T]: TermValue<T[K]>
}

type FilterStatusWithTerms<T extends TermConfigBase> = {
  search: string
  terms: TermsFromConfig<T>
}

interface FilterStatusWithoutTerms {
  search: string
  terms?: undefined
}

export type FilterStatus<T extends TermConfigBase | undefined = undefined> =
T extends TermConfigBase
  ? FilterStatusWithTerms<T>
  : FilterStatusWithoutTerms

type Props<T extends TermConfigBase | undefined> = {
  placeholder?: string
  onChange?: (filter: FilterStatus<T>) => void
  terms: T
}

export const getDefaultFilterStatus = <T extends TermConfigBase | undefined = undefined> (terms?: T): FilterStatus<T> => {
  return {
    search: '',
    terms: terms
      ? Object.keys(terms).reduce((acc, term) => {
        (acc as Record<string, boolean | string>)[term] = terms[term].default
        return acc
      }, {} as Record<string, boolean | string>)
      : undefined
  } as FilterStatus<T>
}

export function Filter<T extends TermConfigBase | undefined = undefined> ({ placeholder = 'Buscar', onChange, terms: termsProps }: Props<T>) {
  const isFistRender = useRef(true)

  const [status, setStatus] = useState<FilterStatus<T>>(getDefaultFilterStatus(termsProps))

  useEffect(() => {
    if (isFistRender.current) {
      isFistRender.current = false
      return
    }

    onChange?.(status)
  }, [status])

  const handleSearchToggle = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value

    setStatus((prev) => ({
      ...prev,
      search
    }))
  }, 500)

  const handleTermToggle = (term: string) => {
    setStatus((prev) => ({
      ...prev,
      terms: {
        ...prev.terms!,
        [term]: !prev.terms![term]
      }
    }))
  }

  const handleSelectChange = (term: string, value: string) => {
    setStatus((prev) => ({
      ...prev,
      terms: {
        ...prev.terms!,
        [term]: value
      }
    }))
  }

  return (
    <div
      className='flex flex-row items-center pl-4 pr-2 mb-4 w-full text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg'
    >
      <SearchIcon
        className='w-4 h-4 mr-2 opacity-60'
      />
      <input
        onChange={handleSearchToggle}
        placeholder={placeholder}
        className='py-2.5 text-sm font-medium placeholder:font-light rounded-lg bg-transparent focus:outline-none flex-1'
        type='text'
      />
      {
        termsProps && (
          <div className='flex items-center gap-2 ml-2'>
            {Object.keys(termsProps).map((term) => {
              const config = termsProps[term]
              if (config.type === 'select' && config.options) {
                return (
                  <label key={term} className='flex items-center gap-1 text-xs px-2 py-1 rounded cursor-pointer'>
                    {config.label}
                    <select
                      value={typeof status.terms![term] === 'string' ? status.terms![term] as string : ''}
                      onChange={e => handleSelectChange(term, e.target.value)}
                      className='ml-1 px-2 py-1 rounded border bg-gray-400/80 border-gray-800 text-xs text-gray-900'
                    >
                      {config.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                )
              }
              // Default: checkbox
              return (
                <label
                  key={term}
                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded cursor-pointer transition-colors
                    ${status.terms![term]
                      ? 'bg-gray-400/80 text-gray-900'
                      : 'bg-transparent text-gray-800/80 dark:text-gray-400/80 border border-gray-500/20'}
                  `}
                >
                  <input
                    type='checkbox'
                    checked={!!status.terms![term]}
                    onChange={() => handleTermToggle(term)}
                    className='form-checkbox text-blue-500 h-4 w-4'
                    style={{ accentColor: status.terms![term] ? '#333' : undefined }}
                  />
                  {config.label}
                </label>
              )
            })}
          </div>
        )
      }
    </div>
  )
}
