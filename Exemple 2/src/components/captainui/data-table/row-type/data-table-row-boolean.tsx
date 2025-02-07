import { CheckCircle2Icon, CircleXIcon } from "lucide-react"

interface DataTableRowFormatBooleanProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  value: boolean;
  customYes?: string;
  customNo?: string;
}

const TrueElementValues = {
  value: "true",
  label: "Yes",
  icon: CheckCircle2Icon,
  color: "green",
} as const;

const FalseElementValues = {
  value: "false",
  label: "No",
  icon: CircleXIcon,
  color: "red",
} as const;

export function DataTableRowFormatBoolean<TData>({
  value,
  customYes,
  customNo,
}: DataTableRowFormatBooleanProps<TData>) {

  const Value = value ? TrueElementValues : FalseElementValues

  return (
    <div className="flex w-[100px] items-center">
      <Value.icon color={Value.color} className={`mr-2 h-4 w-4 text-muted-foreground`} />
      <span className="max-w-[500px] truncate font-medium">
        {Value.label === "Yes" ? (customYes || "Yes") : (customNo || "No")}
      </span>
    </div>
  )
}
