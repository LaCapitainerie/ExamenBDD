"use client"

import { FileDialog } from "@/components/captainui/file-dialog/file-dialog";
import { Label } from "@/types/Prisma/Label";
import { ColumnDef } from "@tanstack/react-table";
import { LabelForm } from "@/components/sections/_components/label/form";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/captainui/data-table/data-table-column-header";
import { TagIcon } from "lucide-react";
import { DataTableRowDelete } from "@/components/captainui/data-table/row-type/data-table-row-delete";

export const LabelsColumns: ColumnDef<Label>[] = [
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
            <DataTableColumnHeader column={column} title="Name"/>
        ),
        cell: ({ row }) => {
            return <div className="flex flex-row items-center gap-2"><TagIcon color={row.original.color}/>{row.original.name}</div>
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            return row.original.description ?? "No description"
        },
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => {
            return (
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: row.original.color }} />
            )
        }
    },
    {
        id: "details",
        cell: ({ row }) =>
            <FileDialog row={row} itemSchema={Label} >
                <LabelForm mode="PUT" defaultValues={row.original} />
            </FileDialog>
    },
    {
        id: "delete",
        cell: ({ row }) => <DataTableRowDelete id={row.original.id} url={"/api/github/label"} itemName="label" />,
    }
]
