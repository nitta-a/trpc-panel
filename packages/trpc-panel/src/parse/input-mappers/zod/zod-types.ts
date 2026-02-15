import { ZodFirstPartyTypeKind, ZodTypeDef } from 'zod/v3';

export type ZodDefWithType = ZodTypeDef & { typeName: ZodFirstPartyTypeKind };
