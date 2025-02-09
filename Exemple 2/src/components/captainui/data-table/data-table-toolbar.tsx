"use client";

import { X } from "lucide-react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import {
  AllowedValues,
  DataTableColumnFilter,
} from "./column-filter/data-table-filter";
import { toast } from "sonner";

export type ExtractAccessorKey<T> = T extends { accessorKey: infer K }
  ? K
  : never;

export type DeepPartialWithEnums<T> = {
  [K in keyof T]?: T[K] extends string
    ? AllowedValues // Restrict string properties to AllowedValues
    : T[K] extends Array<any>
    ? DeepPartialWithEnums<T[K][number]>
    : T[K] extends object
    ? DeepPartialWithEnums<T[K]> // Recursively apply to nested objects
    : AllowedValues;
};

export type PartialTest<TData> = DeepPartialWithEnums<TData>;

function DeepPartialToJSX<TData>({
  keyValue,
  table,
  sub = [],
}: {
  keyValue: DeepPartialWithEnums<TData>;
  table: Table<TData>;
  sub?: string[];
}) {
  return (
    <>
      {Object.entries(keyValue).map(([key, value], idx) => {
        if (typeof value === "object" && value !== null) {
          return (
            <DeepPartialToJSX
              key={key + idx}
              keyValue={value}
              table={table}
              sub={sub?.concat(key)}
            />
          );
        }

        const col = table.getColumn(sub.length ? sub[0] : key);
        const typedValue = value as AllowedValues;

        return col && value ? (
          <DataTableColumnFilter
            key={key + idx}
            filterType={typedValue}
            column={col}
            title={
              sub.length
                ? sub.join(" - ")
                : key.charAt(0).toUpperCase() + key.slice(1)
            }
            sub={sub.length ? sub.concat(key) : undefined}
          />
        ) : null;
      })}
    </>
  );
}

interface DataTableToolbarProps<
  TData,
  TValue,
  TColumns extends ColumnDef<TData, TValue>[]
> {
  table: Table<TData>;
  keyValue: PartialTest<TData>;
  filterColumn?: ExtractAccessorKey<TColumns[number]> & string;
}

export function DataTableToolbar<
  TData,
  TValue,
  TColumns extends ColumnDef<TData, TValue>[]
>({
  table,
  keyValue,
  filterColumn,
}: DataTableToolbarProps<TData, TValue, TColumns>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const isAllPageRowsSelected = table.getIsAllPageRowsSelected();
  const isAllRowsSelected = table.getIsAllRowsSelected();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterColumn && (
          <Input
            placeholder={`Filter ${filterColumn}...`}
            value={
              (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {<DeepPartialToJSX keyValue={keyValue} table={table} />}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex flex-row gap-2">
        {isAllPageRowsSelected && !isAllRowsSelected && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={() => table.toggleAllRowsSelected()}
          >
            Tout sélectionner
          </Button>
        )}
        {isAllRowsSelected && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={() => table.toggleAllRowsSelected()}
          >
            Tout désélectionner
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
