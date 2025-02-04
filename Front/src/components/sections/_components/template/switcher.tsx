"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TemplateForm } from "@/components/sections/_components/template/form"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps<TData> extends PopoverTriggerProps {
  teams: TData[]
  onValueChange?: (value: TData) => void
}

export default function TemplateSwitcher<TData extends string>({ teams, className }: TeamSwitcherProps<TData>) {
  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState<TData | null>(teams.length ? teams[0] : null)

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a template"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedTeam}
            <ChevronsUpDown className="ml-auto opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search template..." />
            <CommandList>
              <CommandEmpty>No template found.</CommandEmpty>
              <CommandGroup>
                {teams.map((team, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      setSelectedTeam(team)
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${team}.png`}
                        alt={team}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {team}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedTeam === team
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}
                  >
                    <PlusCircle className="h-5 w-5" />
                    Create Template
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new template</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new template.
          </DialogDescription>
        </DialogHeader>

        <TemplateForm onSubmitFunction={() => setShowNewTeamDialog(false)}/>

        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
