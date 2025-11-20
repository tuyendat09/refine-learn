import { useState } from "react";
import { useNavigate } from "react-router";

export default function useAnimation() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState<boolean>(false);

  const handleTransition = (pathName: string) => {
    setAnimate(true);

    setTimeout(() => {
      navigate(pathName);
    }, 500);
  };

  return {
    animate,
    handleTransition,
  };
}
