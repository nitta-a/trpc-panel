import json from 'json-bigint'
import React from 'react'
import { Response } from './Response'

export function RequestResult({ result }: { result: any }) {
  return <Response>{`${json.stringify(result, null, 2)}`}</Response>
}
