import { ChevronIcon } from '@src/react-app/components/icons/ChevronIcon'

interface ChevronProps {
  className?: string
  direction: 'up' | 'down' | 'right' | 'left'
}
export function Chevron({ className, direction, }: ChevronProps) {
  return (
    <ChevronIcon
      className={
        className +
        ' ' +
        `${(() => {
          switch (direction) {
            case 'up':
              return ' -rotate-[270deg]'
            case 'down':
              return '-rotate-90'
            case 'right':
              return 'rotate-180'
            case 'left':
              return ''
          }
        })()}`
      }
    />
  )
}
