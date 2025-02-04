import * as z from "zod";

export const Label = z.object({
  id: z.string(),
  userRelatedId: z.string(),

  name: z.string().min(1),
  description: z.string().default(""),
  color: z.coerce.string().regex(/^#[0-9A-F]{6}$/i).default("#000000"),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Label = z.infer<typeof Label>;