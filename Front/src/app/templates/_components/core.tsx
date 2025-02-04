"use client"

import { DataTable } from "@/components/captainui/data-table/data-table";
import { TemplatesColumns } from "@/components/sections/_components/template/_columns";
import { TemplateForm } from "@/components/sections/_components/template/form";
import { Template } from "@/types/Prisma/Template";

interface CoreProps {
    templates: Template[];
}

export function Core({ templates }: CoreProps) {

    return (
        <>

            <div className="flex flex-row justify-between gap-4 2xl:w-[88rem] h-[96rem]">
                
                <DataTable
                    className="h-full w-full border-foreground"
                    data={templates}
                    columns={TemplatesColumns}
                    apiUrl="/api/github/template"
                    primaryKey={"id"}
                    textFilterColumn={"title"}
                    keyValue={[]}
                    itemName="Template"
                    CreateForm={
                        <TemplateForm mode="POST" defaultValues={{ title: "", description: "", public: false, milestones: [] }} />
                    }
                />
            </div>

        </>
    )
}