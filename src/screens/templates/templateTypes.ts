import type React from 'react'
import type { ColDef } from 'ag-grid-community'

export type TemplateBaseProps<TConfig = unknown> = {
  screenId: string
  title?: string
  config?: TConfig
}

export type FormFieldType = 'input' | 'select' | 'date' | 'checkbox' | 'radio'

export type FormFieldConfig = {
  key: string
  label: string
  type: FormFieldType
  required?: boolean
  span?: number
  placeholder?: string
  options?: Array<{ label: string; value: string }>
}

export type FormTemplateConfig = {
  [key: string]: unknown
  uiType?: string
  fields?: FormFieldConfig[]
  submitLabel?: string
  cancelLabel?: string
  onCancel?: () => void
  extraActions?: React.ReactNode
  sections?: FormSectionConfig[]
  onSubmit?: (values: unknown) => void
  initialValues?: Record<string, unknown>
}

export type FormSectionConfig = {
  key: string
  title: string
  content: React.ReactNode
}

export type ListSearchFieldType = 'input' | 'select' | 'dateRange'

export type ListSearchFieldConfig = {
  key: string
  label: string
  type: ListSearchFieldType
  placeholder?: string
  options?: Array<{ label: string; value: string }>
}

export type ListButtonConfig = {
  key: string
  label: string
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text'
  disabled?: boolean
  onClick?: () => void
}

export type ListTemplateConfig<TData extends object = Record<string, unknown>> = {
  [key: string]: unknown
  uiType?: string
  searchFields?: ListSearchFieldConfig[]
  columns?: ColDef<TData>[]
  buttons?: ListButtonConfig[]
  /** Optional fixed height (px). Default 520 */
  height?: number
  /** Data to show in the grid (legacy name used by generated screens) */
  sampleData?: TData[]
  /** Alternate name for grid data */
  rowData?: TData[]
  /** Footer action buttons */
  footerButtons?: ListButtonConfig[]
  onSearch?: (values: unknown) => void
  onCreate?: () => void
  onExport?: () => void
}

export type PopupTemplateConfig = {
  [key: string]: unknown
  okText?: string
  cancelText?: string
  width?: number
  content?: React.ReactNode
  onOk?: () => void

  wrapClassName?: string
}

export type DetailItemConfig = {
  key: string
  label: string
  value?: React.ReactNode
}

export type DetailButtonConfig = {
  key: string
  label: string
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text'
  disabled?: boolean
  onClick?: () => void
}

export type DetailTemplateConfig = {
  [key: string]: unknown
  uiType?: string
  items?: DetailItemConfig[]
  buttons?: DetailButtonConfig[]
}
