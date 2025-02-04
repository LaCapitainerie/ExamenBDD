import { z } from "zod";
import { Label } from "./Label";
import { Milestone } from "./Milestone";

export const Issue = z.object({
    id: z.string(),
    userRelatedId: z.string(),

    title: z.string({"description": "Title of the issue"}),
    description: z.string({"description": "Description of the issue"}).default(""),
    status: z.boolean().default(false),

    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),

    labels: z.array(Label).default([]),
    milestone: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().default(""),
        dueDate: z.coerce.date(),
    })).default([]),
});

export type Issue = z.infer<typeof Issue>;