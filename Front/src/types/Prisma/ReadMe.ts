import { z } from "zod";

export const ReadMe = z.object({
    title: z.string(),
    content: z.string().default(""),
});

export type ReadMe = z.infer<typeof ReadMe>;