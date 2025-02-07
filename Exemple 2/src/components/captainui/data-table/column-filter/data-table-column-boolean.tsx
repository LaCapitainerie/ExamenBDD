import * as React from "react"
import { Check, CheckCircle2Icon, CircleXIcon, PlusCircle } from "lucide-react"
import { Column, Row } from "@tanstack/react-table"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { z } from "zod"

interface DataTableFacetedFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  title?: string
}

export function BooleanFunctionFilter<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: any
) {
  const filter = filterValue as boolean[]

  if (!filter?.length) return true

  return filter.includes(z.coerce.boolean().parse(row.original[columnId as keyof Row<TData>["original"]]))
}

export function DataTableColumnFilterBoolean<TData, TValue>({
  column,
  title,
}: DataTableFacetedFilterProps<TData, TValue>) {

  if (column.getFilterFn() && !(column.getFilterFn() === BooleanFunctionFilter)) throw new Error(`Column ${title} must have a boolean filter function`);

  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as boolean[])

  const YesIcon = (
    <div className="flex w-[100px] items-center">
      <CheckCircle2Icon color={"green"} className={`mr-2 h-4 w-4 text-muted-foreground`} />
      <span className="max-w-[500px] truncate font-medium">
        Yes
      </span>
    </div>
  )

  const NoIcon = (
    <div className="flex w-[100px] items-center">
      <CircleXIcon color={"red"} className={`mr-2 h-4 w-4 text-muted-foreground`} />
      <span className="max-w-[500px] truncate font-medium">
        No
      </span>
    </div>
  )
  
  const OptionsValue = [
    { label: YesIcon, value: true },
    { label: NoIcon, value: false },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="size-4" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  OptionsValue
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value.toString()}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {OptionsValue.filter(o => o.value !== undefined).map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value.toString()}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check />
                    </div>
                    <span className="capitalize">{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
