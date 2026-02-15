import type { ParsedInputNode } from '@src/parse/parseNodeTypes'
import type { ProcedureFormData } from '@src/react-app/components/form/types'
import { FormLabel } from '@src/react-app/components/form/FormLabel'
import { BaseCheckboxField } from '@src/react-app/components/form/fields/base/BaseCheckboxField'
import { type Control, useController } from 'react-hook-form'

export function BooleanField({
  name,
  label,
  control,
  node,
}: {
  name: string
  label: string
  control: Control<ProcedureFormData>
  node: ParsedInputNode
}) {
  const { field, fieldState } = useController({ name, control })
  const path = node.path.join('.')
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <BaseCheckboxField
        fieldId={`${path}false`}
        label={'False'}
        onChange={() => field.onChange(false)}
        value={field.value === false}
      />
      <BaseCheckboxField
        fieldId={`${path}true`}
        label={'True'}
        onChange={() => field.onChange(true)}
        value={field.value === true}
        errorMessage={fieldState.error?.message}
      />
    </>
  )
}
