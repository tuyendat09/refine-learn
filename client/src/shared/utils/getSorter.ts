import { CrudSort } from "@refinedev/core";

export default function getSorter(
  sorters: CrudSort[] | undefined,
  field: string,
) {
  if (!sorters) return undefined;
  return sorters.find((s) => s.field === field);
}
