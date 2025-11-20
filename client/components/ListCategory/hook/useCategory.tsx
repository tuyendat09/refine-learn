import { useTable } from "@refinedev/antd";
import { BaseKey, useDelete } from "@refinedev/core";
import { toast } from "react-hot-toast";

export default function useCategory() {
  const { tableProps, setCurrentPage, currentPage } = useTable({
    resource: "protected-category",
    pagination: { currentPage: 1, pageSize: 15 },
  });
  const { mutate } = useDelete();

  function handleDeleteCategory(id: BaseKey) {
    mutate(
      { resource: "protected-category", id: id },
      {
        onSuccess: () => {
          toast.success("Item deleted");
          handleBackPage();
        },
      },
    );
  }

  function handleBackPage() {
    if (tableProps.dataSource?.length === 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return {
    tableProps,
    handleDeleteCategory,
  };
}
