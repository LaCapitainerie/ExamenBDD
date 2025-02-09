import * as React from "react";
import { Check, PlusCircle } from "lucide-react";
import { Column } from "@tanstack/react-table";

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
  sub: string[];
}

function getRecursiveValue(obj: any, keys: string[]) {
  return keys.reduce((acc, key) => acc[key], obj);
}

export function DataTableColumnFilterEnum<TData, TValue>({
  column,
  title,
  sub,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column.getFacetedUniqueValues();

  const OptionsArray: string[] = facets
    ?.keys()
    .map((key) =>
      Array.isArray(key)
        ? key.map((k) => getRecursiveValue(k, sub.slice(1)))
        : key
    )
    .toArray()
    .flat();

  const uniqueOptionsMap = new Map(
    OptionsArray.map((value) => [
      value,
      OptionsArray.filter((option) => option === value).length,
    ])
  );

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
                  uniqueOptionsMap
                    .keys()
                    .filter((option) => selectedValues.has(option))
                    .map((option, idx) => (
                      <Badge
                        variant="secondary"
                        key={idx}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option}
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
              {uniqueOptionsMap
                .entries()
                .map(([name, count]) => {
                  const isSelected = selectedValues.has(name);

                  return (
                    <CommandItem
                      key={name.toString()}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(name);
                        } else {
                          selectedValues.add(name);
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
                      <span className="capitalize">{name}</span>
                      {uniqueOptionsMap.get(name) && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {uniqueOptionsMap.get(name)}
                        </span>
                      )}
                    </CommandItem>
                  );
                })
                .toArray()}
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
