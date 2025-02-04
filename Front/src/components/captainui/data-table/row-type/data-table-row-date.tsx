import { format } from "date-fns"
import { Clock } from "lucide-react"

interface DataTableRowFormatDateProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  value: Date;
}

export function DataTableRowFormatDate<TData>({
  value
}: DataTableRowFormatDateProps<TData>) {

  return (
    <div className="flex w-[200px] items-center">
      <Clock className={`mr-2 h-4 w-4 text-muted-foreground`} />
      {format(value, 'dd MMMM yyyy')}
    </div>
  )
}
