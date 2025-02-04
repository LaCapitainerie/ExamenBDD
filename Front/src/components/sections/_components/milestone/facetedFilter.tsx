import * as React from "react"
import { Check, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MilestoneForm } from "@/components/sections/_components/milestone/form"


export type EnumObject = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

interface DataTableFacetedFilterProps extends React.ComponentPropsWithoutRef<"div"> {
  options: EnumObject[]
}

export function MilestoneList({
  options,
  ...props
}: DataTableFacetedFilterProps) {
  const facets = options.reduce((acc, option) => {
    acc.set(option.value, (acc.get(option.value) || 0) + 1)
    return acc
  }, new Map<string, number>())

  const selectedValues = new Set<EnumObject["value"]>()

  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>

      <div className={cn("flex flex-col items-center justify-between w-96 border rounded-lg", props.className)}>

        <Command>
          <CommandInput placeholder={"Milestone"} />
          <CommandList>

            <CommandEmpty>
              No results found.
            </CommandEmpty>

            <CommandGroup>
              {options.map((option) => {
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
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
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
                    onSelect={() => selectedValues.clear()}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
            <CommandSeparator />
          </CommandList>
        </Command>

        <DialogTrigger className="flex items-center gap-2 p-2 w-full">
            <PlusCircle className="h-5 w-5" />
            Create a new Milestone
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Milestone</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new Milestone.
            </DialogDescription>
          </DialogHeader>

          <MilestoneForm onSubmitFunction={() => setShowNewTeamDialog(false)} />

          <DialogFooter>
          </DialogFooter>
        </DialogContent>

      </div>

    </Dialog>
  )
}
