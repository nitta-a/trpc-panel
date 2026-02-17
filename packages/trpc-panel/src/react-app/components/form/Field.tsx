import { type ProcedureFormData, ROOT_VALS_PROPERTY_NAME } from '@src/react-app/components/form/types'
import type { Control } from 'react-hook-form'
import type { ParsedInputNode } from '../../../parse/parseNodeTypes'
import { ArrayField } from './fields/ArrayField'
import { BooleanField } from './fields/BooleanField'
import { DiscriminatedUnionField } from './fields/DiscriminatedUnionField'
import { EnumField } from './fields/EnumField'
import { LiteralField } from './fields/LiteralField'
import { NumberField } from './fields/NumberField'
import { ObjectField } from './fields/ObjectField'
import { TextField } from './fields/TextField'

interface FieldProps {
  inputNode: ParsedInputNode
  control: Control<ProcedureFormData>
}
export function Field({ inputNode, control, }: FieldProps) {
  const label = inputNode.path.join('.')
  const path = `${ROOT_VALS_PROPERTY_NAME}.${label}`

  const props = { name: path, label, control, node: inputNode }
  switch (inputNode.type) {
    case 'string':
      return <TextField {...props} />
    case 'number':
      return <NumberField {...props} />
    case 'object':
      return <ObjectField {...props} node={inputNode} />
    case 'boolean':
      return <BooleanField {...props} node={inputNode} />
    case 'enum':
      return <EnumField {...props} options={inputNode.enumValues} />
    case 'array':
      return <ArrayField {...props} node={inputNode} />
    case 'discriminated-union':
      return <DiscriminatedUnionField {...props} node={inputNode} />
    case 'literal':
      return <LiteralField />
    case 'unsupported':
      return null
  }
}
