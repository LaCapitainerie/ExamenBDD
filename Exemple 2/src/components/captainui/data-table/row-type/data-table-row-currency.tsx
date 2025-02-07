interface DataTableRowFormatCurrencyProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  numberFormat?: Intl.LocalesArgument
  currency?: Intl.NumberFormatOptions["currency"]
}

export function DataTableRowFormatCurrency({
  value,
  numberFormat,
  currency
}: DataTableRowFormatCurrencyProps) {

  const formatted = new Intl.NumberFormat(numberFormat ?? "en-US", {
    style: "currency",
    currency: currency ?? "USD",
  }).format(value)

  return <div className="text-right font-medium">{formatted}</div>

}
