import { LucideProps } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"

interface DataTableRowFormatEnumProps extends React.HTMLAttributes<HTMLDivElement> {
  enum: (string | number)[]
  Icon: React.FC<LucideProps>
  itemName: string
}

export function DataTableRowFormatEnum({
  enum: value,
  Icon,
  itemName = "Unknown",
}: DataTableRowFormatEnumProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{`${value.length} ${itemName}`}</DropdownMenuTrigger>
      <DropdownMenuContent>
          <DropdownMenuLabel className="capitalize">{itemName} list</DropdownMenuLabel>
          <DropdownMenuSeparator />
              {
                  value.map((item, idx) => (
                      <DropdownMenuItem key={idx}>

                        <Icon className="w-6 h-6 mr-2" />
                        {item}

                      </DropdownMenuItem>
                  ))
              }
      </DropdownMenuContent>
  </DropdownMenu>
)
}
