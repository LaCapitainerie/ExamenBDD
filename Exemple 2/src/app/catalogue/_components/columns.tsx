"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowDelete } from "@/components/captainui/data-table/row-type/data-table-row-delete";
import { MilestoneIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import { Fournisseur, Produit } from "@prisma/client";
import { NumberFunctionFilter } from "@/components/captainui/data-table/column-filter/data-table-column-number";
import { DataTableColumnHeader } from "@/components/captainui/data-table/data-table-column-header";
import { ArrayFunctionFilter } from "@/components/captainui/data-table/column-filter/data-table-column-array";

export const AvionsColumns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
        filterFn: NumberFunctionFilter,
    },
    {
        accessorKey: "fournisseurs",
        header: "Fournisseurs",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger>{`${row.original.fournisseurs.length} Fournisseurs`}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Liste des fournisseurs</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        row.original.fournisseurs.map((fournisseur) => (
                            <DropdownMenuItem key={fournisseur.id}>
                                <MilestoneIcon />
                                {fournisseur.name}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        filterFn: ArrayFunctionFilter
    },
    /* {
        id: "details",
        cell: ({ row }) =>
            <FileDialog row={row} itemSchema={Label} >
                <IssueForm mode="PUT" defaultValues={{ ...row.original, labels: row.original.labels.map(l => l.name) }} />
            </FileDialog>
    }, */
    {
        id: "delete",
        cell: ({ row }) => <DataTableRowDelete id={row.original.id} url={`/api/avion?id=${row.original.id}`} itemName="Avion" />,
    }
] satisfies ColumnDef<Produit & { fournisseurs: Fournisseur[] }>[];
