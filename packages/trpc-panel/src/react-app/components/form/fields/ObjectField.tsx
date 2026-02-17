import ObjectIcon from '@mui/icons-material/DataObjectOutlined'
import type { ParsedInputNode } from '@src/parse/parseNodeTypes'
import { Field } from '@src/react-app/components/form/Field'
import type { ProcedureFormData } from '@src/react-app/components/form/types'
import type { ReactNode } from 'react'
import type { Control } from 'react-hook-form'
import { InputGroupContainer } from '../../InputGroupContainer'

interface ObjectFieldProps {
  label: string
  control: Control<ProcedureFormData>
  node: ParsedInputNode & { type: 'object' }
  topLevel?: boolean
  overrideIconElement?: ReactNode
}
export function ObjectField({ label, control, node, topLevel, overrideIconElement, }: ObjectFieldProps) {
  if (topLevel) {
    return (
      <div className={'space-y-2 flex-col flex p-1 '}>
        {Object.entries(node.children).map(([name, e]) => (
          <Field
            inputNode={{ ...e, path: node.path.concat([name]), }}
            control={control}
            key={name}
          />
        ))}
      </div>
    )
  }
  return (
    <InputGroupContainer title={label} iconElement={overrideIconElement ?? <ObjectIcon className="mr-1" />}>
      {Object.entries(node.children).map(([childFieldName, e]) => (
        <Field
          inputNode={{ ...e, path: node.path.concat([childFieldName]), }}
          control={control}
          key={childFieldName}
        />
      ))}
    </InputGroupContainer>
  )
}
