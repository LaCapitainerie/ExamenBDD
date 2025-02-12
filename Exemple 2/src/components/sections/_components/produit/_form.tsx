"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FancyMultiSelect } from "@/components/ui/multi-selector";
import { Avion } from "@/types/Prisma/Avion";
import { useProduits } from "@/hooks/use-avions";
import { useCategories } from "@/hooks/use-categories";
import { useFournisseurs } from "@/hooks/use-fournisseurs";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createAvionSchema } from "@/app/api/(content)/produits/route";
import { fetchRequest } from "@/lib/safe-route";
import { useSession } from "next-auth/react";

type formSchemaType = z.infer<typeof createAvionSchema>;

type FormProps = {
  defaultValues?: formSchemaType;
};
export default function ProduitForm({ defaultValues }: FormProps) {
  const { data } = useSession();
  const { categories } = useCategories();
  const { fournisseurs } = useFournisseurs();
  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(createAvionSchema),
    defaultValues,
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const result = await fetchRequest<Avion | null>(null, "/api/avion", {
        method: "POST",
        headers: {
          Authorization: `token ${data?.access_token}`,
        },
        body: JSON.stringify(values),
      });

      if (!result) {
        toast.error("Failed to create avion");
        return;
      }

      toast.success("Avion created");

      router.refresh();
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Avion.shape.type._def.values.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the avion type</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix de base</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      type="number"
                      {...field}
                      value={parseInt(field.value as any)}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      type="number"
                      {...field}
                      value={parseInt(field.value as any)}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description de l'avion"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Description de l&apos;avion</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <FancyMultiSelect
                      options={categories.map((c) => c.name)}
                      values={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Label associé à l&apos;issue
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="fournisseurs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fournisseurs</FormLabel>
                  <FormControl>
                    <FancyMultiSelect
                      options={fournisseurs.map((c) => c.name)}
                      values={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>Select multiple options.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
