import { z } from "zod";
import { Categorie } from "./Categorie";
import { Fournisseur } from "./Fournisseur";

export const Avion = z.object({
    id: z.string().cuid(),
    
    name: z.string(),
    reference: z.string(),
    type: z.enum(["CARGO", "CHASSE", "TRANSPORT"]),
    basePrice: z.number(),
    quantity: z.number().positive().int(),
    description: z.string(),

    categories: Categorie.array(),
    fournisseurs: Fournisseur.array(),

    createdAt: z.date(),
    updatedAt: z.date(),

    AvionAchete: z.array(z.string()),

});

export type Avion = z.infer<typeof Avion>;

export const AvionAchete = z.object({
    id: z.string().cuid(),

    avion: Avion,
    avionId: Avion.shape.id,
    price: Avion.shape.basePrice,

    createdAt: z.date(),
    updatedAt: z.date(),
});

export type AvionAchete = z.infer<typeof AvionAchete>;