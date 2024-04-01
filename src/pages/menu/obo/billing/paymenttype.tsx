import ActionBar from "@/components/layout/ActionBar";
import PaymentType from "@/components/transactions/obo/payment/Type";
import Button from "@/components/ui/Button";
import { useStepper } from "@/services/context/stepper-context";
import Layout from "./layout";

const PaymentTypePage = () => {
  const { goToPrevStep } = useStepper();

  return (
    <Layout>
      <PaymentType />
      <ActionBar>
        <Button
          onClick={() => goToPrevStep("/menu/obo")}
          animation="shrink"
          buttonText="Back"
          classname="bg-[#567ac8] text-white"
        />
      </ActionBar>
    </Layout>
  );
};

export default PaymentTypePage;
