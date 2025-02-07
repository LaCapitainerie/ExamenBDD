"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination, PageSizeOption } from "./data-table-pagination";
import { DataTableSkeleton } from "./data-table-skeleton";
import { DataTableToolbar } from "./data-table-toolbar";
import { CheckCircle2Icon, CircleXIcon } from "lucide-react";
import { filterType } from "./column-filter/data-table-filter";

export type ExtractAccessorKey<T> = T extends { accessorKey: infer K } ? K : never;

interface DataTableProps<
  TData,
  TValue,
  TColumns extends ColumnDef<TData, TValue>[]
> {
  /**
   * The columns to display in the table. Prefer a separate file for this.
   */
  columns?: TColumns;
  /**
   * The data to display in the table.
   */
  data: TData[];
  /**
   * The columns to use as key values for filtering.
   */
  keyValue?: Partial<{
    [key in ExtractAccessorKey<TColumns[number]>]: filterType | { [k in keyof Partial<Row<TData>["original"]>]: filterType };
  }>;
  /**
   * The column to use as a text filter.
   */
  textFilterColumn?: ExtractAccessorKey<TColumns[number]> & string;
  /**
   * (Optionnal) The number of rows to display per page.
   */
  defaultPageSize?: PageSizeOption;
  /**
   * (Optionnal) Callback when a row is clicked.
   */
  onRowClicked?: (row: TData) => void;
  /**
   * (Optionnal) Set active rows.
   */
  setRowSelected?: (rows: Row<TData>[]) => void;
}

export function DataTable<
  TData,
  TValue,
  TColumns extends ColumnDef<TData, TValue>[]
>({
  columns,
  data,
  keyValue = {},
  textFilterColumn,
  defaultPageSize = 10,
  onRowClicked,
  setRowSelected,
}: DataTableProps<TData, TValue, TColumns>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageSize: defaultPageSize,
    pageIndex: 0,
  });

  const usedColumns = columns ?? Object.keys(data[0] ?? {}).map((key) => ({ accessor: key, header: key } as ColumnDef<TData, TValue>));

  const table = useReactTable({
    data,
    columns: usedColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },

    enableRowSelection: true,
    onPaginationChange: setPagination,
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
  });



  React.useEffect(() => {
    if (setRowSelected === undefined) return;

    const selectedRow = table.getSelectedRowModel().rows;
    selectedRow && setRowSelected(selectedRow);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);
  


  const YesIcon = (
    <div className="flex w-[100px] items-center">
      <CheckCircle2Icon
        color={"green"}
        className={`mr-2 h-4 w-4 text-muted-foreground`}
      />
      <span className="max-w-[500px] truncate font-medium">Yes</span>
    </div>
  );

  const NoIcon = (
    <div className="flex w-[100px] items-center">
      <CircleXIcon
        color={"red"}
        className={`mr-2 h-4 w-4 text-muted-foreground`}
      />
      <span className="max-w-[500px] truncate font-medium">No</span>
    </div>
  );

  return (
    <React.Suspense
      fallback={
        <DataTableSkeleton
          columnCount={usedColumns.length}
          searchableColumnCount={1}
          filterableColumnCount={(keyValue && Object.keys(keyValue).length) ?? 0}
          cellWidths={usedColumns.map(() => "10rem")}
          shrinkZero
        />
      }
    >
      <div className="space-y-4">
        <DataTableToolbar
          table={table}
          keyValue={keyValue}
          filterColumn={textFilterColumn}
        />

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
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClicked?.(row.original)}
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
                    colSpan={usedColumns.length}
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
  );
}
