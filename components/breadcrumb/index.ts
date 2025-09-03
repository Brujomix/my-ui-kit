export * from './breadcrumb'
export * from './breadcrumb-item'
export * from './breadcrumb-separator'
export * from './use-breadcrumb'

export interface BreadcrumbItemProps {
  label: string
  detail?: string
  to?: string
}
