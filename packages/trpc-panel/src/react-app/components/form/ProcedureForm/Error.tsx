import { ErrorRow } from './ErrorRow'
import { FormSection } from './FormSection'
import type { TRPCErrorType } from './index'
import { StackTrace } from './StackTrace'

export function Error({ error }: { error: TRPCErrorType }) {
  const messageLength = error.shape.message ? error.shape.message.length : 0
  const padTo = Math.max(messageLength, error.data.code.length)
  return (
    <FormSection titleClassName="text-error" title="Error">
      {error.shape.message && (
        <ErrorRow
          title="Message"
          text={error.shape.message}
          padTitleTo={padTo}
        />
      )}
      <ErrorRow title="Code" text={error.data.code} padTitleTo={padTo} />
      <ErrorRow
        title="HTTP Status Code"
        text={`${error.data.httpStatus}`}
        padTitleTo={padTo}
      />
      {error.data.stack && <StackTrace text={error.data.stack} />}
    </FormSection>
  )
}
