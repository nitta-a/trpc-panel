import MoonIcon from '@mui/icons-material/Brightness2'
import CirclesIcon from '@mui/icons-material/JoinRight'
import type { ParsedInputNode } from '@src/parse/parseNodeTypes'
import type { ProcedureFormData } from '@src/react-app/components/form/types'
import { BaseSelectField } from '@src/react-app/components/form/fields/base/BaseSelectField'
import { FieldError } from '@src/react-app/components/form/fields/FieldError'
import { ObjectField } from '@src/react-app/components/form/fields/ObjectField'
import { defaultFormValuesForNode } from '@src/react-app/components/form/utils'
import { InputGroupContainer } from '@src/react-app/components/InputGroupContainer'
import { type Control, useController } from 'react-hook-form'

export function DiscriminatedUnionField({
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
  // TODO figure out why this wasn't working in the props type
  const nodeTypecast = node as ParsedInputNode & {
    type: 'discriminated-union'
  }
  const { field, fieldState } = useController({
    name,
    control,
  })
  function onDiscriminatorChange(value: string | undefined) {
    if (!value) return
    const newObj = nodeTypecast.discriminatedUnionChildrenMap[value]!
    const defaultValues = defaultFormValuesForNode(newObj)
    const newDefaultValues = {
      ...(typeof defaultValues === 'object' && defaultValues !== null ? defaultValues : {}),
      [nodeTypecast.discriminatorName]: value,
    }
    field.onChange(newDefaultValues)
  }
  const children = nodeTypecast.discriminatedUnionChildrenMap[
    (field.value as Record<string, unknown>)[nodeTypecast.discriminatorName] as string
  ]! as ParsedInputNode & { type: 'object' }
  return (
    <InputGroupContainer
      title={label}
      iconElement={<CirclesIcon className="mr-1" />}
    >
      <BaseSelectField
        onChange={onDiscriminatorChange}
        value={(field.value as Record<string, unknown>)[nodeTypecast.discriminatorName] as string}
        label="Name"
        options={nodeTypecast.discriminatedUnionValues}
      />
      <ObjectField
        control={control}
        node={children}
        overrideIconElement={<MoonIcon className="mr-1" />}
        label={``}
      />
      {fieldState.error?.message && (
        <FieldError
          errorMessage={
            fieldState.error.message +
            ` (make sure to pass required properties)`
          }
        />
      )}
    </InputGroupContainer>
  )
}
