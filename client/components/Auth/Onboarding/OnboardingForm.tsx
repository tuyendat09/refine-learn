import FloatingInput from "../../../shared/components/Input/FloatingInput";
import Button from "../../../shared/components/Button";
import { clsx } from "clsx";
import FormHeader from "../../../shared/components/Form/FormHeader";
import { useAuthTransitionContext } from "../../../shared/context/useAuthTransition";
import useCustomRegister from "../hook/useCustomRegister";

export default function OnboardingForm() {
  const { handleTransition } = useAuthTransitionContext();
  const { handleRegister, data, error, usernameRef, passwordRef, isError } =
    useCustomRegister();

  return (
    <div
      className={clsx("flex items-center grow transition duration-300 ", {})}
    >
      <div className="w-[440px] onboarding-form  h-[664px] mx-auto text-white flex flex-col py-8 px-8">
        <FormHeader
          className="h-1/3 mb-auto"
          title="Welcome to Purrfect"
          subtitle="Begin by creating an account"
        />
        <form
          onSubmit={(e) => {
            handleRegister(e);
          }}
          className="w-full mb-8  h-full flex flex-col justify-center"
        >
          <FloatingInput
            inputRef={usernameRef}
            name="username"
            label="Username"
          />
          <FloatingInput
            inputRef={passwordRef}
            name="password"
            type="password"
            label="Password"
          />

          <button />
          <button
            onClick={() => handleTransition("/login")}
            className="text-sm text-gray-400 ml-2 text-left cursor-pointer hover:text-white transition"
          >
            Go back
          </button>
        </form>
        <Button
          size="lg"
          type="button"
          className={clsx("w-full duration-500 mt-auto", {})}
          onClick={(e) => handleRegister(e as any)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
