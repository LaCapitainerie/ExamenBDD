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
import { useAvions } from "@/hooks/use-avions";
import { useCategories } from "@/hooks/use-categories";
import { useFournisseurs } from "@/hooks/use-fournisseurs";
import { useMutation } from "@tanstack/react-query";
import { createAvionAction, createAvionSchema } from "./create-avion.action";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Categorie } from "@/types/Prisma/Categorie";

type formSchemaType = z.infer<typeof createAvionSchema>;

type FormProps = {
  defaultValues?: formSchemaType;
};
export default function AvionForm({ defaultValues }: FormProps) {
  const { avions } = useAvions();
  const { categories } = useCategories();
  const { fournisseurs } = useFournisseurs();
  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(createAvionSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (values: formSchemaType) => {
      const result = await createAvionAction(values);

      if (!result || result.serverError) {
        toast.error(result?.serverError ?? "Failed to create avion");
        return;
      }

      toast.success("Avion created", result.data);
      return;

      //   router.refresh();
      //   form.reset(result.data as formSchemaType);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={async (v) =>
          mutation.mutateAsync(v as unknown as formSchemaType)
        }
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

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <FancyMultiSelect
                  options={categories.map((c) => c.name)}
                  values={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Label associé à l&apos;issue</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
