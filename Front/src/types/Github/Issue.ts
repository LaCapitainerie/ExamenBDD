import { z } from "zod";
import { MilestoneSchema } from "./Milestone";

export const Issue = z.object({
    url: z.string(),
    repository_url: z.string(),
    labels_url: z.string(),
    comments_url: z.string(),
    events_url: z.string(),
    html_url: z.string(),
    id: z.number(),
    node_id: z.string(),
    number: z.number(),
    title: z.string(),
    state: z.string(),
    locked: z.boolean(),
    assignee: z.unknown().nullable(),
    assignees: z.array(z.unknown()),
    milestone: MilestoneSchema,
    comments: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    closed_at: z.unknown().nullable(),
    author_association: z.string(),
    active_lock_reason: z.unknown().nullable(),
    body: z.string().nullable(),
    closed_by: z.unknown().nullable(),
    timeline_url: z.string(),
    performed_via_github_app: z.unknown().nullable(),
    state_reason: z.unknown().nullable(),
});

export type IssuesType = z.infer<typeof IssuesSchema>;

export const FormattedIssues = IssuesSchema.pick({
    id: true,
    title: true,
    body: true,
    labels_url: true,
}).extend({
    tags: z.array(z.string()),
    milestone: z.string(),
});

export type FormattedIssuesType = z.infer<typeof FormattedIssues>;import { z } from "node_modules/zod/lib/external";
import { MilestoneSchema } from "../Prisma/Milestone";
