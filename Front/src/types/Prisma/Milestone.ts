import { z } from "zod";
import { Issue } from "./Issue";

export const Milestone = z.object({
    id: z.string(),
    userRelatedId: z.string(),

    title: z.string(),
    description: z.string().default(""),
    dueDate: z.coerce.date().default(new Date()),

    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),

    issues: z.array(Issue),
});

export type Milestone = z.infer<typeof Milestone>;