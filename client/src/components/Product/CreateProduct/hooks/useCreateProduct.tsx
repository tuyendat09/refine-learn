import { useSelect } from "@refinedev/core";
import { Category } from "../../../../src/shared/types/CategoryApi";
export default function useCreateProduct() {
  const { options } = useSelect<Category>({
    resource: "protected-category",
    pagination: { currentPage: 1, pageSize: 20 },
    optionLabel: "categoryName",
    optionValue: "_id",
  });

  return { options };
}
