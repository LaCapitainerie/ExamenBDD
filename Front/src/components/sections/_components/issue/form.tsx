"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CustomResponse } from "@/lib/safe-route"
import { getSession } from "next-auth/react"
import { Issue } from "@/types/Prisma/Issue"
import { useToast } from "@/hooks/use-toast"
import React from "react"
import { MultiSelector, MultiSelectorTrigger, MultiSelectorInput, MultiSelectorContent, MultiSelectorList, MultiSelectorItem } from "@/components/ui/multi-selector"
import { Label } from "@/types/Prisma/Label"
import { TagIcon } from "lucide-react"

export const formSchema = Issue.pick({
  id: true,
  title: true,
  description: true,
  status: true,
}).extend({
  labels: z.array(Label.shape["name"]).default([]),
})

interface IssueFormProps {
  mode: "POST" | "PUT";
  onSubmitFunction?: () => void;
  defaultValues?: z.infer<typeof formSchema>;
}

export const textDisplay = {
  "POST": {
    "toast success": {
      title: "Issue created",
      description: "Issue has been created",
    },
    "toast error": {
      title: "Error creating Issue",
      description: "Error creating Issue",
    },
    "submit": "Create",
  },
  "PUT": {
    "toast success": {
      title: "Issue updated",
      description: "Issue has been updated",
    },
    "toast error": {
      title: "Error updating Issue",
      description: "Error updating Issue",
    },
    "submit": "Update",
  },
}

export function IssueForm({ mode, onSubmitFunction, defaultValues }: IssueFormProps) {

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

      const result = await fetch("/api/github/issue", {
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


  const [labels, setLabels] = React.useState<Label[]>([])
  React.useEffect(() => {
    const data = async () => {

      const session = await getSession();

      fetch("/api/github/label", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${session?.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data: CustomResponse<Label[]>) => {

          if (!data.success) {
            toast({
              title: "Error fetching labels",
              description: `${data.error}`,
            })
            return
          }

          setLabels(data.data)
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
                  placeholder="Issue One"

                  type="text"
                  {...field} />
              </FormControl>
              <FormDescription>Title of the issue</FormDescription>
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
                <Textarea
                  placeholder="Description de l'issue"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Description de l&apos;issue</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="labels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={field.onChange}
                  loop
                  className="max-w-xs"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select labels" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {labels.map((label) => (
                        <MultiSelectorItem key={label.id} value={label.name}>
                          <TagIcon className="w-5 h-5 mr-2" color={label.color} />
                          {label.name}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormDescription>Label associé à l&apos;issue</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Créer</Button>
      </form>
    </Form>
  )
}