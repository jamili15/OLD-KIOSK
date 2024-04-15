import BplsInitial from "@/components/transactions/bpls/details/Initial";
import useTimer from "@/hooks/useTimer";
import { useStepper } from "@/services/context/stepper-context";
import BillingPage from "./details";
import PaymentPage from "./paymentdetails";
import PaymentTypePage from "./paymenttypepage";

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
