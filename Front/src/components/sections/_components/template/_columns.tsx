"use client"

import { FileDialog } from "@/components/captainui/file-dialog/file-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowDelete } from "@/components/captainui/data-table/row-type/data-table-row-delete";
import { Label } from "@/types/Prisma/Label";
import { DataTableRowFormatDate } from "@/components/captainui/data-table/row-type/data-table-row-date";
import { TemplateForm } from "@/components/sections/_components/template/form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Template } from "@/types/Prisma/Template";
import { DataTableRowFormatBoolean } from "@/components/captainui/data-table/row-type/data-table-row-boolean";
import { CircleDot, TagIcon } from "lucide-react";

export const TemplatesColumns: ColumnDef<Template>[] = [
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
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "public",
        cell: ({ row }) => <DataTableRowFormatBoolean value={row.original.public}  />,
    },
    {
        accessorKey: "licence",
    },
    {
        accessorKey: "milestones",
        header: "Milestones",
        cell: ({ row }) => {
            const milestones = row.original.milestones;
            return (
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>{`${milestones.length} milestones`}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Milestones list</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                milestones.map((milestone) => (
                                    <DropdownMenuItem key={milestone.id}> {milestone.title} </DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Description du milestone</DialogTitle>
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
        accessorKey: "issues",
        header: "Issues",
        cell: ({ row }) => {
            const issues = row.original.milestones.flatMap(e => e.issues);
            return (
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>{`${issues.length} issues`}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Issues list</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                issues.map((issue) => (

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
        accessorKey: "labels",
        header: "Labels",
        cell: ({ row }) => {
            const labels = row.original.milestones.flatMap(m => m.issues.flatMap(i => i.labels));
            return (
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>{`${labels.length} labels`}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Labels list</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                labels.map((label) => (
                                    
                                    <DialogTrigger key={label.id} asChild>
                                        <DropdownMenuItem>
                                            <TagIcon color={label.color} />
                                            {label.name}
                                        </DropdownMenuItem>
                                    </DialogTrigger>

                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Description du label</DialogTitle>
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
                <TemplateForm mode="PUT" defaultValues={{...row.original, milestones: row.original.milestones.map(m => m.title)}} />
            </FileDialog>
    },
    {
        id: "delete",
        cell: ({ row }) => <DataTableRowDelete id={row.original.id} url={"/api/github/template"} itemName="Template" />,
    }
]
