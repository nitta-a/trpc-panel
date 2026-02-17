import { FormSectionHeader } from '@src/react-app/components/form/ProcedureForm/FormSectionHeader'

interface FormSectionProps {
  children: React.ReactNode
  title: string
  topRightElement?: React.ReactNode
  titleClassName?: string
}
export function FormSection({ children, title, topRightElement, titleClassName, }: FormSectionProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between bg-white shadow-sm px-4 py-2">
        <FormSectionHeader className={titleClassName}>
          {title}
        </FormSectionHeader>
        {topRightElement}
      </div>
      <div className="flex flex-col space-y-2 p-4"> {children}</div>
    </div>
  )
}
