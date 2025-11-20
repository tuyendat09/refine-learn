import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal/Modal";
import ModalContent from "../../../shared/components/Modal/ModalContent";
import ModalHeader from "../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../shared/components/Modal/ModalFooter";
import useToggle from "../../../shared/hooks/useToggle";
import { useNavigate } from "react-router";
import FloatingInput from "../../../shared/components/Input/FloatingInput";
import useCreateNewCategory from "./hook/useCreateCategory";

export default function CreateCategoryModal() {
  const { newCategoryNameRef, handleCreate } = useCreateNewCategory();

  const navigate = useNavigate();
  const { toggle, handleToggle } = useToggle({ initialState: true });

  function goBackRoute() {
    navigate("/category");
  }

  function customHandleToggle() {
    handleToggle();
    setTimeout(() => goBackRoute(), 500);
  }

  return (
    <Modal isOpen={toggle} onClose={customHandleToggle} size="md">
      <ModalContent>
        <ModalHeader>
          <div className="text-center font-normal">
            <h1 className="font-serif mb-3">New Category Name</h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <FloatingInput
              inputRef={newCategoryNameRef}
              clearBackground
              name="categoryName"
              label="Category Name"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCreate} fullWidth size="lg" variant="black">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
