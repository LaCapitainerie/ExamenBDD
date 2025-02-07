import * as React from "react";
import { Check, PlusCircle } from "lucide-react";
import { Column, Row } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface DataTableFacetedFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  title?: string;
  id: keyof TData;
}

export function ArrayFunctionFilter<
  TData,
  TRow extends Row<TData>,
  TColumnId extends keyof TRow["original"],
  TSubvalue extends keyof TRow["original"][TColumnId],
  TFilter extends keyof TRow["original"][TColumnId],
>(
  filterName: keyof TSubvalue,
  row: TRow,
  columnId: TColumnId,
  filterValue: TFilter[],
  addMeta?: any
) {
  console.log(JSON.stringify(row.original), filterName, columnId, filterValue);
  
  const value = row.original[columnId] as typeof filterValue;
  return filterValue.every((v) => value.map((v) => v[filterName]).includes(v));
}

export function DataTableColumnFilterArray<TData, TValue>({
  column,
  title,
  id,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const totalOptions: { value: TData[]; count: any }[] = [];
  const facets = column.getFacetedUniqueValues();

  facets.forEach((count, value) => totalOptions.push({ value, count }));

  const uniqueOptionsSet = new Set(
    totalOptions.map(({ value }) => value.map((v) => v[id])).flat()
  );

  const options = Array.from(uniqueOptionsSet).map((value) => ({
    value,
    count: totalOptions.reduce(
      (acc, option) =>
        acc +
        (option.value.map((o) => o[id]).includes(value) ? option.count : 0),
      0
    ),
  }));

  const selectedValues = new Set(column?.getFilterValue() as string[]);

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
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option, idx) => (
                      <Badge
                        variant="secondary"
                        key={idx}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.value}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value.toString()}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
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
                    <span className="capitalize">{option.value}</span>
                    {uniqueOptionsSet.has(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {uniqueOptionsSet.has(option.value) ? option.count : 0}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column.setFilterValue(undefined)}
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
  );
}
