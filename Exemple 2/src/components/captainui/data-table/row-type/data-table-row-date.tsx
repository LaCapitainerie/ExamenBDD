import { format } from "date-fns"
import { Clock } from "lucide-react"

interface DataTableRowFormatDateProps extends React.HTMLAttributes<HTMLDivElement> {
  value: Date | string
  formatValue?: string
}

export function DataTableRowFormatDate({
  value,
  formatValue
}: DataTableRowFormatDateProps) {

  return (
    <div className="flex w-[200px] items-center">
        <Clock className={`mr-2 h-4 w-4 text-muted-foreground`} />
        {value ? format(value,  formatValue || 'dd MMMM yyyy') : "Never"}
    </div>
  )
}
