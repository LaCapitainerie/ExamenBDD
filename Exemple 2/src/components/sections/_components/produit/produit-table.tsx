"use client";

import { DataTable } from "@/components/captainui/data-table/data-table";
import { useProduits } from "@/hooks/use-avions";
import { AvionsColumns } from "./columns";
import { useSession } from "next-auth/react";
import React from "react";
import { DataTableSkeleton } from "@/components/captainui/data-table/data-table-skeleton";

export function ProductTable() {
  const { data } = useSession();
  const { avions, isAvionsLoading } = useProduits(data?.access_token ?? "");

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
        fournisseurs: { name: "enum" },
      }}
    />
  );
}

type _Test = {
  a: string;
  b: string;
  c: {
    d: string;
    e: {
      f: string;
    }
  }
}

type _allowedValues = "enum" | "number" | "string";

const _value = {
  a: "enum",
  c: { d: "number", e: { f: "string" } }
}

// ----


type Test = {
  a: string;
  b: string;
  c: {
    d: string;
    e: {
      f: string;
    };
  };
};

type AllowedValues = "enum" | "number" | "string";

type DeepPartialWithEnums<T> = {
  [K in keyof T]?: T[K] extends string
    ? AllowedValues // Restrict string properties to AllowedValues
    : T[K] extends object
    ? DeepPartialWithEnums<T[K]> // Recursively apply to nested objects
    : T[K];
};

type PartialTest = DeepPartialWithEnums<Test>;

const value: PartialTest = {
  a: "enum",
  b: "enum",
  c: { d: "number", e: { f: "string" } },
};