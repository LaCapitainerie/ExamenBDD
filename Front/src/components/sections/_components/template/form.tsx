"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { getSession } from "next-auth/react"
import { CustomResponse } from "@/lib/safe-route"
import { Template } from "@/types/Prisma/Template"
import { useToast } from "@/hooks/use-toast"
import React from "react"
import { Milestone } from "@/types/Prisma/Milestone"
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multi-selector"



export const formSchema = Template.pick({
    title: true,
    description: true,
    public: true,
}).extend({
    milestones: z.array(Milestone.shape["title"]).default([]),
})

interface TemplateFormProps {
    mode: "POST" | "PUT";
    onSubmitFunction?: () => void;
    defaultValues?: z.infer<typeof formSchema>;
}

export const textDisplay = {
    "POST": {
        "toast success": {
            title: "Template created",
            description: "Template has been created",
        },
        "toast error": {
            title: "Error creating Template",
            description: "Error creating Template",
        },
        "submit": "Create",
    },
    "PUT": {
        "toast success": {
            title: "Template updated",
            description: "Template has been updated",
        },
        "toast error": {
            title: "Error updating Template",
            description: "Error updating Template",
        },
        "submit": "Update",
    },
}

export function TemplateForm({ mode, onSubmitFunction, defaultValues }: TemplateFormProps) {

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

            const result = await fetch("/api/github/template", {
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


    const [milestones, setMilestones] = React.useState<Milestone[]>([])
    React.useEffect(() => {
        const data = async () => {

            const session = await getSession();

            fetch("/api/github/milestone", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${session?.access_token}`,
                },
            })
                .then((response) => response.json())
                .then((data: CustomResponse<Milestone[]>) => {

                    if (!data.success) {
                        toast({
                            title: "Error fetching milestones",
                            description: `${data.error}`,
                        })
                        return
                    }

                    setMilestones(data.data)
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
                                    placeholder="My 1st Template"

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Name of the template</FormDescription>
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
                                    placeholder="Description of my template.."

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Goal of the template</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="milestones"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Milestones</FormLabel>
                            <FormControl>
                                <MultiSelector
                                    values={field.value}
                                    onValuesChange={field.onChange}
                                    loop
                                    className="max-w-xs"
                                >
                                    <MultiSelectorTrigger>
                                        <MultiSelectorInput placeholder="Select Milestones" />
                                    </MultiSelectorTrigger>
                                    <MultiSelectorContent>
                                        <MultiSelectorList>
                                            {milestones.map((milestone) => (
                                                <MultiSelectorItem key={milestone.id} value={milestone.title}>
                                                    {milestone.title}
                                                </MultiSelectorItem>
                                            ))}
                                        </MultiSelectorList>
                                    </MultiSelectorContent>
                                </MultiSelector>
                            </FormControl>
                            <FormDescription>Milestones related to the milestone</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="public"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}

                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Public</FormLabel>
                                <FormDescription>Does your template is public</FormDescription>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit">Créer</Button>
            </form>
        </Form>
    )
}