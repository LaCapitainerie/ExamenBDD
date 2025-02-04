"use client"

import { DataTable } from "@/components/captainui/data-table/data-table";
import { Issue } from "@/types/Prisma/Issue";
import { IssuesColumns } from "@/components/sections/_components/issue/_columns";
import { IssueForm } from "@/components/sections/_components/issue/form";
import { useEffect, useState } from "react";
import { Label } from "@/types/Prisma/Label";

interface CoreProps {
    issues: Issue[];
}

export function Core({ issues }: CoreProps) {

    const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);

    useEffect(() => {
        console.log(selectedLabel);
    }, [selectedLabel]);

    const Columns = IssuesColumns(
        {
            setSelectedLabel, selectedLabel,
            
        });

    return (
        <>

            <div className="flex flex-row justify-between gap-4 2xl:w-[88rem] h-[96rem]">
                
                <DataTable
                    className="h-full w-full border-foreground"
                    data={issues}
                    columns={Columns}
                    apiUrl="/api/label"
                    primaryKey={"id"}
                    textFilterColumn={"title"}
                    keyValue={[]}
                    itemName="Issue"
                    CreateForm={
                        <IssueForm mode="POST" defaultValues={{ id: "", title: "", description: "", status: false, labels: [] }} />
                    }
                />
            </div>

        </>
    )
}