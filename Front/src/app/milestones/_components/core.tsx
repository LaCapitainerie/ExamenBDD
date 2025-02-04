"use client"

import { DataTable } from "@/components/captainui/data-table/data-table";
import { MilestonesColumns } from "@/components/sections/_components/milestone/_columns";
import { MilestoneForm } from "@/components/sections/_components/milestone/form";
import { Milestone } from "@/types/Prisma/Milestone";

interface CoreProps {
    milestones: Milestone[];
}

export function Core({ milestones }: CoreProps) {

    return (
        <>

            <div className="flex flex-row justify-between gap-4 2xl:w-[88rem] h-[96rem]">
                
                <DataTable
                    className="h-full w-full border-foreground"
                    data={milestones}
                    columns={MilestonesColumns}
                    apiUrl="/api/label"
                    primaryKey={"id"}
                    textFilterColumn={"title"}
                    keyValue={[]}
                    itemName="Milestone"
                    CreateForm={
                        <MilestoneForm mode="POST" defaultValues={{ id: "", title: "", description: "", dueDate: new Date(), issues: [] }} />
                    }
                />
            </div>

        </>
    )
}