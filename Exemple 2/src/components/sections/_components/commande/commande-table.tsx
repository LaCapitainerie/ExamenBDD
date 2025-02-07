"use client";

import { DataTable } from "@/components/captainui/data-table/data-table";
import { CommandesColumns } from "./columns";
import { useSession } from "next-auth/react";
import React from "react";
import { DataTableSkeleton } from "@/components/captainui/data-table/data-table-skeleton";
import { useCommandes } from "@/hooks/use-commandes";

export function CommandeTable() {
  const { data } = useSession();
  const { commandes, isCommandesLoading } = useCommandes(data?.access_token ?? "");

  if (data?.access_token === undefined) {
    return null;
  }

  return isCommandesLoading ? (
    <DataTableSkeleton columnCount={CommandesColumns.length} rowCount={10} />
  ) : (
    <DataTable
      columns={CommandesColumns}
      data={commandes}
      keyValue={{
        reference: "enum",
        total: "number",
        date: "date",
        avions: { avionId: "array" },
        // userId: { name: "array" },
      }}
    />
  );
}
