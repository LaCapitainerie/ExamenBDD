"use client";

import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { ProductTable } from "@/components/sections/_components/produit/produit-table";
import { CommandeTable } from "@/components/sections/_components/commande/commande-table";
import { Typography } from "@/components/ui/typography";
import { useCommandes } from "@/hooks/use-commandes";
import { useSession } from "next-auth/react";
import { CommandeObject } from "@/types/Prisma/Commande";
import { z } from "zod";
import { AreaChartGraph } from "./area-chart";
import { ReportsChart } from "./graph";

const BentoClsx = (...className: ClassValue[]) =>
  cn(
    "flex flex-col gap-4",
    "p-6 group relative col-span-3 overflow-hidden rounded-xl",
    "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
    "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
    className
  );

export function Core() {

  const { data } = useSession();
  const { commandes } = useCommandes(data?.access_token ?? "");

  const status = CommandeObject.shape.status._def.values;

  

  const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const graphData = Month.map((s, idx) => ({
    [s]: commandes.filter((c) => z.coerce.date().parse(c.createdAt).getMonth() === idx)
      .length,
  }));

  const graphObjectData = Object.assign({}, ...graphData);

  console.log(graphObjectData);

  return (
    <>
      <div className={BentoClsx("col-span-1 lg:col-span-2 row-span-2")}>
        <Typography variant="h2" className="text-center">
          Commandes
        </Typography>
        <CommandeTable />
      </div>

      <div className={BentoClsx("col-span-2 row-span-4")}>
        <Typography variant="h2" className="text-center">
          Rapport de commandes
        </Typography>
        <ReportsChart
          title={"Commandes"}
          description={"Répartition des commandes par statut"}
          subject={"Commandes"}
          data={
            status.map((s) => ({
              [s]: commandes.filter((c) => c.status === s).length,
            }))[0]
          }
          className="h-full"
        />
        <AreaChartGraph
          title={"Nombre de commandes"}
          description={"Répartition des commandes sur l'année"}
          subject={"Commandes"}
          data={graphObjectData}
          className="h-full"
        />
      </div>

      <div className={BentoClsx("col-span-1 lg:col-span-2 row-span-2")}>
        <Typography variant="h2" className="text-center">
          Produits
        </Typography>
        <ProductTable />
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
  );
}
