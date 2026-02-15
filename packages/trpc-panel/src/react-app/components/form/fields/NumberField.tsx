import type { ParsedInputNode } from '@src/parse/parseNodeTypes'
import type { ProcedureFormData } from '@src/react-app/components/form/types'
import { useEffect, useState } from 'react'
import { type Control, useController } from 'react-hook-form'
import { BaseTextField } from './base/BaseTextField'

export function NumberField({
  name,
  control,
  label,
  node: inputNode,
}: {
  name: string
  label: string
  control: Control<ProcedureFormData>
  node: ParsedInputNode
}) {
  const [stringValue, setStringValue] = useState('')

  const { field, fieldState } = useController({
    control,
    name,
  })

  function onChange(value: string) {
    setStringValue(value.replace(/[^\d.-]/g, ''))
  }

  useEffect(() => {
    const parsed = parseFloat(stringValue)
    if (Number.isNaN(parsed)) {
      field.onChange(undefined)
      return
    }
    field.onChange(parseFloat(stringValue))
  }, [stringValue, field.onChange])

  return (
    <BaseTextField
      onChange={onChange}
      value={stringValue}
      errorMessage={fieldState.error?.message}
      label={label}
      fieldId={inputNode.path.join('.')}
      inputProps={{ inputMode: 'decimal' }}
    />
  )
}
