"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ColorPicker } from "@/components/ui/color-picker"
import { Label } from "@/types/Prisma/Label"
import { CustomResponse } from "@/lib/safe-route"
import { getSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

const formSchema = Label.pick({
    id: true,
    name: true,
    description: true,
    color: true,
})

interface LabelFormProps {
    mode: "POST" | "PUT";
    onSubmitFunction?: () => void;
    defaultValues?: z.infer<typeof formSchema>;
}

export const textDisplay = {
    "POST": {
        "toast success": {
            title: "Label created",
            description: "Label has been created",
        },
        "toast error": {
            title: "Error creating label",
            description: "Error creating label",
        },
        "submit": "Create",
    },
    "PUT": {
        "toast success": {
            title: "Label updated",
            description: "Label has been updated",
        },
        "toast error": {
            title: "Error updating label",
            description: "Error updating label",
        },
        "submit": "Update",
    },
}

export function LabelForm({ mode, onSubmitFunction, defaultValues }: LabelFormProps) {

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

            const result = await fetch("/api/github/label", {
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Label 1"

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Name of the label</FormDescription>
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
                                    placeholder="Label for bug"

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Description of the label</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                            <FormLabel>Label Color</FormLabel>
                            <FormControl className="w-full">
                                <ColorPicker
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                                Color of the label
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    {textDisplay[mode]["submit"]}
                </Button>
            </form>
        </Form>
    )
}