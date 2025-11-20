import { useState } from "react";

interface useToggleProps {
  initialState?: boolean;
}
export default function useToggle({ initialState = false }: useToggleProps) {
  const [toggle, setToggle] = useState<boolean>(initialState);

  function handleToggle() {
    setToggle((prevState) => !prevState);
  }
  return { toggle, handleToggle, setToggle };
}
