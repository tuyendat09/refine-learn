import useCustomRegister from "./hook/useCustomRegister";
import { useRef } from "react";

interface LoginProps {
  setIsLoggin: () => void;
}

export default function Register({ setIsLoggin }: LoginProps) {
  const { handleRegister, data } = useCustomRegister();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (usernameRef.current && passwordRef.current) {
      const usernameValue = usernameRef.current.value;
      const passwordValue = passwordRef.current.value;

      handleRegister(event, usernameValue, passwordValue);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="bg-gray-800 text-white rounded-lg p-4">
          <h1 className="text-center text-2xl">Register</h1>
          <div className="mb-3">
            <p>Username</p>
            <input
              ref={usernameRef}
              className="border px-2 p-1 w-full"
              type="text"
            />
          </div>
          <div>
            <p>Password</p>
            <input
              ref={passwordRef}
              className="border px-2 p-1 w-full"
              type="password"
            />
          </div>
          <button
            className="cursor-pointer bg-white px-4 py-2 text-black w-full mt-4 rounded-full"
            type="submit"
          >
            Sign Up
          </button>
          <button type="button" onClick={setIsLoggin} className="mt-3">
            Already have account{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
