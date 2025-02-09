import { Column } from "@tanstack/react-table";
import { DataTableColumnFilterBoolean } from "./data-table-column-boolean";
import { DataTableColumnFilterEnum } from "./data-table-column-enum";
import { DataTableColumnFilterDate } from "./data-table-column-date";
import { DataTableColumnFilterNumber } from "./data-table-column-number";

export type AllowedValues = "boolean" | "enum" | "date" | "number";

type FilterProps<TData, TValue> = {
  data?: TData;
  filterType: AllowedValues;
  column: Column<TData, TValue>;
  title: string;
  sub?: string[];
};

export function DataTableColumnFilter<TData, TValue>({
  data,
  filterType,
  column,
  title,
  sub,
}: FilterProps<TData, TValue>) {
  switch (filterType) {
    case "boolean":
      return (
        <DataTableColumnFilterBoolean
          column={column}
          title={title}
          sub={sub ?? []}
        />
      );

    case "enum":
      return (
        <DataTableColumnFilterEnum
          column={column}
          title={title}
          sub={sub ?? []}
        />
      );

    case "date":
      return <DataTableColumnFilterDate column={column} title={title} />;

    case "number":
      return <DataTableColumnFilterNumber column={column} title={title} />;
  }
}
