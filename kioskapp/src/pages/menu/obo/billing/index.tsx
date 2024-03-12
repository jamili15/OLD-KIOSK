import OboInitial from "@/components/transactions/obo/details/Initial";
import { useStepper } from "@/services/context/stepper-context";
import OboBillingPage from "./details";
import PaymentPage from "./paymentdetails";
import PaymentTypePage from "./paymenttype";
import useTimer from "@/hooks/useTimer";

const Index = () => {
  const { currentStep } = useStepper();
  const timeLimit = 120000;
  useTimer(timeLimit);

  return (
    <>
      {currentStep === 1 && <OboInitial />}
      {currentStep === 2 && <OboBillingPage />}
      {currentStep === 3 && <PaymentPage />}
      {currentStep === 4 && <PaymentTypePage />}
    </>
  );
};

export default Index;
