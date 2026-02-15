import { z } from 'zod/v3';

export const TRPCPanelMetaSchema = z.object({
  description: z.string().optional(),
});

export type TRPCPanelMeta = z.infer<typeof TRPCPanelMetaSchema>;
