import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Column, Row } from "@tanstack/react-table"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { z } from "zod"

interface DataTableFacetedFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  title?: string
}

export function DateFunctionFilter<TData>(row: Row<TData>, columnId: string, filterValue: any) {

  const filter = filterValue as DateRange;

  if (!filter?.from) return true;
  const from = format(filter.from, "dd MMMM yyyy");

  const current = format(z.coerce.date().parse(row.original[columnId as keyof Row<TData>["original"]]), "dd MMMM yyyy");

  if (filter.to) {
    const to = format(filter.to, "dd MMMM yyyy");
    return current >= from && current <= to;
  }

  return current == from;
}

export function DataTableColumnFilterDate<TData, TValue>({
  column,
  title,
}: DataTableFacetedFilterProps<TData, TValue>) {

  if (column.getFilterFn() && !(column.getFilterFn() === DateFunctionFilter)) throw new Error(`Column ${title} must have a date filter function`);

  const options: { value: number; count: any }[] = [];
  const facets = column.getFacetedUniqueValues();

  facets.forEach((count, value) =>
    options.push({ value, count })
  );

  const date = column.getFilterValue() as DateRange | undefined;

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <CalendarIcon className="size-4" />
            <Separator orientation="vertical" className="mx-2 h-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{title}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0")}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(Ndate) => column.setFilterValue(Ndate)}
            numberOfMonths={2}
          />
          <Command>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => column.setFilterValue(undefined)}
                className="justify-center text-center"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>

  )
}
