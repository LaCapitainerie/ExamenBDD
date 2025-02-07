import { Column } from "@tanstack/react-table";
import { DataTableColumnFilterBoolean } from "./data-table-column-boolean";
import { DataTableColumnFilterEnum } from "./data-table-column-enum";
import { DataTableColumnFilterDate } from "./data-table-column-date";
import { DataTableColumnFilterNumber } from "./data-table-column-number";
import { DataTableColumnFilterArray } from "./data-table-column-array";

export type filterType = "boolean" | "enum" | "date" | "number" | "array";

type FilterProps<TData, TValue> = {
    data?: TData;
    filterType: filterType;
    column: Column<TData, TValue>;
    title: string;
    id?: any;
}

export function DataTableColumnFilter<TData, TValue>({ data, filterType, column, title, id }: FilterProps<TData, TValue>) {

    switch (filterType) {
        case "boolean":
            return (
                <DataTableColumnFilterBoolean column={column} title={title} />
            );

        case "enum":
            return (
                <DataTableColumnFilterEnum column={column} title={title} />
            );

        case "date":
            return (
                <DataTableColumnFilterDate column={column} title={title} />
            )

        case "number":
            return (
                <DataTableColumnFilterNumber column={column} title={title} />
            )

        case "array":
            return (
                <DataTableColumnFilterArray column={column} title={title} id={id} />
            )
    }
}