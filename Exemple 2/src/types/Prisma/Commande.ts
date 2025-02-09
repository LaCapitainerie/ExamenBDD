import { z } from "zod";
import { AvionAchete } from "./Avion";

export const CommandeObject = z.object({
    id: z.string().cuid(),
    
    reference: z.string(),
    date: z.date(),
    status: z.enum(["EN_ATTENTE", "EN_COURS", "LIVREE", "ANNULEE"]),
    total: z.number(),

    userId: z.string(),
    avions: AvionAchete.array(),

    createdAt: z.date(),
    updatedAt: z.date(),

});

export type Commande = z.infer<typeof CommandeObject>;