import { z } from "zod";

export const Categorie = z.object({
    id: z.string().cuid(),
    
    name: z.string(),
    description: z.string(),

    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Categorie = z.infer<typeof Categorie>;