import * as React from "react"

import { PlusCircle } from "lucide-react"
import { Column, Row } from "@tanstack/react-table"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
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
import { z } from "zod"
import { DualRangeSlider } from "@/components/ui/dual-range-picker"

interface DataTableFacetedFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  title?: string
}

export function NumberFunctionFilter<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: any
) {
  const [start, end] = filterValue as [number, number];
  const value = z.coerce.number().parse(row.original[columnId as keyof Row<TData>["original"]]);

  return (start <= value) && (end >= value);
}

function ScaledValue(lowerValue: number, upperValue: number) {
  const log10lower = Math.ceil(Math.log10(lowerValue));
  const scalelower = Math.pow(10, log10lower);
  const scaledlower = scalelower === 0 ? 0 : Math.floor(lowerValue / scalelower) * (scalelower);

  const log10upper = Math.floor(Math.log10(upperValue)); //  1
  const scaleupper = Math.pow(10, log10upper); // 10
  const scaledupper = scaleupper === 0 ?
    0 :
    Math.ceil(upperValue / scaleupper) * (scaleupper); // 10

  return [scaledlower, scaledupper];
}

export function DataTableColumnFilterNumber<TData, TValue>({
  column,
  title,
}: DataTableFacetedFilterProps<TData, TValue>) {

  if (column.getFilterFn() && !(column.getFilterFn() === NumberFunctionFilter)) throw new Error(`Column ${title} must have a number filter function`);

  const facets = column?.getFacetedUniqueValues()
  const values: number[] = [...facets.entries()].map(([value, count]) => value as number);

  const [start, end] = (column.getFilterValue() ?? [undefined, undefined]) as [number | undefined, number | undefined];
  const [min, max] = values.length ? ScaledValue((Math.min(...values)), (Math.max(...values))) : [0, 100];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="size-4" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          {title}
          {
            (start || end) && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <div className="space-x-1 flex">
                  {start && (start != min) && <Badge
                    variant="secondary"
                    key={start.toString()}
                    className="rounded-sm px-1 font-normal"
                  >
                    {start}{" <"}
                  </Badge>}
                  {end && (end != max) && <Badge
                    variant="secondary"
                    key={end.toString()}
                    className="rounded-sm px-1 font-normal"
                  >
                    {"< "}{end}
                  </Badge>}
                </div>
              </>
            )
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0")}>
        <div className="w-[200px] h-[100px] space-y-5 px-10 flex flex-col justify-center">
          <DualRangeSlider
            label={(value) => <span>{value}</span>}
            min={min}
            max={max}
            step={1}
            value={column.getFilterValue() as [number, number]}
            onValueChange={([s, e]) => {
              if (s == min && e == max) column.setFilterValue(undefined);
              else column.setFilterValue([s, e]);
            }}
            defaultValue={[start ?? min, end ?? max]}
          />
        </div>
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
  )
}
