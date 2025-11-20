import Button from "../../../src/shared/components/Button";
import Modal from "../../../src/shared/components/Modal/Modal";
import ModalContent from "../../../src/shared/components/Modal/ModalContent";
import ModalHeader from "../../../src/shared/components/Modal/ModalHeader";
import ModalBody from "../../../src/shared/components/Modal/ModalBody";
import ModalFooter from "../../../src/shared/components/Modal/ModalFooter";
import useToggle from "../../../src/shared/hooks/useToggle";
import { useNavigate } from "react-router";
import FloatingInput from "../../../src/shared/components/Input/FloatingInput";
import useEditCategory from "./hook/useEditCategory";
import { Skeleton } from "antd";

export default function EditCategoryModal() {
  const {
    result,
    isLoading,
    categoryName,
    handleChangeCategoryName,
    handleEdit,
    isPending,
  } = useEditCategory();

  const navigate = useNavigate();
  const { toggle, handleToggle } = useToggle({ initialState: true });

  function goBackRoute() {
    navigate("/category");
  }

  function customHandleToggle() {
    handleToggle();
    setTimeout(() => goBackRoute(), 500);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  return (
    <Modal isOpen={toggle} onClose={customHandleToggle} size="md">
      <ModalContent>
        <ModalHeader>
          <div className="text-center font-normal">
            <h1 className="font-serif mb-3">Edit Category Name</h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            {!isLoading && (
              <FloatingInput
                onKeyDown={(e) => handleKeyDown(e)}
                value={categoryName}
                onChange={(e) => handleChangeCategoryName(e)}
                clearBackground
                name="categoryName"
                label="Category Name"
              />
            )}

            {isLoading && <Skeleton.Input active={true} block={true} />}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => handleEdit()}
            isDisable={
              result?.category.categoryName == categoryName ||
              isPending ||
              isLoading
            }
            fullWidth
            size="lg"
            variant="black"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
