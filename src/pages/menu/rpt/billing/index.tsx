import RptInitial from "@/components/transactions/rpt/details/Initial";
import { useStepper } from "@/services/context/stepper-context";
import TaxBillingPage from "./details";
import PaymentPage from "./paymentdetails";
import PaymentTypePage from "./paymenttype";
import useTimer from "@/hooks/useTimer";

const Index = () => {
  const { currentStep } = useStepper();
  const timeLimit = 120000;
  useTimer(timeLimit);

  return (
    <>
      {currentStep === 1 && <RptInitial />}
      {currentStep === 2 && <TaxBillingPage />}
      {currentStep === 3 && <PaymentPage />}
      {currentStep === 4 && <PaymentTypePage />}
    </>
  );
};

export default Index;
