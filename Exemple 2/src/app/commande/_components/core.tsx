"use client"

import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProductTable } from "@/app/catalogue/_components/produit-table";

const BentoCardClassname = (...className: ClassValue[]) => cn(
    "p-6 group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
    "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
    "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
    className,
)

export function Core() {

    return (
        <>
            <div className={BentoCardClassname("col-span-1 lg:col-span-2 row-span-2")}>
                <ProductTable />
                <BorderBeam size={250} duration={12} delay={9} />
            </div>

            {/* <div className={BentoCardClassname("row-span-1 md:row-span-2 col-span-1 flex flex-col justify-center")}>
                <ReportsChart
                    title={"Scan Compliant"}
                    description={"ratio des scans conformes"}
                    subject={"Scans"}
                    data={{
                        "non-compliants": scanlogs.length - compliants,
                        "compliants": compliants,
                    }}
                    className="h-full"
                />
                <BorderBeam size={250} duration={12} delay={9} />
            </div>

            <div className={BentoCardClassname("col-span-1 md:col-span-2 lg:col-span-3 row-span-2")}>
                {
                    isFindingsLoading ?
                        <DataTableSkeleton columnCount={FindingColumns.length} rowCount={10} />
                        :
                        <DataTable
                            data={findings}
                            columns={FindingColumns}
                            keyValue={{
                                vcname: "enum",
                                accepted: "boolean",
                                date: "date",
                            }}
                            textFilterColumn={"vcname"}
                        />
                }
                <BorderBeam size={250} duration={12} delay={9} />
            </div> */}
        </>
    )
}