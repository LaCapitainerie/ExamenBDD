import { z } from "zod"
import { Licence } from "./Licence"
import { Label } from "./Label"
import { Milestone } from "./Milestone"
import { Issue } from "./Issue"
import { ReadMe } from "./ReadMe"

export const Template = z.object({
    id: z.string(),
    userRelatedId: z.string(),
    public: z.boolean().default(false),

    title: z.string(),
    description: z.string().default(""),
    licence: Licence.shape["code"].default("MIT"),
    readme: ReadMe.shape["title"].default(""),

    labels: z.array(Label).default([]),
    issues: z.array(Issue).default([]),
    milestones: z.array(Milestone).default([]),
    
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

export type Template = z.infer<typeof Template>