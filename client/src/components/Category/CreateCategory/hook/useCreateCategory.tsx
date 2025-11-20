import { useEffect, useRef } from "react";
import { useForm } from "@refinedev/core";
import { toast } from "react-hot-toast";
import { ICreateCategoryReponse } from "../../../../shared/types/CategoryApi";
export default function useCreateCategory() {
  const { onFinish, mutation } = useForm({
    action: "create",
    resource: "protected-category",
  });
  const newCategoryNameRef = useRef<HTMLInputElement>(null);

  function handleCreate() {
    const newCategoryNameValue = handleCheckCategoryName();

    if (newCategoryNameValue) {
      console.log(newCategoryNameValue);
      onFinish(newCategoryNameValue);
    }
  }

  function handleCheckCategoryName() {
    if (newCategoryNameRef.current) {
      const newCategoryNameValue = newCategoryNameRef.current.value;
      if (!newCategoryNameValue.trim()) {
        toast.error("Category is required");
        return;
      }
      return newCategoryNameValue;
    }
  }

  useEffect(() => {
    if (mutation.data) {
      toast.success(
        (mutation.data as unknown as ICreateCategoryReponse).message,
      );
    }
    if (mutation.error) {
      toast.error(
        (mutation.error as unknown as ICreateCategoryReponse).message,
      );
    }
  }, [mutation.data, mutation.error]);

  return { newCategoryNameRef, handleCreate };
}
