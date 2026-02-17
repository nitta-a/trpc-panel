interface FormSectionHeaderProps {
  children: string
  className?: string
}
export function FormSectionHeader({ children, className, }: FormSectionHeaderProps) {
  return (
    <h2 className={`font-bold text-lg${className ? ` ${className}` : ''}`}>
      {children}
    </h2>
  )
}
