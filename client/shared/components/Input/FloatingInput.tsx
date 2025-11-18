import { useState } from "react";
import { EyesOpen, EyesClose } from "../Icon/index";
import { clsx } from "clsx";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errorMessage?: string;
  classNames?: string;
  endContent?: React.ReactNode;
  clearBackground?: boolean;
  overrideClass?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

const PasswordToggleIcon = ({ show }: { show: boolean }) =>
  show ? (
    <EyesOpen className="size-5 text-gray-text cursor-pointer pointer-events-auto" />
  ) : (
    <EyesClose className="size-5 text-gray-text cursor-pointer pointer-events-auto" />
  );

export default function FloatingInput({
  name,
  label,
  errorMessage,
  classNames = "",
  endContent,
  type = "text",
  overrideClass,
  clearBackground = false,
  inputRef,
  ...inputProps
}: FloatingInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword() {
    setShowPassword((prev) => !prev);
  }

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`relative mb-4 ${classNames}`}>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-1">{errorMessage}</p>
      )}
      <input
        ref={inputRef}
        type={inputType}
        id={name}
        placeholder=" "
        name={name}
        className={clsx(
          clearBackground
            ? "border-gray-neutral-400 border text-black"
            : "bg-[#1d1d1d] text-white",
          overrideClass,
          `peer block w-full rounded-full px-6 py-5 text-sm  0border-gray-300 appearance-none focus:outline-none focus:ring-0`,
        )}
        {...inputProps} // Spread additional props to the input element
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-gray-neutral-500 duration-300 transform scale-75 cursor-text -translate-y-4 top-5 z-0 origin-left start-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          peer-not-placeholder-shown:scale-75
          peer-not-placeholder-shown:-translate-y-4"
      >
        {label}
      </label>

      <div
        className={`absolute top-1/2 -translate-y-1/2 right-6 ${
          clearBackground ? "text-black" : "text-white"
        } mt-1`}
      >
        {isPassword ? (
          <button type="button" onClick={handleTogglePassword}>
            <PasswordToggleIcon show={showPassword} />
          </button>
        ) : (
          endContent
        )}
      </div>
    </div>
  );
}
