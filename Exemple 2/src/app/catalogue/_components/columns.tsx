"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowDelete } from "@/components/captainui/data-table/row-type/data-table-row-delete";
import { CircleCheck, CircleDot, MilestoneIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import { Avion, Fournisseur } from "@prisma/client";
import { DataTableRowFormatEnum } from "@/components/captainui/data-table/row-type/data-table-row-enum";

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
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            <DataTableRowFormatEnum value={row.original.type} enumValue={
                {
                    "CARGO": {
                        value: "Cargo",
                        icon: CircleDot
                    },
                    "PASSENGER": {
                        value: "Passenger",
                        icon: CircleCheck
                    }
                }
            } />
        },
    },
    {
        accessorKey: "milestone",
        header: "Milestone",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger>{`${row.original.fournisseurs.length} Fournisseurs`}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Liste des fournisseurs</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        row.original.fournisseurs.map((fournisseur) => (
                            <DropdownMenuItem>
                                <MilestoneIcon />
                                {fournisseur.name}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        )
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
        cell: ({ row }) => <DataTableRowDelete id={row.original.id} url={"/api/github/issue"} itemName="Issue" />,
    }
] as const satisfies ColumnDef<Avion & { fournisseurs: Fournisseur[] }>[];
