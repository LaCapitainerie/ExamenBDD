"use client"
import {
    useState
} from "react"
import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    cn
} from "@/lib/utils"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger
} from "@/components/ui/multi-selector"
import { Avion } from "@/types/Prisma/Avion"
import { Categorie } from "@/types/Prisma/Categorie"
import { Fournisseur } from "@/types/Prisma/Fournisseur"
import { useAvions } from "@/hooks/use-avions"
import { useCategories } from "@/hooks/use-categories"
import { useFournisseurs } from "@/hooks/use-fournisseurs"

const formSchema = z.object({
    name: Avion.shape.name,
    reference: Avion.shape.reference,
    type: Avion.shape.type,
    basePrice: Avion.shape.basePrice,
    quantity: Avion.shape.quantity,

    categories: Categorie.shape.name.array(),
    fournisseurs: Fournisseur.shape.name.array(),
});

type FormProps = {
    defaultValues?: z.infer<typeof formSchema>;
}
export default function AvionForm({ defaultValues }: FormProps) {

    const { avions } = useAvions();
    const { categories } = useCategories();
    const { fournisseurs } = useFournisseurs();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="shadcn"

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
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
                                        <Input
                                            placeholder="shadcn"

                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                Avion.shape.type._def.values.map((type) => (
                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                ))
                                            }
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
                                    <FormDescription>This is your public display name.</FormDescription>
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
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

                {/* <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categories</FormLabel>
                            <FormControl>
                                <MultiSelector
                                    values={field.value}
                                    onValuesChange={field.onChange}
                                    loop
                                    className="max-w-xs"
                                >
                                    <MultiSelectorTrigger>
                                        <MultiSelectorInput placeholder="Select Categories" />
                                    </MultiSelectorTrigger>
                                    <MultiSelectorContent>
                                        <MultiSelectorList>
                                            <MultiSelectorItem value="All">All</MultiSelectorItem>
                                            {
                                                categories.map((categorie) => (
                                                    <MultiSelectorItem key={categorie.id} value={categorie.name}>{categorie.name}</MultiSelectorItem>
                                                ))
                                            }
                                        </MultiSelectorList>
                                    </MultiSelectorContent>
                                </MultiSelector>
                            </FormControl>
                            <FormDescription>Select multiple options.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                {/* <FormField
                    control={form.control}
                    name="fournisseurs"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fournisseurs</FormLabel>
                            <FormControl>
                                <MultiSelector
                                    values={field.value}
                                    onValuesChange={field.onChange}
                                    loop
                                    className="max-w-xs"
                                >
                                    <MultiSelectorTrigger>
                                        <MultiSelectorInput placeholder="Select Fournisseurs" />
                                    </MultiSelectorTrigger>
                                    <MultiSelectorContent>
                                        <MultiSelectorList>
                                            <MultiSelectorItem value="All">All</MultiSelectorItem>
                                            {
                                                fournisseurs.map((fournisseur) => (
                                                    <MultiSelectorItem key={fournisseur.id} value={fournisseur.name}>{fournisseur.name}</MultiSelectorItem>
                                                ))
                                            }
                                        </MultiSelectorList>
                                    </MultiSelectorContent>
                                </MultiSelector>
                            </FormControl>
                            <FormDescription>Select multiple options.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}