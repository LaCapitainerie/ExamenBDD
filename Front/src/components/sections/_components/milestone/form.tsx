"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { CustomResponse } from "@/lib/safe-route"
import { getSession } from "next-auth/react"
import { Milestone } from "@/types/Prisma/Milestone"
import React from "react"
import { useToast } from "@/hooks/use-toast"
import { Issue } from "@/types/Prisma/Issue"
import { MultiSelector, MultiSelectorTrigger, MultiSelectorInput, MultiSelectorContent, MultiSelectorList, MultiSelectorItem } from "@/components/ui/multi-selector"

const formSchema = Milestone.pick({
    id: true,
    title: true,
    dueDate: true,
    description: true,
}).extend({
    issues: z.array(Issue.shape["title"]).default([]),
})

interface MilestoneFormProps {
    mode: "POST" | "PUT";
    onSubmitFunction?: () => void;
    defaultValues?: z.infer<typeof formSchema>;
}

export const textDisplay = {
    "POST": {
        "toast success": {
            title: "Milestone created",
            description: "Milestone has been created",
        },
        "toast error": {
            title: "Error creating Milestone",
            description: "Error creating Milestone",
        },
        "submit": "Create",
    },
    "PUT": {
        "toast success": {
            title: "Milestone updated",
            description: "Milestone has been updated",
        },
        "toast error": {
            title: "Error updating Milestone",
            description: "Error updating Milestone",
        },
        "submit": "Update",
    },
}

export function MilestoneForm({ mode, onSubmitFunction, defaultValues }: MilestoneFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const { toast } = useToast()

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {

            const session = await getSession();

            if (!session || !session.access_token) {
                throw new Error("Unauthorized");
            }

            console.log(values);

            const result = await fetch("/api/github/milestone", {
                method: mode,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${session.access_token}`,
                },
                body: JSON.stringify(values)
            });

            const data: CustomResponse<null> = await result.json();

            if (!data.success) {
                throw new Error(data.error);
            }

            toast({
                title: textDisplay[mode]["toast success"].title,
                description: textDisplay[mode]["toast success"].description,
            })

            onSubmitFunction?.();
        } catch (error) {

            toast({
                title: textDisplay[mode]["toast error"].title,
                description: `${error}`,
            })
        }
    }


    const [issues, setIssues] = React.useState<Issue[]>([])
    React.useEffect(() => {
        const data = async () => {

            const session = await getSession();

            fetch("/api/github/issue", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${session?.access_token}`,
                },
            })
                .then((response) => response.json())
                .then((data: CustomResponse<Issue[]>) => {

                    if (!data.success) {
                        toast({
                            title: "Error fetching issues",
                            description: `${data.error}`,
                        })
                        return
                    }

                    setIssues(data.data)
                })
        }

        data()
    }, [toast])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Q1 Milestone"

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Name of your milestone</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>Date de la milestone</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="First milestone of the year.."

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Description de la milestone</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="issues"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Issues</FormLabel>
                            <FormControl>
                                <MultiSelector
                                    values={field.value}
                                    onValuesChange={field.onChange}
                                    loop
                                    className="max-w-xs"
                                >
                                    <MultiSelectorTrigger>
                                        <MultiSelectorInput placeholder="Select Issues" />
                                    </MultiSelectorTrigger>
                                    <MultiSelectorContent>
                                        <MultiSelectorList>
                                            {issues.map((issue) => (
                                                <MultiSelectorItem key={issue.id} value={issue.title}>
                                                    {issue.title}
                                                </MultiSelectorItem>
                                            ))}
                                        </MultiSelectorList>
                                    </MultiSelectorContent>
                                </MultiSelector>
                            </FormControl>
                            <FormDescription>Issues related to the milestone</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Créer</Button>
            </form>
        </Form>
    )
}