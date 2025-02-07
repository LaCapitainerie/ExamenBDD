"use client"

import { X } from "lucide-react"
import { ColumnDef, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableColumnFilter, filterType } from "./column-filter/data-table-filter"

type ExtractAccessorKey<T> = T extends { accessorKey: infer K } ? K : never;

interface DataTableToolbarProps<TData, TValue, TColumns extends ColumnDef<TData, TValue>[]> {
  table: Table<TData>;
  keyValue: Partial<{
    [key : string]: filterType | { [k : string]: filterType };
  }>;
  filterColumn?: ExtractAccessorKey<TColumns[number]> & string;
}

export function DataTableToolbar<TData, TValue, TColumns extends ColumnDef<TData, TValue>[]>({
  table,
  keyValue,
  filterColumn
}: DataTableToolbarProps<TData, TValue, TColumns>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const isAllPageRowsSelected = table.getIsAllPageRowsSelected();
  const isAllRowsSelected = table.getIsAllRowsSelected();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterColumn && <Input
          placeholder={`Filter ${filterColumn}...`}
          value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />}
        {
          Object.entries(keyValue).map(([key, value]) => {
            if(typeof value === "object") {
              return Object.entries(value).map(([k, v]) => {
                const col = table.getColumn(key);
                return col && v && (
                  <DataTableColumnFilter filterType={v} column={col} title={key.charAt(0).toLocaleUpperCase() + key.slice(1)} id={k} />
                )
              })
            }

            const col = table.getColumn(key);
            return col && value && (
              <DataTableColumnFilter filterType={value} column={col} title={key.charAt(0).toLocaleUpperCase() + key.slice(1)} />
            )
          })
        }
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
        {
          isAllPageRowsSelected && !isAllRowsSelected &&
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={() => table.toggleAllRowsSelected()}
          >
            Tout sélectionner
          </Button>
        }
        {
          isAllRowsSelected &&
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={() => table.toggleAllRowsSelected()}
          >
            Tout désélectionner
          </Button>
        }
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
