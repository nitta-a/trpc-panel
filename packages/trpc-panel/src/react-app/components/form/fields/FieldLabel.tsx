import type { LabelHTMLAttributes } from 'react'

interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: string
}
export function FieldLabel({ children, ...props }: FieldLabelProps) {
  return <label {...props}>{children}</label>
}
