import { Button } from '../../Button'
import type { ColorSchemeType } from '../../CollapsableSection'
import { SendIcon } from '../../icons/SendIcon'
import { LoadingSpinner } from './LoadingSpinner'

export function ProcedureFormButton({
  text,
  colorScheme,
  loading,
}: {
  text: string
  colorScheme: ColorSchemeType
  loading: boolean
}) {
  return (
    <Button
      variant={colorScheme}
      type="submit"
      className="relative rounded-md self-stretch justify-center"
      disabled={loading}
    >
      <div
        className={`flex flex-row${loading ? ' opacity-0 pointer-events-none' : ''}`}
      >
        {text}
        <SendIcon className="w-5 h-5 ml-2" />
      </div>
      {loading && <LoadingSpinner />}
    </Button>
  )
}
