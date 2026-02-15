import json from 'json-bigint'
import { Response } from './Response'

export function RequestResult({ result }: { result: unknown }) {
  return <Response>{`${json.stringify(result, null, 2)}`}</Response>
}
