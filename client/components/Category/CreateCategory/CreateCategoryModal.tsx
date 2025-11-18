import { useRef } from "react";

import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal/Modal";
import ModalContent from "../../../shared/components/Modal/ModalContent";
import ModalHeader from "../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../shared/components/Modal/ModalFooter";
import useToggle from "../../../shared/hooks/useToggle";
import { useNavigate } from "react-router";

export default function CreateCategoryModal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toggle, handleToggle } = useToggle({ initialState: true });

  function goBackRoute() {
    navigate("/category");
  }

  return (
    <Modal isOpen={toggle} onClose={goBackRoute} size="md">
      <ModalContent>
        <ModalHeader>
          <div className="text-center font-normal">
            <h1 className="font-serif mb-3">New Category Name</h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <p>123</p>
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
