import { useRegister } from "@refinedev/core";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useCustomRegister() {
  const { mutate, data, error, isError } = useRegister();
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = prepareData();

    if (data) {
      mutate(data);
    }
  }

  function prepareData() {
    if (usernameRef.current && passwordRef.current) {
      const usernameValue = usernameRef.current.value;
      const passwordValue = passwordRef.current.value;

      if (checkPassword(passwordValue)) {
        return;
      }

      const data = { username: usernameValue, password: passwordValue };
      return data;
    }
  }

  function checkPassword(pw: string): boolean {
    const regex = /^[A-Za-z0-9]{9,}$/;
    return regex.test(pw);
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }

    if (data) {
      toast.success("Your account is created");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [error, data, navigate]);

  return { handleRegister, data, error, usernameRef, passwordRef, isError };
}
