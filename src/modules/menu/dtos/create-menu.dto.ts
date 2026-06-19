import z from "zod";
import { createMenuSchema } from "../schemas/create-menu.shema";

export type CreateMenuDto = z.infer<typeof createMenuSchema>["body"];
