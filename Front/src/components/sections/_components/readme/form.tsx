"use client"

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CustomResponse } from "@/lib/safe-route"
import { getSession } from "next-auth/react"
import { ReadMe } from "@/types/Prisma/ReadMe"
import { Textarea } from "@/components/ui/textarea"

export const formSchema = ReadMe.pick({
  title: true,
  content: true
})

interface ReadmeFormProps {
  onSubmitFunction?: () => void;
  defaultValues?: z.infer<typeof formSchema>;
}

export function ReadMeForm({ onSubmitFunction, defaultValues }: ReadmeFormProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      const session = await getSession();

      if (!session || !session.access_token) {
        throw new Error("Unauthorized");
      }

      const result = await fetch("/api/github/readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${session.access_token}`,
        },
        body: JSON.stringify(values)
      });

      if (!result.ok) {
        throw new Error("Error");
      }

      const data: CustomResponse<null> = await result.json();

      if (!data.success) {
        throw new Error("Error");
      }

      toast.success("Template created successfully");

    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      onSubmitFunction?.()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="NextJS Readme"

                  type="text"
                  {...field} />
              </FormControl>
              <FormDescription>Name of your readme</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="<h1>Content</h1>"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Content of the readme</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Créer</Button>
      </form>
    </Form>
  )
}