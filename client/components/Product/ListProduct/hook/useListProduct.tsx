import { useTable } from "@refinedev/antd";
import {
  CustomGetListParams,
  Product,
} from "../../../../shared/types/ProductApi";

export default function useListProduct() {
  const { tableProps, setCurrentPage, currentPage, sorters } =
    useTable<Product>({
      resource: "protected-product",
      pagination: { currentPage: 1, pageSize: 9 },
      meta: {} satisfies CustomGetListParams,
    });

  return { tableProps, sorters };
}
