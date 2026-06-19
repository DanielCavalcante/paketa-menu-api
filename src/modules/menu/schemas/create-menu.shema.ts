import { z } from "zod";

export const createMenuSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),

    relatedId: z.string().optional(),
  }),
});
