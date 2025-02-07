import { Badge } from "@/components/ui/badge"

interface DataTableRowFormatBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
}

export function DataTableRowFormatBadge({
  value,
  label,
}: DataTableRowFormatBadgeProps) {

  return (
    <div className="flex space-x-2">
      {label && <Badge variant="outline">{label}</Badge>}
      <span className="max-w-[500px] truncate font-medium">
        {value}
      </span>
    </div>
)
}
