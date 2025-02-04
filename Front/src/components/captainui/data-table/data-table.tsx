"use client"

import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableSkeleton } from "./data-table-skeleton"
import { DataTableToolbar, keyValueType } from "./data-table-toolbar"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue, TColumns extends ColumnDef<TData, TValue>[]> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TColumns
  data: TData[]
  keyValue: keyValueType<NoInfer<TColumns>>
  textFilterColumn: keyof TData & string
  apiUrl: string
  primaryKey: keyof TData & string
  itemName: string
  CreateForm?: JSX.Element
}

export function DataTable<TData, TValue, TColumns extends ColumnDef<TData, TValue>[]>({
  columns,
  data,
  keyValue,
  textFilterColumn,
  primaryKey,
  itemName,
  CreateForm,
  className,
}: DataTableProps<TData, TValue, TColumns>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])


  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (

    <React.Suspense
      fallback={
        <DataTableSkeleton
          columnCount={columns.length}
          searchableColumnCount={1}
          filterableColumnCount={Object.keys(keyValue).length}
          cellWidths={columns.map(() => "10rem")}
          shrinkZero
        />
      }
    >
      <div className={cn("space-y-4", className)}>

        <DataTableToolbar table={table} keyValue={keyValue} filterColumn={textFilterColumn} CreateForm={CreateForm} itemName={itemName} />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                  )}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </React.Suspense>


  )
}
