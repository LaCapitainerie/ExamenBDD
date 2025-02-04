"use client"

import { Template } from "@/types/Prisma/Template";
import { ReadMe } from "@/types/Prisma/ReadMe";
import { EnumObject } from "@/components/sections/_components/milestone/facetedFilter";
import { DataTable } from "@/components/captainui/data-table/data-table";
import { LabelsColumns } from "@/components/sections/_components/label/_columns";
import { Label } from "@/types/Prisma/Label";
import { LabelForm } from "@/components/sections/_components/label/form";
import { ColorPicker } from "@/components/ui/color-picker";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CoreProps {
    teams?: Template[];
    readme?: Omit<ReadMe, "content">[];
    issues?: EnumObject[];
    milestones?: EnumObject[];
    labels: Label[];
}

export function Core({ labels }: CoreProps) {

    return (
        <>

            <div className="flex flex-row justify-between gap-4 2xl:w-[88rem] h-[96rem]">
                {/* <LabelList className="h-full border-foreground" options={labels} /> */}
                <DataTable
                    className="h-full w-full border-foreground"
                    data={labels}
                    columns={LabelsColumns}
                    apiUrl="/api/label"
                    primaryKey={"id"}
                    textFilterColumn={"name"}
                    keyValue={[]}
                    itemName="Label"
                    CreateForm={
                        <LabelForm mode="POST" defaultValues={{ id: "", name: "", description: "", color: "#FFFFFF" }} />
                    }
                />
            </div>

        </>
    )
}