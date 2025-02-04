"use client"

import { X } from "lucide-react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { AuthorizedKey } from "@/components/captainui/utils"

import { DataTableViewOptions } from "./data-table-view-options"
import { BooleanObject, DataTableFacetedFilter, EnumObject } from "./data-table-faceted-filter"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Authorized = boolean | string

type ObjectValue<TData, K extends keyof TData> = {
  value: (TData[K] extends boolean ? BooleanObject : EnumObject)[]
  alias?: string
}

export type keyValueType<TData> = {
  [K in AuthorizedKey<TData, Authorized>]: ObjectValue<TData, K>
}

interface DataTableToolbarProps<TData, TColumns> {
  table: Table<TData>
  keyValue: keyValueType<TColumns>
  filterColumn: keyof TData & string
  itemName: string
  CreateForm?: JSX.Element
}

export function DataTableToolbar<TData, TColumns>({
  table,
  keyValue,
  filterColumn,
  itemName,
  CreateForm,
}: DataTableToolbarProps<TData, TColumns>) {
  const isFiltered = table.getState().columnFilters.length > 0
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0">
        <Input
          placeholder={`Filter ${filterColumn}...`}
          value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
          }
          className="h-8 w-full sm:w-[150px] lg:w-[250px]"
        />
        <div className="flex space-x-2 sm:space-x-4 w-full sm:w-auto">
          {
            Object.entries(keyValue).map(([key, value]) => {
              const Valeur : ObjectValue<TColumns, keyof TColumns> = value as ObjectValue<TColumns, keyof TColumns>
              return table.getColumn(key) && (
                <DataTableFacetedFilter
                  key={key}
                  column={table.getColumn(key)}
                  title={Valeur.alias ?? key}
                  options={Valeur.value as (BooleanObject | EnumObject)[]}
                />
              )
            })
          }
        </div>
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

      {Boolean(CreateForm) && (

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              Create a new {itemName}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Create a new {itemName}
              </DialogTitle>
            </DialogHeader>

            <DialogDescription>
              {CreateForm}
            </DialogDescription>


          </DialogContent>
        </Dialog>

      )}

      <DataTableViewOptions table={table} />
    </div>
  )
}
