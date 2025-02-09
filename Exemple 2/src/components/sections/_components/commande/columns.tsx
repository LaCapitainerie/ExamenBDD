"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { MilestoneIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import { NumberFunctionFilter } from "@/components/captainui/data-table/column-filter/data-table-column-number";
import { ArrayFunctionFilter } from "@/components/captainui/data-table/column-filter/data-table-column-array";
import { DataTableRowFormatDate } from "@/components/captainui/data-table/row-type/data-table-row-date";
import { DataTableRowFormatCurrency } from "@/components/captainui/data-table/row-type/data-table-row-currency";
import { CommandeObject } from "@/types/Prisma/Commande";
import { AvionAchete } from "@/types/Prisma/Avion";
import { DateFunctionFilter } from "@/components/captainui/data-table/column-filter/data-table-column-date";

export const CommandesColumns = [
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
        accessorKey: "reference",
    },
    {
        accessorKey: "date",
        cell: ({ row }) => <DataTableRowFormatDate value={row.original.date} />,
        filterFn: DateFunctionFilter
    },
    {
        accessorKey: "status"
    },
    {
        accessorKey: "total",
        cell: ({ row }) => <DataTableRowFormatCurrency value={row.original.total} numberFormat={"fr-Fr"} currency={"EUR"} />,
        filterFn: NumberFunctionFilter
    },
    {
        accessorKey: "avions",
        header: "Avions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger>{`${row.original.avions.length} Avions`}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Liste des avions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        row.original.avions.map((ligneAvion) => (
                            <DropdownMenuItem key={ligneAvion.id}>
                                <MilestoneIcon />
                                {ligneAvion.avion.name}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        filterFn: (row, col, oth) => ArrayFunctionFilter({ avion: { name: "enum" } }, row, col, oth)
    },
] satisfies ColumnDef<Commande & { avions: AvionAchete[] }>[];
