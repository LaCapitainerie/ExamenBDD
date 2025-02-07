"use client";

import { DataTable } from "@/components/captainui/data-table/data-table";
import { useAvions } from "@/hooks/use-avions";
import { AvionsColumns } from "./columns";
import { useSession } from "next-auth/react";
import React from "react";
import { DataTableSkeleton } from "@/components/captainui/data-table/data-table-skeleton";

export function ProductTable() {
  const { data } = useSession();
  const { avions, isAvionsLoading } = useAvions(data?.access_token ?? "");

  if (data?.access_token === undefined) {
    return null;
  }

  return isAvionsLoading ? (
    <DataTableSkeleton columnCount={AvionsColumns.length} rowCount={10} />
  ) : (
    <DataTable
      columns={AvionsColumns}
      data={avions}
      keyValue={{
        type: "enum",
        quantity: "number",
        fournisseurs: { name: "array" },
      }}
    />
  );
}
