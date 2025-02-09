import { Row, Table } from "@tanstack/react-table";
import { DeepPartialWithEnums } from "../data-table-toolbar";

type NestedObject = Record<string, any>;

function deepFlatKeys(obj: NestedObject, prefix: string[] = []): string[] {
  let keys: string[] = [];

  for (const key in obj) {
    keys.push(key);

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !(obj[key] instanceof Set)
    ) {
      keys = keys.concat(deepFlatKeys(obj[key], [...prefix, key]));
    }
  }

  return keys;
}

function getRecursiveValue(obj: any, keys: string[]) {
  return keys.reduce((acc, key) => acc[key], obj);
}

export function ArrayFunctionFilter<
  TData,
  TRow extends Row<TData>,
  TColumnId extends keyof TData,
  TFilter
>(
  filterName: DeepPartialWithEnums<NoInfer<TData>>,
  row: TRow,
  columnId: TColumnId,
  filterValue: TFilter[],
  _addMeta?: any
) {
  const facets = row.original[columnId] as unknown[];
  const subs = deepFlatKeys(filterName);

  const valuesOfTheLine = facets.map((f) => getRecursiveValue(f, subs));
  return filterValue.every((value) => valuesOfTheLine.includes(value));
}
