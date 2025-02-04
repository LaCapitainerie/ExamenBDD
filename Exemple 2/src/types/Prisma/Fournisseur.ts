import { z } from "zod";

export const Fournisseur = z.object({
    id: z.string().cuid(),
    
    name: z.string(),
    email: z.string().email(),
    phone: z.string().regex(/^\d{10}$/),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    postalCode: z.string().regex(/^\d{5}$/),
    description: z.string(),

    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Fournisseur = z.infer<typeof Fournisseur>;