"use client"

import { FileDialog } from "@/components/captainui/file-dialog/file-dialog";
import { Issue } from "@/types/Prisma/Issue";
import { ColumnDef } from "@tanstack/react-table";
import { IssueForm } from "@/components/sections/_components/issue/form";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowDelete } from "@/components/captainui/data-table/row-type/data-table-row-delete";
import { Label } from "@/types/Prisma/Label";
import { CircleCheck, CircleDot, MilestoneIcon, TagIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LabelModal } from "../label/modal";
import React from "react";

interface IssuesColumnsProps {
    setSelectedLabel: (label: Label) => void;
    selectedLabel: Label | null;
}

export const IssuesColumns: ({ setSelectedLabel, selectedLabel }: IssuesColumnsProps) => ColumnDef<Issue>[] = ({ setSelectedLabel, selectedLabel }) => [
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return row.original.status ? <CircleCheck color="purple" /> : <CircleDot color="green" />
        },
    },
    {
        accessorKey: "labels",
        header: "Labels",
        cell: ({ row }) => {

            return (
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>{`${row.original.labels.length} labels`}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Labels list</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DialogTrigger>
                                {
                                    row.original.labels.map((label) => (
                                        <DropdownMenuItem onClick={() => {setSelectedLabel(label)}} key={label.id}>
                                            <TagIcon color={label.color} />
                                            {label.name}
                                        </DropdownMenuItem>
                                    ))
                                }
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Description du label</DialogTitle>
                            <DialogDescription>
                                {/* {selectedLabel ? selectedLabel.description : "Select a label to see its description."} */}
                            </DialogDescription>
                        </DialogHeader>

                        {selectedLabel && <LabelModal defaultValues={selectedLabel} />}

                    </DialogContent>
                </Dialog>
            )
        }
    },
    {
        accessorKey: "milestone",
        header: "Milestone",
        cell: ({ row }) => (
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger>{`${row.original.milestone.length} milestones`}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Milestones list</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {
                            row.original.milestone.map((milestone) => (

                                <DialogTrigger key={milestone.id}>
                                    <DropdownMenuItem>
                                        <MilestoneIcon />
                                        {milestone.title}
                                    </DropdownMenuItem>
                                </DialogTrigger>

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
    },
    {
        id: "details",
        cell: ({ row }) =>
            <FileDialog row={row} itemSchema={Label} >
                <IssueForm mode="PUT" defaultValues={{ ...row.original, labels: row.original.labels.map(l => l.name) }} />
            </FileDialog>
    },
    {
        id: "delete",
        cell: ({ row }) => <DataTableRowDelete id={row.original.id} url={"/api/github/issue"} itemName="Issue" />,
    }
]
