import BplsInitial from "@/components/transactions/bpls/details/Initial";
import { useStepper } from "@/services/context/stepper-context";
import BillingPage from "./details";
import PaymentPage from "./paymentdetails";
import PaymentTypePage from "./paymenttypepage";
import useTimer from "@/hooks/useTimer";

const Index = () => {
  const { currentStep } = useStepper();
  const timeLimit = 120000;
  useTimer(timeLimit);

  return (
    <div>
      {currentStep === 1 && <BplsInitial />}
      {currentStep === 2 && <BillingPage />}
      {currentStep === 3 && <PaymentPage />}
      {currentStep === 4 && <PaymentTypePage />}
    </div>
  );
};

export default Index;
