import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const createMenuSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required").openapi({
      example: "Informática",
      description: "Menu name",
    }),
    relatedId: z.string().optional().openapi({
      example: "685423f11f5e74918f8f2a65",
      description: "Parent menu id",
    }),
  }),
});

export type CreateMenuDto = z.infer<typeof createMenuSchema>;
