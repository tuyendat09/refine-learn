import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal/Modal";
import ModalContent from "../../../shared/components/Modal/ModalContent";
import ModalHeader from "../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../shared/components/Modal/ModalFooter";
import useToggle from "../../../shared/hooks/useToggle";
import { useNavigate } from "react-router";
import FloatingInput from "../../../shared/components/Input/FloatingInput";
import FloatingSelect from "../../../shared/components/Select/FloatingSelect";
import useCreateProduct from "./hooks/useCreateProduct";

export default function CreateProductModal() {
  const { options } = useCreateProduct();
  const navigate = useNavigate();
  const { toggle, handleToggle } = useToggle({ initialState: true });

  function goBackRoute() {
    navigate("/");
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
            <h1 className="font-serif mb-3">New Product</h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <form>
            <FloatingInput
              clearBackground
              label="Product Name"
              name="productName"
            />
            <FloatingInput
              clearBackground
              label="Product Price"
              name="productPrice"
            />
            <FloatingInput
              clearBackground
              label="Product Quantity"
              name="productQuantity"
            />
            <FloatingSelect
              name="gender"
              label="Giới tính"
              clearBackground
              options={options}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button fullWidth size="lg" variant="black">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
