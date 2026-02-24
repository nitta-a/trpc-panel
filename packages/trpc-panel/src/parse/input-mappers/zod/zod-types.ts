import type { core } from 'zod'

export type ZodDefWithType = core.$ZodTypeDef & { type: string }
