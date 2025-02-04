import react from "react"
import { LucideProps } from "lucide-react"
import { Row } from "@tanstack/react-table"

import { AuthorizedKey } from "@/components/captainui/utils"

interface DataTableRowFormatEnumProps<TData extends string> extends React.HTMLAttributes<HTMLDivElement> {
  value: TData
  enumValue: {
    [key in TData]: {
      value: string
      icon: react.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>
    }
  }
}

export function DataTableRowFormatEnum<TData extends string>({
  value,
  enumValue,
}: DataTableRowFormatEnumProps<TData>) {
  
  const Value = enumValue[value];

  return (
    <div className="flex space-x-2">
      {Value.icon && <Value.icon/>}
      <span className="max-w-[500px] truncate font-medium">
        {Value.value}
      </span>
    </div>
  )
}
