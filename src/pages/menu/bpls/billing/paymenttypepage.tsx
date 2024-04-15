import ActionBar from "@/components/layout/ActionBar";
import PaymentType from "@/components/transactions/bpls/payment/Type";
import Button from "@/components/ui/Button";
import useTimer from "@/hooks/useTimer";
import { useStepper } from "@/services/context/stepper-context";
import Layout from "./layout";

const PaymentTypePage = () => {
  const { goToPrevStep } = useStepper();
  const timeLimit = 120000;
  useTimer(timeLimit);

  return (
    <Layout>
      <PaymentType />
      <ActionBar>
        <Button
          onClick={() => goToPrevStep("/menu/bpls")}
          animation="shrink"
          buttonText="Back"
          classname="bg-[#567ac8] text-white"
        />
      </ActionBar>
    </Layout>
  );
};

export default PaymentTypePage;
