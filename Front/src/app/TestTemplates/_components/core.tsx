"use client"

import { LicenceDropdown } from "@/components/sections/_components/licence/licenceDropdown";
import { Template } from "@/types/Prisma/Template";
import { useState } from "react";
import { ReadMe } from "@/types/Prisma/ReadMe";
import TemplateSwitcher from "@/components/sections/_components/template/switcher";
import ReadmeSwitcher from "@/components/sections/_components/readme/switcher";
import { EnumObject, MilestoneList } from "@/components/sections/_components/milestone/facetedFilter";
import { Button } from "@/components/ui/button";

interface CoreProps {
    teams: Template[];
    readme: Omit<ReadMe, "content">[];
    issues: EnumObject[];
    milestones: EnumObject[];
}

export function Core({ teams, readme, issues, milestones }: CoreProps) {

    const [template, setTemplate] = useState<Template | null>(teams.length ? teams[0] : null)

    /*\
     * 
     * Haut droit - Team switcher - Listes des templates
     * Bas - Dropdown - ReadMe & Licence
     * Gauche - FacetedFilter - Liste des Milestones
     * 
     * ----------------------------------------------
     * 
     * Droit - Preview - Project
     * 
     * ? - Issues solitaires
     * ? - Labels solitaires
     * 
    \*/

    return (
        <>

            <div className="flex flex-row justify-between gap-4 2xl:w-[88rem] h-[96rem]">
                <MilestoneList className="h-full border-foreground" options={milestones} />

                <div className="flex flex-col justify-between w-full">

                    <TemplateSwitcher className="border-foreground" teams={teams.map(t => t.title)} onValueChange={v => setTemplate(teams.find(t => t.title === v)!)} />

                    <h1>Project preview</h1>

                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-4">
                            <ReadmeSwitcher className="border-foreground" teams={readme.map(t => t.title)} />

                            <LicenceDropdown className="border-foreground" defaultValue={template?.licence} />
                        </div>

                        <div className="flex flex-row">
                            <Button variant="secondary">Create</Button>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}