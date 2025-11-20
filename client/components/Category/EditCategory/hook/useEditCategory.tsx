import { useEffect, useState } from "react";
import { useOne, useUpdate } from "@refinedev/core";
import { useNavigate, useParams } from "react-router";
import { GetOneCategoryResponse } from "shared/types/CategoryApi";

export default function useEditCategory() {
  const navigate = useNavigate();
  const id = useParams().id;

  const {
    result,
    query: { isLoading },
  } = useOne<GetOneCategoryResponse>({
    resource: "protected-category",
    id: id,
  });

  const {
    mutate,
    mutation: { isPending, isSuccess, isError },
  } = useUpdate();

  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    if (result) {
      setCategoryName(result.category.categoryName);
    }
    if (isSuccess) {
      navigate("/category");
    }
  }, [result, isSuccess, navigate]);

  function handleChangeCategoryName(e: React.ChangeEvent<HTMLInputElement>) {
    setCategoryName(e.target.value);
  }

  function handleEdit() {
    mutate({ resource: "protected-category", id: id, values: categoryName });
  }

  return {
    result,
    isLoading,
    categoryName,
    handleChangeCategoryName,
    isPending,
    handleEdit,
  };
}
