import { AuthTransitionProvider } from "../../../shared/context/useAuthTransition";
import PageTransition from "../../../shared/components/Transition/PageTransition";
import OnboardingVideo from "./OnboardingVideo";
import OnboardingForm from "./OnboardingForm";
import "../Auth.css";

export default function Onboarding() {
  return (
    <AuthTransitionProvider>
      <div className="container overflow-hidden h-screen flex">
        <PageTransition />
        <OnboardingVideo />
        <OnboardingForm />
      </div>
    </AuthTransitionProvider>
  );
}
