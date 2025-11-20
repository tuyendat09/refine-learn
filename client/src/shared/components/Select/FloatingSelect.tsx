import { clsx } from "clsx";

interface FloatingSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  errorMessage?: string;
  classNames?: string;
  endContent?: React.ReactNode;
  clearBackground?: boolean;
  overrideClass?: string;
  options: { label: string; value: string | number }[];
  selectRef?: React.RefObject<HTMLSelectElement | null>;
}

export default function FloatingSelect({
  name,
  label,
  errorMessage,
  classNames = "",
  endContent,
  clearBackground = false,
  overrideClass,
  options,
  selectRef,
  ...selectProps
}: FloatingSelectProps) {
  return (
    <div className={`relative mb-4 ${classNames}`}>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-1">{errorMessage}</p>
      )}

      <select
        ref={selectRef}
        id={name}
        name={name}
        defaultValue=""
        className={clsx(
          clearBackground
            ? "border-gray-neutral-400 border text-black"
            : "bg-[#1d1d1d] text-white",
          overrideClass,
          `
          peer block w-full rounded-full px-6 py-5 text-sm appearance-none
          focus:outline-none focus:ring-0

          /* Floating logic dùng :has() */
          has-[option:checked[value=""]]:text-transparent
          `
        )}
        {...selectProps}
      >
        <option value="" disabled hidden></option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={name}
        className={`
          absolute text-sm text-gray-neutral-500 duration-300 transform 
          top-5 start-6 origin-left cursor-text

          /* Khi chưa chọn gì → label đứng yên */
          peer-has-[option:checked[value=""]]:translate-y-0
          peer-has-[option:checked[value=""]]:scale-100

          /* Khi đã chọn → floating */
          peer-has-[option:checked:not([value=""])]:-translate-y-4
          peer-has-[option:checked:not([value=""])]:scale-75
        `}
      >
        {label}
      </label>

      {endContent && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 right-6 ${
            clearBackground ? "text-black" : "text-white"
          }`}
        >
          {endContent}
        </div>
      )}
    </div>
  );
}
