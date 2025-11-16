import { FC, useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { ModalProps, useModals } from '../../hooks/modals'
import { Button } from '../tags/button'
import { InputSelect } from '../tags/input-select'

// Tipos base optimizados
export interface FilterFieldConfigBase<T = unknown> {
  key: string
  displayLabel: string
  dependentKeys?: readonly string[]
  nameDescriptionKey?: string
  default?: T
}

// Tipos para opciones de select
export interface FilterSelectOption {
  value: string
  label: string
}

// Union discriminada más específica con tipos genéricos
export type FilterFieldConfig =
  | FilterFieldConfigBase<string> & {
    type: 'select'
    options: readonly (string | FilterSelectOption)[]
  }
  | FilterFieldConfigBase<boolean> & {
    type: 'checkbox'
  }
  | FilterFieldConfigBase<Date> & {
    type: 'date'
  }
  | FilterFieldConfigBase<string> & {
    type: 'text'
  }

// Tipos auxiliares para mejor type safety
export type FilterFieldConfigSelect = Extract<FilterFieldConfig, { type: 'select' }>
export type FilterFieldConfigCheckbox = Extract<FilterFieldConfig, { type: 'checkbox' }>
export type FilterFieldConfigDate = Extract<FilterFieldConfig, { type: 'date' }>
export type FilterFieldConfigText = Extract<FilterFieldConfig, { type: 'text' }>

// Tipo helper para extraer el valor por defecto basado en el tipo
export type DefaultValueFor<T extends FilterFieldConfig> = T extends { type: infer U }
  ? U extends 'select' | 'text' ? string
    : U extends 'checkbox' ? boolean
      : U extends 'date' ? Date
        : never
  : never

// Tipos literales para los tipos de campo (evita magic strings)
export type FieldType = 'select' | 'checkbox' | 'date' | 'text'

// Configuración tipada para filtros avanzados
export interface TypedFilterConfig<T extends Record<string, unknown>> {
  fieldsConfig: FilterFieldConfig[]
  validateFields: (filters: T) => boolean
  toApiFilters: (filters: T) => Partial<T>
  getNameFields: () => string[]
}

// Version SUPER SIMPLE - solo pasa la configuración y ya está
// eslint-disable-next-line react-refresh/only-export-components
export function createFilterConfig<T extends Record<string, unknown>> (
  config: FilterFieldConfig[]
): TypedFilterConfig<T> {
  // Extraer todos los nameDescriptionKey automáticamente
  const nameFields = config
    .map(field => field.nameDescriptionKey)
    .filter((key): key is string => Boolean(key))

  return {
    fieldsConfig: config,
    validateFields: (filters: T) => {
      // Validar que todas las nameDescriptionKey existen en el tipo
      const allKeys = Object.keys(filters)
      return config.every(field => {
        if (field.nameDescriptionKey) {
          return allKeys.includes(field.nameDescriptionKey)
        }
        return true
      })
    },
    toApiFilters: (filters: T) => {
      // Crear copia sin los campos de nombre automáticamente
      const apiFilters = { ...filters }
      nameFields.forEach(field => {
        delete (apiFilters as Record<string, unknown>)[field]
      })
      return apiFilters as Partial<T>
    },
    getNameFields: () => nameFields
  }
}

export interface SearchWithAdvancedFilterProps<T extends { search?: string }> {
  filters: T
  onChange: (filters: T) => void
  ModalComponent?: FC<ModalProps<{ onApply: (filters: T) => void; currentFilters?: T }>>
  placeholder?: string
  fieldsConfig: FilterFieldConfig[]
  /**
   * Controla qué tipos de filtros se muestran en la sección de filtros aplicados
   * - true: Muestra todos los filtros aplicados
   * - false: No muestra filtros aplicados
   * - 'modal-only' (default): Solo muestra filtros que fueron aplicados desde el modal, no desde la UI visible
   */
  showAppliedFilters?: boolean | 'modal-only'
  /**
   * Controla el comportamiento de los checkboxes
   * - 'multiple' (default): Permite seleccionar múltiples checkboxes
   * - 'single': Solo permite seleccionar un checkbox a la vez (comportamiento de radio button)
   */
  checkboxSelectionMode?: 'multiple' | 'single'
}

export function SearchWithAdvancedFilter<T extends { search?: string }> ({
  filters,
  onChange,
  ModalComponent,
  placeholder = 'Buscar',
  fieldsConfig,
  showAppliedFilters = 'modal-only',
  checkboxSelectionMode = 'multiple'
}: SearchWithAdvancedFilterProps<T>) {
  // Estado local para el input de búsqueda
  const [localSearch, setLocalSearch] = useState(String(filters.search ?? ''))

  // Estado para rastrear qué filtros fueron aplicados desde el modal
  const [modalAppliedFilters, setModalAppliedFilters] = useState<Set<string>>(new Set())

  const { open } = useModals()

  const isDate = (value: unknown): value is Date => {
    return value instanceof Date && !isNaN(value.getTime())
  }

  const isDateString = (value: unknown): boolean => {
    if (typeof value !== 'string') return false
    const date = new Date(value)
    return !isNaN(date.getTime()) && value.includes('-') // formato ISO-like
  }

  const formatDateValue = (value: unknown): string => {
    let dateObj: Date

    if (isDate(value)) {
      dateObj = value as Date
    } else if (isDateString(value)) {
      dateObj = new Date(value as string)
    } else {
      return String(value)
    }

    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    return `${day}/${month}/${year}`
  }

  // Crear mapa para acceso rápido
  const configMap = new Map(fieldsConfig.map(config => [config.key, config]))

  // Debounce solo para el onChange global
  const debouncedOnChange = useDebouncedCallback((value: string) => {
    onChange({ ...filters, search: value })
  }, 500)

  // Actualizar el filtro global solo cuando localSearch cambia (con debounce)
  useEffect(() => {
    debouncedOnChange(localSearch)
  }, [localSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
  }

  const handleOpenModal = () => {
    if (!ModalComponent) return

    // Crear una copia de los filtros para evitar problemas de serialización
    const sanitizedFilters = { ...filters }
    Object.keys(sanitizedFilters).forEach(key => {
      const value = (sanitizedFilters as Record<string, unknown>)[key]
      if (isDate(value)) {
        // Convertir fechas a string ISO para evitar problemas en el modal
        (sanitizedFilters as Record<string, unknown>)[key] = (value as Date).toISOString().split('T')[0]
      } else if (isDateString(value)) {
        // Si ya es un string de fecha, asegurar formato correcto
        const dateObj = new Date(value as string)
        if (!isNaN(dateObj.getTime())) {
          (sanitizedFilters as Record<string, unknown>)[key] = dateObj.toISOString().split('T')[0]
        }
      }
    })

    open({
      Component: ModalComponent,
      props: {
        onApply: (newFilters: T) => {
          // Rastrear qué campos fueron modificados/aplicados desde el modal
          const appliedKeys = new Set<string>()
          Object.keys(newFilters).forEach(key => {
            if (key !== 'search' && newFilters[key as keyof T] !== undefined) {
              appliedKeys.add(key)
            }
          })
          setModalAppliedFilters(appliedKeys)

          onChange({ ...filters, ...newFilters })
        },
        currentFilters: sanitizedFilters
      }
    })
  }

  return (
    <div className='flex flex-col gap-4 w-full'>
      {/* Input y Modal filter */}
      <div className='flex items-center gap-2 w-full'>
        <input
          type='text'
          value={localSearch}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className='py-2.5 text-sm font-medium placeholder:font-light rounded-lg bg-transparent focus:outline-none flex-1 border border-gray-200 dark:border-gray-700 px-4'
        />
        {ModalComponent && (
          <Button onClick={handleOpenModal}>Filtros avanzados</Button>
        )}
      </div>

      {/* Filtros aplicados */}
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          {showAppliedFilters && Object.entries(filters)
            .filter(([key, value]) => {
              // Filtrar search, valores vacíos/undefined
              if (key === 'search' || value === undefined || value === '') return false
              // Solo mostrar campos que estén en la configuración
              const fieldConfig = configMap.get(key)
              if (!fieldConfig) return false
              // No mostrar los checkbox en la izquierda
              if (fieldConfig.type === 'checkbox') return false

              // Si el modo es 'modal-only', solo mostrar filtros que fueron aplicados desde el modal
              if (showAppliedFilters === 'modal-only') {
                return modalAppliedFilters.has(key)
              }

              return true
            })
            .sort(([keyA], [keyB]) => {
              // Ordenar las fechas: 'from' primero, luego 'to'
              if (keyA === 'from' && keyB === 'to') return -1
              if (keyA === 'to' && keyB === 'from') return 1
              // Para otros campos, mantener el orden original
              return 0
            })
            .map(([key, value]) => {
              const fieldConfig = configMap.get(key)
              if (!fieldConfig) return null

              let displayValue: string = ''
              const displayLabel = fieldConfig.displayLabel

              // Si hay una clave de descripción (nombre legible), usar esa en lugar del ID
              const actualValue = fieldConfig.nameDescriptionKey && (filters as Record<string, unknown>)[fieldConfig.nameDescriptionKey]
                ? (filters as Record<string, unknown>)[fieldConfig.nameDescriptionKey]
                : value

              if (isDate(actualValue) || isDateString(actualValue)) {
                displayValue = formatDateValue(actualValue)
              } else {
                displayValue = String(actualValue)
              }

              return (
                <div key={key} className='flex items-center gap-1 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>
                  <>
                    <span>{displayLabel}: </span>
                    <strong>{displayValue}</strong>
                    <button
                      type='button'
                      className='ml-1 px-1 text-red-700 hover:text-red-600'
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()

                        const updated: Record<string, unknown> = { ...filters }

                        // Eliminar el campo principal
                        delete updated[key]

                        // Si hay una clave de descripción, también eliminarla
                        if (fieldConfig.nameDescriptionKey) {
                          delete updated[fieldConfig.nameDescriptionKey]
                        }

                        // Si hay claves dependientes, también eliminarlas
                        if (fieldConfig.dependentKeys) {
                          fieldConfig.dependentKeys.forEach(depKey => {
                            delete updated[depKey]
                            // También eliminar las descripciones de las claves dependientes
                            const depConfig = configMap.get(depKey)
                            if (depConfig?.nameDescriptionKey) {
                              delete updated[depConfig.nameDescriptionKey]
                            }
                          })
                        }

                        // Asegurar que undefined se convierte a un objeto sin esas propiedades
                        const cleanedFilters = Object.fromEntries(
                          Object.entries(updated).filter(([, value]) => value !== undefined && value !== '')
                        ) as T

                        // Remover de filtros aplicados desde modal cuando se elimina
                        setModalAppliedFilters(prev => {
                          const newSet = new Set(prev)
                          newSet.delete(key)
                          if (fieldConfig.dependentKeys) {
                            fieldConfig.dependentKeys.forEach(depKey => newSet.delete(depKey))
                          }
                          return newSet
                        })

                        // Forzar re-render y actualización inmediata
                        onChange(cleanedFilters)
                      }}
                      aria-label={`Eliminar filtro ${displayLabel}`}
                    >
                      ×
                    </button>
                  </>
                </div>
              )
            })
            .filter(Boolean)}
        </div>

        <div className='flex gap-4'>
          {fieldsConfig
            .filter(field => field.type === 'checkbox' || field.type === 'select')
            .map(field => {
              if (field.type === 'checkbox') {
                // Si el valor no está en filters, usar el default
                const filterValue = (filters as Record<string, unknown>)[field.key]
                const checkboxField = field as FilterFieldConfigCheckbox
                const checked = typeof filterValue !== 'undefined'
                  ? !!filterValue
                  : !!checkboxField.default
                return (
                  <CustomCheckbox
                    key={field.key}
                    checked={checked}
                    label={field.displayLabel}
                    onChange={checked => {
                      // Remover del conjunto de filtros aplicados desde modal cuando se cambia desde UI
                      setModalAppliedFilters(prev => {
                        const newSet = new Set(prev)
                        newSet.delete(field.key)
                        return newSet
                      })

                      let updatedFilters = { ...filters }

                      if (checkboxSelectionMode === 'single' && checked) {
                        // En modo single, desactivar todos los otros checkboxes
                        const checkboxFields = fieldsConfig.filter(f => f.type === 'checkbox')
                        checkboxFields.forEach(checkboxField => {
                          if (checkboxField.key !== field.key) {
                            updatedFilters = { ...updatedFilters, [checkboxField.key]: false }
                          }
                        })
                      }

                      updatedFilters = { ...updatedFilters, [field.key]: checked }
                      onChange(updatedFilters)
                    }}
                  />
                )
              }
              // Select
              if (field.type === 'select') {
                const selectField = field as FilterFieldConfigSelect

                // Normalizar opciones: convertir strings a objetos {value, label}
                const selectOptions = selectField.options.map(opt => {
                  if (typeof opt === 'string') {
                    return { value: opt, label: opt }
                  }
                  return { value: opt.value, label: opt.label }
                })

                const filterValue = (filters as Record<string, unknown>)[field.key]
                const selectedValue = selectOptions.find(
                  optObj => optObj.value === (filterValue ?? selectField.default ?? '')
                )

                return (
                  <div key={field.key} className='flex justify-center items-center gap-2'>
                    <span>{field.displayLabel}</span>
                    <InputSelect
                      key={`${field.key}-${filterValue}`}
                      defaultValue={selectedValue}
                      options={selectOptions}
                      onChange={option => {
                        console.log('Select onChange triggered:', {
                          fieldKey: field.key,
                          optionValue: option.value,
                          currentFilters: filters
                        })

                        // Remover del conjunto de filtros aplicados desde modal cuando se cambia desde UI
                        setModalAppliedFilters(prev => {
                          const newSet = new Set(prev)
                          newSet.delete(field.key)
                          return newSet
                        })

                        const updatedFilters = { ...filters, [field.key]: option.value }
                        onChange(updatedFilters)
                      }}
                    />
                  </div>
                )
              }
              return null
            })}
        </div>
      </div>
    </div>
  )
}

interface CustomCheckboxProps {
  checked: boolean
  label: string
  onChange: (checked: boolean) => void
}

export function CustomCheckbox ({ checked, label, onChange }: CustomCheckboxProps) {
  return (
    <button
      type='button'
      className={`px-2 rounded transition-colors outline outline-2 outline-slate-400 ${checked ? 'bg-gray-400 text-black' : 'bg-gray-800'}`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      {label}
    </button>
  )
}
