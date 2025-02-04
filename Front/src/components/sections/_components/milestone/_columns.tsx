"use client"

import { FileDialog } from "@/components/captainui/file-dialog/file-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowDelete } from "@/components/captainui/data-table/row-type/data-table-row-delete";
import { Label } from "@/types/Prisma/Label";
import { DataTableRowFormatDate } from "@/components/captainui/data-table/row-type/data-table-row-date";
import { Milestone } from "@/types/Prisma/Milestone";
import { MilestoneForm } from "@/components/sections/_components/milestone/form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CircleDot } from "lucide-react";

export const MilestonesColumns: ColumnDef<Milestone>[] = [
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
        accessorKey: "title",
        header: "Titre",
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => {
            <DataTableRowFormatDate value={row.original.dueDate} />
        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "issues",
        header: "Issues",
        cell: ({ row }) => {
            return (
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>{`${row.original.issues.length} issues`}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Issues list</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                row.original.issues.map((issue) => (

                                    <DialogTrigger key={issue.id} asChild>
                                        <DropdownMenuItem>
                                            <CircleDot color="green" />
                                            {issue.title}
                                        </DropdownMenuItem>
                                    </DialogTrigger>

                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Description de l&apos;issue</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )
        }
    },
    {
        id: "details",
        cell: ({ row }) =>
            <FileDialog row={row} itemSchema={Label} >
                <MilestoneForm mode="PUT" defaultValues={{ ...row.original, issues: row.original.issues.map(l => l.title) }} />
            </FileDialog>
    },
    {
        id: "delete",
        cell: ({ row }) => <DataTableRowDelete id={row.original.id} url={"/api/github/milestone"} itemName="Milestone" />,
    }
]
