import { z } from "zod";

export const menuResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  relatedId: z.string().optional(),
});

export type MenuResponseDto = z.infer<typeof menuResponseSchema>;
