import type { ProcedureFormData } from '@src/react-app/components/form/types'
import { type Control, useController } from 'react-hook-form'
import { BaseSelectField } from './base/BaseSelectField'

interface EnumFieldProps {
  name: string
  label: string
  control: Control<ProcedureFormData>
  options: string[]
}
export function EnumField({ name, label, control, options, }: EnumFieldProps) {
  const { field, fieldState } = useController({ name, control, })

  return (
    <BaseSelectField
      options={options}
      value={field.value as string}
      onChange={field.onChange}
      errorMessage={fieldState.error?.message}
      label={label}
    />
  )
}
