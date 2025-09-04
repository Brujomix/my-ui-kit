import { FC, MouseEvent, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form-field'
import { useDebouncedCallback } from 'use-debounce'
import { CrossIcon, IconProps } from '../icons'
import { Badge } from '../badges/badge'
import { Button } from '../tags'

export type IInputEntityEntity = {
  labelTitle: string
  labelDescription?: string
  labelBadge?: string
  value: string | number
}

interface Props {
  searchEntities: (params: { search: string }) => Promise<IInputEntityEntity[]>
  label?: string
  subLabel?: string
  name: string
  nameDescription?: string
  convertEmptyToUndefined?: boolean
  convertToNumber?: boolean
  extraButton?: {
    label: string
    Icon?: FC<IconProps>
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
  }
  direction?: 'row' | 'column'
  disabled?: boolean
  defaultSearch?: string
  conserveSearch?: boolean
}

export function InputEntity ({ searchEntities, label, subLabel, name, nameDescription, convertEmptyToUndefined, convertToNumber, extraButton, direction, disabled, defaultSearch: initialDefaultSearch, conserveSearch }: Props) {
  const [defaultSearch, setDefaultSearch] = useState<string | undefined>(initialDefaultSearch)

  const { register, setValue, watch, formState, clearErrors } = useFormContext()
  const errorMessage = formState.errors?.[name]?.message as string

  const value = watch(name) as string

  // cuando cambia value, limpia lo errores del campo
  useEffect(() => {
    clearErrors(name)
  }, [value, clearErrors, name])

  const [selectedEntity, setSelectedEntity] = useState<IInputEntityEntity | undefined>()
  const [searchResults, setSearchResults] = useState<IInputEntityEntity[] | undefined>()
  const [isFocused, setIsFocused] = useState(false)

  // Función de search
  const search = async (search: string) => {
    if (conserveSearch === true) {
      setDefaultSearch(search)
    }

    if (search == null) {
      setSearchResults(undefined)
    }

    searchEntities({ search })
      .then(res => {
        setSearchResults(res)
      })
      .catch(() => {
        setSearchResults([])
      })
  }

  const handleSearch = useDebouncedCallback(search, 300)

  // Si tiene un valor de búsqueda por defecto, se ejecuta la búsqueda
  useEffect(() => {
    const callSearch = async () => {
      if (initialDefaultSearch != null) {
        await search(initialDefaultSearch)

        if (conserveSearch !== true) {
          setDefaultSearch(undefined)
        }
      }
    }
    callSearch()
  }, [])

  // Select entity when value is set from search results is available
  // if search results are not available, search for empty string
  useEffect(() => {
    console.log('####', name, typeof value, value)

    if (value == null) {
      console.log('#### No hay valor, no se puede seleccionar')
      setSelectedEntity(undefined)
      return
    }

    const selectEntity = async () => {
      if (searchResults == null) {
        await search('')
        return
      }

      const entity = searchResults?.find(entity => entity.value === value)
      setSelectedEntity(entity)
    }

    selectEntity()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, searchResults])

  // No se que hace, no tiene sentido
  /* useEffect(() => {
    if (value == null) {
      return
    }

    const entity = searchResults?.find(entity => entity.value === value)

    if (entity == null) {
      console.log('#### No se encontró la entidad, buscando...')
      search('')
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]) */

  const handleSelectEntity = (entity: IInputEntityEntity | undefined) => (event: MouseEvent<HTMLButtonElement>) => {
    setValue(name, entity?.value !== '' ? entity?.value : undefined)
    if (nameDescription != null) {
      setValue(nameDescription, entity?.labelTitle !== '' ? entity?.labelTitle : undefined)
    }
    event.preventDefault()
  }

  return (
    <FormField
      label={label}
      subLabel={subLabel}
      error={errorMessage}
      direction={direction}
    >
      {
        selectedEntity != null && (
          <>
            <div
              className='flex flex-row w-full justify-between items-center gap-4 py-0.5 px-2.5 bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white'
            >
              <span className='flex flex-col justify-center gap-0 flex-1 min-h-9'>
                <h5 className='text-sm tracking-tight text-gray-900 dark:text-white whitespace-nowrap'>
                  {selectedEntity.labelTitle}
                </h5>
                <small
                  className='flex items-center gap-1 text-xs opacity-50 whitespace-nowrap'
                >
                  {selectedEntity.labelDescription}
                </small>
              </span>
              {
                selectedEntity.labelBadge != null && (
                  <Badge>
                    {selectedEntity.labelBadge}
                  </Badge>
                )
              }
              <div>
                <Button
                  onClick={handleSelectEntity(undefined)}
                  disabled={disabled}
                >
                  Cambiar
                </Button>
              </div>
            </div>
          </>
        )
      }
      {
        selectedEntity == null && (
          <>
            <input
              onFocus={() => { setIsFocused(true) }}
              onBlur={() => { setTimeout(() => { setIsFocused(false) }, 250) }}
              type='search'
              className='w-full text-sm font-medium text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300'
              onChange={(e) => { handleSearch(e.target.value) }}
              disabled={disabled}
              defaultValue={defaultSearch}
            />
            {
              extraButton != null && (
                <div
                  className='absolute right-2.5 bottom-1.5'
                >
                  <Button
                    // eslint-disable-next-line react/jsx-handler-names
                    onClick={extraButton.onClick}
                    disabled={disabled}
                  >
                    {extraButton.label}
                  </Button>
                </div>
              )
            }
            {
              disabled !== true && searchResults != null && searchResults.length > 0 && isFocused && (
                <ul
                  className='scrollbar absolute z-40 top-[5rem] max-h-36 w-full overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2 overflow-hidden'
                >
                  {
                    searchResults.map((entity) => (
                      <li
                        key={`item-${entity.value}`}
                        className='hover:bg-gray-100 dark:hover:bg-gray-700 flex flex-row gap-2 items-center py-1 px-3 group'
                      >
                        <button
                          type='button'
                          onClick={handleSelectEntity(entity)}
                          className='flex flex-row gap-4 items-center justify-between p-1 w-full'
                        >
                          <div className='flex flex-col gap-0'>
                            <h5 className='text-sm tracking-tight text-gray-900 dark:text-white flex items-center gap-2'>
                              {entity.labelTitle}
                            </h5>
                            <small
                              className='flex items-center gap-1 text-xs'
                            >
                              {entity.labelDescription}
                            </small>
                          </div>
                          {
                            entity.labelBadge != null && (
                              <Badge>
                                {entity.labelBadge}
                              </Badge>
                            )
                          }
                        </button>
                      </li>
                    ))
                  }
                </ul>
              )
            }
          </>
        )
      }
      <input
        type='hidden'
        className='absolute top-8 left-32 w-1 h-1 bg-transparent border-0 outline-none opacity-0'
        {...register(
          name,
          {
            setValueAs: convertEmptyToUndefined ? (v) => v === '' ? undefined : (convertToNumber === true ? Number(v) : v) : undefined
          }
        )}
      />
      {
        nameDescription != null && (
          <input
            type='hidden'
            className='absolute top-8 left-32 w-1 h-1 bg-transparent border-0 outline-none opacity-0'
            {...register(
              nameDescription,
              {
                setValueAs: convertEmptyToUndefined ? (v) => v === '' ? undefined : v : undefined
              }
            )}
          />
        )

      }
    </FormField>
  )
}
