import { useLogin } from "@refinedev/core";
import { useRef } from "react";

export default function useCustomLogin() {
  const { mutate, data, error, isPending } = useLogin();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
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

  return { handleLogin, data, error, usernameRef, passwordRef, isPending };
}
