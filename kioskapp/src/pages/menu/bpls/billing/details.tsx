import ActionBar from "@/components/layout/ActionBar";
import BplsInfo from "@/components/transactions/bpls/details/Info";
import Button from "@/components/ui/Button";

import { lookupService } from "@/libs/client-service";
import { useBillingContext } from "@/services/context/billing-context";
import { useStepper } from "@/services/context/stepper-context";
import Layout from "./layout";

const BillingPage = () => {
  const { goToNextStep, goToPrevStep } = useStepper();
  const { bill, setCode, setSection } = useBillingContext();
  const svc = lookupService("BplsBillingService");

  const nextPage = async () => {
    if (!bill || !bill.info) {
      console.error("Billing information is not available.");
      return;
    }

    const data = await svc?.invoke("generateCode", {
      refno: bill.info.bin,
      txntype: bill.info.txntype,
    });
    setCode(data.code);
    setSection(data.queuesection);
    goToNextStep();
  };

  return (
    <Layout>
      <BplsInfo />
      <ActionBar>
        <Button
          onClick={() => goToPrevStep("/menu/bpls")}
          buttonText="Back"
          animation="shrink"
          classname="bg-[#567ac8] text-white"
        />
        <Button
          onClick={nextPage}
          buttonText="Next"
          classname="bg-light-blue text-white"
          animation="shrink"
        />
      </ActionBar>
    </Layout>
  );
};

export default BillingPage;
