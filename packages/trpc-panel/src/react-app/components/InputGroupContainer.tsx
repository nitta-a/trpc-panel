import type { ReactNode } from 'react'

interface InputGroupContainerProps {
  title: string
  iconElement?: ReactNode
  children: ReactNode
}
export function InputGroupContainer(props: InputGroupContainerProps) {
  const { title, iconElement, children } = props

  return (
    <div
      className={
        'flex flex-col border border-neutralSolid bg-[#fcfbf977] rounded-md overflow-hidden shadow-sm'
      }
    >
      <span className="flex flex-row bg-white mb-1 p-1">
        {iconElement} {title}
      </span>

      <div className={'space-y-2 flex-col flex p-1 '}>{children}</div>
    </div>
  )
}
